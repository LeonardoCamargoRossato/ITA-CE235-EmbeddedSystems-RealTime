import { useEffect, useRef, useState } from "react";
import { Download, Expand, ExternalLink, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, X, Maximize, FileText } from "lucide-react";
import { PdfPage } from "../components/viewers/PdfPageReader";
import { finalReport } from "../data/finalReport";
import "../styles/final-report.css";

const title="Ground Station API — Da decodificação de telemetria à plataforma de serviços da estação de solo.";
const pdf=import.meta.env.BASE_URL+finalReport.path;
const total=finalReport.pages.length;
const highlights=[["3","Versões da Ground Station API"],["180","Pacotes RAW/PROCESSED vinculados no experimento individual"],["5","Satélites simulados"],["100%","Integridade SHA-256 no lote experimental"]];

export default function FinalReport(){
 const [open,setOpen]=useState(false),[number,setNumber]=useState(1),[zoom,setZoom]=useState(100),[original,setOriginal]=useState(false),[full,setFull]=useState(false);
 const modal=useRef<HTMLDivElement>(null),stage=useRef<HTMLDivElement>(null),trigger=useRef<HTMLButtonElement>(null),close=useRef<HTMLButtonElement>(null);
 const drag=useRef<{x:number;y:number;left:number;top:number}|null>(null);
 const change=(n:number)=>setNumber(Math.min(total,Math.max(1,n)));
 const scale=(delta:number)=>setZoom(z=>Math.min(300,Math.max(75,z+delta)));
 const show=()=>{setNumber(1);setZoom(100);setOriginal(false);setOpen(true)};
 const hide=()=>{if(document.fullscreenElement===modal.current)void document.exitFullscreen().catch(()=>{});setOpen(false);setFull(false)};
 useEffect(()=>{if(!open)return;const before=document.body.style.overflow;document.body.style.overflow="hidden";close.current?.focus();
 const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(false);setFull(false);return}if(original||e.target instanceof HTMLInputElement)return;if(e.key==="ArrowRight"){e.preventDefault();setNumber(n=>Math.min(total,n+1))}if(e.key==="ArrowLeft"){e.preventDefault();setNumber(n=>Math.max(1,n-1))}if(e.ctrlKey&&(e.key==="+"||e.key==="="||e.key==="-")){e.preventDefault();setZoom(z=>Math.min(300,Math.max(75,z+(e.key==="-"?-25:25))))}if(e.key==="Tab"&&modal.current){const els=Array.from(modal.current.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input,iframe,[tabindex="0"]'));const first=els[0],last=els[els.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}};
 const onFull=()=>setFull(document.fullscreenElement===modal.current);
 document.addEventListener("keydown",onKey);document.addEventListener("fullscreenchange",onFull);
 return()=>{document.body.style.overflow=before;document.removeEventListener("keydown",onKey);document.removeEventListener("fullscreenchange",onFull);trigger.current?.focus()};},[open,original]);
 useEffect(()=>{if(stage.current){stage.current.scrollTop=0;stage.current.scrollLeft=0}},[number,original]);
 const toggleFull=async()=>{try{if(document.fullscreenElement===modal.current)await document.exitFullscreen();else await modal.current?.requestFullscreen()}catch{setFull(v=>!v)}};
 return <div className="final-report-page">
 <section className="compact-list-header"><div className="container final-report-heading"><span>CE-235 · ITA · SPRB-TR/BD · 2026/2</span><h1>Relatório Final</h1><p>{title}</p></div></section>
 <section className="container final-report-document" aria-label="Visualização do relatório final">
 <button ref={trigger} type="button" className="final-report-cover" onClick={show} aria-label="Ampliar relatório">
 <PdfPage page={finalReport.pages[0]} number={1} title="Relatório Final" href={pdf}/>
 <span className="final-report-hover"><Expand size={18}/> Clique para ampliar</span>
 </button>
 <div className="final-report-actions"><a className="button button--primary" href={pdf} download={finalReport.fileName}><Download size={16}/> Baixar PDF</a><a className="button button--secondary" href={finalReport.drive} target="_blank" rel="noopener noreferrer">Acessar no Google Drive <ExternalLink size={15}/></a></div>
 </section>
 <section className="container final-report-highlights"><h2>Principais destaques</h2><div className="final-report-metrics">{highlights.map(([value,label])=><div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><small>Resultados históricos do experimento individual de 21/11/2026, realizado com telemetria simulada.</small><p>O trabalho consolidou a evolução da Ground Station API ao longo das três Sprints, desde a recepção e validação de telemetria até a implantação de uma plataforma de serviços na infraestrutura da estação de solo.</p></section>
 {open&&<div className="pdf-modal final-report-modal" role="dialog" aria-modal="true" aria-label="Visualizador do relatório final" onMouseDown={e=>{if(e.target===e.currentTarget)hide()}}>
 <div ref={modal} className={"pdf-modal__panel final-report-panel"+(full?" final-report-panel--full":"")}>
 <div className="pdf-modal__bar final-report-toolbar">
 <div className="final-report-tools" aria-label="Navegação e zoom">
 <button disabled={original||number===1} onClick={()=>change(number-1)} aria-label="Página anterior"><ChevronLeft size={20}/></button>
 <span aria-live="polite">Página <input type="number" min={1} max={total} value={number} disabled={original} onChange={e=>change(Number(e.target.value)||1)} aria-label="Página atual"/> / {total}</span>
 <button disabled={original||number===total} onClick={()=>change(number+1)} aria-label="Próxima página"><ChevronRight size={20}/></button>
 <button disabled={original||zoom===75} onClick={()=>scale(-25)} aria-label="Diminuir zoom"><ZoomOut size={19}/></button>
 <button disabled={original} onClick={()=>setZoom(100)} aria-label="Ajustar zoom"><output>{zoom}%</output></button>
 <button disabled={original||zoom===300} onClick={()=>scale(25)} aria-label="Aumentar zoom"><ZoomIn size={19}/></button></div>
 <div className="final-report-tools"><button onClick={()=>setOriginal(v=>!v)} aria-pressed={original} aria-label={original?"Voltar à prévia":"Ler PDF original"}><FileText size={18}/><span>{original?"Prévia":"PDF original"}</span></button><a href={pdf} download={finalReport.fileName} aria-label="Baixar PDF"><Download size={19}/></a><button aria-label="Alternar tela cheia" aria-pressed={full} onClick={()=>void toggleFull()}><Maximize size={19}/></button><button ref={close} onClick={hide} aria-label="Fechar"><X size={22}/></button></div>
 </div>
 {original?<div className="final-report-native"><iframe title="PDF original — relatório final" src={pdf+"#page="+number+"&view=FitH"}/><a href={pdf+"#page="+number} target="_blank" rel="noopener noreferrer">Abrir PDF original em nova aba <ExternalLink size={15}/></a></div>:<div ref={stage} className="final-report-stage" data-zoom={zoom} onPointerDown={e=>{if(zoom<=100||e.pointerType!=="mouse"||(e.target as HTMLElement).closest("a,button"))return;drag.current={x:e.clientX,y:e.clientY,left:e.currentTarget.scrollLeft,top:e.currentTarget.scrollTop};e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>{if(!drag.current)return;e.currentTarget.scrollLeft=drag.current.left+drag.current.x-e.clientX;e.currentTarget.scrollTop=drag.current.top+drag.current.y-e.clientY}} onPointerUp={()=>{drag.current=null}} onPointerCancel={()=>{drag.current=null}}><PdfPage key={number} page={finalReport.pages[number-1]} number={number} title="Relatório Final" href={pdf} links={finalReport.pages[number-1].links} onNavigate={change} style={{width:zoom+"%",maxWidth:"none"}}/></div>}
 </div></div>}
 </div>
}
