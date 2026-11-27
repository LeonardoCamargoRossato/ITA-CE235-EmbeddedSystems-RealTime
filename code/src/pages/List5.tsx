import GroundStationEvolution from "../components/GroundStationEvolution";
import { gsaV3, groundStationTitle } from "../data/groundStation";
import { ExternalLink } from "lucide-react";
import ProjectContextCard from "../components/ProjectContextCard";
import ZoomableImage from "../components/galleries/ZoomableImage";
import SprintContributionSummary from "../components/SprintContributionSummary";
import SprintContributionActions from "../components/SprintContributionActions";
import { Link } from "react-router-dom";
import CompactListHeader from "../components/CompactListHeader";
import SectionTitle from "../components/SectionTitle";
import DriveFilePreview from "../components/DriveFilePreview";
import { imagePair } from "../data/assets";
import { links } from "../data/links";
import "../styles/list4-sprint2.css";
import "../styles/list5-sprint3.css";

const issue = (id: number) => `https://github.com/Projeto-SPRB-TR-BD/Projeto-SPRB-TR-BD/issues/${id}`;
const board = "https://github.com/orgs/Projeto-SPRB-TR-BD/projects/7/views/1";
const report = `${import.meta.env.BASE_URL}assets/PDF/sprint-3/us330/Relatorio_Pessoal_US330_Sprint3_Leonardo_Rossato.pdf`;
const portal = "https://egg-steady-sixth-fax.trycloudflare.com/us330-api/";
const evidence = (slug: string) => imagePair(`sprint-3/us330/${slug}`);

