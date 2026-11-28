import {useEffect,useRef,useState} from "react";
import {NavLink,useLocation} from "react-router-dom";
import {Menu,X} from "lucide-react";
import {assets} from "../data/assets";
import {mainNav,isActivity} from "../data/portalNavigation";
export default function Navbar(){
 const [open,setOpen]=useState(false);const {pathname}=useLocation();const button=useRef<HTMLButtonElement>(null);
 useEffect(()=>setOpen(false),[pathname]);
 useEffect(()=>{if(!open)return;const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(false);button.current?.focus()}};document.addEventListener("keydown",onKey);return()=>document.removeEventListener("keydown",onKey)},[open]);
 return <><header className="navbar navbar--institutional portal-nav"><div className="container navbar__inner">
 <NavLink className="brand brand--ita" to="/" onClick={()=>setOpen(false)}><img src={assets.itaLogo} alt="Instituto Tecnológico de Aeronáutica — ITA"/><span><strong>CE-235</strong><small>Sistemas de Tempo Real</small></span></NavLink>
 <button ref={button} className="menu-button" onClick={()=>setOpen(v=>!v)} aria-label={open?"Fechar menu":"Abrir menu"} aria-expanded={open} aria-controls="portal-menu">{open?<X/>:<Menu/>}</button>
 <nav id="portal-menu" aria-label="Navegação principal" className={`nav-links ${open?"is-open":""}`}>{mainNav.map(([route,label])=><NavLink end key={route} to={route} className={({isActive})=>isActive||(route==="/listas"&&isActivity(pathname))?"active":undefined} onClick={()=>setOpen(false)}>{label}</NavLink>)}</nav>
 </div></header><div className="institutional-rule"><i/><i/><i/></div></>
}
