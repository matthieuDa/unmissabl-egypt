import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import {registerHooks} from 'node:module';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const distDir = path.join(root, 'dist');
const failures: string[] = [];
let checks = 0;

function check(label: string, run: () => void): void {
  checks++;
  try { run(); } catch (error) {
    failures.push(`${label}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Astro resolves extensionless TS and JSON imports. Mirror only those local
// resolutions in memory, so the validator imports the actual computed projects
// without rewriting source files or needing JSON import attributes.
const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('.') && context.parentURL?.startsWith('file:')) {
      const candidate = fileURLToPath(new URL(specifier, context.parentURL));
      if (!path.extname(candidate) && existsSync(candidate + '.ts')) {
        return nextResolve(pathToFileURL(candidate + '.ts').href, context);
      }
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.startsWith('file:')) {
      const file = fileURLToPath(url);
      if (file.startsWith(root + path.sep) && file.endsWith('.json')) {
        return {
          format: 'module',
          source: `export default ${JSON.stringify(JSON.parse(readFileSync(file, 'utf8')))};`,
          shortCircuit: true,
        };
      }
    }
    return nextLoad(url, context);
  },
});

const [{projects, liveSectors}, {talents, sectors, destinations, metrics}, config] = await Promise.all([
  import('../src/data/projects.ts'),
  import('../src/data/editorial.ts'),
  import('../src/data/site.ts'),
]);
const {destinationCampaigns} = await import('../src/data/destination-campaigns.ts');
const {reportedReach} = await import('../src/data/reported-reach.ts');
hooks.deregister();
const {locales, site, navigation, languageNames} = config;
const siteOrigin = new URL(site.url).origin;

function text(value: unknown, label: string): asserts value is string {
  assert.ok(typeof value === 'string', `${label} must be text`);
  assert.ok(value.trim().length, `${label} is empty`);
}

function localized(value: unknown, label: string): void {
  assert.ok(value && typeof value === 'object' && !Array.isArray(value), `${label} must be localized`);
  const record = value as Record<string, unknown>;
  for (const locale of locales) {
    const translated = record[locale];
    if (Array.isArray(translated)) {
      assert.ok(translated.length, `${label}.${locale} is empty`);
      translated.forEach((item, index) => text(item, `${label}.${locale}[${index}]`));
    } else text(translated, `${label}.${locale}`);
  }
}

function sameShape(a: unknown, b: unknown, label: string): void {
  if (typeof a === 'string') { text(a, label); text(b, label); return; }
  assert.ok(a && b && typeof a === 'object' && typeof b === 'object', `${label}: translation type mismatch`);
  assert.equal(Array.isArray(a), Array.isArray(b), `${label}: translation type mismatch`);
  const left = a as Record<string, unknown>;
  const right = b as Record<string, unknown>;
  assert.deepEqual(Object.keys(left).sort(), Object.keys(right).sort(), `${label}: missing translation keys`);
  for (const key of Object.keys(left)) sameShape(left[key], right[key], `${label}.${key}`);
}

function uniqueIds(items: Array<{id: string}>, label: string): void {
  const ids = items.map(item => item.id);
  assert.equal(new Set(ids).size, ids.length, `${label}: duplicate IDs`);
  ids.forEach(id => assert.match(id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${label}: invalid ID ${id}`));
}

function https(value: unknown, label: string): void {
  text(value, label);
  assert.equal(new URL(value).protocol, 'https:', `${label} must use HTTPS`);
}

function coordinates(value: {lat: number; lon: number}, label: string): void {
  assert.ok(Number.isFinite(value.lat) && Math.abs(value.lat) <= 90, `${label}: invalid latitude`);
  assert.ok(Number.isFinite(value.lon) && Math.abs(value.lon) <= 180, `${label}: invalid longitude`);
}

function rootedFile(directory: string, pathname: string): string {
  const decoded = decodeURIComponent(pathname);
  assert.ok(!decoded.includes('\0') && !decoded.includes('\\'), 'Invalid local pathname');
  const file = path.resolve(directory, '.' + (decoded.startsWith('/') ? decoded : '/' + decoded));
  assert.ok(file === directory || file.startsWith(directory + path.sep), 'Path escapes output directory');
  return file;
}

function localAsset(value: string, label: string): void {
  assert.ok(value.startsWith('/') && !value.startsWith('//'), `${label} must be a local absolute path`);
  const file = rootedFile(publicDir, new URL(value, siteOrigin).pathname);
  assert.ok(existsSync(file) && statSync(file).isFile(), `${label}: missing ${path.relative(root, file)}`);
}

