import { Link } from "react-router-dom";
import { groundStationVersions } from "../data/groundStation";
export default function GroundStationVersionTable({historical=false}:{historical?:boolean}){
 return <div className="gsa-table" tabIndex={0} role="region" aria-label="Evolução tecnológica da Ground Station API"><table><thead><tr><th>Sprint</th><th>User Story</th><th>{historical?"Desenvolvimento":"O que foi desenvolvido"}</th><th>{historical?"Identidade da versão":"Definição técnica"}</th></tr></thead><tbody>{groundStationVersions.map(v=><tr key={v.sprint}><th scope="row"><Link to={v.route}>Sprint {v.sprint}</Link></th><td>{v.userStory}</td><td>{historical?v.development:v.detail}</td><td>{historical?<><strong>{v.name}</strong><br/>{v.technicalName}</>:v.technicalNamePt}</td></tr>)}</tbody></table></div>
}
