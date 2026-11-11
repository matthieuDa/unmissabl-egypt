import {rivieraProjects} from './riviera-projects';
import {siroProject} from './siro-project';
import inventoryA from '../../docs/research/media-inventory-a.json';
import inventoryB from '../../docs/research/media-inventory-b.json';
import localMedia from './local-media.json';
import previews from './previews.json';
import catalogueProjects from './catalogue-projects.json';
import {productionCredits} from './production-credits';
import {projectCopy} from './project-copy';
import {talents,sectors,type Localized} from './editorial';
export type Project={id:string;title:string;client:string;creatorIds:string[];sourceUrl:string;videoUrl?:string;embedUrl?:string;poster:string;sectors:string[];format:'film'|'social'|'photo';location?:{label:Localized;country:Localized;lat:number;lon:number};credit:Localized;description:Localized;production:string;gallery:string[];personal?:boolean;portfolioOnly?:boolean;socialUrl?:string;preview?:string;};
type Inventory={id:string;title:string;creatorId:string;client?:string|null;sourceUrl:string;videoUrl?:string;embedUrl?:string;posterUrl?:string;sectors:string[];role?:string;format:string;status:string;location?:{label:string;country:string;lat:number;lon:number};notes?:string;};
const local=localMedia as Record<string,string>;
const locationNames:Record<string,string>={'Îles Féroé':'Faroe Islands','Italie':'Italy','Madère':'Madeira','Tanzanie':'Tanzania','Émirats arabes unis':'United Arab Emirates'};
const curated=['tom-puma','tom-levis','tom-radisson','tom-onefinestay','tom-amex','tom-charentestourism','tom-volkswagenxlescoflocs','tom-eastjava','tom-redseapadi','robin-dubai','robin-jetex','robin-qatar-doha','robin-etihad','robin-dji-lofoten','cj-mazda','cj-mongolia','rayan-socotra','chuck-dumont-royalmount-magil-tisseur'];
const chosen=(r:Inventory)=>r.sectors.length>0 && !!local[r.id] && (curated.includes(r.id) || r.id.startsWith('samuel-kwan-') || /^duarte-creatum-(columbia-1|royal-rides-1|ferrari)$/.test(r.id) || (r.id.startsWith('zaid-')&&r.sectors.includes('jewellery')) || r.id==='bahri-najm-socotra-hero');
const inventory=[...inventoryA,...inventoryB] as Inventory[];
export const projects:Project[]=[{
 id:'elewana-collection',title:'Elewana Collection',client:'Elewana Collection',creatorIds:['chuck-dumont','alexandre-buisson'],sourceUrl:'https://dumontfilms.ca/projects/elewana-collection',embedUrl:'https://www.youtube-nocookie.com/embed/PPlPtDIuKHs',poster:'/media/elewana-suite.webp',sectors:['hospitality','travel'],format:'film',location:{label:{fr:'Tanzanie',en:'Tanzania'},country:{fr:'Tanzanie',en:'Tanzania'},lat:-6.15,lon:39.2},production:'Dumont Films',credit:{fr:'Réalisation & montage : Benjy. Production : Chuck Dumont, Alexandre Buisson, Benjy et Jules Rapp. FPV : Chuck Dumont.',en:'Director & editor: Benjy. Production: Chuck Dumont, Alexandre Buisson, Benjy and Jules Rapp. FPV: Chuck Dumont.'},description:{fr:'De la savane tanzanienne aux rivages de Zanzibar, une collection de lieux à vivre. Le film et les photographies de cette production donnent à voir l’espace, la lumière et le rythme d’un séjour.',en:'From the Tanzanian savanna to the shores of Zanzibar, a collection of places to experience. The film and photography reveal the space, light and rhythm of a stay.'},gallery:['/media/elewana-pool.webp','/media/elewana-panorama.webp','/media/elewana-elephant.webp']
},...inventory.filter(chosen).map((r):Project=>{
 const creator=talents.find(t=>t.id===r.creatorId)!;
 const sanctuary=r.creatorId==='samuel-kwan';const creatum=r.creatorId==='duarte';
 const personal=r.id==='duarte-creatum-ferrari';
 const portfolioOnly=personal||!r.client||r.client==='Non renseigné';
 const production=sanctuary?'Sanctuary Creative':creatum?'Creatum Media':'';
 const credit=sanctuary?{fr:'Publié par Sanctuary Creative, la structure de Samuel Kwan. Le rôle individuel de Samuel sur ce film n’est pas détaillé dans la source.',en:'Published by Sanctuary Creative, Samuel Kwan’s studio. His individual role on this film is not specified in the source.'}:creatum?{fr:'Duarte — Creatum Media. Les crédits de réalisation et de production sont détaillés dans le portfolio d’origine.',en:'Duarte — Creatum Media. See the original portfolio for directing and production credits.'}:{fr:`Référence publiée au portfolio de ${creator?.name}. Crédits complets dans la source d’origine.`,en:`Work published in ${creator?.name}’s portfolio. Full credits in the original source.`};
 // The public Wix players expose a 1080 variant. Keep its native dimensions;
 // a portrait source labelled 1080 is not treated as a 1920px landscape film.
 const video=r.status==='verified' && r.videoUrl && !r.videoUrl.includes('dropbox')?r.videoUrl.replace('/720p/mp4/','/1080p/mp4/'):undefined;
 return {id:r.id,title:r.title,client:personal?'Ferrari — Madeira':portfolioOnly?r.title:r.client!,creatorIds:[r.creatorId],sourceUrl:r.sourceUrl,videoUrl:video,embedUrl:r.embedUrl?.replace('www.youtube.com/embed','www.youtube-nocookie.com/embed'),poster:local[r.id],sectors:r.sectors,format:r.format.includes('vertical')?'social':r.format.includes('photo')?'photo':'film',location:r.location?{label:{fr:r.location.label,en:locationNames[r.location.label]||r.location.label},country:{fr:r.location.country,en:locationNames[r.location.country]||r.location.country},lat:r.location.lat,lon:r.location.lon}:undefined,credit,production,gallery:[],personal,portfolioOnly,description:personal?{fr:'Un film personnel autour d’une Ferrari dans les paysages de Madère. Une expression du regard de Creatum, sans commande de Ferrari.',en:'A personal film featuring a Ferrari in Madeira’s landscapes. A showcase of Creatum’s perspective, not a Ferrari commission.'}:{fr:`${r.title}. Une référence du collectif pour découvrir une approche du film, de l’image et de la marque.`,en:`${r.title}. Explore this portfolio reference through its film, imagery and approach to the brand.`}};
}),...(catalogueProjects as Project[]),...rivieraProjects,siroProject];
// Editorial overrides retain the original portfolio attribution and documented place.
const places:Record<string,[string,string,number,number]>={'robin-dubai':['Dubaï','Dubai',25.2,55.27],'tom-radisson':['Bangkok','Bangkok',13.75,100.5],'robin-qatar-doha':['Doha','Doha',25.29,51.53],'robin-dji-lofoten':['Lofoten','Lofoten',68.2,13.6]};
for(const p of projects){const loc=places[p.id];if(loc)p.location={label:{fr:loc[0],en:loc[1]},country:{fr:loc[0],en:loc[1]},lat:loc[2],lon:loc[3]};}
for(const p of projects){const copy=projectCopy[p.id];if(copy)Object.assign(p,copy);}
for(const p of projects){
 const preview=(previews as Record<string,string>)[p.id];if(preview)p.preview=preview;
 if(productionCredits[p.id]&&p.id!=='elewana-collection')p.production=productionCredits[p.id];
 if(p.id==='tom-radisson')p.socialUrl='https://www.instagram.com/p/DTz-I8pE9xC/';
 if(p.id.startsWith('zaid-'))p.credit={fr:'Photographie : Zaid Wazzan. Série publiée dans son portfolio Behance.',en:'Photography: Zaid Wazzan. Series published in his Behance portfolio.'};
 if(p.id==='chuck-dumont-royalmount-magil-tisseur'){p.production='Dumont Films';p.credit={fr:'Client : Magil Tisseur. Production et drone : Chuck Dumont.',en:'Client: Magil Tisseur. Production and drone: Chuck Dumont.'};p.description={fr:'Royalmount, à Montréal : une production pour Magil Tisseur, dont Chuck Dumont signe la production et les vues aériennes.',en:'Royalmount in Montréal: a production for Magil Tisseur, with production and aerial cinematography by Chuck Dumont.'};}
 if(p.id==='robin-dji-lofoten'){p.creatorIds=['robin-chills','chuck-dumont'];p.credit={fr:'Réalisation et montage : Benjy. Production : Benjy, Chuck Dumont, Robin Diederichs, Xavier Barriault. FPV : Chuck Dumont. Film DJI Air 3, publié par Dumont Films et Robin Chills.',en:'Director and editor: Benjy. Production: Benjy, Chuck Dumont, Robin Diederichs, Xavier Barriault. FPV: Chuck Dumont. DJI Air 3 film published by Dumont Films and Robin Chills.'};}
 if(p.id==='bahri-najm-socotra-hero'){p.credit={fr:'Film Socotra : Bahri Najm / Last Meridian Films. Film de portfolio, aucune commande de marque établie.',en:'Socotra film: Bahri Najm / Last Meridian Films. Portfolio film; no brand commission established.'};p.description={fr:'L’île de Socotra, au large du Yémen, filmée par Bahri Najm. Un regard sur ses reliefs, ses arbres et ses paysages singuliers.',en:'Socotra, off the coast of Yemen, filmed by Bahri Najm. A perspective on the island’s remarkable terrain, trees and landscapes.'};}
}
const displayTitles:Record<string,string>={'tom-puma':'Puma — Teveris','tom-levis':'Levi’s × Zalando','tom-eastjava':'East Java','tom-charentestourism':'Les Charentes, nos pépites','rayan-socotra':'Socotra — A Place Untouched','bahri-najm-socotra-hero':'Socotra','duarte-creatum-columbia-1':'Columbia Sportswear','duarte-creatum-royal-rides-1':'Royal Rides','duarte-creatum-ferrari':'Ferrari — Madeira'};
for(const p of projects){if(displayTitles[p.id])p.title=displayTitles[p.id];if(p.portfolioOnly&&p.id!=='duarte-creatum-ferrari')p.client=p.title;}
// Public editorial credits focus on people. Original company attribution is retained in research sources.
const agencyNames=/Sanctuary Creatives?|Creatum(?: Media)?|Du Creates|Dumont Films|Last Meridian Films|Alexon|Social Cut(?: \/ Taiga)?|Exordi|Les Coflocs|Beautiful Destinations/gi;
for(const p of projects){
 for(const lang of ['fr','en'] as const){
  if(agencyNames.test(p.credit[lang])){
   agencyNames.lastIndex=0;
   if(p.id==='robin-dji-lofoten')p.credit[lang]=p.credit[lang].replace(/ Film DJI Air 3, publié par.*| DJI Air 3 film published by.*/, '');
   else if(p.id==='bahri-najm-socotra-hero')p.credit[lang]=lang==='fr'?'Film : Bahri Najm. Film de portfolio, aucune commande de marque établie.':'Film: Bahri Najm. Portfolio film; no brand commission established.';
   else p.credit[lang]=(lang==='fr'?'Référence du portfolio de ':'Portfolio reference from ')+p.creatorIds.map(id=>talents.find(t=>t.id===id)?.name).filter(Boolean).join(' & ')+(p.creatorIds.includes('samuel-kwan')?(lang==='fr'?'. Rôle individuel non détaillé dans la source.':'. Individual role is not specified in the source.'):'.');
  }
  agencyNames.lastIndex=0;
  p.description[lang]=p.description[lang].replace(/ avec Social Cut \/ Taiga| with Social Cut \/ Taiga| produit avec Exordi| produced with Exordi| menée avec Les Coflocs| with Les Coflocs/g,'').replace(/Une expression du regard de Creatum/,'Une expression du regard de Duarte').replace(/A showcase of Creatum’s perspective/, 'A showcase of Duarte’s perspective').replace(/accompagne Les Coflocs/, 'parcourt les routes').replace(/joins Les Coflocs/, 'travels');
  agencyNames.lastIndex=0;
 }
 p.title=p.title.replace(/ × Les Coflocs| x Les Coflocs/gi,'');
 p.client=p.client.replace(/ × Les Coflocs| x Les Coflocs/gi,'');
 for(const lang of ['fr','en'] as const)p.description[lang]=p.description[lang].replace(/ avec Les Coflocs/g,'').replace(/Creatum Media/g,'Duarte');
}
export const projectCreditLine=(p:Project,lang:'fr'|'en')=>p.id==='elewana-collection'?(lang==='fr'?'Production : ':'Production: ')+talentNames(p):talentNames(p);
export const liveSectors=sectors.filter(s=>projects.filter(p=>p.sectors.includes(s.id)&&!p.portfolioOnly).length>=2);
export const projectById=(id:string)=>projects.find(p=>p.id===id);
export const talentNames=(p:Project)=>p.creatorIds.map(id=>talents.find(t=>t.id===id)?.name).filter(Boolean).join(' & ');
