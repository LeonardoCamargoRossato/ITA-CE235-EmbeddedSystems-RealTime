import {links} from "./links";
import {artifacts} from "./artifacts";
type Resource={name:string;description:string;href:string;restricted?:boolean};
const catalog=(name:string,description:string):Resource[]=>artifacts.filter(a=>a.name===name).map(a=>({name,description,href:a.href,restricted:true}));
export const academicResources:Resource[]=[
 {name:"Portal oficial SPRB-TR/BD",description:"Contexto acadêmico do projeto.",href:links.sprbOfficial},
 {name:"CE-235 — Página oficial",description:"Informações específicas da disciplina.",href:links.sprbCe235},
 {name:"GitHub coletivo",description:"Código, documentação e User Stories.",href:links.projectRepository},
 {name:"Drive coletivo",description:"Documentos e entregáveis dos times.",href:links.projectDrive,restricted:true},
 ...catalog("Visão do projeto","Contextualização e objetivos."),
 ...catalog("Missão atribuída","Escopo da demonstração acadêmica."),
 {name:"Modelos e Artefatos",description:"Recursos metodológicos e técnicos.",href:links.modelsDrive,restricted:true},
 ...catalog("Arquitetura coletiva","Organização dos segmentos e componentes."),
 ...catalog("Product Backlog","Requisitos e funcionalidades."),
 {name:"Site do professor Cunha",description:"Referências acadêmicas.",href:links.profCunha}
];
