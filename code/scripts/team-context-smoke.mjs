import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const base=port=>"http://127.0.0.1:"+port+"/ITA-CE235-EmbeddedSystems-RealTime/";
const dir="qa-sprint3/team-context";
await mkdir(dir,{recursive:true});
const browser=await chromium.launch({headless:true});
const report=[];
const desktop={width:1440,height:900};
const mobile={width:390,height:844};
const specs=[
 {route:"sprint1",sprint:1,buttons:["Drive da Sprint 1","Portal de acesso Ground Station API V1","Repositório GitHub","Subsprint #70"],teams:[{label:"Time 1",route:"sprint1/time1",number:1,meetings:5,stories:7},{label:"Time 2",route:"sprint1/time2",number:2,meetings:5,stories:4}]},
 {route:"list4",sprint:2,buttons:["Drive da Sprint 2","Repositório GitHub","US221 T1","US221 — Contrato C API"],teams:[{label:"Time 1",route:"list4/time1",number:1,meetings:3,stories:7},{label:"Time 2",route:"list4/time2",number:2,meetings:6,stories:3}]},
 {route:"list5",sprint:3,buttons:["Drive da Sprint 3","Portal de acesso Ground Station API V3","GitHub pessoal","US330 #146"],teams:[{label:"Time 3 (Time 1 + Time 2)",route:"list5/time3",number:3,meetings:4,stories:8}]}
];
const digest=b=>createHash("sha256").update(b).digest("hex");
async function start(port,route,viewport){
 const context=await browser.newContext({viewport,deviceScaleFactor:1,hasTouch:viewport.width<500,isMobile:viewport.width<500,serviceWorkers:"block"});
 await context.route("**/*",r=>r.request().url().startsWith(new URL(base(port)).origin+"/")?r.continue():r.abort());
 const page=await context.newPage(); const errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 await page.goto(base(port)+"#/"+route);
 await page.evaluate(async()=>{await document.fonts.ready;document.documentElement.style.scrollBehavior="auto";window.scrollTo({top:0,behavior:"instant"});});
 return {page,context,errors};
}
async function snapshot(page,route,tag){
 await page.locator(".sprint-page--"+({sprint1:1,list4:2,list5:3}[route])).waitFor();
 const card=page.locator(".contribution-card").first();
 await card.waitFor();
 await page.evaluate(()=>document.fonts.ready);
 const links=await card.locator(".sprint-contribution-actions a").evaluateAll(els=>els.map(el=>({text:el.textContent.trim(),href:el.getAttribute("href"),class:el.className,target:el.target,rel:el.rel,title:el.getAttribute("title")})));
 const data=await card.evaluate(el=>{
   const bounds=e=>{const b=e.getBoundingClientRect(),c=el.getBoundingClientRect();return {x:b.x-c.x,y:b.y-c.y,width:b.width,height:b.height}};
   const a=el.getBoundingClientRect();
   const style=getComputedStyle(el);
   return {text:el.textContent,html:el.innerHTML.replace(/:r[a-z0-9]+:/g,":id:"),width:a.width,height:a.height,x:a.x,y:a.y,padding:style.padding,colors:[style.backgroundColor,style.color],children:[...el.querySelectorAll("h2,.eyebrow,.sprint-contribution-summary,.sprint-read-more,.sprint-contribution-actions,.sprint-contribution-actions a,.sprint3-portal-status")].map(e=>({text:e.textContent.trim(),bounds:bounds(e),style:[getComputedStyle(e).color,getComputedStyle(e).backgroundColor,getComputedStyle(e).fontSize,getComputedStyle(e).padding]}))};
 });
 await page.mouse.move(1,1);
 const shot=await card.screenshot({path:dir+"/"+tag+".png",animations:"disabled"});
 return {links,data,hash:digest(shot)};
}
try{
 for(const [label,viewport] of [["desktop",desktop],["mobile",mobile]]){
  for(const spec of specs){
    const b=await start(4174,spec.route,viewport);
    const c=await start(4173,spec.route,viewport);
    const before=await snapshot(b.page,spec.route,`baseline-sprint${spec.sprint}-${label}`);
    assert.equal(await b.page.locator(".contribution-card h2").innerText(),["US123 — Telemetry Decoder","US221 — Telemetry Decoder","US330 — Telemetry Decoder"][spec.sprint-1],"Wrong baseline: old heading required");
    assert.equal(await c.page.locator(".contribution-card h2").innerText(),["US123 (Telemetry Decoder)","US221 (Telemetry Processing API)","US330 (Plataforma de serviços da estação de solo)"][spec.sprint-1],"Wrong candidate heading");
    const after=await snapshot(c.page,spec.route,`candidate-sprint${spec.sprint}-${label}`);
    assert.deepEqual(after.links.map(({text,...rest})=>rest),before.links.map(({text,...rest})=>rest),"Approved link destination/class/order changed");
    assert.deepEqual(after.links.map(x=>x.text),spec.buttons);
    // Text changes are authorized; compare structural styles, link metadata and bounded layout, retaining paired screenshots.
    assert.notEqual(after.hash,before.hash,"Editorial text must differ from the old raster");
    assert.equal(after.data.width,before.data.width);assert.equal(after.data.padding,before.data.padding);assert.deepEqual(after.data.colors,before.data.colors);assert.deepEqual(after.data.children.map(x=>x.style),before.data.children.map(x=>x.style));
    assert.ok(after.data.height<=before.data.height+80,"Excessive growth from approved editorial changes");
    assert.ok(after.data.children.filter(x=>x.text.includes("Ground Station API V")).length>0);
    assert.equal(await c.page.locator(".contribution-card .sprint-contribution-actions a").count(),4);
    await b.page.locator(".contribution-card .sprint-read-more").click();
    await c.page.locator(".contribution-card .sprint-read-more").click();
    assert.equal(await c.page.locator(".contribution-card .sprint-read-more").getAttribute("aria-expanded"),"true");
    const expandedBefore=await snapshot(b.page,spec.route,`baseline-expanded-sprint${spec.sprint}-${label}`);
    const expandedAfter=await snapshot(c.page,spec.route,`candidate-expanded-sprint${spec.sprint}-${label}`);
    assert.deepEqual(expandedAfter.links.map(({text,...rest})=>rest),expandedBefore.links.map(({text,...rest})=>rest));assert.equal(expandedAfter.data.width,expandedBefore.data.width);assert.equal(expandedAfter.data.padding,expandedBefore.data.padding);assert.deepEqual(expandedAfter.data.colors,expandedBefore.data.colors);
    await c.page.locator(".contribution-card .sprint-read-more").click();
    await b.context.close();
    const card=c.page.locator(".project-context-card");
    assert.equal(await card.count(),spec.teams.length?1:0);
    if(spec.teams.length){
      const buttons=card.locator("nav a");
      assert.deepEqual((await buttons.allTextContents()).map(t=>t.trim()),spec.teams.map(t=>t.label));
      for(const [i,team] of spec.teams.entries())assert.equal(await buttons.nth(i).getAttribute("href"),"#/"+team.route);
      if(spec.teams.length===2){
        const boxes=await buttons.evaluateAll(els=>els.map(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height})));
        assert.ok(Math.abs(boxes[0].w-boxes[1].w)<=1&&Math.abs(boxes[0].h-boxes[1].h)<=1);
      }
      await card.scrollIntoViewIfNeeded();
      await card.screenshot({path:dir+`/context-sprint${spec.sprint}-${label}.png`});
      const toggle=card.locator(".project-context-card__read");
      assert.equal(await toggle.getAttribute("aria-expanded"),"false");
      const old=await c.page.locator(".contribution-card").boundingBox();
      await toggle.click();
      assert.equal(await toggle.getAttribute("aria-expanded"),"true");
      assert.equal(await card.locator("[id]").isVisible(),true);
      const newBox=await c.page.locator(".contribution-card").boundingBox();
      assert.equal(newBox.height,old.height);
      await toggle.click();
      await c.page.evaluate(()=>window.scrollTo({top:0,behavior:"instant"}));
      await c.page.screenshot({path:dir+`/opening-sprint${spec.sprint}-${label}.png`});
      for(const team of spec.teams){
        await card.getByRole("link",{name:team.label,exact:true}).click();
        await c.page.waitForURL("**/#/"+team.route);
        const root=c.page.locator(".team-context-page");
        await root.waitFor();
        assert.equal(await root.getAttribute("data-team"),String(team.number));
        assert.equal(await root.locator(".team-meeting").count(),team.meetings);
        assert.equal(await root.locator(".team-story").count(),team.stories);
        assert.ok(await root.locator(".team-resource").count()>10);
        assert.equal(await root.locator("iframe").count(),0);
        assert.equal(await c.page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
        const allLinks=await root.locator("a[target='_blank']").evaluateAll(es=>es.map(a=>({href:a.href,rel:a.rel})));
        for(const a of allLinks){assert.ok(/^https:\/\/(drive\.google\.com|docs\.google\.com|github\.com|sites\.google\.com)\//.test(a.href),a.href);assert.match(a.rel,/noopener/);}
        const dates=await root.locator(".team-meeting time").evaluateAll(es=>es.map(e=>e.dateTime));
        assert.deepEqual(dates,[...dates].sort());
        const firstMeeting=root.locator(".team-meeting").first();
        await firstMeeting.locator("summary").click();
        assert.ok(await firstMeeting.locator("details").getAttribute("open")!==null);
        await firstMeeting.locator("summary").click();
        const firstStory=root.locator(".team-story").first();
        await firstStory.locator("summary").click();
        assert.ok(await firstStory.locator("details").getAttribute("open")!==null);
        await firstStory.locator("summary").click();
        await c.page.evaluate(()=>window.scrollTo({top:0,behavior:"instant"}));
        await c.page.screenshot({path:dir+`/sprint${spec.sprint}-time${team.number}-${label}.png`});
        await root.locator(".team-meeting").first().scrollIntoViewIfNeeded();
        await root.locator(".team-meeting").first().screenshot({path:dir+`/sprint${spec.sprint}-time${team.number}-meeting-${label}.png`});
        await root.locator(".team-return").click();
        await c.page.waitForURL("**/#/"+spec.route);
        await card.waitFor();
        assert.ok(await c.page.locator(".contribution-card").count()===1);
      }
    }
    assert.deepEqual(c.errors,[]);
    report.push({sprint:spec.sprint,viewport:label,baselineSha:"57761cd591c9df35fbcc5a7cbe09d1dab8a16970",baselineCardHash:before.hash,candidateCardHash:after.hash,expandedBaselineHash:expandedBefore.hash,expandedCandidateHash:expandedAfter.hash,cardWidth:before.data.width,cardHeight:before.data.height,candidateCardHeight:after.data.height,buttons:after.links.map(x=>({text:x.text,href:x.href})),baselineButtons:before.links.map(x=>({text:x.text,href:x.href})),teams:spec.teams.map(t=>t.route)});
    console.log(JSON.stringify(report.at(-1)));
    await c.context.close();
  }
 }
}finally{await writeFile(dir+"/regression.json",JSON.stringify(report,null,2));await browser.close();}
