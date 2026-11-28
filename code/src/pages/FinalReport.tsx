import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Download, Expand, ExternalLink, ZoomIn, ZoomOut, X, Maximize, FileText } from "lucide-react";
import PdfPageReader, { scrollPdfPage } from "../components/viewers/PdfPageReader";
import { finalReport } from "../data/finalReport";
import "../styles/final-report.css";

const title="Ground Station API — Da decodificação de telemetria à plataforma de serviços da estação de solo.";
const pdf=import.meta.env.BASE_URL+finalReport.path;
const total=finalReport.pages.length;
const pageLinks=finalReport.pages.map(p=>p.links);
const highlights=[["3","Versões da Ground Station API"],["180","Pacotes RAW/PROCESSED vinculados no experimento individual"],["5","Satélites simulados"],["100%","Integridade SHA-256 no lote experimental"]];

export default function FinalReport(){
 const [open,setOpen]=useState(false),[number,setNumber]=useState(1),[zoom,setZoom]=useState(100),[original,setOriginal]=useState(false),[full,setFull]=useState(false);
 const inline=useRef<HTMLDivElement>(null),reader=useRef<HTMLDivElement>(null),modal=useRef<HTMLDivElement>(null),trigger=useRef<HTMLButtonElement>(null),close=useRef<HTMLButtonElement>(null);
 const inlinePage=useRef(1),resume=useRef(1),drag=useRef<{x:number;y:number;left:number;top:number}|null>(null);
 const scale=(delta:number)=>setZoom(z=>Math.min(300,Math.max(75,z+delta)));
 const show=()=>{resume.current=inlinePage.current;setNumber(resume.current);setZoom(100);setOriginal(false);setOpen(true)};
 const hide=()=>{if(document.fullscreenElement===modal.current)void document.exitFullscreen().catch(()=>{});setOpen(false);setFull(false)};
 useEffect(()=>{if(!open)return;document.body.classList.add("modal-open");close.current?.focus();
 const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape"){if(document.fullscreenElement===modal.current)void document.exitFullscreen().catch(()=>{});setOpen(false);setFull(false);return}if(e.ctrlKey&&(e.key==="+"||e.key==="="||e.key==="-")&&reader.current){e.preventDefault();setZoom(z=>Math.min(300,Math.max(75,z+(e.key==="-"?-25:25))))}if(e.key==="Tab"&&modal.current){const els=Array.from(modal.current.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],iframe,[tabindex="0"]'));const first=els[0],last=els[els.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}};
 const onFull=()=>setFull(document.fullscreenElement===modal.current);
 document.addEventListener("keydown",onKey);document.addEventListener("fullscreenchange",onFull);
 return()=>{document.body.classList.remove("modal-open");document.removeEventListener("keydown",onKey);document.removeEventListener("fullscreenchange",onFull);trigger.current?.focus()};},[open]);
 useLayoutEffect(()=>{if(open&&!original)scrollPdfPage(reader.current,resume.current)},[open,original,zoom]);
 const toggleFull=async()=>{try{if(document.fullscreenElement===modal.current)await document.exitFullscreen();else await modal.current?.requestFullscreen()}catch{setFull(v=>!v)}};
 const toggleOriginal=()=>{resume.current=number;setOriginal(v=>!v)};
 const changeZoom=(delta:number)=>{resume.current=number;scale(delta)};
 return <div className="final-report-page">
 <section className="compact-list-header"><div className="container final-report-heading"><span>CE-235 · ITA · SPRB-TR/BD · 2026/2</span><h1>Relatório Final</h1><p>{title}</p></div></section>
 <section className="container final-report-document" aria-label="Visualização do relatório final">
 <div className="drive-file-preview-card final-report-cover">
 <div className="drive-file-preview-card__viewer drive-file-preview-card__viewer--pages final-report-scroll">
 <PdfPageReader previewKey="final-report" title="Relatório Final" href={pdf} readerRef={inline} pageLinks={pageLinks} onPageChange={n=>{inlinePage.current=n}}/>
 </div>
 <button ref={trigger} type="button" className="final-report-hover" onClick={show} aria-label="Ampliar relatório"><Expand size={18}/> Clique para ampliar</button>
 </div>
 <div className="final-report-actions"><button className="button button--secondary" onClick={show}><Expand size={16}/> Ampliar relatório</button><a className="button button--primary" href={pdf} download={finalReport.fileName}><Download size={16}/> Baixar PDF</a><a className="button button--secondary" href={finalReport.drive} target="_blank" rel="noopener noreferrer">Acessar no Google Drive <ExternalLink size={15}/></a></div>
 </section>
 <section className="container final-report-highlights"><h2>Principais destaques</h2><div className="final-report-metrics">{highlights.map(([value,label])=><div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><small>Resultados históricos do experimento individual de 21/11/2026, realizado com telemetria simulada.</small><p>O trabalho consolidou a evolução da Ground Station API ao longo das três Sprints, desde a recepção e validação de telemetria até a implantação de uma plataforma de serviços na infraestrutura da estação de solo.</p></section>
 {open&&<div className="pdf-modal final-report-modal" role="dialog" aria-modal="true" aria-label="Visualizador do relatório final" onMouseDown={e=>{if(e.target===e.currentTarget)hide()}}>
 <div ref={modal} className={"pdf-modal__panel pdf-modal__panel--pages final-report-panel"+(full?" final-report-panel--full":"")}>
 <div className="pdf-modal__bar final-report-toolbar">
 <div className="final-report-tools" aria-label="Navegação e zoom">
 <span aria-live="polite">Página {number} / {total}</span>
 <button disabled={original||zoom===75} onClick={()=>changeZoom(-25)} aria-label="Diminuir zoom"><ZoomOut size={19}/></button>
 <button disabled={original} onClick={()=>{resume.current=number;setZoom(100)}} aria-label="Ajustar zoom"><output>{zoom}%</output></button>
 <button disabled={original||zoom===300} onClick={()=>changeZoom(25)} aria-label="Aumentar zoom"><ZoomIn size={19}/></button></div>
 <div className="final-report-tools"><button onClick={toggleOriginal} aria-pressed={original} aria-label={original?"Voltar à prévia":"Ler PDF original"}><FileText size={18}/><span>{original?"Prévia":"PDF original"}</span></button><a href={pdf} download={finalReport.fileName} aria-label="Baixar PDF"><Download size={19}/></a><button aria-label="Alternar tela cheia" aria-pressed={full} onClick={()=>void toggleFull()}><Maximize size={19}/></button><button ref={close} onClick={hide} aria-label="Fechar"><X size={22}/></button></div>
 </div>
 {original?<div className="final-report-native"><iframe title="PDF original — relatório final" src={pdf+"#page="+resume.current+"&view=FitH"}/><a href={pdf+"#page="+resume.current} target="_blank" rel="noopener noreferrer">Abrir PDF original em nova aba <ExternalLink size={15}/></a></div>:<div className="final-report-stage" data-zoom={zoom} onPointerDown={e=>{if(zoom<=100||e.pointerType!=="mouse"||(e.target as HTMLElement).closest("a,button")||!reader.current)return;drag.current={x:e.clientX,y:e.clientY,left:reader.current.scrollLeft,top:reader.current.scrollTop};e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>{if(!drag.current||!reader.current)return;reader.current.scrollLeft=drag.current.left+drag.current.x-e.clientX;reader.current.scrollTop=drag.current.top+drag.current.y-e.clientY}} onPointerUp={()=>{drag.current=null}} onPointerCancel={()=>{drag.current=null}}>
 <PdfPageReader previewKey="final-report" title="Relatório Final" href={pdf} readerRef={reader} pageLinks={pageLinks} onPageChange={n=>{resume.current=n;setNumber(n)}} pageStyle={{width:`${zoom}%`,maxWidth:"none"}}/>
 </div>}
 </div></div>}
 </div>
}
