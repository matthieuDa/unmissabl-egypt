import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

// Exercise built journeys: source records alone do not prove that links,
// references, languages or tab relationships survive page generation.
const dist = new URL('../dist/', import.meta.url);
const locales = ['fr', 'en'];
const expectedProof = {
  hotels: 'matiss-siro-za-abeel',
  automotive: 'duarte-creatum-royal-rides-1',
  golf: 'duarte-adobe-krvncm8vcwn',
  equestrian: 'haras-de-prepinson',
};
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const tags = html => [...html.matchAll(/<([a-z][\w-]*)\b([^>]*)>/gi)].map(([, name, raw]) => ({
  name: name.toLowerCase(),
  attrs: Object.fromEntries([...raw.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)])),
  raw,
}));
const links = html => tags(html).filter(tag => tag.name === 'a' && tag.attrs.href).map(tag => tag.attrs.href);
const pageFile = route => new URL(route.replace(/^\//, '') + 'index.html', dist);
const readPage = route => {
  const file = pageFile(route);
  assert.ok(existsSync(file), `Missing generated page ${route}; run npm run build before npm test`);
  return readFileSync(file, 'utf8');
};
const visibleText = html => decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
const panels = html => {
  const starts = [...html.matchAll(/<div\b[^>]*data-sector-panel="([^"]+)"[^>]*>/g)];
  return starts.map((match, index) => ({id: match[1], html: html.slice(match.index, starts[index + 1]?.index ?? html.indexOf('<p class="riviera-note', match.index))}));
};

test('industry invitations belong to the France trip, without standalone solutions or stud-farm home navigation', () => {
  for (const lang of locales) {
    const home = readPage(`/${lang}/`);
    assert.ok(!links(home).some(link => /\/solutions(?:\/|\?|#|$)/.test(link)), 'Home must not send prospects into the removed generic commercial directory');
    const nav = [...home.matchAll(/<nav\b[^>]*>([\s\S]*?)<\/nav>/g)].map(match => visibleText(match[1])).join(' ');
    assert.doesNotMatch(nav, /\bharas\b|\bstud farms?\b/i, 'Stud farms belong inside the France trip, not the main menu');
    assert.ok(!existsSync(pageFile(`/${lang}/solutions/`)), 'The generic commercial directory must not remain generated');
    for (const sector of [...Object.keys(expectedProof), 'resorts']) {
      assert.ok(!existsSync(pageFile(`/${lang}/solutions/${sector}/`)), `Stale standalone solution ${lang}/${sector}`);
    }
    const france = readPage(`/${lang}/destinations/france/`);
    assert.match(france, new RegExp(`<html[^>]*lang="${lang}"`));
    assert.equal([...france.matchAll(/<h1\b/g)].length, 1);
    assert.ok(links(france).includes(`/${lang === 'fr' ? 'en' : 'fr'}/destinations/france/`), 'Language switch must retain the trip');
    const hotelTab = france.match(/<button\b[^>]*data-sector-tab="hotels"[^>]*>([\s\S]*?)<\/button>/)?.[1];
    assert.match(visibleText(hotelTab || ''), lang === 'fr' ? /Hôtels.*yachting/ : /Hotels.*yachting/);
  }
});

test('France industry tabs and in-page brief actions have complete, unique accessibility relationships', () => {
  for (const lang of locales) {
    const html = readPage(`/${lang}/destinations/france/`);
    const all = tags(html);
    const ids = all.filter(tag => tag.attrs.id).map(tag => tag.attrs.id);
    assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML ids break tab and anchor targeting');
    const tablist = all.filter(tag => tag.attrs.role === 'tablist');
    assert.equal(tablist.length, 1);
    assert.ok(tablist[0].attrs['aria-label']);
    const tabs = all.filter(tag => tag.attrs.role === 'tab');
    const tabpanels = all.filter(tag => tag.attrs.role === 'tabpanel');
    assert.deepEqual(tabs.map(tab => tab.attrs['data-sector-tab']).sort(), Object.keys(expectedProof).sort());
    assert.equal(tabpanels.length, tabs.length);
    assert.equal(tabs.filter(tab => tab.attrs['aria-selected'] === 'true').length, 1);
    assert.equal(tabs.filter(tab => tab.attrs.tabindex === '0').length, 1);
    for (const tab of tabs) {
      const panel = tabpanels.find(panel => panel.attrs.id === tab.attrs['aria-controls']);
      assert.ok(panel, `Missing controlled panel for ${tab.attrs.id}`);
      assert.equal(panel.attrs['aria-labelledby'], tab.attrs.id);
      assert.equal(panel.attrs['data-sector-panel'], tab.attrs['data-sector-tab']);
    }
    assert.ok(ids.includes('brief'), 'The contextual brief must be on this same page');
    for (const panel of panels(html)) {
      const actions = tags(panel.html).filter(tag => tag.name === 'a' && tag.attrs['data-sector-brief']);
      assert.equal(actions.length, 1, `One direct brief action expected for ${panel.id}`);
      assert.equal(actions[0].attrs['data-sector-brief'], panel.id);
      assert.equal(actions[0].attrs.href, '#brief', 'Sector action must retain the prospect on the France page');
    }
    const context = all.find(tag => tag.name === 'input' && tag.attrs.name === 'context')?.attrs.value;
    assert.match(context || '', /Côte d’Azur/);
    assert.match(context || '', /2027/);
  }
});

test('each France industry shows its relevant local credited reference and available imagery', () => {
  for (const lang of locales) {
    const html = readPage(`/${lang}/destinations/france/`);
    const renderedPanels = panels(html);
    assert.equal(renderedPanels.length, Object.keys(expectedProof).length);
    for (const [sector, projectId] of Object.entries(expectedProof)) {
      const panel = renderedPanels.find(panel => panel.id === sector);
      assert.ok(panel, `Missing ${sector} panel`);
      const route = `/${lang}/projects/${projectId}/`;
      assert.ok(links(panel.html).includes(route), `${sector} must show ${projectId}, not unrelated generic travel work`);
      const project = readPage(route);
      assert.match(project, /class="[^"]*credit-list/, `${route} must show credits`);
      const posters = tags(panel.html).filter(tag => tag.name === 'img' && tag.attrs.src?.startsWith('/media/'));
      assert.ok(posters.length, `No local visual proof for ${sector}`);
      for (const poster of posters) assert.ok(existsSync(new URL(poster.attrs.src.slice(1), dist)), `Missing ${poster.attrs.src}`);
      assert.match(panel.html, /<video\b/, `A playable preview must be rendered for ${sector}`);
      if (sector === 'golf') assert.match(visibleText(panel.html), lang === 'fr' ? /Référence hôtelière/ : /Hospitality reference/, 'Adjacent hospitality work must retain its true context');
    }
  }
});

test('France invitations and selected project credits do not advertise creator agencies', () => {
  const agencies = /Sanctuary Creatives?|Creatum Media|Du Creates|Alexoo?n Media|Dumont Films|Last Meridian Films/i;
  for (const lang of locales) {
    for (const route of [`/${lang}/destinations/france/`, ...Object.values(expectedProof).map(id => `/${lang}/projects/${id}/`)]) {
      assert.doesNotMatch(visibleText(readPage(route)), agencies, `${route} exposes an agency name in public text`);
    }
    assert.match(visibleText(readPage(`/${lang}/projects/haras-de-prepinson/`)), /Alexandre Buisson/);
    assert.match(visibleText(readPage(`/${lang}/projects/matiss-siro-za-abeel/`)), /Matiss Skujins/);
  }
});

test('the production calendar exposes only Egypt and Côte d’Azur and removes Iceland', () => {
  for (const lang of locales) {
    const html = readPage(`/${lang}/destinations/`);
    const trips = [...new Set(links(html).filter(href => new RegExp(`^/${lang}/destinations/[^/]+/$`).test(href)))];
    assert.deepEqual(trips.sort(), [`/${lang}/destinations/egypt/`, `/${lang}/destinations/france/`]);
    assert.doesNotMatch(visibleText(html), /Iceland|Islande/);
    assert.ok(!existsSync(pageFile(`/${lang}/destinations/iceland/`)), 'Removed Iceland campaign must not remain in the generated site');
  }
});

test('trip pages retain October and December 2026 and spring 2027, without claiming the past window is upcoming', () => {
  for (const lang of locales) {
    const egypt = visibleText(readPage(`/${lang}/destinations/egypt/`));
    const france = visibleText(readPage(`/${lang}/destinations/france/`));
    assert.match(egypt, lang === 'fr' ? /Octobre et décembre 2026/ : /October and December 2026/);
    assert.match(egypt, lang === 'fr' ? /octobre, désormais passé/ : /October, now past/);
    assert.match(france, lang === 'fr' ? /Printemps 2027/ : /Spring 2027/);
    assert.match(france, /Côte d’Azur/);
    assert.doesNotMatch(france, /mi-2027|mid-2027|Mid-2027/);
  }
  assert.ok(existsSync(new URL('media/cote-azur-nice.webp', dist)), 'Côte d’Azur image missing');
});
