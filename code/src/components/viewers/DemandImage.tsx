import { useEffect, useRef, useState } from "react";
export default function DemandImage({src,alt,className="",ratio=false}:{src:string;alt:string;className?:string;ratio?:boolean}){
  const ref=useRef<HTMLSpanElement>(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    if(typeof IntersectionObserver==="undefined"){setVisible(true);return;}
    const observer=new IntersectionObserver(entries=>setVisible(entries.some(e=>e.isIntersecting && e.intersectionRatio>0)),{rootMargin:"0px",threshold:0});
    observer.observe(el);return()=>observer.disconnect();
  },[]);
  return <span ref={ref} className={`lcr-demand-image${ratio?" lcr-demand-image--ratio":""} ${className}`}>
    {visible&&<img src={src} alt={alt} decoding="async" loading="lazy"/>}
  </span>;
}
