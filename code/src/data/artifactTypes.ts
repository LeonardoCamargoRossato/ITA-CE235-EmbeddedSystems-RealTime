import {FileText,Network,ClipboardList,FlaskConical,Code2,NotebookPen,FolderOpen} from "lucide-react";
export const artifactTypes=[
 {id:"relatorios",label:"Relatórios",bg:"#E0ECFC",ink:"#315D95",Icon:FileText},
 {id:"arquitetura",label:"Arquitetura",bg:"#EFE5FA",ink:"#7854A0",Icon:Network},
 {id:"gestao",label:"Gestão",bg:"#FBF0CC",ink:"#795B12",Icon:ClipboardList},
 {id:"testes",label:"Testes e qualidade",bg:"#DDF1E5",ink:"#387950",Icon:FlaskConical},
 {id:"codigo",label:"Código e software",bg:"#F9E0DE",ink:"#AB524C",Icon:Code2},
 {id:"reunioes",label:"Reuniões",bg:"#FBE8D5",ink:"#8A5426",Icon:NotebookPen},
 {id:"acervos",label:"Acervos",bg:"#E8EBEF",ink:"#65717F",Icon:FolderOpen}
] as const;
export type ArtifactType=typeof artifactTypes[number]["id"];
export function artifactType(a:{name:string;format:string;category:string}){
 const n=a.name.toLowerCase();
 const id:ArtifactType=/arquitetura|diagrama/.test(n)?"arquitetura":/definition of|checklist|teste|auditoria/.test(n)?"testes":/atas|reuniões|weekly meeting/.test(n)?"reunioes":/backlog|kanban|burndown|planning poker|scrum|método de gerenciamento/.test(n)&&!n.includes("time 1")&&!n.includes("time 2")&&!n.includes("time 3")?"gestao":a.format==="Pasta"||a.category==="coletivos"?"acervos":/relatório|documentação|visão do projeto|missão atribuída/.test(n)?"relatorios":/jenkins|google sites|github pages|us123|landing gear|fuel management|integração entre/.test(n)?"codigo":"relatorios";
 return artifactTypes.find(t=>t.id===id)!;
}
