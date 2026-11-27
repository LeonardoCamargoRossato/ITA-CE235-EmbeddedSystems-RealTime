import { useState } from "react";
import { ExternalLink, Images, Expand } from "lucide-react";
import ImageViewer from "./viewers/ImageViewer";
import DemandImage from "./viewers/DemandImage";
type EvidenceItem={src:string;fullSrc:string;alt:string;caption:string};
type Props={title:string;folderHref:string;folderEmbed:string;items?:EvidenceItem[]};
export default function EvidenceGallery({title,folderHref,folderEmbed,items=[]}:Props){
  const [active,setActive]=useState<number|null>(null);
  if(!items.length)return <article className="evidence-gallery">
    <div className="evidence-gallery__heading"><span><Images size={19}/></span><div><h3>{title}</h3><p>As imagens permanecem no Google Drive, com acesso conforme as permissões existentes.</p></div></div>
    <div className="evidence-gallery__folder"><iframe src={folderEmbed} title={`Evidências — ${title}`} loading="lazy" referrerPolicy="no-referrer"/></div>
    <a className="button button--secondary" href={folderHref} target="_blank" rel="noopener noreferrer">Abrir pasta de evidências <ExternalLink size={14}/></a>
  </article>;
  return <article className="evidence-gallery">
    <div className="evidence-gallery__heading"><span><Images size={19}/></span><h3>{title}</h3></div>
    <div className="sprint-media-gallery">{items.map((item,i)=><button key={item.src} type="button" className="sprint-media-gallery__item" aria-label={`Ampliar ${item.caption}`} onClick={()=>setActive(i)}><div className="sprint-media-gallery__image"><DemandImage src={item.src} alt={item.alt}/><span className="lcr-figure-expand"><Expand size={17}/> Ampliar</span></div><strong>{item.caption}</strong></button>)}</div>
    {active!==null&&<ImageViewer items={items.map(i=>({src:i.fullSrc,alt:i.alt,caption:i.caption}))} index={active} onChange={setActive} onClose={()=>setActive(null)}/>}
  </article>;
}