check('Collections', () => {
  for (const [label, list] of Object.entries({projects, talents, sectors, destinations, metrics, liveSectors})) uniqueIds(list, label);
  assert.ok(projects.length, 'No projects');
  assert.ok(locales.includes('fr') && locales.includes('en'), 'FR and EN are required');
  assert.equal(new Set(locales).size, locales.length, 'Duplicate locales');
});
check('Navigation translations', () => {
  const first = locales[0];
  for (const locale of locales) {
    text(languageNames[locale], `languageNames.${locale}`);
    sameShape(navigation[first], navigation[locale], `navigation.${locale}`);
  }
});

const reels = JSON.parse(readFileSync(path.join(root, 'src/data/reels.json'), 'utf8')) as Array<{id:string;title:unknown;description:unknown;src:string;mobileSrc:string;poster:string;duration:number;credits:Array<{name:string;sourceUrl:string}>}>;
check('Intro alternatives', () => { uniqueIds(reels, 'reels'); assert.equal(reels.length, 3); });
for(const reel of reels) check(`Intro ${reel.id}`, () => {
 localized(reel.title, 'title'); localized(reel.description, 'description');
 for(const field of ['src','mobileSrc','poster'] as const) localAsset(reel[field], field);
 assert.ok(reel.duration > 0 && reel.duration <= 30, 'Unexpected intro duration');
 assert.ok(reel.credits.length, 'Missing intro credits');
 reel.credits.forEach(credit => { text(credit.name, 'credit'); https(credit.sourceUrl, 'sourceUrl'); });
});
check('UI translations', () => { sameShape(config.uiMessages.fr, config.uiMessages.en, 'uiMessages'); });

const talentIds = new Set(talents.map(talent => talent.id));
const sectorIds = new Set(sectors.map(sector => sector.id));
const brands=JSON.parse(readFileSync(path.join(root,'src/data/brands.json'),'utf8')) as Array<{id:string;name:string;logo?:string;sourceUrl:string;projectIds:string[];creatorIds:string[];sectorIds:string[];evidence:string;entityType:string}>;
check('Brand references',()=>uniqueIds(brands,'brands'));
for(const brand of brands)check(`Brand ${brand.id}`,()=>{
 text(brand.name,'name');https(brand.sourceUrl,'source');
 if(brand.logo)localAsset(brand.logo,'logo');
 assert.ok(['project','portfolio'].includes(brand.evidence),'Unknown reference basis');
 assert.ok(brand.creatorIds.length,'No credited talent');
 brand.creatorIds.forEach(id=>assert.ok(talentIds.has(id),`Unknown talent ${id}`));
 brand.sectorIds.forEach(id=>assert.ok(sectorIds.has(id),`Unknown sector ${id}`));
 brand.projectIds.forEach(id=>assert.ok(projects.some(p=>p.id===id),`Unknown project ${id}`));
 if(brand.evidence==='project')assert.ok(brand.projectIds.length,'Project evidence without a project');
});
const audience=JSON.parse(readFileSync(path.join(root,'src/data/audience.json'),'utf8')) as {observedDate:string;accounts:Array<{talentId:string;url:string;followers:number;source:string}>;sumOfDisplayedCounts:number};
check('Audience scope',()=>{
 assert.match(audience.observedDate,/^\d{4}-\d{2}-\d{2}$/);
 assert.equal(new Set(audience.accounts.map(a=>a.talentId)).size,audience.accounts.length,'Multiple accounts counted for one talent');
 assert.equal(audience.accounts.reduce((sum,a)=>sum+a.followers,0),audience.sumOfDisplayedCounts);
 audience.accounts.forEach(a=>{assert.ok(talentIds.has(a.talentId));https(a.url,'profile');text(a.source,'source');assert.ok(Number.isFinite(a.followers)&&a.followers>=0);});
});
for (const talent of talents) check(`Talent ${talent.id}`, () => {
  text(talent.name, 'name');
  localized(talent.role, 'role'); localized(talent.bio, 'bio');
  if (talent.base) localized(talent.base, 'base');
  if (talent.website) https(talent.website, 'website');
  if (talent.instagram) https(talent.instagram, 'instagram');
});
for (const sector of sectors) check(`Sector ${sector.id}`, () => {
  for (const field of ['name', 'headline', 'description', 'needs', 'formats'] as const) localized(sector[field], field);
});
for (const destination of destinations) check(`Destination ${destination.id}`, () => {
  for (const field of ['name', 'period', 'status', 'description'] as const) localized(destination[field], field);
  coordinates(destination, destination.id);
  assert.ok(talentIds.has(destination.producer), 'Unknown producer');
  if (destination.lead) assert.ok(talentIds.has(destination.lead), 'Unknown lead');
});
for (const project of projects) check(`Project ${project.id}`, () => {
  for (const field of ['title', 'client'] as const) text(project[field], field);
  assert.ok(project.creatorIds.length, 'Missing creator');
  assert.equal(new Set(project.creatorIds).size, project.creatorIds.length, 'Duplicate creator credit');
  project.creatorIds.forEach(id => assert.ok(talentIds.has(id), `Unknown creator ${id}`));
  assert.ok(project.sectors.length, 'No sector');
  assert.equal(new Set(project.sectors).size, project.sectors.length, 'Duplicate sector');
  project.sectors.forEach(id => assert.ok(sectorIds.has(id), `Unknown sector ${id}`));
  localized(project.description, 'description'); localized(project.credit, 'credit');
  if (project.location) {
    coordinates(project.location, project.id);
    localized(project.location.label, 'location.label'); localized(project.location.country, 'location.country');
  }
  https(project.sourceUrl, 'sourceUrl');
  localAsset(project.poster, 'poster');
  project.gallery.forEach((asset, index) => localAsset(asset, `gallery[${index}]`));
  for (const field of ['videoUrl', 'embedUrl', 'socialUrl', 'preview'] as const) {
    const value = project[field];
    if (value) value.startsWith('/') ? localAsset(value, field) : https(value, field);
  }
});
for (const sector of liveSectors) check(`Live sector ${sector.id}`, () => {
  assert.ok(sectorIds.has(sector.id), 'Unknown sector');
  const ids = new Set(projects.filter(project => !project.personal && project.sectors.includes(sector.id)).map(project => project.id));
  assert.ok(ids.size >= 2, `Needs at least two distinct non-personal projects; found ${ids.size}`);
});
for (const metric of metrics) check(`Metric ${metric.id}`, () => {
  assert.ok(talentIds.has(metric.talentId), 'Unknown talent');
  assert.ok(Number.isFinite(metric.value) && metric.value >= 0, 'Invalid metric value');
  assert.equal(typeof metric.estimate, 'boolean', 'Estimate status must be explicit');
  text(metric.source, 'source'); https(metric.sourceURL, 'sourceURL');
  assert.match(metric.date, /^\d{4}-\d{2}-\d{2}$/, 'Date must use YYYY-MM-DD');
  assert.equal(new Date(metric.date).toISOString().slice(0, 10), metric.date, 'Invalid calendar date');
  assert.ok(metric.date <= new Date().toISOString().slice(0, 10), 'Observation date is in the future');
  for (const field of ['displayValue', 'label', 'method', 'limitation'] as const) localized(metric[field], field);
});

