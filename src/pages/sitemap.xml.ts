import type {APIRoute} from 'astro';
import {site,locales,href} from '../data/site';
import {projects,liveSectors} from '../data/projects';
import {destinations} from '../data/editorial';
export const GET:APIRoute=()=>{const paths=['','work','atlas','collective','destinations','sectors','contact','bespoke','credits','privacy',...projects.map(p=>'projects/'+p.id),...liveSectors.map(s=>'sectors/'+s.id),...destinations.map(d=>'destinations/'+d.id)];return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'+locales.flatMap(lang=>paths.map(path=>`<url><loc>${site.url}${href(lang,path)}</loc>${locales.map(l=>`<xhtml:link rel="alternate" hreflang="${l}" href="${site.url}${href(l,path)}"/>`).join('')}</url>`)).join('')+'</urlset>',{headers:{'Content-Type':'application/xml'}});};
