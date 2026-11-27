import { ExternalLink, FileText, FolderOpen, Video, Table2, Presentation, Github } from "lucide-react";
import type { Resource } from "../data/sprintContexts";

export default function TeamResourceCard({resource}:{resource:Resource}){
  const Icon=resource.kind==="Pasta"?FolderOpen:resource.kind==="Vídeo"?Video:resource.kind==="PPTX"?Presentation:/Planilha|XLS/.test(resource.kind)?Table2:resource.kind.startsWith("GitHub")?Github:FileText;
  return <article className="team-resource"><div className="team-resource__top"><Icon size={21} aria-hidden="true"/><span>{resource.kind}{resource.date?` · ${resource.date}`:""}</span></div><h3>{resource.title}</h3><p>{resource.description}</p><a className="team-source-link" href={resource.href} target="_blank" rel="noopener noreferrer">Abrir fonte original <ExternalLink size={13}/><span className="team-visually-hidden"> — {resource.title}</span></a></article>;
}
