import {ArrowRight,ExternalLink} from "lucide-react";
import{Link}from"react-router-dom";
import StatusBadge from "./StatusBadge";
import type{ListItem}from"../data/lists";

export default function ListCard({item}:{item:ListItem}){
  const href=item.internalHref??`/${item.id}`;
  return <article className="list-card list-card--academic" data-activity={item.id}>
    <div className="list-card__top"><span>LIST {item.number}</span><StatusBadge status={item.status}/></div>
    <h3>{item.title}</h3>
    <p className="list-card__subtitle">{item.shortTitle}</p>
    {item.labs.length>0&&<div className="lab-summary">{item.labs.map(x=><span key={x}>{x}</span>)}</div>}
    <p>{item.description}</p>
    <div className="card-actions">
      <Link className="button button--primary" to={href}>{item.id==="list3"?"Ver Sprint 1":item.id==="list4"?"Ver Sprint 2":item.id==="list5"?"Ver Sprint 3":"Ver atividade"} <ArrowRight size={15}/></Link>
      {item.driveUrl
        ? <a className="button button--secondary" href={item.driveUrl} target="_blank" rel="noopener noreferrer">Drive <ExternalLink size={15}/></a>
        : <span className="button button--secondary button--disabled" aria-disabled="true">Drive a confirmar</span>}
    </div>
  </article>
}
