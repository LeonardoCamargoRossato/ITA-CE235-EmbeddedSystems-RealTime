import { useState } from "react";
import { Expand } from "lucide-react";
import ImageViewer from "../viewers/ImageViewer";
import DemandImage from "../viewers/DemandImage";
export default function ZoomableImage({src,fullSrc,caption,alt,className="sprint3-evidence"}:{src:string;fullSrc:string;caption:string;alt:string;className?:string}){
  const [open,setOpen]=useState(false);
  return <figure className={className}>
    <button type="button" onClick={()=>setOpen(true)} aria-label={`Ampliar: ${caption}`}>
      <DemandImage src={src} alt={alt} ratio/><span className="lcr-figure-expand"><Expand size={16}/> Ampliar</span>
    </button><figcaption>{caption}</figcaption>
    {open&&<ImageViewer items={[{src:fullSrc,caption,alt}]} index={0} onClose={()=>setOpen(false)}/>}
  </figure>;
}
