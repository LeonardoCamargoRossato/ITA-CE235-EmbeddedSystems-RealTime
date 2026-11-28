import {useEffect,useRef,useState} from "react";
import {ExternalLink,Globe} from "lucide-react";
import {links} from "../data/links";
import SectionTitle from "./SectionTitle";

export default function PortfolioEmbed(){
 const host=useRef<HTMLDivElement>(null);const frame=useRef<HTMLIFrameElement>(null);
 const [near,setNear]=useState(false),[status,setStatus]=useState<"loading"|"ready"|"unavailable">("loading");
 useEffect(()=>{const el=host.current;if(!el)return;if(!("IntersectionObserver" in window)){setNear(true);return}const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){setNear(true);observer.disconnect()}},{rootMargin:"200px"});observer.observe(el);return()=>observer.disconnect()},[]);
 useEffect(()=>{if(!near||status!=="loading")return;const timer=window.setTimeout(()=>setStatus("unavailable"),20000);return()=>window.clearTimeout(timer)},[near,status]);
 const loaded=()=>{try{const doc=frame.current?.contentDocument;if(doc&&doc.body&&doc.location.href!=="about:blank"){setStatus("ready");return}if(doc?.location.href==="about:blank"){setStatus("unavailable");return} // Cross-origin (local preview) cannot be inspected; retain external alternative.
 setStatus("ready")}catch{setStatus("ready")}};
 return <section id="portfolio" className="portal-anchor portfolio-section">
 <SectionTitle eyebrow="Portfólio profissional" title="Portfólio profissional" description="AI Engineering & Software Development"/>
 <p>Conheça os projetos, aplicações, pesquisas e soluções tecnológicas desenvolvidos ao longo da trajetória acadêmica e profissional.</p>
 <div className="portfolio-browser" ref={host}><div className="portfolio-browser-bar"><span><Globe size={18}/> Portfólio profissional</span><a className="button button--primary" href={links.portfolio} target="_blank" rel="noopener noreferrer">Acessar portfólio completo <ExternalLink size={15}/></a></div>
 <div className="portfolio-browser-caption">Navegue pelo portfólio ou abra em uma nova aba.</div>
 {near&&<iframe ref={frame} src={links.portfolio} title="Portfólio profissional — AI Engineering & Software Development" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" onLoad={loaded} onError={()=>setStatus("unavailable")}/>}
 {!near&&<div className="portfolio-placeholder"><Globe size={32}/> O portfólio será carregado ao aproximar-se desta seção.</div>}
 {near&&status==="loading"&&<p className="portfolio-status" role="status">Carregando portfólio…</p>}
 {status==="unavailable"&&<div className="portfolio-status" role="status">Não foi possível confirmar a incorporação. <a href={links.portfolio} target="_blank" rel="noopener noreferrer">Abrir portfólio original <ExternalLink size={13}/></a></div>}
 </div></section>
}
