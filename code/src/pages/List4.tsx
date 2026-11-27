import { gsaV2, groundStationTitle } from "../data/groundStation";
import { imagePair } from "../data/assets";
import { links } from "../data/links";
import SprintContributionSummary from "../components/SprintContributionSummary";
import SprintContributionActions from "../components/SprintContributionActions";
import { ExternalLink } from "lucide-react";
import ProjectContextCard from "../components/ProjectContextCard";
import CompactListHeader from "../components/CompactListHeader";
import SectionTitle from "../components/SectionTitle";
import SprintEvidenceCarousel, { SprintEvidenceItem, SprintSpriteFigure } from "../components/SprintEvidenceCarousel";
import DriveFilePreview from "../components/DriveFilePreview";
import "../styles/list4-sprint2.css";

const personalRepositoryUrl = "https://github.com/LeonardoCamargoRossato/ITA-CE235-EmbeddedSystems-RealTime";
const us221ProjectUrl = "https://github.com/orgs/Projeto-SPRB-TR-BD/projects/4/views/1?pane=issue&itemId=272020328&issue=Projeto-SPRB-TR-BD%7CProjeto-SPRB-TR-BD%7C107";
const us221DocumentationUrl = "https://github.com/Projeto-SPRB-TR-BD/Projeto-SPRB-TR-BD/blob/main/ts2/docs/user-stories/US221_Arquitetura_Contrato_C_API.md";
const list4Page = "https://leonardocamargorossato.github.io/ITA-CE235-EmbeddedSystems-RealTime/#/list4";

const personalReportId = "1SKaTGLuDpG73mpjqtZCscrjLby858x6S";
const personalReportUrl = `https://drive.google.com/file/d/${personalReportId}/view`;
const sprint2ReportId = "1IStpsYhr1VYVN0uODNDt2q2WidJLI6N8";
const sprint2ReportUrl = `https://drive.google.com/file/d/${sprint2ReportId}/view`;
const rawProcessedGuideId = "16-t_z0elYB_lxDx4RF5XY-rsCLCsl3zv";
const localArchitectureId = "1GOFfQGxtIgRgEW1p3etudt_qrudVdlSk";

const us221Image = (slug: string) => imagePair(`sprint-2/us221/${slug}`);

const figure1Image = us221Image("fluxo-e-arquitetura-us221");
const figure2Image = us221Image("json-para-struct");
const kanbanImage = us221Image("sprint2-kanban-board");

const carouselItems: SprintEvidenceItem[] = [
  { label: "Tela1_US221_Aba_Monitor.png", alt: "Tela 1 da US221 — Aba Monitor", ...us221Image("tela1-us221-aba-monitor") },
  { label: "Tela2_US221_Aba_FluxoDeDados.png", alt: "Tela 2 da US221 — Aba Fluxo de Dados", ...us221Image("tela2-us221-aba-fluxodedados") },
  { label: "Tela3_US221_Aba_Raw&Storage.png", alt: "Tela 3 da US221 — Aba Raw & Storage", ...us221Image("tela3-us221-aba-raw-storage") },
  { label: "Tela3_US221_Aba_Raw&Storage2.png", alt: "Tela 3 da US221 — Aba Raw & Storage, segunda visão", ...us221Image("tela3-us221-aba-raw-storage2") },
  { label: "Tela3_US221_Aba_Raw&Storage_RAW.png", alt: "Tela 3 da US221 — Raw & Storage RAW", ...us221Image("tela3-us221-aba-raw-storage-raw") },
  { label: "Tela3_US221_Aba_Raw&Storage_RAW2.png", alt: "Tela 3 da US221 — Raw & Storage RAW, segunda visão", ...us221Image("tela3-us221-aba-raw-storage-raw2") },
  { label: "Tela4_US221_Aba_Api&Scade.png", alt: "Tela 4 da US221 — Aba API & SCADE", ...us221Image("tela4-us221-aba-api-scade") },
  { label: "Tela4_US221_Aba_Api&Scade2.png", alt: "Tela 4 da US221 — Aba API & SCADE, segunda visão", ...us221Image("tela4-us221-aba-api-scade2") },
  { label: "Kanban — Sprint 2", alt: "Kanban da Sprint 2 do Projeto SPRB-TR/BD", ...kanbanImage },
];

