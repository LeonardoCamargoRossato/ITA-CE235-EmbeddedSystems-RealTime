import {useEffect,useLayoutEffect,useRef,useState} from "react";
import {Download,Expand,ExternalLink,ZoomIn,ZoomOut,X,Maximize,FileText} from "lucide-react";
import PdfPageReader,{scrollPdfPage,type PdfPageLink} from "./PdfPageReader";
import {pdfPreviews,type PdfPreviewKey} from "../../data/pdfPreviews";
import "../../styles/final-report.css";
type Props={title:string;previewKey:PdfPreviewKey;href:string;originalSrc?:string;fileName:string;pageLinks?:PdfPageLink[][];landscape?:boolean;downloadHref?:string};
export default function CompactPdfPreview({title,previewKey,href,originalSrc=href,fileName,pageLinks,landscape=false,downloadHref=href}:Props){
 const total=pdfPreviews[previewKey].length;const pdf=href;
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

 return <div className="home-pdf-preview">
 <div className={"final-report-cover home-pdf-frame"+(landscape?" home-pdf-frame--landscape":"")}>
 <div className="drive-file-preview-card__viewer drive-file-preview-card__viewer--pages home-pdf-scroll"><PdfPageReader previewKey={previewKey} title={title} href={pdf} readerRef={inline} pageLinks={pageLinks} onPageChange={n=>{inlinePage.current=n}}/></div>
 <button ref={trigger} className="final-report-hover" type="button" onClick={show} aria-label={"Ampliar "+title}><Expand size={16}/> Clique para ampliar</button>
 </div><div className="home-pdf-actions"><button type="button" onClick={show}><Expand size={14}/> Ampliar</button><a href={href} target="_blank" rel="noopener noreferrer">PDF original <ExternalLink size={14}/></a></div>
  {open&&<div className="pdf-modal final-report-modal" role="dialog" aria-modal="true" aria-label={"Visualizador — "+title} onMouseDown={e=>{if(e.target===e.currentTarget)hide()}}>
 <div ref={modal} className={"pdf-modal__panel pdf-modal__panel--pages final-report-panel"+(full?" final-report-panel--full":"")}>
 <div className="pdf-modal__bar final-report-toolbar">
 <div className="final-report-tools" aria-label="Navegação e zoom">
 <span aria-live="polite">Página {number} / {total}</span><button type="button" disabled={original||number<=1} aria-label="Página anterior" onClick={()=>scrollPdfPage(reader.current,number-1)}>‹</button><button type="button" disabled={original||number>=total} aria-label="Próxima página" onClick={()=>scrollPdfPage(reader.current,number+1)}>›</button>
 <button disabled={original||zoom===75} onClick={()=>changeZoom(-25)} aria-label="Diminuir zoom"><ZoomOut size={19}/></button>
 <button disabled={original} onClick={()=>{resume.current=number;setZoom(100)}} aria-label="Ajustar zoom"><output>{zoom}%</output></button>
 <button disabled={original||zoom===300} onClick={()=>changeZoom(25)} aria-label="Aumentar zoom"><ZoomIn size={19}/></button></div>
 <div className="final-report-tools"><button onClick={toggleOriginal} aria-pressed={original} aria-label={original?"Voltar à prévia":"Ler PDF original"}><FileText size={18}/><span>{original?"Prévia":"PDF original"}</span></button><a href={downloadHref} download={fileName} target="_blank" rel="noopener noreferrer" aria-label="Baixar PDF"><Download size={19}/></a><button aria-label="Alternar tela cheia" aria-pressed={full} onClick={()=>void toggleFull()}><Maximize size={19}/></button><button ref={close} onClick={hide} aria-label="Fechar"><X size={22}/></button></div>
 </div>
 {original?<div className="final-report-native"><iframe title={"PDF original — "+title} src={originalSrc+"#page="+resume.current+"&view=FitH"}/><a href={pdf+"#page="+resume.current} target="_blank" rel="noopener noreferrer">Abrir PDF original em nova aba <ExternalLink size={15}/></a></div>:<div className="final-report-stage" data-zoom={zoom} onPointerDown={e=>{if(zoom<=100||e.pointerType!=="mouse"||(e.target as HTMLElement).closest("a,button")||!reader.current)return;drag.current={x:e.clientX,y:e.clientY,left:reader.current.scrollLeft,top:reader.current.scrollTop};e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>{if(!drag.current||!reader.current)return;reader.current.scrollLeft=drag.current.left+drag.current.x-e.clientX;reader.current.scrollTop=drag.current.top+drag.current.y-e.clientY}} onPointerUp={()=>{drag.current=null}} onPointerCancel={()=>{drag.current=null}}>
 <PdfPageReader previewKey={previewKey} title={title} href={pdf} readerRef={reader} pageLinks={pageLinks} onPageChange={n=>{resume.current=n;setNumber(n)}} pageStyle={{width:`${zoom}%`,maxWidth:"none"}}/>
 </div>}
 </div></div>}
 </div>
}