function External({ href, children }: {href: string; children: string}) {
  return <a className="button button--secondary" href={href} target="_blank" rel="noopener noreferrer">{children} <ExternalLink size={15}/></a>;
}
function Evidence({slug,caption,alt}:{slug:string;caption:string;alt:string}){
  return <ZoomableImage {...evidence(slug)} caption={caption} alt={alt}/>;
}
const cases = [
  {id:192, name:"TC022", requirement:"100/500 ms por 300 s por patamar; 15.000 pacotes por patamar; jitter e RSS", limit:"Ensaio individual curto; campanha coletiva de 24/11 PASS no recorte, sem aplicação legada externa."},
  {id:193, name:"TC023", requirement:"Lote misto; descarte com motivo no barramento/DLQ", limit:"Filtragem local relatada; campanha coletiva de 25/11 PASS 12/12 no recorte; não comprova integração individual."},
  {id:194, name:"TC024", requirement:"200 válidos + 20 malformados; p95 < 10 ms e isolamento", limit:"Mock individual histórico; campanha coletiva de 24/11 PASS no recorte HTTP→AMQP, sem aceite integral."}
];
export default function List5() {
  return <div className="list4-sprint2 list5-sprint3 sprint-page sprint-page--3">
    <CompactListHeader list="LIST 5" lab="SPRINT 3" title="Terceira Sprint do Projeto SPRB-TR/BD"/>
    <section className="sprint1-meta"><div className="container"><span>Projeto Acadêmico SPRB-TR/BD · TS#3 — Integração</span><strong>Entrega: 27/11/2026 · início a confirmar</strong></div></section>
    <section className="section sprint1-main"><div className="container content-stack content-stack--sprint1">
      <div className="sprint1-contribution-enunciado sprint-contribution-pair">
        <article className="contribution-card">
          <span className="eyebrow">Minha contribuição</span><h2>{groundStationTitle(gsaV3)}</h2>
          <SprintContributionSummary summary={gsaV3.name+" — serviços autenticados, telemetria e PostgreSQL isolado na Estação de Solo 1."}>O objetivo da Sprint 3 foi evoluir a Telemetry Processing API da Sprint 2 para a Ground Station API V3, uma plataforma de serviços implantada no Raspberry Pi da Estação de Solo 1. Integra comunicação autenticada, tratamento, persistência PostgreSQL isolada e consulta por usuários autorizados. O Telemetry Decoder é um módulo da plataforma. O teste documentado empregou telemetria simulada externa. O escopo individual não equivale à autoria integral da estação ou da US330.</SprintContributionSummary>
          <SprintContributionActions items={[
            {label:"Drive da Sprint 3",href:links.list5Drive,variant:"drive"},
            {label:"Portal de acesso "+gsaV3.name,href:portal,variant:"app",title:"Link temporário; disponibilidade a confirmar"},
            {label:"GitHub pessoal",href:"https://github.com/LeonardoCamargoRossato/ITA-CE235-EmbeddedSystems-RealTime"},
            {label:"US330 #146",href:issue(146)}
          ]}/>
          <small className="sprint3-portal-status">Portal: endereço temporário, disponibilidade a confirmar.</small>
        </article>
        <ProjectContextCard sprint={3}/>
      </div>
      <div className="sprint-first-evidence"><SectionTitle eyebrow="US330" title="Relatório individual e evidências" description="Contribuição individual, arquitetura, resultados históricos e limitações."/>
        <DriveFilePreview title="Relatório pessoal — US330 / Sprint 3" fileName="Relatorio_Pessoal_US330_Sprint3_Leonardo_Rossato.pdf" description="Edição aprovada em 27/11/2026 — cinco páginas A4, identidade visual ITA, arquitetura, resultados e rastreabilidade." localSrc={report} fallbackHref={report} buttonLabel="Abrir relatório pessoal" pagePreview="sprint3-relatorio" large/>
        <div className="card-actions"><a className="button button--secondary" href={report} download>Baixar PDF</a><External href="https://drive.google.com/file/d/1FLtHN8y6VvkbGYzM8FRCMDYM1vHe7lzo/view">Cópia no Drive</External></div>
      </div>
      <div><SectionTitle eyebrow="Arquitetura" title="Integração da telemetria" description="Diagrama original aprovado, preservado sem corte."/>
        <Evidence slug="diagrama-us330" caption="Figura 1 — Arquitetura US330, teste histórico de 21/11/2026" alt="Fluxo de acesso e autorização, ingestão FastAPI, RAW, tratamento, PROCESSED, consulta e auditoria."/>
        <div className="sprint3-grid">
          <article><h3>01 — Acesso e autorização</h3><p>Solicitação pelo portal ou QR, aprovação e credencial individual Bearer. QR não é credencial; entrega por e-mail não reconfirmada.</p></article>
          <article><h3>02 — Ingestão e persistência</h3><p>FastAPI autentica e valida; RAW preserva bytes, hash e origem. Tratamento verifica estrutura, faixas, sequência e duplicatas. PROCESSED referencia RAW; rejeições na borda e quarentena são distintas.</p></article>
          <article><h3>03 — Consulta e retorno</h3><p>GET e dashboard retornam dados autorizados; não há acesso direto ao banco. Eventos permitem rastreabilidade e auditoria.</p></article>
        </div>
      </div>
      <GroundStationEvolution/>
      <section id="rastreabilidade" className="sprint3-traceability">
        <SectionTitle eyebrow="GitHub e Kanban" title="Rastreabilidade" description="Acesso direto às atividades e aos registros oficiais da Sprint 3."/>
        <div className="sprint3-trace-table" role="region" aria-label="Links de rastreabilidade" tabIndex={0}>
          <table><thead><tr><th scope="col">Acesso</th><th scope="col">Keywords</th><th scope="col">Descrição</th></tr></thead><tbody>{[
            {href:board,label:"Abrir quadro oficial — Kanban",keywords:"Scrum · Sprint 3 · Kanban",description:"Acompanhar o quadro de atividades do Time 3."},
            {href:issue(146),label:"US330 #146",keywords:"API · Legado · Integração",description:"User Story oficial de integração e roteamento bidirecional da API."},
            {href:issue(162),label:"T2 #162",keywords:"Filtragem · Tratamento",description:"Task coletiva de tratamento da telemetria, atribuída a Felipe Araújo Thomaz."},
            {href:issue(168),label:"Matriz oficial #168",keywords:"Requisitos · Testes",description:"Matriz de rastreabilidade dos casos de teste da Sprint 3."},
            {href:issue(170),label:"Segurança #170",keywords:"CE-237 · Segurança",description:"Atividade de especificação de casos de teste de segurança."}
          ].map(row=><tr key={row.href}><th scope="row"><External href={row.href}>{row.label}</External></th><td>{row.keywords}</td><td>{row.description}</td></tr>)}</tbody></table>
        </div>
        <p className="sprint3-trace-note">Consulta de 27/11: #146, #162 e #192–194 fechadas. Fechamento não equivale a aceite técnico integral; a T2 e os ensaios coletivos não são autoria individual.</p>
        <details className="sprint3-trace-history"><summary>Registro histórico do Kanban (27/11/2026)</summary><p>Recorte de 09h21: Backlog 4, Ready 1, In progress 6, In review 15. Done não observado; não representa o quadro completo nem seu estado atual.</p><External href={evidence("kanban-sprint3").fullSrc}>Abrir recorte original (PNG)</External></details>
      </section>
      <div><SectionTitle eyebrow="Demonstração" title={"Portal de acesso — "+gsaV3.name} description="Captura histórica de 26/11/2026. Não é status ao vivo."/>
        <Evidence slug="portal-us330" caption="Figura 2 — Portal histórico, QR ocultado; Failed to fetch preservado" alt="Portal de acesso autenticado à API, formulário de solicitação e mensagem Failed to fetch."/>
        <article className="sprint3-note"><h3>Link temporário — disponibilidade a confirmar</h3><p>Quick Tunnel pode expirar ou mudar. Para novo teste, contate Leonardo pelo canal autorizado da equipe, solicite novo endereço e uma chave individual. O acesso privado usa Tailscale e SSH autorizados. A captura interna do dashboard remoto está pendente de recuperação de acesso.</p><External href={portal}>Link utilizado na demonstração</External></article>
      </div>
      <div><SectionTitle eyebrow="Resultados históricos" title="Teste externo de 21/11/2026" description="Registro Codex/relato técnico; não representa monitoramento atual."/>
        <div className="sprint-tech-grid"><article><span>RAW recebidos</span><strong>180</strong></article><article><span>PROCESSED vinculados</span><strong>180</strong></article><article><span>SHA-256 coincidentes</span><strong>180 / 180</strong></article><article><span>Satélites simulados</span><strong>5</strong></article></div>
        <p>Simulador Python em notebook Linux Mint transmitiu JSON por HTTPS via túnel SSH ao Raspberry. Zero falhas de transporte, rejeições e pendências no primeiro lote, conforme relato. Replay de duplicatas e ensaios de segurança ocorreram separadamente em PC isolado. Não são dados reais de satélite nem aceite integrado.</p>
        <div className="sprint3-table"><table><thead><tr><th>Caso</th><th>Critério oficial</th><th>Limitação</th></tr></thead><tbody>{cases.map(c=><tr key={c.id}><th scope="row"><a href={issue(c.id)} target="_blank" rel="noopener noreferrer">{c.name} · #{c.id}</a><br/>Fechada (27/11)</th><td>{c.requirement}</td><td>{c.limit}</td></tr>)}</tbody></table></div>
      </div>
      <div><SectionTitle eyebrow="Documentação técnica" title="Relato, contrato e rastreabilidade"/>
        <div className="card-actions"><External href={links.list5Drive}>Acervo da Sprint 3 — acesso conforme permissões</External><External href="https://github.com/Projeto-SPRB-TR-BD/Projeto-SPRB-TR-BD/blob/main/compartilhado/icd/ICD_Telemetry_v1.md">ICD oficial · TS#1</External><External href="https://github.com/LeonardoCamargoRossato/ITA-US330-Telemetry-Decoder">Implementação US330 — repositório privado</External></div>
        <p>O relatório, a fonte e a matriz estão no acervo individual. Os guias de operação restritos e os documentos de infraestrutura não integram as entregas pessoais públicas.</p>
      </div>
      <div><SectionTitle eyebrow="Evolução" title="US123 → US221 → US330"/>
        <div className="sprint3-grid"><article><h3>US123 · Sprint 1</h3><p>React/Vite/TypeScript e telemetria simulada no navegador.</p><Link to="/sprint1">Ver Sprint 1</Link></article><article><h3>US221 · Sprint 2</h3><p>FastAPI local, JSONL e SQLite; contrato C para SCADE/legado, não integração concluída.</p><Link to="/list4">Ver Sprint 2</Link></article><article><h3>US330 · Sprint 3.1</h3><p>API autenticada, PostgreSQL 15 isolado, auditoria e consulta remota; primeira implantação ainda com armazenamento local.</p></article></div>
        <article className="sprint3-note"><h3>Contexto de infraestrutura — Raspberry de Cirineu</h3><p>Cirineu disponibilizou a estação e a infraestrutura Tailscale. A US330 opera de forma isolada; banco e dashboard originais foram preservados. O trabalho de infraestrutura e as contribuições de colegas não são autoria individual de Leonardo.</p></article>
      </div>
      <div><SectionTitle eyebrow="Continuidade" title="Limitações e próximos passos"/>
        <p>URL estável, recuperação da captura interna, testes oficiais, US331, barramento RabbitMQ e telecomandos permanecem por validar. HTTP Push complementa o barramento, sem substituí-lo. Tailscale Funnel é uma proposta condicionada à aprovação e segurança; Serve é alternativa privada. Disponibilidade 24/7, reboot, backup e integração não comprovados.</p>
        <div className="card-actions"><External href="https://tailscale.com/kb/1223/funnel">Funnel — proposta</External><External href="https://tailscale.com/kb/1312/serve">Serve — acesso privado</External><Link className="button button--primary" to="/listas">Voltar às listas</Link></div>
      </div>
    </div></section>
  </div>;
}
