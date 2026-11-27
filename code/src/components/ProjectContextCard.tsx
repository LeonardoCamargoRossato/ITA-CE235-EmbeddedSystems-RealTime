import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import "./ProjectContextCard.css";

const details = "O projeto articula CE-235 (sistemas embarcados de tempo real), CE-230 (qualidade, confiabilidade e segurança de software) e CE-237 (teste de software). O Time 1 desenvolveu o segmento espacial: simulação orbital, telemetria, lógica de bordo e monitoramento. O Time 2 desenvolveu o segmento terrestre: recepção, decodificação, validação, interfaces, APIs, persistência e telecomandos.";
export default function ProjectContextCard({sprint}:{sprint:1|2|3}){
  const [expanded,setExpanded]=useState(false);
  const id=useId();
  const two=sprint===2;
  const one=sprint===1;
  const teamBase=one?"/sprint1":"/list4";
  return <article className="project-context-card" aria-label={`Contexto coletivo — Sprint ${sprint}`}>
    <header><span className="eyebrow"><Users size={15} aria-hidden="true"/> Projeto acadêmico · ITA</span><h2>Contexto do Projeto SPRB-TR/BD</h2><h3>Desenvolvimento coletivo — Sprint {sprint}</h3></header>
    <div className="project-context-card__content">
      <p>O SPRB-TR/BD é um projeto interdisciplinar do ITA, desenvolvido nas disciplinas CE-235, CE-230 e CE-237. {one?"Na Sprint 1, os Times Scrum 1 e 2 estabeleceram as bases dos segmentos espacial e terrestre.":two?"Na Sprint 2, dois Times Scrum atuaram nos segmentos espacial e terrestre.":"Na Sprint 3, os dois times convergiram para integrar os segmentos espacial e terrestre."}</p>
      <button type="button" className="project-context-card__read" aria-expanded={expanded} aria-controls={id} onClick={()=>setExpanded(v=>!v)}>{expanded?"Leia menos":"Leia mais"}</button>
      <div id={id} hidden={!expanded}><p>{details}</p><p>{one?"A contribuição individual de Leonardo Camargo Rossato foi o demonstrador US123 — Telemetry Decoder. O restante da arquitetura, interfaces, enlace e banco pertence ao trabalho coletivo.":two?"Leonardo Camargo Rossato contribuiu com o Telemetry Decoder (US123) e o contrato de dados da API (US221); a infraestrutura e as outras interfaces são contribuições coletivas.":"O Time 3 reúne esses esforços para integrar APIs, bancos, barramento, HMI, telecomandos e testes. A US330 de Leonardo evolui a US221; a estação e a infraestrutura Raspberry disponibilizadas por Cirineu são trabalhos distintos. Integração global e homologação não decorrem de uma única entrega."}</p></div>
    </div>
    <nav className="project-context-card__actions" aria-label="Times Scrum">{(one||two)?<><Link className="button button--primary" to={teamBase+"/time1"}>Time 1 <ArrowRight size={15}/></Link><Link className="button button--primary" to={teamBase+"/time2"}>Time 2 <ArrowRight size={15}/></Link></>:<Link className="button button--primary" to="/list5/time3">Time 3 (Time 1 + Time 2) <ArrowRight size={15}/></Link>}</nav>
  </article>;
}
