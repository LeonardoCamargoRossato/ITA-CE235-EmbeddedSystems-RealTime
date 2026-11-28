import {FolderOpen,ExternalLink,ArrowRight} from "lucide-react";
import {Link,useSearchParams} from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import {links} from "../data/links";
import {artifacts,artifactGroups} from "../data/artifacts";
export default function Artifacts(){
 const [params,setParams]=useSearchParams();const requested=params.get("categoria");const filter=artifactGroups.some(g=>g.id===requested)?requested:"todos";
 return <section className="section page-section artifacts-page portal-library"><div className="container">
 <SectionTitle eyebrow="CE-235 · SPRB-TR/BD" title="Artefatos da Disciplina" description="Biblioteca documental das atividades individuais, coletivas e de gestão ao longo do semestre."/>
 <a className="discipline-drive-highlight" href={links.disciplineDrive} target="_blank" rel="noopener noreferrer"><span className="discipline-drive-highlight__icon"><FolderOpen size={24}/></span><span><small>REPOSITÓRIO ACADÊMICO</small><strong>Drive da Disciplina</strong><p>Acervo completo de arquivos, relatórios, laboratórios e demais materiais da CE-235.</p></span><b>Abrir Drive da Disciplina <ExternalLink size={15}/></b></a>
 <div className="portal-filters" role="group" aria-label="Filtrar artefatos">{[["todos","Todos"],["individuais","Individuais"],["coletivos","Coletivos"],["gestao","Gestão"]].map(([id,label])=><button key={id} aria-pressed={filter===id} className="button button--secondary" onClick={()=>setParams(id==="todos"?{}:{categoria:id},{replace:true})}>{label}</button>)}</div>
 <p className="portal-note" aria-live="polite">{artifacts.filter(a=>filter==="todos"||a.category===filter).length} referências. O acesso aos documentos externos depende das permissões originais.</p>
 {artifactGroups.filter(g=>filter==="todos"||filter===g.id).map(g=><section key={g.id} id={g.id} className="portal-anchor portal-library-group"><h2>{g.name}</h2><div className="portal-library-grid">{artifacts.filter(a=>a.category===g.id).map(a=><article key={a.name+a.activity} className="portal-document"><small>{a.activity} · {a.format}</small><h3>{a.name}</h3><p>{a.description}</p><span className="portal-note">{a.origin} · {a.access}</span>{a.href.startsWith("/")?<Link className="button button--secondary" to={a.href}>Acessar <ArrowRight size={14}/></Link>:<a className="button button--secondary" href={a.href} target="_blank" rel="noopener noreferrer">Abrir original <ExternalLink size={14}/></a>}</article>)}</div></section>)}
 </div></section>
}
