import {Link} from "react-router-dom";
import {ArrowUpRight} from "lucide-react";
import type {CSSProperties} from "react";
import {journey} from "../data/portalNavigation";
export default function CourseJourney(){return <div className="portal-journey-wrap"><div className="journey-preparatory-label">Nivelamento e ANSYS SCADE</div><ol className="portal-journey">{journey.map((s,i)=><li key={s.route} data-stage={i+1} style={{"--stage-color":s.color} as CSSProperties}><Link to={s.route}><span className="journey-number">{String(i+1).padStart(2,"0")} <ArrowUpRight size={13}/></span><strong>{s.title}</strong><small>{s.description}</small></Link></li>)}</ol></div>}
