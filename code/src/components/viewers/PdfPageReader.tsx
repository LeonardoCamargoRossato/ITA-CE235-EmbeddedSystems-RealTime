import { useEffect, useRef, useState } from "react";
import { pdfPreviews, type PdfPreviewKey } from "../../data/pdfPreviews";
import "./PdfPageReader.css";

type Page = {path:string;width:number;height:number};

function PdfPage({page,number,title,href}:{page:Page;number:number;title:string;href:string}){
  const ref=useRef<HTMLDivElement>(null);
  const [visible,setVisible]=useState(false);
  const [failed,setFailed]=useState(false);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    if(typeof IntersectionObserver==="undefined"){setVisible(true);return;}
    const observer=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting&&entry.intersectionRatio>0)){setVisible(true);observer.disconnect();}
    },{rootMargin:"0px",threshold:0});
    observer.observe(el);
    return()=>observer.disconnect();
  },[]);
  return <div ref={ref} className="pdf-page-reader__page" style={{aspectRatio:`${page.width} / ${page.height}`}} data-page={number}>
    {visible&&!failed&&<img src={`${import.meta.env.BASE_URL}${page.path}`} width={page.width} height={page.height} alt={`${title} — página ${number}`} decoding="async" onError={()=>setFailed(true)}/>}
    {failed&&<p role="alert">Não foi possível exibir a página {number}. <a href={href} target="_blank" rel="noopener noreferrer">Abrir PDF original</a>.</p>}
  </div>;
}

export default function PdfPageReader({previewKey,title,href}:{previewKey:PdfPreviewKey;title:string;href:string}){
  return <div className="pdf-page-reader" tabIndex={0} role="region" aria-label={`Leitura integral — ${title}`} data-pdf-preview={previewKey}>
    {pdfPreviews[previewKey].map((page,i)=><PdfPage key={page.path} page={page} number={i+1} title={title} href={href}/>)}
  </div>;
}