export default function List4() {
  return (
    <div className="list4-sprint2 sprint-page sprint-page--2">
      <CompactListHeader list="LIST 4" lab="SPRINT 2" title="Segunda Sprint do Projeto SPRB-TR/BD" />

      <section className="sprint1-meta">
        <div className="container">
          <span>Projeto Acadêmico SPRB-TR/BD</span>
          <strong>28/09 — 30/10/2026</strong>
        </div>
      </section>

      <section className="section sprint1-main">
        <div className="container content-stack content-stack--sprint1">
          <div className="sprint1-contribution-enunciado sprint-contribution-pair">
            <article className="contribution-card">
              <span className="eyebrow">Minha contribuição</span>
              <h2>{groundStationTitle(gsaV2)}</h2>
              <SprintContributionSummary summary={gsaV2.name+" — FastAPI local, RAW/PROCESSED, JSONL/SQLite e contrato C para SCADE."}>Na Sprint 2, a demonstração da US123 evoluiu para uma arquitetura local com frontend React/Vite/TypeScript e backend FastAPI,
                persistência RAW/PROCESSED e uma fronteira C preparada para formalizar o contrato de dados entre
                telemetria, sistema legado e ANSYS SCADE. A documentação técnica da US221 foi publicada no repositório
                oficial do TS2 para manter a rastreabilidade entre implementação, atividade e especificação.</SprintContributionSummary>
              <SprintContributionActions items={[
                {label:"Drive da Sprint 2",href:links.list4Drive,variant:"drive"},
                {label:"Repositório GitHub",href:personalRepositoryUrl},
                {label:"US221 T1",href:us221ProjectUrl},
                {label:"US221 — Contrato C API",href:us221DocumentationUrl}
              ]}/>
            </article>

            <ProjectContextCard sprint={2}/>
          </div>

          <div className="sprint-first-evidence">
            <SectionTitle
              eyebrow="US221"
              title={"Demonstração e evidências — "+gsaV2.name}
              description="Relatório pessoal da US221 / Sprint 2 e evidências visuais da implementação executada em localhost."
            />
            <div className="sprint2-report-block">
              <DriveFilePreview
                title="Relatorio Pessoal da US221 / Sprint2 por Leonardo Rossato"
                fileName="Relatorio_Pessoal_US221_Sprint2_Leonardo_Rossato.pdf"
                description="Relato individual da contribuição de Leonardo Camargo Rossato na US221 durante a Sprint 2, com arquitetura local, evolução semanal, evidências técnicas e anexos visuais."
                fileId={personalReportId}
                pagePreview="sprint2-relatorio"
                fallbackHref={personalReportUrl}
                buttonLabel="Abrir relatório pessoal"
                large
              />
            </div>

            <div className="sprint2-main-figures">
              <SprintSpriteFigure
                {...figure1Image}
                caption="Figura 1: Fluxo e Arquitetura dos dados na US221.png"
                alt="Fluxo e Arquitetura dos dados na US221"
              />
              <SprintSpriteFigure
                {...figure2Image}
                caption="Figura 2: JSON_para_Struct.png"
                alt="JSON para Struct na US221"
              />
            </div>

            <SprintEvidenceCarousel
              items={carouselItems}
              title="Telas da implementação US221"
            />
          </div>

          <div className="sprint2-supporting-docs-section">
            <SectionTitle
              eyebrow="Documentação técnica"
              title="Arquitetura local e integração RAW / Processed"
              description="Documentos de apoio produzidos na Sprint 2 para registrar a implementação local e orientar a integração das saídas tipadas com o ANSYS SCADE."
            />
            <div className="sprint2-supporting-docs">
              <DriveFilePreview
                title="Guia SCADE — US123 V1 RAW / Processed"
                fileName="Guia_SCADE_US123_V1_RAW_Processed.pdf"
                description="Guia técnico para consumir no ANSYS SCADE as saídas RAW e Processed da V1 local. Explica a ponte C tipada, o mapeamento JSON → struct C, as diferenças entre as estruturas e os passos sugeridos para criar wrappers e operadores externos no SCADE."
                fileId={rawProcessedGuideId}
                fallbackHref={`https://drive.google.com/file/d/${rawProcessedGuideId}/view`}
                buttonLabel="Abrir guia"
                large
                fitMode="width"
              />
              <DriveFilePreview
                title="US123 — Arquitetura V1 Local"
                fileName="US123_V1_Arquitetura_Local.pdf"
                description="Documento arquitetural da implementação executada em localhost. Registra React/Vite, backend FastAPI, persistência RAW em JSONL e Processed em SQLite, endpoints REST, organização de pastas e a fronteira C preparada para integração com o SCADE."
                fileId={localArchitectureId}
                fallbackHref={`https://drive.google.com/file/d/${localArchitectureId}/view`}
                buttonLabel="Abrir arquitetura"
                large
                fitMode="width"
              />
            </div>
          </div>

          <div>
            <SectionTitle
              eyebrow="GitHub"
              title="Repositório e Kanban da US221"
              description="Kanban da Sprint 2 com acesso direto à atividade US221 T1 e ao repositório individual da disciplina."
            />
            <div className="sprint2-repository-focus" style={{ display: "block" }}>
              <SprintSpriteFigure {...kanbanImage} caption="Kanban — US221" alt="Kanban da Sprint 2"/>

              <div
                className="sprint2-repository-links"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 12,
                  padding: 0,
                  border: 0,
                  background: "transparent",
                }}
              >
                <a
                  className="button button--primary"
                  href={us221ProjectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ flex: "1 1 360px" }}
                >
                  US221 T1 — Arquitetura e especificação dos contratos e tipos de dados da API <ExternalLink size={15}/>
                </a>
                <a
                  className="button button--secondary"
                  href={personalRepositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ flex: "1 1 360px" }}
                >
                  GitHub — ITA-CE235-EmbeddedSystems-RealTime <ExternalLink size={15}/>
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="sprint2-report-block">
              <DriveFilePreview
                title="Relatório — Evolução US123 → US221"
                fileName="US221_Sprint2_Evolucao_US123_para_US221.pdf"
                description="Arquitetura, diferenças entre as Sprints, backend local, persistência, JSON → struct C e próximos passos."
                fileId={sprint2ReportId}
                fallbackHref={sprint2ReportUrl}
                buttonLabel="Abrir relatório"
                large
              />
            </div>
          </div>

          <div>
            <SectionTitle eyebrow="Resumo técnico" title="Implementação" />
            <div className="sprint-tech-grid">
              <article><span>Frontend / monitor</span><strong>React · Vite · TypeScript</strong></article>
              <article><span>Backend local</span><strong>FastAPI · REST · localhost</strong></article>
              <article><span>Persistência</span><strong>RAW em JSONL · PROCESSED em SQLite</strong></article>
              <article><span>Interoperabilidade</span><strong>C bridge · JSON → struct · contrato C/C++</strong></article>
            </div>
            <p className="academic-disclaimer">
              Na Sprint 2 o sistema foi demonstrado localmente. O backend FastAPI e o banco SQLite não foram publicados como serviço web público;
              as bridges C existentes são protótipos de integração e a US221 formaliza o contrato de tipos, assinaturas e compatibilidade com SCADE/legado.
            </p>
          </div>

          <div>
            <SectionTitle
              eyebrow="Fluxo funcional"
              title="Cadeia de processamento da US221"
              description="Da telemetria JSON recebida do Time 1 ao dado validado e disponibilizado para consumidores."
            />
            <div className="sprint2-flow" aria-label="Fluxo funcional da Sprint 2">
              <span><small>TIME 1</small><strong>JSON RAW</strong></span><i>→</i>
              <span><small>INGESTÃO</small><strong>FastAPI</strong></span><i>→</i>
              <span><small>RAW</small><strong>JSONL</strong></span><i>→</i>
              <span><small>CORE</small><strong>Parser · Schema · Range · Sequence</strong></span><i>→</i>
              <span><small>CONTRATO</small><strong>JSON → struct C</strong></span><i>→</i>
              <span><small>PROCESSED</small><strong>SQLite</strong></span><i>→</i>
              <span><small>SAÍDA</small><strong>API / SCADE / consumidores</strong></span>
            </div>
            <p className="flow-note">
              A conversão do JSON bruto para estruturas tipadas é tratada tecnicamente como parsing/deserialização JSON → struct C,
              preparando o dado para o contrato formal da API.
            </p>
          </div>

          <div>
            <SectionTitle eyebrow="Rastreabilidade" title="Rastreabilidade da atividade" />
            <div className="traceability-grid">
              <a href={us221ProjectUrl} target="_blank" rel="noopener noreferrer"><span>US221 / Sprint 2</span><strong>T1 — #107</strong></a>
              <a href={us221DocumentationUrl} target="_blank" rel="noopener noreferrer"><span>Documentação técnica</span><strong>US221 — Contrato C API</strong></a>
              <a href={personalRepositoryUrl} target="_blank" rel="noopener noreferrer"><span>Repositório</span><strong>ITA CE-235</strong></a>
              <a href={sprint2ReportUrl} target="_blank" rel="noopener noreferrer"><span>Relatório</span><strong>US123 → US221</strong></a>
              <a href={list4Page} target="_blank" rel="noopener noreferrer"><span>Página</span><strong>List 4 / Sprint 2</strong></a>
            </div>
          </div>

          <div>
            <SectionTitle
              eyebrow="Transição"
              title="Dos Labs ao backend da central de terra"
              description="A evolução mantém a continuidade entre os laboratórios SCADE, a demonstração da Sprint 1 e a infraestrutura real planejada para a Sprint 3."
            />
            <div className="knowledge-bridge sprint2-bridge">
              <div><span>LABS</span><strong>SCADE</strong><strong>ARINC 661</strong><strong>Integração</strong></div>
              <i>→</i>
              <div><span>SPRINT 1</span><strong>US123</strong><strong>Demo online</strong><strong>Lógica no navegador</strong></div>
              <i>→</i>
              <div className="knowledge-bridge__target"><span>SPRINT 2</span><strong>US221</strong><strong>FastAPI + SQLite</strong><strong>Contrato C/C++</strong></div>
              <i>→</i>
              <div><span>SPRINT 3</span><strong>Raspberry / Ground Station</strong><strong>Banco do Time 2</strong><strong>API online</strong></div>
            </div>
            <div className="note-card sprint2-next-step">
              <h3>Próxima etapa</h3>
              <p>
                Implantar o backend no Raspberry do Time 2, que funcionará como servidor da central de comando de terra. O sistema deverá receber os JSONs do Time 1,
                validar e converter os dados, persistir no banco evoluído pelo time e disponibilizar os dados processados por API para SCADE, HMI ou outros consumidores.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