type Tag = {name: string; attrs: Record<string, string>};
type Page = {file: string; url: URL; tags: Tag[]; anchors: Set<string>};
function decodeEntities(value: string): string {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (whole, entity: string) => {
    const named: Record<string, string> = {amp: '&', quot: '"', apos: "'", lt: '<', gt: '>'};
    if (entity.startsWith('#')) {
      const code = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : whole;
    }
    return named[entity.toLowerCase()] || whole;
  });
}
function tagsOf(html: string): Tag[] {
  // Exclude text inside raw-text elements, while retaining script src attributes.
  const markup = html.replace(/<!--[\s\S]*?-->/g, '').replace(/(<(?:script|style|textarea|title)\b[^>]*>)[\s\S]*?(<\/(?:script|style|textarea|title)\s*>)/gi, '$1$2');
  const tags: Tag[] = [];
  for (const match of markup.matchAll(/<([a-z][\w:-]*)\b((?:"[^"]*"|'[^']*'|[^'">])*)>/gi)) {
    const attrs: Record<string, string> = {};
    for (const attr of match[2].matchAll(/([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
      attrs[attr[1].toLowerCase()] = decodeEntities(attr[2] ?? attr[3] ?? attr[4]);
    }
    tags.push({name: match[1].toLowerCase(), attrs});
  }
  return tags;
}
function walk(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
function pageURL(file: string): URL {
  let relative = path.relative(distDir, file).split(path.sep).join('/');
  if (relative === 'index.html') relative = '';
  else if (relative.endsWith('/index.html')) relative = relative.slice(0, -'index.html'.length);
  return new URL('/' + relative.split('/').map(encodeURIComponent).join('/'), siteOrigin);
}
const files = walk(distDir);
const pages: Page[] = files.filter(file => file.endsWith('.html')).map(file => {
  const tags = tagsOf(readFileSync(file, 'utf8'));
  const anchors = new Set<string>();
  for (const tag of tags) {
    if (tag.attrs.id) anchors.add(tag.attrs.id);
    if (tag.name === 'a' && tag.attrs.name) anchors.add(tag.attrs.name);
  }
  return {file, url: pageURL(file), tags, anchors};
});
const pagesByFile = new Map(pages.map(page => [page.file, page]));
const svgAnchors = new Map<string, Set<string>>();
const checkedLinks = new Set<string>();

function targetFile(pathname: string): string | undefined {
  const file = rootedFile(distDir, pathname);
  if (existsSync(file) && statSync(file).isFile()) return file;
  const index = path.join(file, 'index.html');
  if (existsSync(index) && statSync(index).isFile()) return index;
  // Both /page/ and explicit .html files are legitimate static output styles.
  if (!path.extname(file) && existsSync(file + '.html')) return file + '.html';
}
function validateLink(raw: string | undefined, base: URL, label: string): void {
  if (raw === undefined) { check(label, () => assert.fail('Missing URL value')); return; }
  const value = raw.trim();
  if (!value || /^(?:data|blob|mailto|tel|javascript):/i.test(value)) return;
  check(label, () => {
    const url = new URL(value, base);
    if (!['http:', 'https:'].includes(url.protocol) || url.origin !== siteOrigin) return;
    if (url.pathname === '/api/contact' && label.endsWith('form[action]')) {
      assert.ok(existsSync(path.join(root, 'netlify/functions/contact.mjs')), 'Missing contact function');
      return;
    }
    // Search params do not name files. URL resolution handles /, ../ and #.
    const file = targetFile(url.pathname);
    assert.ok(file, `Missing local target ${url.pathname}`);
    const key = file + url.hash;
    if (checkedLinks.has(key)) return;
    checkedLinks.add(key);
    const hash = decodeURIComponent(url.hash.slice(1)).split(':~:text=')[0];
    if (!hash || (!file.endsWith('.html') && !file.endsWith('.svg'))) return;
    let anchors = pagesByFile.get(file)?.anchors;
    if (file.endsWith('.svg')) {
      if (!svgAnchors.has(file)) svgAnchors.set(file, new Set(tagsOf(readFileSync(file, 'utf8')).flatMap(tag => tag.attrs.id ? [tag.attrs.id] : [])));
      anchors = svgAnchors.get(file);
    }
    // HTML permits #top to address the top of a document without an id.
    assert.ok(anchors?.has(hash) || (file.endsWith('.html') && hash.toLowerCase() === 'top'), `Missing anchor #${hash} in ${path.relative(distDir, file)}`);
  });
}

check('Updated production calendar',()=>assert.deepEqual(destinations.map(d=>d.id),['egypt','france']));
for(const [id,campaign] of Object.entries(destinationCampaigns))check(`${id} campaign references`,()=>{
 assert.ok(existsSync(path.join(publicDir,campaign.image)),'Missing campaign image');
 for(const id of campaign.projects)assert.ok(projects.some(p=>p.id===id),`Missing reference ${id}`);
});
check('Reported reach provenance',()=>{assert.equal(reportedReach.value,800_000_000);assert.equal(reportedReach.reportedBy,'Unmissabl');assert.equal(reportedReach.independentlyVerified,false);});
for(const locale of locales)check(`${locale} homepage refinement`,()=>{
 const html=readFileSync(path.join(distDir,locale,'index.html'),'utf8');
 const tags=tagsOf(html);
 assert.equal(tags.filter(t=>t.name==='a'&&t.attrs['data-brand']).length,30,'Expected thirty brand marks');
 assert.equal(tags.filter(t=>'data-hero-pause' in t.attrs).length,0,'Hero should have no playback toggle');
 const selected=html.match(/<section[^>]*home-selected[\s\S]*?<\/section>/)?.[0]||'';
 assert.equal(selected,'','The redundant homepage film selection should be removed');
 assert.ok(!tags.some(t=>t.name==='a'&&/^https?:/.test(t.attrs.href||'')&&!/wa\.me|unmissabl/.test(t.attrs.href)),'External portfolio link on homepage');
});

check('Built site', () => assert.ok(pages.length && existsSync(path.join(distDir, 'index.html')), 'Run npm run build before validation'));
for (const page of pages) {
  const label = path.relative(distDir, page.file);
  const baseTag = page.tags.find(tag => tag.name === 'base' && tag.attrs.href);
  const base = baseTag ? new URL(baseTag.attrs.href, page.url) : page.url;
  for (const tag of page.tags) {
    for (const attribute of ['href', 'src', 'poster', 'action', 'xlink:href']) {
      if (tag.attrs[attribute]) validateLink(tag.attrs[attribute], base, `${label} ${tag.name}[${attribute}]`);
    }
    const srcset = tag.attrs.srcset;
    if (srcset && !srcset.includes('data:')) {
      for (const candidate of srcset.split(',')) validateLink(candidate.trim().split(/\s+/)[0], base, `${label} ${tag.name}[srcset]`);
    }
    if (tag.name === 'meta' && /^(og:image|twitter:image)$/.test(tag.attrs.property || tag.attrs.name || '')) {
      validateLink(tag.attrs.content, base, `${label} social image`);
    }
  }
  const locale = path.relative(distDir, page.file).split(path.sep)[0];
  const sectorRoute=page.url.pathname.match(/^\/(fr|en)\/sectors\/([^/]+)\/$/);
  if(sectorRoute)check(`${label} sector brand evidence`,()=>{
    const expected=brands.filter(brand=>brand.entityType!=='agency-or-production'&&brand.sectorIds.includes(sectorRoute[2])).map(brand=>brand.id).sort();
    const rendered=page.tags.filter(tag=>tag.name==='a'&&tag.attrs['data-brand']).map(tag=>tag.attrs['data-brand']).sort();
    assert.deepEqual(rendered,expected,'Sector brand list differs from documented references');
  });
  if ((locales as readonly string[]).includes(locale)) check(`${label} document language`, () => {
    assert.equal(page.tags.find(tag => tag.name === 'html')?.attrs.lang, locale, 'Wrong or missing html lang');
    assert.ok(page.tags.some(tag => tag.name === 'title'), 'Missing page title');
    assert.ok(page.tags.some(tag => tag.name === 'meta' && tag.attrs.name === 'description' && tag.attrs.content?.trim()), 'Missing description');
    for (const other of locales) {
      const alternate = page.tags.find(tag => tag.name === 'link' && tag.attrs.rel === 'alternate' && tag.attrs.hreflang === other);
      assert.ok(alternate?.attrs.href, `Missing ${other} alternate`);
      const expected = '/' + other + page.url.pathname.slice(locale.length + 1);
      assert.equal(new URL(alternate.attrs.href, base).pathname, expected, `Wrong ${other} counterpart link`);
    }
  });
}
for (const file of files.filter(file => file.endsWith('.css'))) {
  const css = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  for (const match of css.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]*))\s*\)/g)) {
    validateLink(match[1] ?? match[2] ?? match[3], pageURL(file), `${path.relative(distDir, file)} url()`);
  }
}

