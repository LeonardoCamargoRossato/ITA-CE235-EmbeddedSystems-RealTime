import {chromium} from "playwright";
import assert from "node:assert/strict";
import {mkdir,readFile,writeFile} from "node:fs/promises";
import {createHash} from "node:crypto";
import {execFileSync} from "node:child_process";
const site="http://127.0.0.1:4173/ITA-CE235-EmbeddedSystems-RealTime/";
const output="qa-labs-availability";await mkdir(output,{recursive:true});
const manifest=JSON.parse(await readFile("../documentation/labs-availability/previews.json","utf8"));
const images=JSON.parse(await readFile("../documentation/labs-availability/evidence.json","utf8"));
const hash=b=>createHash("sha256").update(b).digest("hex");
const old="1dbe061acac8ca0df81d3cd1a5c3a722bbbd6959";
const git=(...args)=>execFileSync("git",["-C","..",...args],{maxBuffer:64*1024*1024});
const preserved=[];
for(const path of git("ls-tree","-r","--name-only","-z",old,"code/public").toString().split("\0").filter(x=>x.endsWith(".pdf"))){const original=hash(git("show",old+":"+path));assert.equal(hash(await readFile("../"+path)),original,path);preserved.push({path,sha256:original})}
assert.equal(preserved.length,11);
await writeFile(output+"/preserved-pdfs.json",JSON.stringify(preserved,null,2));
const browser=await chromium.launch();const report=[];
const expected={list0:["list0-google-sites","list0-github-pages","list0-jenkins"],list1:["lab1-relatorio","lab2-relatorio"],list2:["lab3-relatorio","lab3-scade"]};
const themes=["#F1F2F4","#F1F2F4","#F1F2F4","#FFF7DF","#FCEFED","#EDF4FD"];
try{
 for(const viewport of [{width:1440,height:900},{width:768,height:1024},{width:390,height:844}]){
  const context=await browser.newContext({viewport,reducedMotion:"reduce"});
  await context.route("**/*",r=>r.request().url().startsWith(site)?r.continue():r.abort());
  const page=await context.newPage();const errors=[];page.on("pageerror",e=>errors.push(e.message));
  const go=async route=>{await page.goto(site+"#/"+route);await page.waitForFunction(r=>document.querySelector("[data-route-ready]")?.getAttribute("data-route-ready")==="/"+r,route)};
  await go("listas");const cards=page.locator(".activities-lists__grid .list-card");assert.equal(await cards.count(),6);
  for(let i=0;i<6;i++){assert.equal(await cards.nth(i).getAttribute("data-activity"),"list"+i);assert.equal(await cards.nth(i).evaluate(e=>getComputedStyle(e).getPropertyValue("--activity-pastel").trim()),themes[i]);}
  await page.locator(".activities-lists__grid").screenshot({path:output+"/cards-"+viewport.width+".png"});
  assert.equal(await page.locator("#arquivos .lab-catalog-list a").count(),6);
  const folder=page.locator("#arquivos");await folder.getByRole("button",{name:"Carregar visualização do Drive"}).click();await folder.locator("iframe").waitFor();await folder.getByRole("button",{name:"Tentar carregar novamente"}).waitFor();await folder.locator("iframe").waitFor({state:"detached",timeout:15000});assert.match(await folder.locator("[role=status]").innerText(),/Não foi possível confirmar/);assert.equal(await folder.locator(".lab-catalog-list a").count(),6);
  await folder.getByRole("button",{name:"Tentar carregar novamente"}).click();await folder.locator("iframe").waitFor();await folder.getByRole("button",{name:"Ocultar visualização"}).click();await folder.locator("iframe").waitFor({state:"detached"});
  for(const [route,keys] of Object.entries(expected)){
   await go(route);
   assert.equal(await page.locator(".lab-local-document").count(),keys.length);
   assert.ok(await page.locator(".lab-catalog-list a").count()>=3);
   assert.equal(await page.locator('iframe[src*="drive.google.com"]').count(),0);
   for(const key of keys){const d=manifest.find(d=>d.key===key);const doc=page.locator('[data-lab-document="'+key+'"]');const reader=doc.locator(".pdf-page-reader");assert.equal(await reader.locator("[data-page]").count(),d.pages);
    for(let i=1;i<=d.pages;i++){const p=reader.locator('[data-page="'+i+'"]');await p.scrollIntoViewIfNeeded();const im=p.locator("img");await im.waitFor({timeout:15000});await im.evaluate(el=>el.decode());assert.ok(await im.evaluate(el=>el.naturalWidth>100));}
    await reader.evaluate(e=>e.scrollTop=0);await doc.screenshot({path:output+"/"+key+"-"+viewport.width+".png"});
    const pdf=await context.request.get(site+encodeURI(d.path.replace("code/public/","")));assert.equal(pdf.status(),200);assert.equal(hash(await pdf.body()),d.sha256);
    if(viewport.width===1440){await doc.getByRole("button",{name:"Ampliar",exact:true}).click();const dialog=page.getByRole("dialog");await dialog.waitFor();await dialog.getByRole("button",{name:"Aumentar zoom"}).click();assert.equal(await dialog.locator("output").innerText(),"125%");assert.equal(await dialog.getByRole("link",{name:"Baixar PDF"}).count(),1);await dialog.getByRole("button",{name:"Ler PDF original"}).click();assert.match(await dialog.locator("iframe").getAttribute("src"),/assets\/PDF\/list-/);await dialog.getByRole("button",{name:"Fechar"}).click();await dialog.waitFor({state:"detached"});}
   }
   const enunciado=page.locator('iframe[src*="documents/list"]');assert.equal(await enunciado.count(),1);const original=await context.request.get(new URL(await enunciado.getAttribute("src"),site).href);assert.equal(original.status(),200);assert.equal((await original.body()).subarray(0,5).toString(),"%PDF-");
   const galleries=page.locator(".evidence-gallery");const galleryCount=route==="list0"?0:3;assert.equal(await galleries.count(),galleryCount);
   for(let i=0;i<galleryCount;i++){const g=galleries.nth(i);const buttons=g.locator(".sprint-media-gallery__item");assert.ok(await buttons.count()>0);for(const im of await g.locator(".sprint-media-gallery__image img").all()){await im.scrollIntoViewIfNeeded();await im.evaluate(el=>el.decode());assert.ok(await im.evaluate(el=>el.naturalWidth>0))}
    await g.screenshot({path:output+"/"+route+"-gallery-"+i+"-"+viewport.width+".png"});await buttons.first().click();const image=page.getByRole("dialog").locator("img").first();await image.waitFor();await image.evaluate(el=>el.decode());await page.keyboard.press("Escape");await page.getByRole("dialog").waitFor({state:"detached"});}
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route+" overflow");
  }
  for(const [route,id] of [["sprint1","list3"],["list4","list4"],["list5","list5"]]){await go(route);assert.equal(await page.locator(".compact-list-header").getAttribute("data-activity"),id);assert.equal(await page.locator(".contribution-card").count(),1)}
  assert.deepEqual(errors,[]);report.push({viewport,pdfCount:manifest.length,pageCount:manifest.reduce((n,d)=>n+d.pages,0),evidenceCount:images.length,external:"blocked intentionally, separate test required",success:true});await context.close();
 }
 await writeFile(output+"/resilience.json",JSON.stringify(report,null,2));console.log("Lab resilience: 7 originals and 30 decoded local previews, 6 galleries, 11 protected PDFs, independent catalogs, timeout/retry and activity themes.");
}finally{await browser.close()}
