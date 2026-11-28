import {GraduationCap,Code2,ChevronDown,ArrowDown,ExternalLink} from "lucide-react";
import {useSearchParams} from "react-router-dom";
import {academicResources} from "../data/academicResources";
import SectionTitle from "./SectionTitle";
export default function AcademicContextCards(){
 const [params,setParams]=useSearchParams();const expanded=params.get("recursos")==="abertos";
 const toggle=()=>{const next=new URLSearchParams(params);next.delete("secao");if(expanded)next.delete("recursos");else next.set("recursos","abertos");setParams(next,{replace:true})};
 const trajectory=()=>{const next=new URLSearchParams(params);next.set("secao","trajetoria");next.delete("recursos");setParams(next);};
 return <section id="recursos" className="section section--resources portal-anchor"><div className="container">
 <SectionTitle eyebrow="Recursos da disciplina" title="Acessos principais"/>
 <div className="academic-context-grid">
 <button type="button" className="academic-context-card" aria-expanded={expanded} aria-controls="recursos-academicos" onClick={toggle}><GraduationCap className="academic-context-icon" size={32}/><strong>Contexto da disciplina e do projeto</strong><span>A disciplina CE-235 — Sistemas Embarcados de Tempo Real, do ITA, aborda engenharia de software, modelagem, simulação, comunicação e integração de sistemas embarcados, incluindo desenvolvimento baseado em modelos com ANSYS SCADE.</span><span>Esses conhecimentos são aplicados ao projeto interdisciplinar SPRB-TR/BD, desenvolvido coletivamente por Times Scrum dos segmentos espacial, terrestre e de integração.</span><b>Explorar recursos da disciplina <ChevronDown className={expanded?"is-rotated":""} size={18}/></b></button>
 <button type="button" className="academic-context-card" onClick={trajectory}><Code2 className="academic-context-icon" size={32}/><strong>Minha contribuição neste projeto</strong><span>Minha contribuição compreendeu os laboratórios preparatórios com ANSYS SCADE e o desenvolvimento incremental de uma solução para recepção, interpretação, processamento e disponibilização de telemetria.</span><span>Nas três Sprints, a solução evoluiu do Telemetry Decoder à API de processamento local e à Ground Station API V3, implantada na infraestrutura Raspberry Pi da estação de solo.</span><b>Conhecer minha trajetória <ArrowDown size={18}/></b></button>
 </div>
 <div id="recursos-academicos" className="academic-resources portal-anchor" hidden={!expanded}><h3>Recursos acadêmicos</h3><table><thead><tr><th scope="col">Recurso ou documento</th><th scope="col">Descrição</th><th scope="col">Acesso</th></tr></thead><tbody>{academicResources.map(r=><tr key={r.name}><th scope="row">{r.name}{r.restricted&&<small>Sujeito a permissões</small>}</th><td>{r.description}</td><td><a href={r.href} target="_blank" rel="noopener noreferrer" title={"Abrir "+r.name} aria-label={"Abrir "+r.name}><ExternalLink size={18}/></a></td></tr>)}</tbody></table></div>
 </div></section>
}
