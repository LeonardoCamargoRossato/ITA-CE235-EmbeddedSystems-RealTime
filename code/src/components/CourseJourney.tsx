import {Link} from "react-router-dom";import {journey} from "../data/portalNavigation";
export default function CourseJourney(){return <ol className="portal-journey">{journey.map((s,i)=><li key={s.route}><Link to={s.route}><span>{String(i+1).padStart(2,"0")}</span><strong>{s.title}</strong><small>{s.description}</small></Link></li>)}</ol>}
