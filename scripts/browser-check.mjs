// Run with PLAYWRIGHT_MODULE set to the locally available Playwright module.
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE);
const origin = process.env.TEST_ORIGIN || 'http://127.0.0.1:3008';
const browser = await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try {
  const page = await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({width,height:width > 1000 ? 1000 : 844});
    for (const route of ['/', '/contact.html?intent=call', '/credits.html']) {
      const response = await page.goto(origin+route,{waitUntil:'networkidle'});
      assert.equal(response.status(),200);
      await page.evaluate(() => document.fonts.ready);
      // Load below-the-fold images before checking them.
      await page.locator('img').evaluateAll(images => images.forEach(image => image.loading='eager'));
      await page.waitForFunction(() => [...document.images].every(image => image.complete));
      const result = await page.evaluate(() => ({
        overflow:document.documentElement.scrollWidth > window.innerWidth,
        brokenImages:[...document.images].filter(image => !image.naturalWidth).map(image => image.src)
      }));
      assert.equal(result.overflow,false,`Horizontal overflow: ${width} ${route}`);
      assert.deepEqual(result.brokenImages,[],`Broken image: ${width} ${route}`);
      if (width===1440 || width===390) await page.screenshot({path:`/tmp/unmissabl-${width}-${route==='/'?'home':route.startsWith('/contact')?'contact':'credits'}.png`,fullPage:true});
    }
  }
  await page.goto(origin+'/contact.html?intent=call');
  assert.equal(await page.locator('#intent').inputValue(),'call');
  assert.equal(await page.locator('#availability').isVisible(),true);
  await page.locator('#intent').selectOption('project');
  assert.equal(await page.locator('#availability').isVisible(),false);
  assert.equal(await page.locator('#availability').isDisabled(),true);
  await page.locator('#intent').selectOption('call');
  await page.locator('button[type=submit]').click();
  assert.equal(await page.locator('#name').evaluate(e=>e.validity.valueMissing),true);
  await page.locator('#name').fill('Alex Test');
  await page.locator('#brand').fill('Brand & Partners');
  await page.locator('#email').fill('not-an-email');
  assert.equal(await page.locator('#email').evaluate(e=>e.validity.typeMismatch),true);
  await page.locator('#email').fill('test@example.com');
  await page.locator('#availability').fill('Tuesday 14:00, Europe/Paris');
  await page.locator('#message').fill('Film & photos — test + details');
  // Observe the email URL in an isolated headless browser; no email is sent.
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Page.enable');
  let mailto;
  cdp.on('Page.frameRequestedNavigation', event => {if(event.url.startsWith('mailto:')) mailto=event.url;});
  await page.locator('button[type=submit]').click();
  await page.waitForFunction(()=>document.querySelector('#email-note').textContent.includes('brief is ready'));
  assert.ok(mailto,'Expected a mailto navigation request');
  const url = new URL(mailto);
  assert.equal(url.pathname,'dalle.matthieu@gmail.com');
  assert.equal(url.searchParams.get('subject'),'UNMISSABL — Call request — Brand & Partners');
  assert.ok(url.searchParams.get('body').includes('Tuesday 14:00, Europe/Paris'));
  assert.ok(url.searchParams.get('body').includes('Film & photos — test + details'));
  await page.context().grantPermissions(['clipboard-read','clipboard-write']);
  await page.locator('#copy-email').click();
  assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),'dalle.matthieu@gmail.com');
  await page.goto(origin+'/');
  assert.equal(await page.locator('.work-card:visible').count(),6);
  await page.locator('.work-more summary').click();
  assert.equal(await page.locator('.work-card:visible').count(),10);
  await page.locator('.work-more summary').click();
  assert.equal(await page.locator('.work-card:visible').count(),6);
  await page.getByRole('link',{name:'Plan a 15-minute call',exact:false}).click();
  assert.equal(await page.locator('#intent').inputValue(),'call');
  assert.deepEqual(errors,[]);
  console.log('PASS: three pages at four viewport widths; image loading; no overflow; contact navigation; validation; call selection; encoded email brief; clipboard; no JS errors.');
} finally { await browser.close(); }
