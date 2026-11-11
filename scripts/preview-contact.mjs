import {createServer} from 'node:http';
import {Readable} from 'node:stream';
import {createReadStream} from 'node:fs';
import {stat,realpath,mkdir,writeFile} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {handleContact} from '../server/contact.mjs';
const root=resolve(fileURLToPath(new URL('../dist',import.meta.url)));
const captureDir=resolve(fileURLToPath(new URL('../.local/contacts',import.meta.url)));
const port=Number(process.env.PORT||4322);const host='127.0.0.1';
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.mp4':'video/mp4','.woff':'font/woff','.woff2':'font/woff2','.txt':'text/plain','.xml':'application/xml','.pdf':'application/pdf'};
const attempts=new Map();
const server=createServer(async(req,res)=>{
 try{
  const authority=req.headers.host||'';
  if(![`127.0.0.1:${port}`,`localhost:${port}`].includes(authority)){res.writeHead(403);res.end('Invalid host');return;}
  const url=new URL(req.url,`http://${authority}`);
  const retired=url.pathname.match(/^\/(fr|en)\/solutions(?:\/(hotels|resorts|automotive|golf|equestrian))?\/?$/);
  if(retired){const destination=retired[2]?`/${retired[1]}/destinations/france/?sector=${retired[2]==='resorts'?'hotels':retired[2]}#projets`:`/${retired[1]}/sectors/`;res.writeHead(302,{Location:destination});res.end();return;}
  if(url.pathname==='/api/contact'){
   const ip=req.socket.remoteAddress;const now=Date.now();const recent=(attempts.get(ip)||[]).filter(t=>now-t<60_000);attempts.set(ip,recent);
   if(recent.length>=8){res.writeHead(429,{'Content-Type':'application/json','Retry-After':'60','Cache-Control':'no-store'});res.end(JSON.stringify({ok:false,code:'rate-limit'}));return;}recent.push(now);
   const request=new Request(url,{method:req.method,headers:req.headers,...(!['GET','HEAD'].includes(req.method)?{body:Readable.toWeb(req),duplex:'half'}:{})});
   const result=await handleContact(request,{capture:async brief=>{await mkdir(captureDir,{recursive:true,mode:0o700});await writeFile(resolve(captureDir,brief.id+'.json'),JSON.stringify(brief,null,2)+'\n',{mode:0o600,flag:'wx'});}});
   res.writeHead(result.status,Object.fromEntries(result.headers));res.end(await result.text());return;
  }
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'});res.end();return;}
  const pathname=decodeURIComponent(url.pathname);let path=resolve(root,'.'+pathname);if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403);res.end();return;}
  let info;try{info=await stat(path);if(info.isDirectory()){path=resolve(path,'index.html');info=await stat(path);}}catch{res.writeHead(404);res.end('Not found');return;}
  const real=await realpath(path);if(!real.startsWith(root+sep)){res.writeHead(403);res.end();return;}
  const headers={'Content-Type':mime[extname(path)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-cache','Accept-Ranges':'bytes'};
  const range=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  if(range){const start=Number(range[1]),end=range[2]?Math.min(Number(range[2]),info.size-1):info.size-1;if(start>end||start>=info.size){res.writeHead(416,{'Content-Range':`bytes */${info.size}`});res.end();return;}res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${info.size}`,'Content-Length':end-start+1});if(req.method==='HEAD')res.end();else createReadStream(path,{start,end}).pipe(res);}
  else {res.writeHead(200,{...headers,'Content-Length':info.size});if(req.method==='HEAD')res.end();else createReadStream(path).pipe(res);}
 }catch{if(!res.headersSent)res.writeHead(500,{'Content-Type':'text/plain'});res.end('Preview server error');}
});
server.listen(port,host,()=>console.log(`UNMISSABL local preview: http://${host}:${port}/fr/\nLocal form capture only — no external emails. Captures: ${captureDir}`));
