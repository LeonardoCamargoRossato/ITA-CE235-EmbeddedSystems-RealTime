import {useEffect,useState} from "react";
import {labFolderCatalog,driveItemHref} from "../data/labFolderCatalog";
import { ExternalLink, FolderOpen,FileText } from "lucide-react";

type Props = {
  title: string;
  description?: string;
  href: string;
  embed: string;
  buttonLabel?: string;
  compact?: boolean;
};

export default function DriveFolderPreview({
  title, description, href, embed, buttonLabel = "Abrir no Google Drive", compact = false
}: Props) {
  const id=href.split("/").at(-1)??"";
  const catalog=labFolderCatalog[id];
  const [attempt,setAttempt]=useState(0),[timedOut,setTimedOut]=useState(false),[keep,setKeep]=useState(false);
  useEffect(()=>{if(!catalog||!attempt||keep)return;const timer=window.setTimeout(()=>setTimedOut(true),10000);return()=>window.clearTimeout(timer)},[catalog,attempt,keep]);
  if(catalog)return <article className="embedded-drive-card lab-folder-catalog" data-folder-id={id}>
    <div className="embedded-drive-card__body"><span className="embedded-drive-card__icon"><FolderOpen size={18}/></span><div><h3>{title}</h3><p>{description}</p><a className="button button--primary" href={href} target="_blank" rel="noopener noreferrer">{buttonLabel} <ExternalLink size={14}/></a></div></div>
    <div className="lab-catalog-list">{catalog.map(item=><a key={item.id} href={driveItemHref(item)} target="_blank" rel="noopener noreferrer">{item.folder?<FolderOpen size={19}/>:<FileText size={19}/>}<span><strong>{item.name}</strong>{item.description&&<small>{item.description}</small>}</span><ExternalLink size={14}/></a>)}</div>
    <div className="lab-external-preview"><p role="status">{timedOut?"Não foi possível confirmar a visualização incorporada do Google Drive. Utilize os arquivos listados ou abra a pasta original.":attempt?"Visualização complementar: a disponibilidade depende do Google Drive e das permissões.":"Catálogo disponível sem incorporação externa. A prévia do Drive é opcional."}</p><button type="button" className="button button--secondary" onClick={()=>{setKeep(false);setTimedOut(false);setAttempt(n=>n+1)}}>{attempt?"Tentar carregar novamente":"Carregar visualização do Drive"}</button>{attempt>0&&!timedOut&&<><button type="button" className="button button--secondary" onClick={()=>{setAttempt(0);setTimedOut(false);setKeep(false)}}>Ocultar visualização</button><button type="button" className="button button--secondary" onClick={()=>setKeep(true)} disabled={keep}>Manter visualização aberta</button></>}{attempt>0&&!timedOut&&<div className="embedded-drive-card__preview"><iframe key={attempt} src={embed} title={`Preview — ${title}`} referrerPolicy="no-referrer"/></div>}</div>
  </article>;
  return (
    <article className={`embedded-drive-card${compact ? " embedded-drive-card--compact" : ""}`}>
      <div className="embedded-drive-card__preview">
        <iframe src={embed} title={`Preview — ${title}`} loading="lazy" referrerPolicy="no-referrer" />
      </div>
      <div className="embedded-drive-card__body">
        <span className="embedded-drive-card__icon"><FolderOpen size={18}/></span>
        <div>
          <h3>{title}</h3>
          {description && <p>{description}</p>}
          <a className="button button--primary" href={href} target="_blank" rel="noopener noreferrer">
            {buttonLabel} <ExternalLink size={14}/>
          </a>
        </div>
      </div>
    </article>
  );
}
