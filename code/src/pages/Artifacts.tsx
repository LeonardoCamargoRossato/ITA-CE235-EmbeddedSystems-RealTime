import {FolderOpen,ExternalLink,ArrowRight,Grid2X2,List} from "lucide-react";
import {useState} from "react";
import ArtifactIcon from "../components/ArtifactIcon";
import {Link,useSearchParams} from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import {links} from "../data/links";
import {artifacts,artifactGroups} from "../data/artifacts";
export default function Artifacts(){
 const [params,setParams]=useSearchParams();const requested=params.get("categoria");const filter=artifactGroups.some(g=>g.id===requested)?requested:"todos";
 const [preference,setPreference]=useState(()=>{try{return localStorage.getItem("ce235-artifact-view")==="lista"?"lista":"grade"}catch{return "grade"}});const mode=params.get("modo")==="lista"?"lista":params.get("modo")==="grade"?"grade":preference;
 const changeMode=(value:"grade"|"lista")=>{setPreference(value);try{localStorage.setItem("ce235-artifact-view",value)}catch{}const next=new URLSearchParams(params);next.set("modo",value);setParams(next,{replace:true})};
 const changeFilter=(value:string)=>{const next=new URLSearchParams(params);if(value==="todos")next.delete("categoria");else next.set("categoria",value);setParams(next,{replace:true})};
 return <section className="section page-section artifacts-page portal-library"><div className="container">
 <SectionTitle eyebrow="CE-235 · SPRB-TR/BD" title="Artefatos da Disciplina" description="Biblioteca documental das atividades individuais, coletivas e de gestão ao longo do semestre."/>
 <a className="discipline-drive-highlight" href={links.disciplineDrive} target="_blank" rel="noopener noreferrer"><span className="discipline-drive-highlight__icon"><FolderOpen size={24}/></span><span><small>REPOSITÓRIO ACADÊMICO</small><strong>Drive da Disciplina</strong><p>Acervo completo de arquivos, relatórios, laboratórios e demais materiais da CE-235.</p></span><b>Abrir Drive da Disciplina <ExternalLink size={15}/></b></a>
 <div className="artifact-toolbar"><div className="portal-filters" role="group" aria-label="Filtrar artefatos">{[["todos","Todos"],["individuais","Individuais"],["coletivos","Coletivos"],["gestao","Gestão"]].map(([id,label])=><button key={id} aria-pressed={filter===id} className="button button--secondary" onClick={()=>changeFilter(id)}>{label}</button>)}</div><div className="artifact-view-toggle" role="group" aria-label="Visualização dos artefatos"><button type="button" title="Visualização em grade" aria-label="Visualização em grade" aria-pressed={mode==="grade"} onClick={()=>changeMode("grade")}><Grid2X2 size={20}/></button><button type="button" title="Visualização em lista" aria-label="Visualização em lista" aria-pressed={mode==="lista"} onClick={()=>changeMode("lista")}><List size={20}/></button></div></div>
 <p className="portal-note" aria-live="polite">{artifacts.filter(a=>filter==="todos"||a.category===filter).length} referências. O acesso aos documentos externos depende das permissões originais.</p>
 {artifactGroups.filter(g=>filter==="todos"||filter===g.id).map(g=><section key={g.id} id={g.id} className="portal-anchor portal-library-group"><h2>{g.name}</h2><div className={"portal-library-grid artifact-view--"+mode} data-view={mode}>{artifacts.filter(a=>a.category===g.id).map(a=><article key={a.name+a.activity} className="portal-document"><div className="artifact-document-heading"><ArtifactIcon artifact={a}/><div><small>{a.activity} · {a.format}</small><h3>{a.name}</h3></div></div><p>{a.description}</p><span className="portal-note artifact-document-meta">{a.origin} · {a.access}</span>{a.href.startsWith("/")?<Link className="button button--secondary" to={a.href}>Acessar <ArrowRight size={14}/></Link>:<a className="button button--secondary" href={a.href} target="_blank" rel="noopener noreferrer">Abrir original <ExternalLink size={14}/></a>}</article>)}</div></section>)}
 </div></section>
}
