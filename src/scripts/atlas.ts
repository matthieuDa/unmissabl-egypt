import previewVariants from '../data/video-variants.json';
import {geoOrthographic,geoPath,geoGraticule10,geoDistance} from 'd3-geo';
import {feature} from 'topojson-client';
import world from 'world-atlas/land-110m.json';

type AtlasMedia={id:string;title:string;credit:string;poster:string;video:string;embed?:string;url:string};
type AtlasPoint={id:string;kind:'work'|'future'|'base';label:string;country:string;lat:number;lon:number;media:AtlasMedia[]};
const land=feature(world as any,(world as any).objects.land);
const graticule=geoGraticule10();
const reduced=matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll<HTMLElement>('.atlas-globe[data-atlas]').forEach(atlas=>{
 const points=JSON.parse(atlas.dataset.points||'[]') as AtlasPoint[];
 const copy=JSON.parse(atlas.dataset.copy||'{}') as Record<string,string>;
 if(!points.length)return;
 const canvas=atlas.querySelector<HTMLElement>('[data-globe-canvas]')!;
 const globeLand=atlas.querySelector<SVGPathElement>('[data-globe-land]')!;
 const globeGrid=atlas.querySelector<SVGPathElement>('[data-globe-grid]')!;
 const media=atlas.querySelector<HTMLElement>('[data-atlas-media]')!;
 const video=atlas.querySelector<HTMLVideoElement>('[data-map-video]')!;
 const poster=atlas.querySelector<HTMLImageElement>('[data-map-poster]')!;
 const loading=atlas.querySelector<HTMLElement>('[data-map-loading]')!;
 const status=atlas.querySelector<HTMLElement>('[data-map-status]')!;
 const pause=atlas.querySelector<HTMLButtonElement>('[data-map-pause]')!;
 const pauseIcon=atlas.querySelector<SVGPathElement>('[data-map-pause-icon]')!;
 const globePause=atlas.querySelector<HTMLButtonElement>('[data-globe-pause]')!;
 const empty=atlas.querySelector<HTMLElement>('[data-map-empty]')!;
 const films=atlas.querySelector<HTMLElement>('[data-map-films]')!;
 const markers=[...atlas.querySelectorAll<HTMLButtonElement>('[data-map-point]')];
 const index=[...atlas.querySelectorAll<HTMLButtonElement>('[data-map-select]')];
 let current=points[0],currentMedia=current.media[0],kind:AtlasPoint['kind']='work';
 let rotation:[number,number]=[-current.lon,-current.lat];
 const projection=geoOrthographic().translate([320,320]).scale(276).rotate(rotation).clipAngle(90);
 const path=geoPath(projection);
 let hovering=false,focused=false,dragging=false,rotationPaused=false,globeVisible=false,mediaVisible=false,userPaused=false;
 let mediaRevision=0,loadedId='',request=0,lastFrame=0,selectionTimer:ReturnType<typeof setTimeout>|undefined;
 let loadingTimer:ReturnType<typeof setTimeout>|undefined,errorTimer:ReturnType<typeof setTimeout>|undefined;
 let travel:{from:[number,number];to:[number,number];start:number}|undefined;

 const draw=()=>{
  projection.rotate(rotation);globeLand.setAttribute('d',path(land as any)||'');globeGrid.setAttribute('d',path(graticule)||'');
  const center:[number,number]=[-rotation[0],-rotation[1]];
  markers.forEach(marker=>{const p=points.find(p=>p.id===marker.dataset.mapPoint)!;const visible=p.kind===kind&&geoDistance([p.lon,p.lat],center)<Math.PI/2-.015;marker.hidden=!visible;if(!visible)return;const point=projection([p.lon,p.lat]);if(point){marker.style.setProperty('--x',`${point[0]/6.4}%`);marker.style.setProperty('--y',`${point[1]/6.4}%`);}});
 };
 const canRotate=()=>globeVisible&&!document.hidden&&!reduced.matches&&!rotationPaused&&!hovering&&!focused&&!dragging;
 const frame=(now:number)=>{
  request=0;if(!globeVisible||document.hidden){lastFrame=0;return;}
  const dt=lastFrame?Math.min(now-lastFrame,60):0;lastFrame=now;
  if(travel){const progress=Math.min((now-travel.start)/850,1);const ease=1-Math.pow(1-progress,4);rotation=[travel.from[0]+(travel.to[0]-travel.from[0])*ease,travel.from[1]+(travel.to[1]-travel.from[1])*ease];if(progress===1)travel=undefined;draw();}
  else if(canRotate()&&dt){rotation[0]+=(dt/1000)*4;draw();}
  if(travel||canRotate())request=requestAnimationFrame(frame);else lastFrame=0;
 };
 const animate=()=>{if(!request&&globeVisible&&!document.hidden&&(travel||canRotate()))request=requestAnimationFrame(frame);};
 const stopAnimation=()=>{if(request)cancelAnimationFrame(request);request=0;lastFrame=0;};
 const centerOn=(point:AtlasPoint)=>{
  let longitude=-point.lon;while(longitude-rotation[0]>180)longitude-=360;while(longitude-rotation[0]<-180)longitude+=360;
  const to:[number,number]=[longitude,-point.lat];
  if(reduced.matches||!globeVisible){rotation=to;travel=undefined;draw();return;}
  travel={from:[...rotation],to,start:performance.now()};animate();
 };
 const updatePause=()=>{pause.setAttribute('aria-label',userPaused?copy.resumeVideo:copy.pauseVideo);pauseIcon.setAttribute('d',userPaused?'m9 5 11 7-11 7V5Z':'M8 5v14M16 5v14');};
 const clearLoading=()=>{clearTimeout(loadingTimer);clearTimeout(errorTimer);loading.hidden=true;loading.classList.remove('is-error');};
 const pending=()=>{clearLoading();status.textContent=copy.loading;loading.hidden=false;loadingTimer=setTimeout(()=>{status.textContent=copy.slow;},6500);errorTimer=setTimeout(failed,30000);};
 const ready=()=>{
  if(!mediaVisible||document.hidden||userPaused){video.pause();return;}
  clearLoading();media.classList.add('video-ready');video.classList.add('is-playing');pause.hidden=false;updatePause();
 };
 function failed(){clearLoading();status.textContent=copy.failed;loading.hidden=false;loading.classList.add('is-error');video.pause();userPaused=true;pause.hidden=false;updatePause();}
 const unload=()=>{
  mediaRevision++;clearLoading();video.pause();video.classList.remove('is-playing');video.removeAttribute('src');video.load();media.classList.remove('video-ready');pause.hidden=true;loadedId='';
 };
 const startMedia=(explicit=false)=>{
  if(!mediaVisible||document.hidden||userPaused||(!explicit&&reduced.matches))return;
  if(!currentMedia.video){clearLoading();pause.hidden=true;return;}
  if(loadedId===currentMedia.id){if(video.error){video.load();pending();}if(video.src)void video.play().catch(()=>{userPaused=true;clearLoading();pause.hidden=false;updatePause();});return;}
  loadedId=currentMedia.id;const revision=mediaRevision;pending();
  if(currentMedia.video){const choices=(previewVariants as Record<string,{src:string;width:number;height:number}[]>)[currentMedia.video]||[];const aspect=choices[0]?choices[0].width/choices[0].height:16/9;const target=Math.max(media.clientWidth,media.clientHeight*aspect)*Math.min(devicePixelRatio||1,1.5);video.src=(choices.find(v=>v.width>=target)||choices.at(-1))?.src||currentMedia.video;video.muted=true;video.load();void video.play().catch(()=>{if(revision!==mediaRevision)return;userPaused=true;clearLoading();pause.hidden=false;updatePause();});}
 };
 const setMedia=(next:AtlasMedia)=>{
  unload();currentMedia=next;userPaused=reduced.matches;poster.hidden=!next.poster;empty.hidden=!!next.poster;
  if(next.poster){poster.src=next.poster;poster.alt=next.title;}
  atlas.querySelector('[data-map-empty-place]')!.textContent=current.label;
  atlas.querySelector('[data-map-place]')!.textContent=current.label;
  atlas.querySelector('[data-map-title]')!.textContent=next.title;
  atlas.querySelector('[data-map-credit]')!.textContent=next.credit;
  (atlas.querySelector('[data-map-link]') as HTMLAnchorElement).href=next.url;
  const sourceFilm=atlas.querySelector<HTMLAnchorElement>('[data-map-source-film]')!;sourceFilm.href=next.url;sourceFilm.hidden=kind!=='work'||!!next.video||!next.embed;
  atlas.querySelector('[data-map-link-label]')!.textContent=kind==='work'?copy.watch:kind==='base'?copy.collective:copy.trip;
  films.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.mediaId===next.id)));
  if(userPaused&&next.video){pause.hidden=false;updatePause();}
  else startMedia();
 };
 const renderFilms=(point:AtlasPoint)=>{
  films.replaceChildren();films.hidden=point.media.length<2;
  for(const item of point.media){const button=document.createElement('button');button.type='button';button.textContent=item.title;button.dataset.mediaId=item.id;button.setAttribute('aria-pressed',String(item===point.media[0]));button.addEventListener('click',()=>setMedia(item));films.append(button);}
 };
 const select=(id:string,recenter=false)=>{
  const point=points.find(p=>p.id===id);if(!point)return;
  if(current.id===id){if(recenter)centerOn(point);startMedia();return;}
  current=point;markers.forEach(button=>{const selected=button.dataset.mapPoint===id;button.classList.toggle('active',selected);button.setAttribute('aria-pressed',String(selected));});index.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.mapSelect===id)));
  renderFilms(point);
  setMedia(point.media[0]);if(recenter)centerOn(point);draw();
 };
 poster.addEventListener('error',()=>{poster.hidden=true;empty.hidden=false;});
 video.addEventListener('playing',ready);video.addEventListener('waiting',()=>{if(loadedId&&!userPaused&&mediaVisible)pending();});video.addEventListener('error',()=>{if(video.getAttribute('src'))failed();});
 pause.addEventListener('click',()=>{userPaused=!userPaused;updatePause();if(userPaused){clearLoading();video.pause();}else startMedia(true);});
 markers.forEach(button=>{
  const id=button.dataset.mapPoint!;
  button.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){clearTimeout(selectionTimer);selectionTimer=setTimeout(()=>select(id),110);}});
  button.addEventListener('pointerleave',()=>clearTimeout(selectionTimer));button.addEventListener('focus',()=>select(id));button.addEventListener('click',()=>select(id));
 });
 index.forEach(button=>{
  const id=button.dataset.mapSelect!;
  button.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){clearTimeout(selectionTimer);selectionTimer=setTimeout(()=>select(id,true),180);}});button.addEventListener('pointerleave',()=>clearTimeout(selectionTimer));button.addEventListener('focus',()=>select(id,true));button.addEventListener('click',()=>select(id,true));
 });
 atlas.querySelectorAll<HTMLButtonElement>('[data-map-filter]').forEach(button=>button.addEventListener('click',()=>{
  kind=button.dataset.mapFilter as AtlasPoint['kind'];atlas.querySelectorAll<HTMLButtonElement>('[data-map-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));index.forEach(b=>b.hidden=b.dataset.kind!==kind);
  const filtered=points.filter(p=>p.kind===kind);const label=kind==='work'?(atlas.dataset.lang==='fr'?'destinations filmées':'shoot locations'):kind==='base'?copy.base.toLowerCase():copy.future.toLowerCase();atlas.querySelector('[data-map-count]')!.textContent=`${filtered.length} ${label}`;
  if(filtered[0])select(filtered[0].id,true);
 }));
 const step=(direction:number)=>{const filtered=points.filter(p=>p.kind===kind);const next=filtered[(filtered.indexOf(current)+direction+filtered.length)%filtered.length];if(next){select(next.id,true);const button=index.find(b=>b.dataset.mapSelect===next.id);const strip=atlas.querySelector<HTMLElement>('.atlas-location-index');if(button&&strip){const rect=button.getBoundingClientRect(),frame=strip.getBoundingClientRect();const shift=rect.left<frame.left?rect.left-frame.left:rect.right>frame.right?rect.right-frame.right:0;strip.scrollBy({left:shift,behavior:reduced.matches?'instant':'smooth'});}}};
 atlas.querySelector('[data-map-prev]')?.addEventListener('click',()=>step(-1));atlas.querySelector('[data-map-next]')?.addEventListener('click',()=>step(1));
 canvas.addEventListener('pointerenter',()=>{hovering=true;stopAnimation();});canvas.addEventListener('pointerleave',()=>{hovering=false;if(!dragging)animate();});
 atlas.addEventListener('focusin',event=>{focused=event.target!==globePause;if(focused)stopAnimation();else animate();});atlas.addEventListener('focusout',()=>{queueMicrotask(()=>{focused=atlas.contains(document.activeElement)&&document.activeElement!==globePause;animate();});});
 globePause.addEventListener('click',()=>{rotationPaused=!rotationPaused;globePause.setAttribute('aria-pressed',String(rotationPaused));globePause.setAttribute('aria-label',rotationPaused?copy.resume:copy.pause);const text=globePause.querySelector('span');if(text)text.textContent=rotationPaused?(atlas.dataset.lang==='fr'?'Rotation':'Rotate'):'Pause';const icon=globePause.querySelector('path');icon?.setAttribute('d',rotationPaused?'m9 5 11 7-11 7V5Z':'M8 5v14M16 5v14');if(rotationPaused)stopAnimation();else animate();});
 let previousX=0,previousY=0;
 canvas.addEventListener('pointerdown',event=>{if((event.target as HTMLElement).closest('button'))return;dragging=true;travel=undefined;previousX=event.clientX;previousY=event.clientY;canvas.classList.add('is-dragging');canvas.setPointerCapture(event.pointerId);stopAnimation();});
 canvas.addEventListener('pointermove',event=>{if(!dragging)return;const scale=125/canvas.clientWidth;rotation[0]+=(event.clientX-previousX)*scale;rotation[1]=Math.max(-80,Math.min(80,rotation[1]-(event.clientY-previousY)*scale));previousX=event.clientX;previousY=event.clientY;draw();});
 const endDrag=()=>{dragging=false;canvas.classList.remove('is-dragging');animate();};canvas.addEventListener('pointerup',endDrag);canvas.addEventListener('pointercancel',endDrag);canvas.addEventListener('lostpointercapture',endDrag);
 canvas.addEventListener('keydown',event=>{if(event.target!==canvas)return;const directions:Record<string,[number,number]>={ArrowLeft:[-12,0],ArrowRight:[12,0],ArrowUp:[0,10],ArrowDown:[0,-10]};const delta=directions[event.key];if(!delta)return;event.preventDefault();travel=undefined;rotation[0]+=delta[0];rotation[1]=Math.max(-80,Math.min(80,rotation[1]+delta[1]));draw();});
 const globeObserver=new IntersectionObserver(entries=>{globeVisible=entries[0].isIntersecting;if(globeVisible)animate();else stopAnimation();},{threshold:.05});globeObserver.observe(canvas);
 const mediaObserver=new IntersectionObserver(entries=>{mediaVisible=entries[0].isIntersecting;if(mediaVisible)startMedia();else{clearLoading();video.pause();}},{threshold:.15});mediaObserver.observe(media);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){stopAnimation();video.pause();clearLoading();}else{animate();startMedia();}});
 reduced.addEventListener('change',()=>{if(reduced.matches){travel=undefined;stopAnimation();userPaused=true;video.pause();clearLoading();if(currentMedia.video)pause.hidden=false;updatePause();}else{userPaused=false;startMedia();animate();}});
 if(reduced.matches){userPaused=true;if(currentMedia.video)pause.hidden=false;updatePause();}
 renderFilms(current);draw();
});
