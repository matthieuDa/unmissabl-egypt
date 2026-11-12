import { createHash, randomUUID } from 'node:crypto';

const MAX_BYTES = 16_384;
const limits = { brand:160, name:120, email:254, need:3000, location:200, 'shoot-period':160, deadline:20, flexibility:160, budget:160, distribution:30, context:160, sector:160, destination:160, project:160, language:2, website:200, turnstileToken:2048, requestId:36 };
const required = ['brand','name','email','need'];
const json = (status, body, extra={}) => new Response(JSON.stringify(body), {status, headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...extra}});
const emailPattern = /^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+$/;
const loopback = hostname => ['localhost','127.0.0.1','[::1]'].includes(hostname);

async function readBody(request) {
  const length = Number(request.headers.get('content-length') || 0);
  if(length>MAX_BYTES) throw new Error('size');
  const reader = request.body?.getReader();
  if(!reader) throw new Error('json');
  const parts=[];let size=0;
  while(true){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>MAX_BYTES){await reader.cancel();throw new Error('size');}parts.push(value);}
  const buffer=new Uint8Array(size);let offset=0;for(const part of parts){buffer.set(part,offset);offset+=part.byteLength;}
  try{return JSON.parse(new TextDecoder().decode(buffer));}catch{throw new Error('json');}
}

export function validateBrief(raw) {
  if(!raw || typeof raw!=='object' || Array.isArray(raw)) return {error:'invalid'};
  const data={};
  for(const [field,max] of Object.entries(limits)){
    if(raw[field]!==undefined && typeof raw[field]!=='string') return {error:'invalid',field};
    const value=(raw[field]||'').trim();
    if(value.length>max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)) return {error:'invalid',field};
    data[field]=value;
  }
  if(data.website) return {error:'spam'};
  for(const field of required)if(!data[field])return {error:'invalid',field};
  if(!emailPattern.test(data.email)) return {error:'invalid',field:'email'};
  if(data.language && !['fr','en'].includes(data.language))return {error:'invalid',field:'language'};
  if(data.deadline && !/^\d{4}-\d{2}-\d{2}$/.test(data.deadline))return {error:'invalid',field:'deadline'};
  if(data.requestId && !/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(data.requestId))return {error:'invalid',field:'requestId'};
  data.language ||= 'fr';
  return {data};
}

const labels={brand:'Marque / Brand',name:'Contact',email:'Email',need:'Projet / Brief',location:'Lieu / Location','shoot-period':'Tournage / Shoot period',deadline:'Livraison / Delivery',flexibility:'Flexibilité / Flexibility',budget:'Budget',distribution:'Diffusion créateurs / Creator distribution',context:'Contexte / Context',sector:'Secteur / Industry',destination:'Destination',project:'Sélection / Selection',language:'Langue / Language'};
function message(data, id){return [`Nouveau brief UNMISSABL — ${id}`,'',...Object.entries(labels).filter(([key])=>data[key]).map(([key,label])=>`${label}: ${data[key]}`)].join('\n\n');}

/** Same handler in Netlify and local capture preview. Local capture is never supplied by the production adapter. */
export async function handleContact(request, {env={}, fetchImpl=fetch, ip='', capture, now=()=>Date.now()}={}) {
  if(request.method!=='POST')return json(405,{ok:false,code:'method'},{Allow:'POST'});
  if(!request.headers.get('content-type')?.toLowerCase().startsWith('application/json'))return json(415,{ok:false,code:'content-type'});
  const url=new URL(request.url);const origin=request.headers.get('origin');
  const local=Boolean(capture && loopback(url.hostname));
  const origins=(env.CONTACT_ALLOWED_ORIGINS||'').split(',').map(x=>x.trim()).filter(Boolean);
  if(!origin || !(local ? origin===url.origin : origins.includes(origin)))return json(403,{ok:false,code:'origin'});
  let raw;
  try{raw=await readBody(request);}catch(error){return json(error.message==='size'?413:400,{ok:false,code:error.message==='size'?'size':'invalid'});}
  const {data,error,field}=validateBrief(raw);
  if(error)return json(error==='spam'?400:422,{ok:false,code:error,field});
  if(local){
    const id=randomUUID();
    try{await capture({id,receivedAt:new Date(now()).toISOString(),...Object.fromEntries(Object.keys(labels).map(key=>[key,data[key]]))});return json(200,{ok:true,mode:'local',reference:id});}
    catch{return json(503,{ok:false,code:'unavailable'});}
  }
  const configured=env.TURNSTILE_SECRET_KEY && env.RESEND_API_KEY && env.CONTACT_FROM_EMAIL && env.CONTACT_TO_EMAIL && origins.length;
  if(!configured)return json(503,{ok:false,code:'unconfigured'});
  if(!data.turnstileToken)return json(422,{ok:false,code:'challenge'});
  let verification;
  try{
    const reply=await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:env.TURNSTILE_SECRET_KEY,response:data.turnstileToken,...(ip?{remoteip:ip}:{})}),signal:AbortSignal.timeout(10_000)});
    if(!reply.ok)return json(503,{ok:false,code:'unavailable'});
    verification=await reply.json();
  }catch{return json(503,{ok:false,code:'unavailable'});}
  const allowedHosts=origins.map(value=>{try{return new URL(value).hostname;}catch{return '';}}).filter(Boolean);
  if(verification.success!==true || verification.action!=='production-brief' || !allowedHosts.includes(verification.hostname))return json(422,{ok:false,code:'challenge'});
  // Provider idempotency prevents duplicate mail on retries; user data is hashed, never used as a public key.
  const content=Object.fromEntries(Object.keys(labels).map(key=>[key,data[key]]));
  const key=createHash('sha256').update(JSON.stringify(content)+data.requestId).digest('hex');
  const reference=key.slice(0,12).toUpperCase();
  try{
    const reply=await fetchImpl('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`unmissabl-${key}`},body:JSON.stringify({from:env.CONTACT_FROM_EMAIL,to:env.CONTACT_TO_EMAIL.split(',').map(x=>x.trim()).filter(Boolean),reply_to:data.email,subject:`UNMISSABL — ${data.brand.replace(/[\r\n]/g,' ')} — ${reference}`,text:message(data,reference)}),signal:AbortSignal.timeout(12_000)});
    const receipt=await reply.json();
    if(!reply.ok || typeof receipt.id!=='string' || !receipt.id)return json(503,{ok:false,code:'delivery'});
    return json(200,{ok:true,mode:'sent',reference});
  }catch{return json(503,{ok:false,code:'delivery'});}
}
