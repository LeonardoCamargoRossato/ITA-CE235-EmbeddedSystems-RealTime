import {links} from "./links";
export type ArtifactCategory="individuais"|"coletivos"|"gestao";
type Artifact={name:string;activity:string;description:string;format:string;origin:string;access:string;href:string;category:ArtifactCategory};
const drive=(id:string)=>`https://drive.google.com/file/d/${id}/view`;
const item=(category:ArtifactCategory,name:string,activity:string,description:string,format:string,origin:string,access:string,href:string):Artifact=>({category,name,activity,description,format,origin,access,href});
const individual=(name:string,activity:string,id:string,description:string)=>item("individuais",name,activity,description,"PDF","Drive individual","Sujeito a permissões",drive(id));
const internal=(category:ArtifactCategory,name:string,activity:string,description:string,href:string)=>item(category,name,activity,description,"Página / acervo","Portal CE-235","Página pública; fontes podem exigir acesso",href);
export const artifactGroups=[{id:"individuais",name:"Documentação individual"},{id:"coletivos",name:"Documentação coletiva"},{id:"gestao",name:"Gestão e metodologia"}] as const;
export const artifacts:Artifact[]=[
 individual("Google Sites — página individual","ListEx 0",links.list0GoogleSitesPdfId,"Primeira versão do portal acadêmico."),
 individual("GitHub Pages — página individual","ListEx 0",links.list0GithubPagesPdfId,"Nova versão do portal acadêmico."),
 individual("Jenkins","ListEx 0",links.list0JenkinsPdfId,"Pesquisa sobre integração contínua."),
 individual("Landing Gear System","Lab 1",links.lab1ReportPdfId,"Modelagem e simulação com SCADE."),
 individual("Fuel Management System","Lab 2",links.lab2ReportPdfId,"Gerenciamento de combustível."),
 individual("Integração entre aplicações","Lab 3",links.lab3ReportPdfId,"Comunicação entre aplicações SCADE."),
 internal("individuais","US123 — Telemetry Decoder","Sprint 1","Demonstração, código e evidências reais.","/sprint1"),
 internal("individuais","Relatório individual — US123","Sprint 1","Relato retrospectivo de cinco páginas elaborado em 28/11/2026.","/sprint1?secao=relatorio"),
 individual("Relatório individual — US221","Sprint 2","1SKaTGLuDpG73mpjqtZCscrjLby858x6S","Arquitetura local e contratos de dados."),
 internal("individuais","Relatório individual — US330","Sprint 3","Relatório de cinco páginas, evidências e PDF original.","/list5?secao=relatorio"),
 internal("individuais","Relatório Individual Final","2026/2","Documento aprovado de 15 páginas com sumário interativo.","/relatorio-final"),
 internal("individuais","Diagramas e arquitetura GSA","Sprint 3","Arquitetura aprovada e evolução tecnológica.","/list5?secao=arquitetura"),
 internal("individuais","Documentação técnica GSA","Sprint 3","Relato, contratos e rastreabilidade.","/list5?secao=documentacao"),
 ...[["Sprint 1","Time 1 — Segmento Espacial","/sprint1/time1"],["Sprint 1","Time 2 — Segmento Terrestre","/sprint1/time2"],["Sprint 2","Time 1 — Segmento Espacial","/list4/time1"],["Sprint 2","Time 2 — Segmento Terrestre","/list4/time2"],["Sprint 3","Time 3 — Integração","/list5/time3"]].map(([activity,name,href])=>internal("coletivos",name,activity,"Contexto, entregáveis, reuniões, atas e referências oficiais.",href)),
 item("coletivos","Acervo coletivo","Todas as Sprints","Pasta oficial de documentação compartilhada.","Pasta","Google Drive","Sujeito a permissões",links.projectDrive),
 ...[["Visão do projeto","1q1a6qwGV2oAogB7cHonyTZ6Sehe05Q3T","DOCX"],["Missão atribuída","1ucSMpfxTnSWORH8c7kPD8FDHXF4bUVds","PDF"],["Arquitetura coletiva","1cYrXM0s24L8n17pFstGWAPk4iTLs4PC_","PPTX"],["Composição dos Times Scrum","1_eeNTk_e4penzED_lw5FOYv1_sZEx2D2","XLSX"],["Product Backlog","1K93N5q_TlgnAUm23sRNMjGmz_aA8HK7LwbotBVx7zRc","Planilha"],["Sprint Backlog","1CwACilRNRjnWczQpybCekbGZsW6HSW3dtOJwfl6xwmo","Planilha"],["Kanban GitHub","1n5ZHOuBmgtT6_oWARIjDY0MkF3hRqgL9LJN-JQg22L8","Documento"],["Burndown Chart — Sprint 1","1ftSifIDFPIeSQdmevwb-S-biuIKRmthr","XLSX"],["Burndown Chart — Sprint 2","1wfwAdEeZtulNbvlTuH328APFRMMYKhB3","XLSX"],["Burndown Chart — Sprint 3","1WmQd2V6w3JzvFwyfZxMMbusCIvu7BTOg","XLSX"],["Atas — modelo Weekly Meeting","1bJnTxp-EOH-szNUMpHIKI7smIUxK5kXb","DOCX"],["Planning Poker — modelo","1nfnq_Up-6dli0S50GkDMx9dbYdLHsgcJ","XLSX"],["Definition of Ready","1Bb6ea_taGkjNNw-J91NbI-ME_Tp9h82d","DOCX"],["Definition of Done","13LHt8cF54TXYfFMugmuKAxwBsWPvkPB0","DOCX"],["Execução de testes — modelo","17tYTaO1AHMNWRAXluLjy3e3lLQkH6rIw","XLSX"],["Checklist para revisão de User Story","1WK7WSXdkzOQ0nHlxUpGTQHvYd8Dg4nLV","DOCX"],["Método de gerenciamento ágil Scrum","13JLON31S1fy9C64MOYO4Aq9YE5F3TY6Z","PDF"]].map(([name,id,format])=>item("gestao",name,/Sprint [123]$/.test(name)?name.slice(-8):"Projeto SPRB-TR/BD","Referência original da pasta Modelos/Artefatos.",format,"Drive coletivo","Sujeito a permissões",drive(id))),
 item("gestao","Casos de teste e auditorias","Sprint 3","Issues, evidências e campanhas de testes coletivos.","Repositório / issues","GitHub coletivo","Sujeito a permissões",links.projectGithub),
 item("gestao","Modelos e artefatos oficiais","2026/2","Acervo completo, incluindo versões e modelos.","Pasta","Google Drive","Sujeito a permissões",links.modelsDrive),
];
