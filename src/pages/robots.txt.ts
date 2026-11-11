import type {APIRoute} from 'astro';
import {site} from '../data/site';
export const GET:APIRoute=()=>new Response(`User-agent: *\n${site.demo?'Disallow: /':'Allow: /'}\nSitemap: ${site.url}/sitemap.xml\n`,{headers:{'Content-Type':'text/plain'}});