const pageCounts: Record<string, number> = {};
const localizedPaths = new Map<string, Set<string>>();
for (const locale of locales) {
  const prefix = locale + path.sep;
  const relative = pages.map(page => path.relative(distDir, page.file)).filter(file => file.startsWith(prefix)).map(file => file.slice(prefix.length));
  pageCounts[locale] = relative.length;
  localizedPaths.set(locale, new Set(relative));
  check(`${locale} generated pages`, () => assert.ok(relative.length, `No ${locale} pages; rebuild the site`));
  for (const [kind, list] of Object.entries({projects, sectors: liveSectors, destinations})) {
    for (const entry of list) check(`${locale}/${kind}/${entry.id} route`, () => {
      assert.ok(targetFile(`/${locale}/${kind}/${entry.id}/`), 'Content record has no generated route');
    });
  }
}
for (const locale of locales) check(`${locale} counterparts`, () => {
  assert.deepEqual([...localizedPaths.get(locale)!].sort(), [...localizedPaths.get(locales[0])!].sort(), 'Localized routes differ');
});

console.log(`Content: ${projects.length} projects, ${talents.length} talents, ${liveSectors.length} live sectors, ${metrics.length} sourced metrics.`);
console.log(`Evidence: ${brands.length} brands, ${brands.filter(b=>b.logo).length} logos, ${audience.accounts.length} Instagram accounts.`);
console.log(`Build: ${pages.length} HTML pages; ${Object.entries(pageCounts).map(([locale, count]) => `${locale.toUpperCase()} ${count}`).join(', ')}; ${checkedLinks.size} distinct local file/anchor targets.`);
if (failures.length) {
  console.error(`Validation failed: ${failures.length} of ${checks} checks.`);
  for (const failure of failures.slice(0, 60)) console.error(`- ${failure}`);
  if (failures.length > 60) console.error(`- ${failures.length - 60} additional failures omitted.`);
  process.exitCode = 1;
} else console.log(`Validation passed: ${checks} checks.`);
