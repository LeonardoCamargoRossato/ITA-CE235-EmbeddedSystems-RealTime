import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = 'http://127.0.0.1:4173/ITA-CE235-EmbeddedSystems-RealTime/';
const origin = new URL(base).origin;
const browser = await chromium.launch({ headless: true });
await mkdir('qa-sprint3', { recursive: true });
const results = [];
const localEvidence = u => u.startsWith(base+'assets/') && /\/sprint-[123]\//.test(u) && !u.includes('/pdf/');
const png = u => localEvidence(u)&&/\/PNG\//.test(u);
const webp = u => localEvidence(u)&&/\/WebP\//.test(u);
async function checkSprintOpening(page,label,sprint){
  await page.evaluate(()=>window.scrollTo(0,0));
  const pair=page.locator('.sprint-contribution-pair');
  const card=pair.locator('.contribution-card');
  const evidence=page.locator('.sprint-first-evidence');
  await pair.waitFor({state:'visible'});
  await page.evaluate(()=>document.fonts.ready);
  const stats=await page.evaluate(()=>{
    const pair=document.querySelector('.sprint-contribution-pair');
    const evidence=document.querySelector('.sprint-first-evidence');
    const firstMedia=evidence.querySelector('.sprint-demo-card,.drive-file-preview-card');
    const a=pair.children[0].getBoundingClientRect(), b=pair.children[1].getBoundingClientRect();
    return {viewport:innerHeight,width:innerWidth,pairHeight:pair.getBoundingClientRect().height,pairBottom:pair.getBoundingClientRect().bottom,evidenceTop:evidence.getBoundingClientRect().top,mediaTop:firstMedia.getBoundingClientRect().top,cardA:a.height,cardB:b.height,horizontalOverflow:document.documentElement.scrollWidth>innerWidth+1};
  });
  assert.equal(stats.horizontalOverflow,false);
  if(label==='desktop'){
    assert.ok(stats.pairHeight<=340,JSON.stringify(stats));
    assert.ok(stats.pairBottom<=stats.viewport*2/3,JSON.stringify(stats));
    assert.ok(stats.evidenceTop<=stats.viewport*2/3+24,JSON.stringify(stats));
    assert.ok(stats.mediaTop<stats.viewport-100,JSON.stringify(stats));
    assert.ok(Math.abs(stats.cardA-stats.cardB)<=2,JSON.stringify(stats));
  }
  await page.screenshot({path:`qa-sprint3/opening-sprint${sprint}-${label}.png`});
  const read=card.getByRole('button',{name:'Leia mais',exact:true});
  const controlled=card.locator('[id]').first();
  assert.equal(await read.getAttribute('aria-expanded'),'false');
  assert.equal(await controlled.isVisible(),false);
  await read.click();
  assert.equal(await read.getAttribute('aria-expanded'),'true');
  assert.equal(await controlled.isVisible(),true);
  await card.getByRole('button',{name:'Leia menos',exact:true}).click();
  assert.equal(await controlled.isVisible(),false);
  console.log('Opening '+sprint+' '+label+' '+JSON.stringify(stats));
}

async function checkContribution(page, expected, drive, app, file) {
  const card=page.locator('.contribution-card').first();
  await card.scrollIntoViewIfNeeded();
  const links=card.locator('.sprint-contribution-actions a');
  assert.deepEqual((await links.allTextContents()).map(t=>t.trim()),expected);
  assert.equal(await links.first().getAttribute('href'),drive);
  assert.equal(await card.locator('.button--gold').count(),1);
  assert.match(await links.first().getAttribute('class'),/button--gold/);
  assert.equal(await card.locator('.button--app-accent').count(),app?1:0);
  if(app) {assert.equal(await links.nth(1).getAttribute('href'),app);assert.match(await links.nth(1).getAttribute('class'),/button--app-accent/);}
  const cardBox=await card.boundingBox();
  for(const link of await links.all()){
    const b=await link.boundingBox();
    assert.ok(b && b.x>=cardBox.x-1 && b.x+b.width<=cardBox.x+cardBox.width+1 && b.y+b.height<=cardBox.y+cardBox.height+1,'contribution button clipped');
  }
  await card.screenshot({path:file});
}

