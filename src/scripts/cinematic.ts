import reelData from '../data/reels.json';

type Reel={id:string;title:{fr:string;en:string};description:{fr:string;en:string};src:string;mobileSrc?:string;poster:string;duration:number;credits:{name:string;sourceUrl:string}[]};
const reels=reelData as Reel[];
const lang=document.body.dataset.lang==='en'?'en':'fr';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const saveData=(navigator as Navigator&{connection?:{saveData?:boolean}}).connection?.saveData;
const read=(key:string)=>{try{return sessionStorage.getItem(key);}catch{return null;}};
const write=(key:string,value:string)=>{try{sessionStorage.setItem(key,value);}catch{}};
const requested=new URLSearchParams(location.search).get('intro')||read('unmissabl-reel');
const reel=reels.find(r=>r.id===requested)||reels[0];
if(reel)write('unmissabl-reel',reel.id);

const hero=document.querySelector<HTMLElement>('[data-cinema-hero]');
const loader=document.querySelector<HTMLElement>('#entry-loader');
let finished=false;
const openedAt=performance.now();
if(loader&&!loader.hidden){document.querySelectorAll<HTMLElement>('.site-header,#mobile-menu,#main,.footer').forEach(node=>{node.inert=true;node.setAttribute('data-entry-inert','');});}
const unlock=()=>document.querySelectorAll<HTMLElement>('[data-entry-inert]').forEach(node=>{node.inert=false;node.removeAttribute('data-entry-inert');});
const finishEntry=()=>{
 if(finished)return;finished=true;
 write('unmissabl-entry-v3','1');
 if(!loader||loader.hidden){unlock();return;}
 const skip=loader.querySelector<HTMLButtonElement>('[data-entry-skip]');
 const focusWasInside=loader.contains(document.activeElement);
 const finish=()=>{unlock();loader.hidden=true;document.documentElement.classList.remove('entry-active');if(focusWasInside){document.querySelector<HTMLAnchorElement>('.wordmark')?.focus();}};
 loader.classList.add('is-leaving');
 if(skip)skip.disabled=true;
 setTimeout(finish,reduced.matches?0:750);
};
loader?.querySelector('[data-entry-skip]')?.addEventListener('click',()=>{finished=true;unlock();write('unmissabl-entry-v3','1');});
const release=()=>setTimeout(finishEntry,Math.max(0,1950-(performance.now()-openedAt)));
if(loader&&!loader.hidden){
 setTimeout(()=>{if(!finished){const status=loader.querySelector('[data-entry-status]');if(status)status.textContent=lang==='fr'?'Chargement du film haute définition…':'Loading the high-definition film…';}},3000);
 // Connection failure falls back to the sharp poster; all navigation stays accessible.
 setTimeout(finishEntry,15000);
}
if(hero){
 const video=hero.querySelector<HTMLVideoElement>('[data-hero-video]')!;
 const poster=hero.querySelector<HTMLImageElement>('.hero-photo')!;
 const status=hero.querySelector<HTMLElement>('[data-hero-status]')!;
 let src=hero.dataset.preview||'';
 const montage=hero.dataset.montage==='true';
 if(montage&&reel){
  src=matchMedia('(max-width: 760px)').matches&&reel.mobileSrc?reel.mobileSrc:reel.src;
  poster.src=reel.poster;
  const title=hero.querySelector('[data-reel-title]');if(title)title.textContent=reel.title[lang];
  const credit=hero.querySelector('[data-reel-credit]');if(credit)credit.textContent=lang==='fr'?'Extraits des portfolios du collectif · films et crédits':'Excerpts from the collective’s portfolios · films and credits';
 }
 let userPaused=reduced.matches;
 let inView=true;
 let bufferTimer:ReturnType<typeof setTimeout>;
 let framePending=false;
 let frameDecoded=false;
 const showStatus=(message:string)=>{status.hidden=false;status.textContent=message;};
 const revealBuffered=()=>{
  if(!frameDecoded)return;
  let ahead=0;for(let i=0;i<video.buffered.length;i++){if(video.currentTime>=video.buffered.start(i)&&video.currentTime<=video.buffered.end(i)){ahead=video.buffered.end(i)-video.currentTime;break;}}
  const required=Math.min(3,Math.max(.1,video.duration-video.currentTime-.05));
  if(ahead<required&&!finished)return;
  hero.classList.add('video-ready');status.hidden=true;clearTimeout(bufferTimer);framePending=false;release();
 };
 const firstFrame=()=>{if(framePending)return;framePending=true;const decoded=()=>{frameDecoded=true;revealBuffered();};if('requestVideoFrameCallback'in video){video.requestVideoFrameCallback(decoded);}else{decoded();}};
 const start=()=>{if(!src)return;if(!video.currentSrc||!video.currentSrc.endsWith(src)){video.src=src;video.preload='auto';video.load();}void video.play().catch(error=>{
  // Pausing an offscreen video can reject a pending play; this is not a load failure.
  if(error instanceof DOMException&&error.name==='AbortError')return;
  const autoplayBlocked=error instanceof DOMException&&error.name==='NotAllowedError';
  clearTimeout(bufferTimer);
  showStatus(autoplayBlocked?(lang==='fr'?'':''):(lang==='fr'?'Vidéo indisponible. Réessayer.':'Film unavailable. Try again.'));release();
 });};
 if(src){

  video.addEventListener('playing',firstFrame);
  video.addEventListener('progress',revealBuffered);
  video.addEventListener('canplaythrough',revealBuffered);
  video.addEventListener('waiting',()=>{clearTimeout(bufferTimer);if(video.error)return;bufferTimer=setTimeout(()=>{if(!video.error)showStatus(lang==='fr'?'Chargement HD…':'Loading HD…');},600);});
  video.addEventListener('error',()=>{clearTimeout(bufferTimer);hero.classList.remove('video-ready');showStatus(lang==='fr'?'Vidéo indisponible. Réessayer.':'Film unavailable. Try again.');release();});
  if(userPaused){video.autoplay=false;video.pause();}
  if(!video.paused&&video.readyState>=2)firstFrame();
  if(!userPaused){showStatus(lang==='fr'?'Chargement HD…':'Loading HD…');start();}else release();
  new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(!inView)video.pause();else if(!userPaused&&!document.hidden)start();},{threshold:.1}).observe(hero);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else if(inView&&!userPaused)start();});
  document.addEventListener('pointerdown',()=>{if(video.paused&&!userPaused&&inView)start();},{once:true,passive:true});
  reduced.addEventListener('change',()=>{if(reduced.matches){userPaused=true;video.pause();release();}});
 }else{release();}
}else{release();}

