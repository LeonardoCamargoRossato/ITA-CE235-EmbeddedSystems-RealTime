import DriveFolderPreview from "../components/DriveFolderPreview";
import ListCard from "../components/ListCard";
import SectionTitle from "../components/SectionTitle";
import { lists } from "../data/lists";
import { links } from "../data/links";
import "../styles/activities-lists.css";

// The personal discipline folder is the verified direct parent of List0–List5.
// Keep the external link and the embedded folder ID tied to the same source.
const rootHref = links.disciplineDrive;
const rootId = rootHref.slice(rootHref.lastIndexOf("/") + 1);
const rootEmbed = `https://drive.google.com/embeddedfolderview?id=${encodeURIComponent(rootId)}#list`;

export default function Lists() {
  return (
    <section className="section page-section activities-lists">
      <div className="container content-stack">
        <div>
          <SectionTitle
            eyebrow="CE-235"
            title="Atividades: Listas"
            description="Trajetória documentada das atividades. Entrega documentada indica disponibilidade do trabalho individual, não aprovação acadêmica ou integração coletiva integral."
          />
          <div className="cards-grid activities-lists__grid">{lists.map((x) => <ListCard key={x.id} item={x} />)}</div>
        </div>

        <section id="arquivos" className="portal-anchor activities-lists__files" aria-label="Arquivos das Listas de Exercícios">
          <DriveFolderPreview
            title="Arquivos das Listas de Exercícios"
            description="Acervo completo das seis listas de exercícios da disciplina CE-235 | 2026/2, incluindo relatórios, projetos, códigos e evidências acadêmicas."
            href={rootHref}
            embed={rootEmbed}
            buttonLabel="Abrir pasta no Google Drive"
          />
          <p className="portal-note activities-lists__access-note">Se a prévia estiver indisponível, abra a pasta raiz no Google Drive ou use o botão Drive de cada atividade acima. O acesso aos arquivos depende das permissões existentes.</p>
        </section>
      </div>
    </section>
  );
}