async function checkPdfReader(page,key,count,originalHref,label){
  const reader=page.locator(`.pdf-page-reader[data-pdf-preview="${key}"]`);
  await reader.scrollIntoViewIfNeeded();
  const pages=reader.locator('.pdf-page-reader__page');
  assert.equal(await pages.count(),count);
  assert.equal(await reader.evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(255, 255, 255)');
  const card=reader.locator('xpath=ancestor::article[1]');
  assert.equal(await card.locator('iframe').count(),0);
  assert.equal(await card.locator('.preview-actions a').getAttribute('href'),originalHref);
  for(const item of await pages.all()){
    // Center the actual page within the scrollable reader; do not scroll a hidden image.
    await item.evaluate(el=>el.scrollIntoView({block:'start',inline:'nearest'}));
    const img=item.locator('img');
    await decoded(img);
    assert.ok(await img.evaluate(el=>Math.abs(el.getBoundingClientRect().width-el.parentElement.getBoundingClientRect().width)<=1));
    assert.ok(await img.evaluate(el=>Math.abs((el.clientWidth/el.clientHeight)/(el.naturalWidth/el.naturalHeight)-1)<0.02));
  }
  await reader.evaluate(el=>{el.scrollTop=0;});
  await reader.scrollIntoViewIfNeeded();
  await reader.screenshot({path:`qa-sprint3/pdf-${key}-${label}.png`});
  await card.getByRole('button',{name:'Expandir'}).click();
  const modal=page.locator('.pdf-modal');
  await modal.waitFor({state:'visible'});
  const modalReader=modal.locator('.pdf-page-reader');
  assert.equal(await modalReader.locator('.pdf-page-reader__page').count(),count);
  await decoded(modalReader.locator('.pdf-page-reader__page').first().locator('img'));
  await modalReader.screenshot({path:`qa-sprint3/pdf-expanded-${key}-${label}.png`});
  await page.keyboard.press('Escape');
  await modal.waitFor({state:'detached'});
}

async function decoded(locator) {
  await locator.waitFor({state:'visible'});
  await locator.evaluate(el=>el.decode());
}
async function visiblePreview(trigger) {
  await trigger.scrollIntoViewIfNeeded();
  await decoded(trigger.locator('img'));
  assert.match(await trigger.locator('img').getAttribute('src'),/\.webp(?:\?|$)/);
}
async function openViewer(page,trigger) {
  await visiblePreview(trigger);
  await trigger.click();
  const dialog=page.getByRole('dialog',{name:'Visualizador de imagens'});
  await dialog.waitFor({state:'visible'});
  await decoded(dialog.locator('img'));
  assert.match(await dialog.locator('img').getAttribute('src'),/\.png(?:\?|$)/);
  assert.equal(await page.evaluate(()=>document.body.style.overflow),'hidden');
  assert.equal(await dialog.locator('img').evaluate(el=>Math.abs((el.clientWidth/el.clientHeight)/(el.naturalWidth/el.naturalHeight)-1)<0.02),true);
  return dialog;
}
async function closeViewer(page,dialog,trigger,viaKeyboard=true) {
  if(viaKeyboard)await page.keyboard.press('Escape');
  else await dialog.getByRole('button',{name:'Fechar imagem'}).click();
  await dialog.waitFor({state:'detached'});
  await page.waitForFunction(()=>document.body.style.overflow!=='hidden');
  assert.equal(await trigger.evaluate(el=>el===document.activeElement),true);
}
try {
  for (const [label,viewport] of [['desktop',{width:1440,height:900}],['mobile',{width:390,height:844}]]) {
    const context=await browser.newContext({viewport,hasTouch:label==='mobile',isMobile:label==='mobile',acceptDownloads:true,serviceWorkers:'block'});
    const blocked=[], requests=[], errors=[], responseSizes=new Map(), failed=[];
    await context.route('**/*',route=>{
      if(route.request().url().startsWith(origin+'/'))return route.continue();
      blocked.push(new URL(route.request().url()).hostname);return route.abort();
    });
    const page=await context.newPage();
    page.on('pageerror',e=>errors.push(e.message));
    page.on('request',req=>{if(localEvidence(req.url()))requests.push(req.url());});
    page.on('response',res=>{
      if(localEvidence(res.url())) {
        if(res.status()>=400)failed.push(res.url());
        const bytes=Number(res.headers()['content-length']||0);
        responseSizes.set(res.url(),bytes);
      }
    });
    await page.goto(base+'#/listas');
    await page.getByRole('link',{name:'Ver Sprint 3'}).click();
    await page.waitForURL('**/#/list5');
    await page.getByRole('heading',{name:'US330 — Telemetry Decoder'}).waitFor();
    await checkSprintOpening(page,label,3);
    const buttons=page.locator('.sprint-contribution-actions a');
    assert.deepEqual((await buttons.allTextContents()).map(t=>t.trim()),['Drive da Sprint 3','Portal de acesso US330 (Telemetry Decoder versão 3)','GitHub pessoal','US330 #146']);
    assert.equal(await buttons.first().getAttribute('href'),'https://drive.google.com/drive/folders/15snftyx0i1KedmWKj-tcm2iaX0XqweAM');
    assert.match(await buttons.first().getAttribute('class'),/button--gold/);
    assert.match(await buttons.nth(1).getAttribute('class'),/button--app-accent/);
    assert.equal(await buttons.nth(1).getAttribute('href'),'https://egg-steady-sixth-fax.trycloudflare.com/us330-api/');
    assert.equal(await page.locator('.sprint-contribution-actions .button--gold').count(),1);
    assert.ok(await page.getByRole('link',{name:'Abrir quadro oficial',exact:true}).count()>0);
    assert.ok(await page.getByRole('link',{name:'T2 #162',exact:true}).count()>0);
    await page.locator('.contribution-card').first().scrollIntoViewIfNeeded();
    const contributionBox=await page.locator('.contribution-card').first().boundingBox();
    for(const button of await buttons.all()){
      const box=await button.boundingBox();
      assert.ok(box && box.y+box.height<=contributionBox.y+contributionBox.height+1 && box.x>=contributionBox.x-1 && box.x+box.width<=contributionBox.x+contributionBox.width+1,'contribution button clipped');
    }
    await page.locator('.contribution-card').first().screenshot({path:'qa-sprint3/contribution-'+label+'.png'});
    const figures=page.locator('.sprint3-evidence');
    assert.equal(await figures.count(),3);
    assert.equal(requests.filter(png).length,0,'PNG before opening');
    // The first diagram may already have intersected during navigation or screenshot.
    // The two later figures have not been visited; no initial request may load them.
    for(const slug of ['portal-us330','kanban-sprint3']){
      assert.equal(requests.filter(u=>webp(u)&&u.includes('/'+slug+'.webp')).length,0,slug+' fetched before its section was visited');
    }
    const before=requests.filter(webp).length;
    for(const [i,figure] of (await figures.all()).entries()){
      const trigger=figure.locator(':scope > button');
      const originalPngs=requests.filter(png).length;
      await visiblePreview(trigger);
      assert.equal(requests.filter(png).length,originalPngs);
      const dialog=await openViewer(page,trigger);
      const image=dialog.locator('img'), toolbar=dialog.locator('.lcr-viewer-toolbar');
      assert.deepEqual(await toolbar.locator('button,a').evaluateAll(els=>els.map(e=>e.getAttribute('aria-label'))),['Aumentar zoom','Ajustar à área disponível','Diminuir zoom','Baixar imagem','Alternar tela cheia','Fechar imagem']);
      assert.equal(await toolbar.locator('output').textContent(),'100%');
      if(i===0){
        await page.screenshot({path:'qa-sprint3/viewer-diagram-'+label+'.png'});
        await toolbar.getByRole('button',{name:'Aumentar zoom'}).click();
        assert.equal(await toolbar.locator('output').textContent(),'125%');
        await page.keyboard.press('Control+=');
        assert.equal(await toolbar.locator('output').textContent(),'150%');
        await page.keyboard.press('Control+-');
        assert.equal(await toolbar.locator('output').textContent(),'125%');
        await toolbar.getByRole('button',{name:'Diminuir zoom'}).click();
        assert.equal(await toolbar.locator('output').textContent(),'100%');
        await toolbar.getByRole('button',{name:'Diminuir zoom'}).click();
        assert.equal(await toolbar.locator('output').textContent(),'75%');
        await toolbar.getByRole('button',{name:'Ajustar à área disponível'}).click();
        assert.equal(await toolbar.locator('output').textContent(),'100%');
        for(let z=0;z<4;z++)await toolbar.getByRole('button',{name:'Aumentar zoom'}).click();
        assert.equal(await toolbar.locator('output').textContent(),'200%');
        const stage=dialog.locator('.lcr-viewer-stage'), rect=await stage.boundingBox();
        const transform=await image.evaluate(el=>el.style.transform);
        await page.mouse.move(rect.x+rect.width/2,rect.y+rect.height/2);
        await page.mouse.down();await page.mouse.move(rect.x+rect.width/2+55,rect.y+rect.height/2,{steps:5});await page.mouse.up();
        assert.notEqual(await image.evaluate(el=>el.style.transform),transform,'pan did not move');
        await page.screenshot({path:'qa-sprint3/viewer-zoom-'+label+'.png'});
        if(label==='mobile'){
          const cdp=await context.newCDPSession(page);
          const x=rect.x+rect.width/2,y=rect.y+rect.height/2;
          const touch=(type,points)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points});
          const point=(id,x,y)=>({id,x,y,radiusX:3,radiusY:3});
          await toolbar.getByRole('button',{name:'Ajustar à área disponível'}).click();
          await touch('touchStart',[point(1,x-35,y),point(2,x+35,y)]);
          await touch('touchMove',[point(1,x-65,y),point(2,x+65,y)]);
          await touch('touchEnd',[]);
          await page.waitForFunction(()=>parseInt(document.querySelector('.lcr-viewer output')?.textContent||'0')>100);
        }
        const dl=page.waitForEvent('download');
        await toolbar.getByRole('link',{name:'Baixar imagem'}).click();
        const download=await dl;assert.equal(download.suggestedFilename(),'diagrama-us330.png');await download.cancel();
        const full=toolbar.getByRole('button',{name:'Alternar tela cheia'});
        await full.click();
        await page.waitForFunction(()=>document.querySelector('.lcr-viewer-toolbar button[aria-label="Alternar tela cheia"]')?.getAttribute('aria-pressed')==='true');
        await full.click();
        await page.waitForFunction(()=>document.querySelector('.lcr-viewer-toolbar button[aria-label="Alternar tela cheia"]')?.getAttribute('aria-pressed')==='false');
      }
      await closeViewer(page,dialog,trigger,i!==1);
    }
    await checkPdfReader(page,'sprint3-relatorio',5, '/ITA-CE235-EmbeddedSystems-RealTime/assets/PDF/sprint-3/us330/Relatorio_Pessoal_US330_Sprint3_Leonardo_Rossato.pdf',label);
    const pdf=await page.request.get(base+'assets/PDF/sprint-3/us330/Relatorio_Pessoal_US330_Sprint3_Leonardo_Rossato.pdf');
    assert.equal(pdf.status(),200);assert.equal((await pdf.body()).subarray(0,5).toString(),'%PDF-');
    await page.locator('.sprint3-note').first().scrollIntoViewIfNeeded();
    assert.match(await page.locator('.sprint3-note').first().innerText(),/disponibilidade a confirmar/i);
    const countS3={webp:requests.filter(webp).length,png:requests.filter(png).length,webpBeforeScroll:before};
    assert.equal(new Set(requests.filter(u=>png(u)&&u.includes('/sprint-3/'))).size,3);
    await page.getByRole('link',{name:'Voltar às listas'}).click();await page.waitForURL('**/#/listas');
    await page.goto(base+'#/sprint1');
    await checkSprintOpening(page,label,1);
    await checkContribution(page,['Drive da Sprint 1','Portal de acesso US123 (Telemetry Decoder versão 1)','Repositório GitHub','Subsprint #70'],'https://drive.google.com/drive/folders/1XBxqqxhEtPH28rLyM3hbt0fQD92DiaQO','https://leonardocamargorossato.github.io/ITA-US123-Telemetry-Decoder/','qa-sprint3/contribution-sprint1-'+label+'.png');
    const s1=page.locator('.sprint-media-gallery__item').first();
    const dialog1=await openViewer(page,s1);
    const first=await dialog1.locator('img').getAttribute('src');
    await dialog1.getByRole('button',{name:'Próxima imagem'}).click();
    await decoded(dialog1.locator('img'));assert.notEqual(await dialog1.locator('img').getAttribute('src'),first);
    await page.keyboard.press('ArrowLeft');await decoded(dialog1.locator('img'));assert.equal(await dialog1.locator('img').getAttribute('src'),first);
    await closeViewer(page,dialog1,s1);
    await checkPdfReader(page,'sprint1-enunciado',2,'/ITA-CE235-EmbeddedSystems-RealTime/documents/list3/listex3-enunciado.pdf',label);
    await page.goto(base+'#/list4');
    await checkSprintOpening(page,label,2);
    await checkContribution(page,['Drive da Sprint 2','Repositório GitHub','US221 T1','US221 — Contrato C API'],'https://drive.google.com/drive/folders/1keKi3JUQDIM-mJS40sKdC3FLve-Bz2g-',null,'qa-sprint3/contribution-sprint2-'+label+'.png');
    const s2=page.locator('.sprint-main-figure__media');
    assert.equal(await s2.count(),3);
    for(const trigger of await s2.all()){
      const dialog=await openViewer(page,trigger);await closeViewer(page,dialog,trigger);
    }
    const car=page.locator('.sprint-evidence-carousel');
    const trigger=car.locator('.sprint-evidence-carousel__media');
    const dlg=await openViewer(page,trigger);
    const first2=await dlg.locator('img').getAttribute('src');
    await dlg.getByRole('button',{name:'Próxima imagem'}).click();await decoded(dlg.locator('img'));
    assert.notEqual(await dlg.locator('img').getAttribute('src'),first2);
    await page.screenshot({path:'qa-sprint3/viewer-carousel-'+label+'.png'});
    await page.keyboard.press('ArrowLeft');await decoded(dlg.locator('img'));
    assert.equal(await dlg.locator('img').getAttribute('src'),first2);
    await closeViewer(page,dlg,trigger);
    await car.getByRole('button',{name:'Próxima imagem'}).click();await visiblePreview(trigger);
    await checkPdfReader(page,'sprint2-relatorio',5,'https://drive.google.com/file/d/1SKaTGLuDpG73mpjqtZCscrjLby858x6S/view',label);
    for(const route of ['','projeto','list0','list1','list2','list3','artefatos','scade','disciplina','curriculo','relatorio-final']){
      await page.goto(base+'#/'+route);
      await page.locator('main').waitFor();
      assert.ok((await page.locator('main').innerText()).trim().length>30,route+' empty');
    }
    assert.deepEqual(failed,[],'local image HTTP errors');assert.deepEqual(errors,[],label+' page errors');
    const sum=arr=>[...responseSizes].filter(([u])=>arr(u)).reduce((a,[,n])=>a+n,0);
    const result={label,case:'cold isolated browser; external requests blocked',sprint3:countS3,uniqueWebp:new Set(requests.filter(webp)).size,uniquePng:new Set(requests.filter(png)).size,webpBytes:sum(webp),pngBytes:sum(png),externalRequestsBlocked:blocked.length};
    results.push(result);console.log(JSON.stringify(result));
    console.log(label+': gallery controls, PNG on demand, viewport, navigation, accessibility, PDF and previous routes passed');
    await context.close();
  }
} finally {
  await writeFile('qa-sprint3/network-results.json',JSON.stringify(results,null,2));
  await browser.close();
}
