import { ExternalLink } from "lucide-react";
import "./SprintContributionActions.css";

type Action = { label: string; href: string; variant?: "drive" | "app" | "secondary"; title?: string };

export default function SprintContributionActions({items}:{items:Action[]}) {
  return <div className="card-actions contribution-card__actions sprint-contribution-actions">
    {items.map(({label,href,variant="secondary",title})=>(
      <a key={label} className={`button ${variant==="drive"?"button--gold":variant==="app"?"button--app-accent":"button--ghost-dark"}`} href={href} title={title} target="_blank" rel="noopener noreferrer">
        {label} <ExternalLink size={15}/>
      </a>
    ))}
  </div>;
}
