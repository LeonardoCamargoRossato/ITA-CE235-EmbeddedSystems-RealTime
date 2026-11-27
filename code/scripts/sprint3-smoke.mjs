import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

const base = 'http://127.0.0.1:4173/ITA-CE235-EmbeddedSystems-RealTime/';
const browser = await chromium.launch({ headless: true });
await mkdir('qa-sprint3', { recursive: true });
try {
  for (const [label, viewport] of [['desktop', {width:1440,height:900}], ['mobile', {width:390,height:844}]]) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base+'#/listas');
    await page.getByRole('link', {name:'Ver Sprint 3'}).click();
    await page.waitForURL('**/#/list5');
    await page.getByRole('heading', {name:'US330 — Telemetry Decoder'}).waitFor();
    const figures = page.locator('.sprint3-evidence');
    assert.equal(await figures.count(), 3);
    for (const figure of await figures.all()) {
      const preview = figure.locator(':scope > button > img');
      await preview.scrollIntoViewIfNeeded();
      await preview.evaluate(el => el.decode());
      assert.match(await preview.getAttribute('src'), /\.webp/);
      const dialog = figure.locator('dialog');
      assert.equal(await dialog.locator('img').getAttribute('src'), null);
      await figure.locator(':scope > button').click();
      await dialog.waitFor({state:'visible'});
      await dialog.locator('img').evaluate(el => el.decode());
      assert.match(await dialog.locator('img').getAttribute('src'), /\.png/);
      await page.keyboard.press('Escape');
      await dialog.waitFor({state:'hidden'});
      assert.equal(await dialog.locator('img').getAttribute('src'), null);
    }
    const pdf = await page.request.get(base+'assets/PDF/sprint-3/us330/Relatorio_Pessoal_US330_Sprint3_Leonardo_Rossato.pdf');
    assert.equal(pdf.status(), 200);
    assert.equal((await pdf.body()).subarray(0,5).toString(), '%PDF-');
    await page.locator('.sprint3-note').first().scrollIntoViewIfNeeded();
    assert.match(await page.locator('.sprint3-note').first().innerText(), /disponibilidade a confirmar/i);
    await page.evaluate(() => window.scrollTo(0,0));
    await page.screenshot({path:'qa-sprint3/list5-'+label+'.png',fullPage:true});
    await page.getByRole('link',{name:'Voltar às listas'}).click();
    await page.waitForURL('**/#/listas');
    for (const route of ['sprint1','list4','list0','list1','list2','list3','relatorio-final']) {
      await page.goto(base+'#/'+route);
      await page.locator('main').waitFor();
      assert.ok((await page.locator('main').innerText()).trim().length>30, route+' empty');
    }
    assert.deepEqual(errors, [], label+' page errors');
    await page.close();
    console.log(label+': navigation, 3 WebP/PNG pairs, Escape, PDF, fallback and previous routes passed');
  }
} finally { await browser.close(); }
