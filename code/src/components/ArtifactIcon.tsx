import {FileText,FileType,Network,Workflow,Code2,Github,FolderOpen,ClipboardList,ListChecks,Kanban,ChartNoAxesCombined,NotebookPen,FlaskConical,ShieldCheck,Users,Cpu} from "lucide-react";
type Metadata={name:string;format:string;category:string};
export default function ArtifactIcon({artifact}:{artifact:Metadata}){
 const n=artifact.name.toLowerCase();
 const Icon=n.includes("burndown")?ChartNoAxesCombined:n.includes("kanban")?Kanban:n.includes("product backlog")?ClipboardList:n.includes("sprint backlog")||n.includes("checklist")?ListChecks:n.includes("definition of")?ShieldCheck:n.includes("auditoria")||n.includes("teste")?FlaskConical:n.includes("atas")?NotebookPen:n.includes("time")||artifact.category==="coletivos"&&artifact.format!=="Pasta"?Users:n.includes("diagrama")?Workflow:n.includes("arquitetura")?Network:n.includes("github")?Github:n.includes("relatório")?FileText:n.includes("gear")||n.includes("fuel")||n.includes("integração entre")?Cpu:n.includes("us123")||n.includes("jenkins")?Code2:artifact.format==="Pasta"?FolderOpen:artifact.format==="PDF"?FileType:FileText;
 return <span className="artifact-icon" aria-hidden="true"><Icon size={22}/></span>
}
