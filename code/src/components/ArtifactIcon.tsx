import {artifactType} from "../data/artifactTypes";
export default function ArtifactIcon({artifact}:{artifact:{name:string;format:string;category:string}}){const t=artifactType(artifact);return <span className="artifact-icon" data-type={t.id} style={{background:t.bg,color:t.ink}} aria-hidden="true"><t.Icon size={22}/></span>}
