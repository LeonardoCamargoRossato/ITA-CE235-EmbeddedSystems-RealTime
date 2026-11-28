export default function SectionTitle({ eyebrow, title, description, id }: { eyebrow?: string; title: string; description?: string; id?: string }) {
  return (
    <div className="section-title" id={id}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}