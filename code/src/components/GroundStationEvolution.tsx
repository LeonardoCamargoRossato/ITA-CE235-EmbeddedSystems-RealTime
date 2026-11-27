import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SatelliteDish, ArrowRight } from "lucide-react";
import { groundStationVersions, gsaV3 } from "../data/groundStation";
import { groundStationComponents } from "../data/assets";
import SectionTitle from "./SectionTitle";
import GroundStationVersionTable from "./GroundStationVersionTable";
import ZoomableImage from "./galleries/ZoomableImage";
import "./GroundStationEvolution.css";
const names=[
 ["Ground Station API","API da estação de solo","Simples, profissional e direto"],
 ["Ground Station Gateway","Gateway da estação de solo","Intermediação entre sistemas"],
 ["Ground Station Data Hub","Central de dados da estação de solo","Processamento e armazenamento"],
 ["Ground Station Data Platform","Plataforma de dados da estação de solo","Arquitetura abrangente de dados"],
 ["Telemetry Gateway","Gateway de telemetria","Comunicação de telemetria"],
 ["Ground Station Integration Platform","Plataforma de integração da estação de solo","Integração de componentes"],
 ["Ground Station Services","Serviços da estação de solo","Arquitetura modular"],
 ["SPRB Ground API","API de solo do SPRB","Identidade vinculada ao projeto coletivo"]
];
export default function GroundStationEvolution(){
 const {search}=useLocation();
 useEffect(()=>{if(new URLSearchParams(search).get("secao")==="evolucao"){const frame=requestAnimationFrame(()=>document.getElementById("gsa-evolucao")?.scrollIntoView({block:"start",behavior:"instant"}));return()=>cancelAnimationFrame(frame);}},[search]);
 return <section id="gsa-evolucao" className="gsa-evolution">
 <SectionTitle eyebrow="Identidade e evolução tecnológica" title="Do Telemetry Decoder à Ground Station API" description="A evolução de um demonstrador de telemetria para uma plataforma de serviços da estação de solo."/>
 <div className="gsa-panel"><h3>De onde surgiu o nome Telemetry Decoder?</h3><p>O nome Telemetry Decoder (Decodificador de Telemetria) surgiu na US123, durante a primeira Sprint do SPRB-TR/BD. O objetivo era receber, interpretar e validar dados dos satélites, tornando-os compreensíveis e utilizáveis por outros componentes.</p><p>Com a API de comunicação, processamento e armazenamento, autenticação, implantação remota e interfaces externas, o nome deixou de representar a totalidade do sistema. A decodificação permanece como um módulo importante de uma arquitetura maior.</p></div>
 <div className="gsa-panel"><h3>Evolução tecnológica</h3><GroundStationVersionTable/><div className="gsa-version-flow">{groundStationVersions.map((v,i)=><div className="gsa-version-step" key={v.sprint}><Link to={v.route}><small>Sprint {v.sprint} · {v.userStory}</small><strong>{v.name}</strong><span>{v.technicalName}</span><p>{v.development}</p></Link>{i<2&&<ArrowRight className="gsa-arrow" size={20} aria-hidden="true"/>}</div>)}</div><p className="gsa-note">V1 é uma identidade retrospectiva: o demonstrador não possuía a API REST operacional das versões posteriores. V2 preparou a fronteira C/SCADE, sem afirmar integração concluída.</p></div>
 <div className="gsa-panel"><h3>Como surgiu o nome Ground Station API?</h3><p>Com a ampliação do escopo, buscou-se uma identidade para a comunicação entre sistemas, o processamento da telemetria, a infraestrutura de serviços e o acesso à informação. Diferentes nomenclaturas foram consideradas:</p><div className="gsa-table" tabIndex={0} role="region" aria-label="Brainstorm de nomes"><table><thead><tr><th>Nome considerado</th><th>Tradução</th><th>Característica</th></tr></thead><tbody>{names.map((n,i)=><tr key={n[0]} className={i===0?"gsa-chosen":undefined}><th scope="row">{n[0]}{i===0&&<small className="gsa-chosen-label">Identidade aprovada</small>}</th><td>{n[1]}</td><td>{n[2]}</td></tr>)}</tbody></table></div></div>
 <article className="gsa-identity"><SatelliteDish aria-hidden="true" size={50}/><div><span className="eyebrow">Identidade escolhida · GSA</span><h3>Ground Station API</h3><p className="gsa-tagline">Satellite Telemetry &amp; Data Processing</p><p>Nome profissional, intuitivo e compreensível para professores, desenvolvedores e usuários. Centraliza serviços de comunicação, processamento, persistência e disponibilização de informações.</p><strong>{gsaV3.name}</strong><small>ITA · CE-235 · US330 · 2026</small></div></article>
 <div className="gsa-panel"><h3>O que realmente construímos?</h3><ZoomableImage {...groundStationComponents} className="gsa-concept-figure" caption="O Telemetry Decoder passou a ser um componente de um sistema maior, não o sistema inteiro." alt="Time 1 gera telemetria; sistema desenvolvido reúne API, autenticação, Telemetry Decoder destacado, pipeline, PostgreSQL, portal e dashboard; usuários externos consultam dados autorizados."/><p>O SPRB-TR/BD representa o projeto acadêmico coletivo. A Ground Station API representa a aplicação individual desenvolvida nas três Sprints. O Telemetry Decoder é um módulo responsável pela interpretação da telemetria.</p><p className="gsa-note">Diagrama conceitual de identidade; o diagrama detalhado da arquitetura US330 permanece na seção seguinte. Não representa homologação coletiva ou disponibilidade atual.</p></div>
 </section>
}
