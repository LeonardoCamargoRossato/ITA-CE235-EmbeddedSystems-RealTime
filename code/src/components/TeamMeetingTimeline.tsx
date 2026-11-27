import { ExternalLink, CalendarDays } from "lucide-react";
import type { Meeting } from "../data/sprintContexts";

export default function TeamMeetingTimeline({meetings}:{meetings:Meeting[]}){
  return <ol className="team-timeline">{meetings.map(meeting=><li key={meeting.date}><article className="team-meeting"><div className="team-meeting__date"><CalendarDays size={16} aria-hidden="true"/><time dateTime={meeting.date.split("/").reverse().join("-")}>{meeting.date}</time></div><h3>{meeting.summary}</h3><details><summary>Leia mais</summary><p>{meeting.details}</p></details><div className="team-meeting__links">{meeting.resources.map(resource=><a className="button button--secondary" href={resource.href} target="_blank" rel="noopener noreferrer" key={resource.href}>{resource.title} <ExternalLink size={13}/></a>)}</div></article></li>)}</ol>;
}
