import {normalizeFranceSector} from '../data/france-campaign';
const root=document.querySelector<HTMLElement>('[data-trip-sectors]');
if(root){
 const tabs=[...root.querySelectorAll<HTMLButtonElement>('[data-sector-tab]')];
 const panels=[...root.querySelectorAll<HTMLElement>('[data-sector-panel]')];
 const publishContext=(tab:HTMLButtonElement)=>document.dispatchEvent(new CustomEvent('unmissabl:trip-context',{detail:{sector:tab.dataset.sectorName,destination:'france',period:document.body.dataset.lang==='fr'?'Printemps 2027':'Spring 2027'}}));
 const select=(id:string,updateUrl=true)=>{
  const selected=tabs.find(tab=>tab.dataset.sectorTab===id)||tabs[0];
  tabs.forEach(tab=>{const active=tab===selected;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
  panels.forEach(panel=>{panel.hidden=panel.dataset.sectorPanel!==selected.dataset.sectorTab;});
  if(updateUrl){const url=new URL(location.href);url.searchParams.set('sector',selected.dataset.sectorTab!);history.replaceState(null,'',url);}
  publishContext(selected);document.dispatchEvent(new Event('unmissabl:preview-panel'));
 };
 tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>select(tab.dataset.sectorTab!));
  tab.addEventListener('keydown',event=>{let next=i;if(event.key==='ArrowRight')next=(i+1)%tabs.length;else if(event.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();select(tabs[next].dataset.sectorTab!);tabs[next].focus({preventScroll:true});const box=tabs[next].getBoundingClientRect(),rail=tabs[next].parentElement!;if(box.left<rail.getBoundingClientRect().left||box.right>rail.getBoundingClientRect().right)rail.scrollLeft+=box.left-rail.getBoundingClientRect().left;});
 });
 root.querySelectorAll<HTMLAnchorElement>('[data-sector-brief]').forEach(link=>link.addEventListener('click',()=>select(link.dataset.sectorBrief!)));
 const restore=()=>select(normalizeFranceSector(new URLSearchParams(location.search).get('sector'))||'hotels',false);
 restore();document.addEventListener('unmissabl:brief-ready',restore);window.addEventListener('popstate',restore);
}
