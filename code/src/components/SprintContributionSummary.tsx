import { useId, useState } from "react";
export default function SprintContributionSummary({summary,children}:{summary:string;children:string}){
  const [expanded,setExpanded]=useState(false);
  const id=useId();
  return <div className="sprint-contribution-summary">
    <p>{summary}</p>
    <div id={id} hidden={!expanded}><p>{children}</p></div>
    <button type="button" className="sprint-read-more" aria-expanded={expanded} aria-controls={id} onClick={()=>setExpanded(v=>!v)}>{expanded?"Leia menos":"Leia mais"}</button>
  </div>;
}
