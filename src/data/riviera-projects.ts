import type {Project} from './projects';

// References selected for the Côte d’Azur prospecting page retain their actual shoot location.
// Original production attribution and source media are recorded in docs/research/haras-prepinson-2026-11-11.json.
export const rivieraProjects:Project[]=[{
 id:'haras-de-prepinson',
 title:'Haras de Prépinson',
 client:'Maison de Prépinson',
 creatorIds:['alexandre-buisson'],
 sourceUrl:'https://www.alexonmedia.com/productions/harasdeprepinson',
 embedUrl:'https://www.youtube-nocookie.com/embed/9Aia_hPqXVU',
 preview:'/media/previews/haras-prepinson-1280.mp4',
 poster:'/media/haras-prepinson.webp',
 sectors:['equestrian'],
 format:'film',
 location:{label:{fr:'Ortho, Belgique',en:'Ortho, Belgium'},country:{fr:'Belgique',en:'Belgium'},lat:50.1284709,lon:5.6128915},
 production:'',
 credit:{
  fr:'Réalisation, image, montage et drone : Alexandre Buisson. FPV : Alexandre Buisson et Tim Ohler. Avec Eva Schiller. Images de la galerie : photogrammes du film.',
  en:'Direction, cinematography, editing and drone: Alexandre Buisson. FPV: Alexandre Buisson and Tim Ohler. Featuring Eva Schiller. Gallery images: stills from the film.'
 },
 description:{
  fr:'À Ortho, en Belgique, le Haras de Prépinson se raconte à travers le travail des chevaux, les gestes de soin et la vie du domaine. Un film d’Alexandre Buisson qui met en valeur les installations autant que celles et ceux qui les font vivre.',
  en:'In Ortho, Belgium, Haras de Prépinson is revealed through the horses’ training, daily care and life on the estate. A film by Alexandre Buisson that gives equal attention to the facilities and the people behind them.'
 },
 gallery:['/media/haras-prepinson-detail.webp','/media/haras-prepinson-domain.webp','/media/haras-prepinson-arena.webp']
}];
