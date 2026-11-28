export type HomePerspective="individual"|"collective";
const collectiveSections=new Set(["recursos-academicos","projeto-coletivo"]);
const individualSections=new Set(["evolucao","trajetoria","relatorio","atividades"]);
export function homePerspective(params:URLSearchParams):HomePerspective{
 const section=params.get("secao")??"";
 if(collectiveSections.has(section))return "collective";
 if(individualSections.has(section))return "individual";
 if(params.get("visao")==="coletiva"||params.get("recursos")==="abertos"&&params.get("visao")!=="individual")return "collective";
 return "individual";
}
export function perspectiveParams(value:HomePerspective){return {visao:value==="collective"?"coletiva":"individual",secao:value==="collective"?"recursos-academicos":"evolucao"}}
