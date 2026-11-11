import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { commercialSectors } from '../src/data/commercial.ts';

// Exercise the generated journeys, not just the source records: a valid record
// alone does not guarantee a reachable page, translated route or working CTA.
const dist = new URL('../dist/', import.meta.url);
const locales = ['fr', 'en'];
const expectedSectors = ['hotels', 'golf', 'resorts', 'automotive', 'equestrian'];
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const links = html => [...html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)].map(match => decode(match[1]));
const pageFile = route => new URL(route.replace(/^\//, '') + 'index.html', dist);
const readPage = route => {
  const file = pageFile(route);
  assert.ok(existsSync(file), `Missing generated page ${route}; run npm run build before npm test`);
  return readFileSync(file, 'utf8');
};
const visibleText = html => decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');

test('each commercial journey has a reachable FR/EN page and switches to the same industry', () => {
  assert.deepEqual(commercialSectors.map(sector => sector.id).sort(), [...expectedSectors].sort());
  for (const lang of locales) {
    const directory = links(readPage(`/${lang}/solutions/`));
    for (const id of expectedSectors) {
      const route = `/${lang}/solutions/${id}/`;
      assert.ok(directory.includes(route), `${route} is missing from the industry directory`);
      const html = readPage(route);
      assert.match(html, new RegExp(`<html[^>]*lang="${lang}"`));
      assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${route} needs one page heading`);
      const alternate = `/${lang === 'fr' ? 'en' : 'fr'}/solutions/${id}/`;
      assert.ok(links(html).includes(alternate), `Language switch loses the industry on ${route}`);
      assert.ok(existsSync(pageFile(alternate)));
    }
  }
});

test('commercial contact links retain the sector and campaign context, including accented characters', () => {
  for (const lang of locales) for (const sector of commercialSectors) {
    const html = readPage(`/${lang}/solutions/${sector.id}/`);
    const contextual = links(html).map(href => new URL(href, 'https://unmissabl.test')).filter(url => url.pathname === `/${lang}/contact/` && url.searchParams.has('sector'));
    assert.ok(contextual.length >= 1, `No contextual CTA for ${lang}/${sector.id}`);
    for (const url of contextual) {
      assert.equal(url.searchParams.get('sector'), sector.name[lang]);
      assert.equal(url.searchParams.get('project'), sector.title[lang]);
      assert.ok(existsSync(pageFile(url.pathname)), 'Contact target must be generated');
    }
    const context = html.match(/<input\b[^>]*name="context"[^>]*value="([^"]*)"/);
    assert.equal(context && decode(context[1]), sector.name[lang], 'The embedded form must retain the commercial context too');
  }
});

test('commercial reference cards resolve to local credited project pages with available posters', () => {
  for (const lang of locales) for (const sector of commercialSectors) {
    const html = readPage(`/${lang}/solutions/${sector.id}/`);
    const projectLinks = [...new Set(links(html).filter(href => href.startsWith(`/${lang}/projects/`)))];
    assert.ok(projectLinks.length >= 2, `Insufficient documented references for ${lang}/${sector.id}`);
    for (const id of sector.referenceIds) assert.ok(projectLinks.includes(`/${lang}/projects/${id}/`), `Reference ${id} did not render`);
    for (const route of projectLinks) {
      const project = readPage(route);
      assert.match(project, /class="[^"]*credit-list/, `${route} must show credits`);
    }
    for (const [, source] of html.matchAll(/<img\b[^>]*src="(\/media\/[^"?#]+)"/g)) {
      assert.ok(existsSync(new URL(source.slice(1), dist)), `Missing poster ${source}`);
    }
  }
});

test('golf and equestrian prospects are not shown adjacent work as commissioned sector references', () => {
  for (const id of ['golf', 'equestrian']) {
    assert.match(visibleText(readPage(`/fr/solutions/${id}/`)), /ne sont pas présentées comme des réalisations pour un golf ou un haras/);
    assert.match(visibleText(readPage(`/en/solutions/${id}/`)), /not presented as golf or equestrian commissions/);
  }
});

test('the production calendar exposes only Egypt and Côte d’Azur, with the requested dates and past October window', () => {
  for (const lang of locales) {
    const html = readPage(`/${lang}/destinations/`);
    const trips = [...new Set(links(html).filter(href => new RegExp(`^/${lang}/destinations/[^/]+/$`).test(href)))];
    assert.deepEqual(trips.sort(), [`/${lang}/destinations/egypt/`, `/${lang}/destinations/france/`]);
    assert.doesNotMatch(visibleText(html), /Iceland|Islande/);
    assert.ok(!existsSync(pageFile(`/${lang}/destinations/iceland/`)), 'Removed Iceland campaign must not remain in the generated site');
    const egypt = visibleText(readPage(`/${lang}/destinations/egypt/`));
    const france = visibleText(readPage(`/${lang}/destinations/france/`));
    assert.match(egypt, lang === 'fr' ? /Octobre et décembre 2026/ : /October and December 2026/);
    assert.match(egypt, lang === 'fr' ? /octobre, désormais passé/ : /October, now past/);
    assert.match(france, lang === 'fr' ? /Printemps 2027/ : /Spring 2027/);
    assert.match(france, /Côte d’Azur/);
    assert.doesNotMatch(france, /mi-2027|mid-2027|Mid-2027/);
  }
  assert.ok(existsSync(new URL('media/cote-azur-nice.webp', dist)), `Côte d’Azur image missing in ${fileURLToPath(dist)}`);
});
