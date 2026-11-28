import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const site = "http://127.0.0.1:4173/ITA-CE235-EmbeddedSystems-RealTime/";
const rootId = "1G2xcYjDR7YVyom-LLZlm7UlpJl-SgxsD";
const root = "https://drive.google.com/drive/folders/" + rootId;
const embed = "https://drive.google.com/embeddedfolderview?id=" + rootId + "#list";
const folders = ["14sNp-xVnC_lFgO7Mn_b5Bk4OGMUQjB3o","1zHdXuhz86or6IIdm1uZ1rLUtkh5LBIbP","1MYAMwTjLNKQlQ_1_honnJ9yNXbsCWL7a","1XBxqqxhEtPH28rLyM3hbt0fQD92DiaQO","1keKi3JUQDIM-mJS40sKdC3FLve-Bz2g-","15snftyx0i1KedmWKj-tcm2iaX0XqweAM"];
const routes = ["list0","list1","list2","sprint1","list4","list5"];
const browser = await chromium.launch();
await mkdir("qa-activities-lists",{recursive:true});
const evidence=[];
try {
 for (const viewport of [{width:1920,height:1080,columns:3},{width:1440,height:900,columns:3},{width:1024,height:768,columns:2},{width:768,height:1024,columns:2},{width:390,height:844,columns:1}]) {
   const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height},reducedMotion:"reduce"});
   await context.route("**/*",r=>r.request().url().startsWith(site)?r.continue():r.abort());
   const page=await context.newPage();
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   const go=async route=>{await page.goto(site+"#/"+route);await page.waitForFunction(r=>document.querySelector("[data-route-ready]")?.getAttribute("data-route-ready")==="/"+r,route)};
   await go("listas");
   const grid=page.locator(".activities-lists__grid");
   const cards=grid.locator(".list-card");
   await cards.last().waitFor();
   assert.equal(await cards.count(),6);
   assert.deepEqual(await cards.locator(".list-card__top > span:first-child").allTextContents(),routes.map((_,i)=>"LIST "+i));
   assert.equal(await grid.evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(" ").length),viewport.columns);
   const positions=await cards.evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();const y=s=>e.querySelector(s).getBoundingClientRect().top;return {x:r.x,y:r.y,w:r.width,h:r.height,title:y("h3"),description:y("p:not(.list-card__subtitle)"),buttons:y(".card-actions")}}));
   const rows=[...new Set(positions.map(r=>Math.round(r.y)))];
   assert.equal(rows.length,6/viewport.columns);
   for(const y of rows)assert.equal(positions.filter(r=>Math.round(r.y)===y).length,viewport.columns);
   const near=(a,b)=>Math.abs(a-b)<2;
   if(viewport.columns>1){
      assert.ok(positions.every(r=>near(r.w,positions[0].w)&&near(r.h,positions[0].h)),"equal card dimensions");
      for(let i=0;i<6;i+=viewport.columns){
         const row=positions.slice(i,i+viewport.columns);
         for(const k of ["title","description","buttons"])assert.ok(row.every(r=>near(r[k],row[0][k])),"aligned "+k+" "+viewport.width);
      }
   }
   assert.ok(await grid.evaluate(e=>Math.abs(e.clientWidth-e.parentElement.clientWidth)<2));
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   assert.deepEqual(await cards.locator(".card-actions a.button--primary").evaluateAll(es=>es.map(e=>e.getAttribute("href"))),routes.map(r=>"#/"+r));
   assert.deepEqual(await cards.locator(".card-actions a.button--secondary").evaluateAll(es=>es.map(e=>e.getAttribute("href"))),folders.map(id=>"https://drive.google.com/drive/folders/"+id));
   const section=page.locator("#arquivos");
   assert.equal(await section.locator("iframe").getAttribute("src"),embed);
   assert.equal(await section.getByRole("heading",{name:"Arquivos das Listas de Exercícios"}).count(),1);
   const external=section.getByRole("link",{name:"Abrir pasta no Google Drive"});
   assert.equal(await external.getAttribute("href"),root);
   assert.equal(await external.getAttribute("target"),"_blank");
   assert.match(await external.getAttribute("rel"),/noopener/);
   await grid.screenshot({path:"qa-activities-lists/grid-"+viewport.width+".png"});
   await section.screenshot({path:"qa-activities-lists/drive-"+viewport.width+".png"});
   await go("listas?secao=arquivos");
   await page.waitForFunction(()=>{const r=document.getElementById("arquivos").getBoundingClientRect();return r.top>=-2&&r.top<innerHeight});
   if(viewport.columns===3&&viewport.width===1440){
     for(const route of routes){await go("listas");await page.locator('.activities-lists__grid a[href="#/'+route+'"]').click();await page.waitForFunction(r=>document.querySelector("[data-route-ready]")?.getAttribute("data-route-ready")==="/"+r,route);assert.equal(await page.getByRole("heading",{name:"Não foi possível carregar esta página"}).count(),0);}
     await go("listas");await page.emulateMedia({reducedMotion:"no-preference"});await page.locator(".activities-lists__grid .list-card").first().hover();await page.waitForFunction(()=>getComputedStyle(document.querySelector(".activities-lists__grid .list-card")).transform!=="none");
   }
   assert.deepEqual(errors,[]);
   evidence.push({viewport,rows:rows.length,cards:positions,root,embed,folderIds:folders,driveNetwork:"blocked intentionally for deterministic layout; authenticated hierarchy confirmed independently"});
   await context.close();
 }
 await writeFile("qa-activities-lists/evidence.json",JSON.stringify(evidence,null,2));
 console.log("Activities Lists: 6 cards, responsive 3x2 / 2x3 / 1x6, aligned content, 6 routes and 6 Drive links, root iframe and external fallback verified.");
} finally {await browser.close();}
