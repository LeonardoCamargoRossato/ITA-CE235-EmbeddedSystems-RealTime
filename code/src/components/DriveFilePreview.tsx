import { useEffect, useRef, useState } from "react";
import { ExternalLink, Expand, FileText, X } from "lucide-react";
import {labDocuments} from "../data/labDocuments";
import CompactPdfPreview from "./viewers/CompactPdfPreview";
import type { PdfPageLink } from "./viewers/PdfPageReader";
import PdfPageReader from "./viewers/PdfPageReader";
import type { PdfPreviewKey } from "../data/pdfPreviews";

type Props={title:string;fileName:string;description:string;fileId?:string;localSrc?:string;fallbackHref:string;buttonLabel?:string;large?:boolean;fitMode?:"width";pagePreview?:PdfPreviewKey;compact?:boolean;landscape?:boolean;pageLinks?:PdfPageLink[][];downloadHref?:string};

export default function DriveFilePreview({title,fileName,description,fileId,localSrc,fallbackHref,buttonLabel="Abrir PDF",large=false,fitMode,pagePreview,compact=false,landscape=false,pageLinks,downloadHref}:Props){
 const localLab=fileId?labDocuments[fileId]:undefined;
 const [open,setOpen]=useState(false);
 const expand=useRef<HTMLButtonElement>(null),close=useRef<HTMLButtonElement>(null);
 const rawPreview=fileId?`https://drive.google.com/file/d/${fileId}/preview`:localSrc;
 const preview=rawPreview&&fitMode==="width"&&!fileId?`${rawPreview}#toolbar=0&navpanes=0&view=FitH&zoom=page-width`:rawPreview;
 const href=fileId?`https://drive.google.com/file/d/${fileId}/view`:(localSrc??fallbackHref);
 const hasPreview=Boolean(pagePreview||preview);
 useEffect(()=>{if(!open)return; const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false)}; document.addEventListener("keydown",onKey); document.body.classList.add("modal-open"); close.current?.focus(); return()=>{document.removeEventListener("keydown",onKey);document.body.classList.remove("modal-open");expand.current?.focus()}},[open]);
 if(localLab){const local=import.meta.env.BASE_URL+localLab.path;return <article className="drive-file-preview-card lab-local-document" data-lab-document={localLab.key}><CompactPdfPreview title={title} previewKey={localLab.key} href={local} originalSrc={local} fileName={fileName} pageLinks={localLab.pageLinks}/><div className="drive-file-preview-card__body"><h3>{title}</h3><small className="drive-file-preview-card__filename">{fileName}</small><p>{description}</p><a className="button button--secondary" href={href} target="_blank" rel="noopener noreferrer">Original no Drive <ExternalLink size={14}/></a></div></article>}
 if(compact&&pagePreview)return <CompactPdfPreview title={title} previewKey={pagePreview} href={href} originalSrc={rawPreview} fileName={fileName} pageLinks={pageLinks} landscape={landscape} downloadHref={downloadHref}/>;
 return <>
  <article className={`drive-file-preview-card${large?" drive-file-preview-card--large":""}`}>
   <div className={`drive-file-preview-card__viewer${pagePreview?" drive-file-preview-card__viewer--pages":""}`}>{pagePreview?<PdfPageReader previewKey={pagePreview} title={title} href={href}/>:preview?<iframe src={preview} title={`PDF — ${title}`} loading="lazy" allow="autoplay"/>:<div className="drive-file-preview-card__fallback"><FileText size={34}/><span>Preview individual pendente</span></div>}</div>
   <div className="drive-file-preview-card__body"><span className="file-type-pill">PDF</span><h3>{title}</h3><small className="drive-file-preview-card__filename" title={fileName}>{fileName}</small><p>{description}</p>
    <div className="preview-actions"><a className="button button--primary" href={href} target="_blank" rel="noopener noreferrer">{buttonLabel} <ExternalLink size={14}/></a>
    {hasPreview&&<button ref={expand} className="button button--secondary" onClick={()=>setOpen(true)}>Expandir <Expand size={14}/></button>}</div>
   </div>
  </article>
  {open&&hasPreview&&<div className="pdf-modal" role="dialog" aria-modal="true" aria-label={title} onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false)}}>
   <div className={`pdf-modal__panel${pagePreview?" pdf-modal__panel--pages":""}`}><div className="pdf-modal__bar"><strong>{title}</strong><div><a href={href} target="_blank" rel="noopener noreferrer">Abrir PDF <ExternalLink size={14}/></a><button ref={close} onClick={()=>setOpen(false)} aria-label="Fechar"><X size={22}/></button></div></div>{pagePreview?<PdfPageReader previewKey={pagePreview} title={title} href={href}/>:<iframe src={preview} title={`${title} — tela cheia`} allow="autoplay"/>}</div>
  </div>}
 </>;
}