// One responsive preview at a time; posters remain visible until a frame is decoded.
const mobilePreviews=matchMedia('(max-width: 760px), (hover: none), (pointer: coarse)');
type Variant={src:string;width:number;height:number};
type Preview={card:HTMLElement;video:HTMLVideoElement;ratio:number;timer?:ReturnType<typeof setTimeout>;width:number};
const previews:Preview[]=[];
let activePreview:Preview|null=null;
const stopPreview=(item:Preview)=>{
 item.video.pause();clearTimeout(item.timer);item.card.classList.remove('preview-playing','preview-loading');item.card.removeAttribute('aria-busy');
 if(activePreview===item)activePreview=null;
};
const sourceFor=(item:Preview):Variant=>{
 let variants:Variant[]=[];
 try{variants=JSON.parse(item.video.dataset.previewSources||'[]');}catch{}
 const source=item.card.dataset.cardPreview!;
 if(!variants.length&&source.includes('video.wixstatic.com')&&/\/\d+p\/mp4\//.test(source)){
  const portrait=item.card.dataset.previewOrientation==='portrait';
  variants=[480,720,1080].map(h=>({src:source.replace(/\/\d+p\/mp4\//,`/${h}p/mp4/`),width:portrait?h:Math.round(h*16/9),height:portrait?Math.round(h*16/9):h}));
 }
 const frame=item.card.querySelector<HTMLElement>('.sector-gallery-image')||item.card;
 const box=frame.getBoundingClientRect();
 const aspect=variants[0]?variants[0].width/variants[0].height:16/9;
 const desired=Math.max(box.width,box.height*aspect)*Math.min(devicePixelRatio||1,1.5);
 return variants.find(v=>v.width>=desired)||variants.at(-1)||{src:source,width:0,height:0};
};
const failPreview=(item:Preview)=>{stopPreview(item);item.card.classList.add('preview-failed');};
const revealPreview=(item:Preview)=>{
 if(activePreview!==item)return;
 const reveal=()=>{if(activePreview!==item||item.video.paused)return;clearTimeout(item.timer);item.card.classList.remove('preview-loading','preview-failed');item.card.removeAttribute('aria-busy');item.card.classList.add('preview-playing');};
 if('requestVideoFrameCallback'in item.video)item.video.requestVideoFrameCallback(reveal);else reveal();
};
const playPreview=(item:Preview)=>{
 if(reduced.matches||saveData||document.hidden||item.card.closest('[hidden]'))return;
 if(activePreview&&activePreview!==item)stopPreview(activePreview);
 activePreview=item;
 const source=sourceFor(item);
 if(!item.video.getAttribute('src')||source.width>item.width){item.video.src=source.src;item.width=source.width;item.video.load();}
 if(item.video.paused){
  item.card.classList.remove('preview-failed');item.card.classList.add('preview-loading');item.card.setAttribute('aria-busy','true');
  clearTimeout(item.timer);item.timer=setTimeout(()=>failPreview(item),12000);
  void item.video.play().catch(error=>{if(activePreview===item&&error?.name!=='AbortError')failPreview(item);});
 }
};
const selectVisiblePreview=()=>{
 if(activePreview&&activePreview.ratio>.25&&!activePreview.card.closest('[hidden]')&&(mobilePreviews.matches||activePreview.card.hasAttribute('data-preview-auto')))return;
 const visible=previews.filter(item=>item.ratio>=.55&&!item.card.closest('[hidden]')&&(mobilePreviews.matches||item.card.hasAttribute('data-preview-auto')));
 const nearest=visible.sort((a,b)=>Math.abs(a.card.getBoundingClientRect().top+a.card.clientHeight/2-innerHeight/2)-Math.abs(b.card.getBoundingClientRect().top+b.card.clientHeight/2-innerHeight/2))[0];
 if(nearest)playPreview(nearest);else if(activePreview)stopPreview(activePreview);
};
const previewObserver=new IntersectionObserver(entries=>{
 for(const entry of entries){const item=previews.find(p=>p.card===entry.target);if(!item)continue;item.ratio=entry.intersectionRatio;if(!entry.isIntersecting)stopPreview(item);}
 selectVisiblePreview();
},{threshold:[0,.25,.55,.8,1]});
document.querySelectorAll<HTMLElement>('[data-card-preview]').forEach(card=>{
 const video=card.querySelector<HTMLVideoElement>('video');if(!video||!card.dataset.cardPreview)return;
 const item:Preview={card,video,ratio:0,width:0};previews.push(item);
 try{const first=JSON.parse(video.dataset.previewSources||'[]')[0];if(first)card.dataset.previewOrientation=first.height>first.width?'portrait':'landscape';}catch{}
 card.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')playPreview(item);});
 card.addEventListener('pointermove',e=>{if(e.pointerType==='mouse'&&activePreview!==item)playPreview(item);});
 card.addEventListener('pointerdown',()=>playPreview(item),{passive:true});
 card.addEventListener('focusin',()=>playPreview(item));
 card.addEventListener('pointerleave',()=>{if(!mobilePreviews.matches&&!card.hasAttribute('data-preview-auto'))stopPreview(item);});
 card.addEventListener('focusout',()=>{if(!mobilePreviews.matches&&!card.hasAttribute('data-preview-auto'))stopPreview(item);});
 video.addEventListener('playing',()=>{if(activePreview===item)revealPreview(item);else stopPreview(item);});
 video.addEventListener('waiting',()=>{if(activePreview===item){card.classList.add('preview-loading');card.setAttribute('aria-busy','true');clearTimeout(item.timer);item.timer=setTimeout(()=>failPreview(item),12000);}});
 video.addEventListener('error',()=>{if(activePreview===item)failPreview(item);});
 previewObserver.observe(card);
});
document.addEventListener('unmissabl:preview-panel',()=>{
 if(activePreview?.card.closest('[hidden]'))stopPreview(activePreview);
 requestAnimationFrame(()=>{for(const item of previews){const box=item.card.getBoundingClientRect();item.ratio=box.height?Math.max(0,Math.min(box.bottom,innerHeight)-Math.max(box.top,0))/box.height:0;}selectVisiblePreview();});
});
let previewFrame=0;
document.addEventListener('scroll',()=>{if(!mobilePreviews.matches||previewFrame)return;previewFrame=requestAnimationFrame(()=>{previewFrame=0;selectVisiblePreview();});},{passive:true});
document.addEventListener('touchmove',event=>{
 const touch=event.touches[0];if(!touch)return;
 const card=document.elementFromPoint(touch.clientX,touch.clientY)?.closest<HTMLElement>('[data-card-preview]');
 const item=previews.find(item=>item.card===card);if(item)playPreview(item);
},{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&activePreview)stopPreview(activePreview);else selectVisiblePreview();});
reduced.addEventListener('change',()=>{if(reduced.matches&&activePreview)stopPreview(activePreview);else selectVisiblePreview();});
mobilePreviews.addEventListener('change',()=>{if(activePreview)stopPreview(activePreview);selectVisiblePreview();});
document.querySelectorAll<HTMLVideoElement>('[data-reel-player]').forEach(video=>video.addEventListener('play',()=>{document.querySelectorAll<HTMLVideoElement>('[data-reel-player]').forEach(other=>{if(other!==video)other.pause();});}));
document.querySelectorAll<HTMLAnchorElement>('[data-choose-reel]').forEach(link=>link.addEventListener('click',()=>{write('unmissabl-reel',link.dataset.chooseReel!);try{sessionStorage.removeItem('unmissabl-entry-v3');}catch{}}));
