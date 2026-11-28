import {groundStationVersions} from "./groundStation";
export const journey=[
 {route:"/list0",title:"Nivelamento — ListEx 0",description:"Página individual e Jenkins."},
 {route:"/list1",title:"Laboratórios — ListEx 1",description:"Landing Gear e Fuel Management com SCADE."},
 {route:"/list2",title:"Integração — ListEx 2",description:"Lab 3: comunicação entre aplicações."},
 ...groundStationVersions.map(v=>({route:v.route,title:`Sprint ${v.sprint} — GSA V${v.sprint}`,description:v.development})),
 {route:"/relatorio-final",title:"Relatório Final",description:"Síntese da contribuição individual."}
];
export const mainNav=[["/","Início"],["/disciplina","Disciplina"],["/projeto","Projeto"],["/listas","Atividades: Listas"],["/artefatos","Artefatos"],["/relatorio-final","Relatório Final"],["/curriculo","Currículo"]] as const;
export const sprintSections:Record<string,readonly (readonly [string,string])[]>={
 "/sprint1":[["contribuicao","Minha contribuição"],["demonstracao","Demonstração"],["repositorio","Repositório"],["implementacao","Implementação"],["fluxo","Fluxo funcional"],["rastreabilidade","Rastreabilidade"],["continuidade","Dos Labs ao projeto"],["enunciado","Enunciado"]],
 "/list4":[["contribuicao","Minha contribuição"],["relatorio","Relatório individual"],["arquitetura","Arquitetura"],["repositorio","Repositório e Kanban"],["relatorio-evolucao","Relatório de evolução"],["implementacao","Implementação"],["fluxo","Fluxo funcional"],["rastreabilidade","Rastreabilidade"],["continuidade","Continuidade"]],
 "/list5":[["contribuicao","Minha contribuição"],["relatorio","Relatório individual"],["arquitetura","Arquitetura"],["evolucao","Evolução tecnológica"],["rastreabilidade","Rastreabilidade"],["portal","Portal de acesso"],["resultados","Resultados experimentais"],["documentacao","Documentação técnica"],["historico","Histórico US123–US330"],["continuidade","Continuidade"]]
};
export const isActivity=(path:string)=>path==="/listas"||/^\/(?:list[0-5]|sprint1)(?:\/|$)/.test(path);
export const canonicalActivity=(path:string)=>path==="/list3"?"/sprint1":path;
export function breadcrumbs(path:string):{route:string;title:string}[]{
 const root=[{route:"/",title:"Início"}];if(path==="/")return root;
 if(isActivity(path)){
  const out=[...root,{route:"/listas",title:"Atividades: Listas"}];if(path==="/listas")return out;
  const [,,team]=path.split("/"),parent="/"+path.split("/")[1];
  const title=parent==="/list3"||parent==="/sprint1"?"Sprint 1":parent==="/list4"?"Sprint 2":parent==="/list5"?"Sprint 3":`ListEx ${parent.slice(-1)}`;
  out.push({route:parent,title});if(team)out.push({route:path,title:`Time ${team.slice(-1)}`});return out;
 }
 return [...root,{route:path,title:mainNav.find(x=>x[0]===path)?.[1]??(path==="/scade"?"ANSYS SCADE":"Página não encontrada")}];
}
export function routeTitle(path:string){
 const v=groundStationVersions.find(v=>v.route===canonicalActivity(path));
 return v?`Sprint ${v.sprint} — ${v.name}`:path==="/projeto"?"Projeto SPRB-TR/BD":breadcrumbs(path).slice(1).map(x=>x.title).join(" · ")||"Início";
}
