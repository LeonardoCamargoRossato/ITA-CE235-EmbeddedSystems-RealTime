import SprintContributionActions from "./SprintContributionActions";

export default function ContributionCard({driveUrl,demoUrl,githubUrl,issueUrl}:{driveUrl:string;demoUrl:string;githubUrl:string;issueUrl:string}){
  return <article className="contribution-card">
    <span className="eyebrow">Minha contribuição</span>
    <h2>US123 — Telemetry Decoder</h2>
    <p>Como parte da Sprint 1, foi desenvolvida uma demonstração funcional da cadeia de recepção, desempacotamento e validação de telemetria, servindo como referência funcional para integração posterior com o ANSYS SCADE.</p>
    <SprintContributionActions items={[
      {label:"Drive da Sprint 1",href:driveUrl,variant:"drive"},
      {label:"Portal de acesso US123 (Telemetry Decoder versão 1)",href:demoUrl,variant:"app"},
      {label:"Repositório GitHub",href:githubUrl},
      {label:"Subsprint #70",href:issueUrl}
    ]}/>
  </article>;
}
