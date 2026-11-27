import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import ImageViewer from "./viewers/ImageViewer";
import DemandImage from "./viewers/DemandImage";
export type SprintEvidenceItem={label:string;alt:string;src:string;fullSrc:string};
export function SprintSpriteFigure({src,fullSrc,caption,alt}:{src:string;fullSrc:string;caption:string;alt:string}){
  const [open,setOpen]=useState(false);
  return <>
    <article className="sprint-main-figure">
      <button type="button" className="sprint-main-figure__media" onClick={()=>setOpen(true)} aria-label={`Ampliar ${caption}`}>
        <DemandImage src={src} alt={alt}/><span><Expand size={17}/> Ampliar</span>
      </button><strong>{caption}</strong>
    </article>
    {open&&<ImageViewer items={[{src:fullSrc,caption,alt}]} index={0} onClose={()=>setOpen(false)}/>}
  </>;
}
export default function SprintEvidenceCarousel({items,title}:{items:SprintEvidenceItem[];title:string}){
  const [index,setIndex]=useState(0);
  const [open,setOpen]=useState(false);
  const item=items[index];
  if(!item)return null;
  const previous=()=>setIndex(i=>(i-1+items.length)%items.length);
  const next=()=>setIndex(i=>(i+1)%items.length);
  return <>
    <section className="sprint-evidence-carousel" aria-label={title}>
      <div className="sprint-evidence-carousel__topline"><strong>{title}</strong><span>{index+1} / {items.length}</span></div>
      <div className="sprint-evidence-carousel__stage">
        <button className="sprint-evidence-carousel__arrow sprint-evidence-carousel__arrow--left" type="button" onClick={previous} aria-label="Imagem anterior"><ChevronLeft size={28}/></button>
        <button className="sprint-evidence-carousel__media" type="button" onClick={()=>setOpen(true)} aria-label={`Ampliar ${item.label}`}><DemandImage key={item.src} src={item.src} alt={item.alt}/><span className="sprint-evidence-carousel__expand"><Expand size={17}/> Ampliar</span></button>
        <button className="sprint-evidence-carousel__arrow sprint-evidence-carousel__arrow--right" type="button" onClick={next} aria-label="Próxima imagem"><ChevronRight size={28}/></button>
      </div>
      <div className="sprint-evidence-carousel__caption">{item.label}</div>
      <div className="sprint-evidence-carousel__dots" aria-label="Selecionar imagem do carrossel">{items.map((entry,i)=><button type="button" key={entry.src} className={i===index?"is-active":""} onClick={()=>setIndex(i)} aria-label={`Ver ${entry.label}`} aria-current={i===index?"true":undefined}/>)}</div>
    </section>
    {open&&<ImageViewer items={items.map(i=>({src:i.fullSrc,alt:i.alt,caption:i.label}))} index={index} onChange={setIndex} onClose={()=>setOpen(false)}/>}
  </>;
}
