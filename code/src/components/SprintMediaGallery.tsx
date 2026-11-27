import { useState } from "react";
import { Expand } from "lucide-react";
import ImageViewer from "./viewers/ImageViewer";
import DemandImage from "./viewers/DemandImage";
export type SprintMediaItem = { src:string; fullSrc:string; alt:string; caption:string };
export default function SprintMediaGallery({title,items,className=""}:{title:string;items:SprintMediaItem[];className?:string}){
  const [active,setActive]=useState<number|null>(null);
  return <>
    <div className={`sprint-media-gallery ${className}`.trim()} aria-label={title}>
      {items.map((item,i)=><button className="sprint-media-gallery__item" key={item.src} type="button" onClick={()=>setActive(i)} aria-label={`Ampliar ${item.caption}`}>
        <div className="sprint-media-gallery__image"><DemandImage src={item.src} alt={item.alt}/><span className="lcr-figure-expand"><Expand size={17}/> Ampliar</span></div>
        <strong>{item.caption}</strong>
      </button>)}
    </div>
    {active!==null&&<ImageViewer items={items.map(i=>({src:i.fullSrc,alt:i.alt,caption:i.caption}))} index={active} onChange={setActive} onClose={()=>setActive(null)}/>}
  </>;
}
