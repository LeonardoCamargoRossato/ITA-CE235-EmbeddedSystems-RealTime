import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { ChevronLeft, ChevronRight, Download, Maximize2, Minimize2, X, ZoomIn, ZoomOut } from "lucide-react";
import "./ImageViewer.css";

export type ViewerItem = { src: string; alt: string; caption: string; downloadName?: string };
type Point = { x: number; y: number };
const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi,n));
const distance = (a: Point,b: Point) => Math.hypot(a.x-b.x,a.y-b.y);

export default function ImageViewer({items,index,onChange,onClose}: {items: ViewerItem[];index: number;onChange?: (i:number)=>void;onClose:()=>void}) {
  const current=items[index];
  const dialog=useRef<HTMLDialogElement>(null);
  const closeButton=useRef<HTMLButtonElement>(null);
  const stage=useRef<HTMLDivElement>(null);
  const img=useRef<HTMLImageElement>(null);
  const pointers=useRef(new Map<number,Point>());
  const [zoom,setZoom]=useState(1);
  const [pan,setPan]=useState<Point>({x:0,y:0});
  const [maximized,setMaximized]=useState(false);
  const [fullscreen,setFullscreen]=useState(false);
  const [failed,setFailed]=useState(false);
  const changeZoom=(next:number)=>{const z=clamp(next,.5,4);setZoom(z);if(z<=1)setPan({x:0,y:0});else setPan(p=>bound(p,z));};
  function bound(p:Point,z:number):Point {
    const box=stage.current, image=img.current;
    if(!box||!image||z<=1)return {x:0,y:0};
    const limitX=Math.max(0,(image.clientWidth*z-box.clientWidth)/2);
    const limitY=Math.max(0,(image.clientHeight*z-box.clientHeight)/2);
    return {x:clamp(p.x,-limitX,limitX),y:clamp(p.y,-limitY,limitY)};
  }
  const move=(delta:number)=>onChange?.((index+delta+items.length)%items.length);
  useEffect(()=>{
    const el=dialog.current; if(!el)return;
    const focused=document.activeElement as HTMLElement|null;
    const overflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    el.showModal();closeButton.current?.focus();
    const sync=()=>setFullscreen(document.fullscreenElement===el);
    document.addEventListener("fullscreenchange",sync);
    return ()=>{
      document.removeEventListener("fullscreenchange",sync);
      if(document.fullscreenElement===el)void document.exitFullscreen().catch(()=>{});
      if(el.open)el.close();
      document.body.style.overflow=overflow;
      focused?.focus();
    };
  },[]);
  useEffect(()=>{setZoom(1);setPan({x:0,y:0});setFailed(false);pointers.current.clear();},[current?.src]);
  useEffect(()=>{
    const el=stage.current;if(!el)return;
    const wheel=(e:WheelEvent)=>{e.preventDefault();changeZoom(zoom+(e.deltaY<0?.1:-.1));};
    el.addEventListener("wheel",wheel,{passive:false});
    return()=>el.removeEventListener("wheel",wheel);
  },[zoom]);
  useEffect(()=>{
    const resize=()=>setPan(p=>bound(p,zoom));
    window.addEventListener("resize",resize);return()=>window.removeEventListener("resize",resize);
  },[zoom]);
  function pointerDown(e:ReactPointerEvent<HTMLDivElement>){
    if(e.pointerType==="mouse"&&e.button!==0)return;
    pointers.current.set(e.pointerId,{x:e.clientX,y:e.clientY});
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function pointerMove(e:ReactPointerEvent<HTMLDivElement>){
    const old=pointers.current.get(e.pointerId);if(!old)return;
    const next={x:e.clientX,y:e.clientY};
    const other=[...pointers.current.entries()].find(([id])=>id!==e.pointerId)?.[1];
    pointers.current.set(e.pointerId,next);
    if(other){const d=distance(old,other);if(d>0)changeZoom(zoom*distance(next,other)/d);}
    else if(zoom>1)setPan(p=>bound({x:p.x+next.x-old.x,y:p.y+next.y-old.y},zoom));
  }
  function pointerEnd(e:ReactPointerEvent<HTMLDivElement>){
    pointers.current.delete(e.pointerId);
    if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);
  }
  async function toggleFullscreen(){
    if(document.fullscreenElement===dialog.current){await document.exitFullscreen().catch(()=>{});return;}
    if(maximized){setMaximized(false);return;}
    try{if(!dialog.current?.requestFullscreen)throw new Error("unsupported");await dialog.current.requestFullscreen();}
    catch{setMaximized(true);}
  }
  if(!current)return null;
  return <dialog ref={dialog} className={`lcr-viewer${maximized?" is-maximized":""}`} aria-label="Visualizador de imagens"
    onCancel={e=>{e.preventDefault();onClose();}}
    onClick={e=>{if(e.target===dialog.current)onClose();}}
    onKeyDown={e=>{
      if(e.key==="Escape"){e.preventDefault();onClose();}
      else if(e.key==="+"||e.key==="="){e.preventDefault();changeZoom(zoom+.25);}
      else if(e.key==="-"){e.preventDefault();changeZoom(zoom-.25);}
      else if(e.key==="0"&&e.ctrlKey){e.preventDefault();changeZoom(1);}
      else if(e.key==="ArrowLeft"&&items.length>1){e.preventDefault();move(-1);}
      else if(e.key==="ArrowRight"&&items.length>1){e.preventDefault();move(1);}
    }}>
    <div className="lcr-viewer-panel">
      <div className="lcr-viewer-header">
        <strong>{current.caption}</strong>
        {items.length>1&&<span className="lcr-viewer-counter">{index+1} / {items.length}</span>}
        <div className="lcr-viewer-toolbar" aria-label="Controles da imagem">
          <button type="button" aria-label="Aumentar zoom" title="Aumentar zoom (Ctrl +)" disabled={zoom>=4} onClick={()=>changeZoom(zoom+.25)}><ZoomIn size={20}/></button>
          <button type="button" className="lcr-zoom-value" aria-label="Ajustar à área disponível" title="Ajustar à área disponível" onClick={()=>{changeZoom(1);setPan({x:0,y:0});}}><output aria-live="polite">{Math.round(zoom*100)}%</output></button>
          <button type="button" aria-label="Diminuir zoom" title="Diminuir zoom (Ctrl −)" disabled={zoom<=.5} onClick={()=>changeZoom(zoom-.25)}><ZoomOut size={20}/></button>
          <a href={current.src} download={current.downloadName||current.src.split("?")[0].split("/").pop()} aria-label="Baixar imagem" title="Baixar imagem original"><Download size={20}/></a>
          <button type="button" aria-label="Alternar tela cheia" title="Alternar tela cheia" aria-pressed={fullscreen||maximized} onClick={()=>void toggleFullscreen()}>{fullscreen||maximized?<Minimize2 size={20}/>:<Maximize2 size={20}/>}</button>
          <button ref={closeButton} type="button" aria-label="Fechar imagem" title="Fechar (Escape)" onClick={onClose}><X size={22}/></button>
        </div>
      </div>
      <div className="lcr-viewer-body">
        {items.length>1&&<button className="lcr-viewer-prev lcr-viewer-nav" type="button" aria-label="Imagem anterior" onClick={()=>move(-1)}><ChevronLeft/></button>}
        <div className={`lcr-viewer-stage${zoom>1?" is-pannable":""}`} ref={stage} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={pointerEnd} onLostPointerCapture={pointerEnd}>
          {failed?<p role="alert">Não foi possível carregar a imagem. Tente novamente ou use o arquivo original.</p>:<img key={current.src} ref={img} src={current.src} alt={current.alt} draggable={false} onError={()=>setFailed(true)} style={{transform:`translate(${pan.x}px,${pan.y}px) scale(${zoom})`}}/>}
        </div>
        {items.length>1&&<button className="lcr-viewer-next lcr-viewer-nav" type="button" aria-label="Próxima imagem" onClick={()=>move(1)}><ChevronRight/></button>}
      </div>
    </div>
  </dialog>;
}
