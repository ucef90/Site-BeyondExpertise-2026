import Link from "next/link";
import { CalendarDays, GraduationCap, MapPinned } from "lucide-react";
import type { UiTraining } from "@/lib/api";

export function TrainingCard({ training }: { training: UiTraining }) {
  return (
    <article className={`card training-card${training.isPriority ? " training-card-priority" : ""}`} style={{ gridColumn: "span 4" }}>
      <div className="training-card-head">
        <p className="eyebrow" style={{ margin: 0 }}>{training.category}</p>
        {training.isPriority ? <span className="priority-badge">Nouveau parcours</span> : null}
      </div>
      <h3 className="training-card-title">{training.title}</h3>
      <p className="section-copy training-card-summary">{training.summary}</p>
      <div className="training-card-meta-grid">
        <span>Format : {training.format}</span>
        <span>Niveau : {training.level}</span>
        <span>Durée : {training.duration}</span>
        <span>À partir de : {training.priceFrom}</span>
      </div>
      <div className="training-card-bottom">
        <div className="training-card-session">
          <div className="training-card-session-item">
            <CalendarDays size={16} />
            <span>Prochaine session : {training.nextSession}</span>
          </div>
          <div className="training-card-session-item">
            <GraduationCap size={16} />
            <span>{training.level}</span>
          </div>
          <div className="training-card-session-item">
            <MapPinned size={16} />
            <span>{training.format}</span>
          </div>
        </div>
        <div className="training-card-actions">
          <Link href={`/formations/${training.slug}`} className="button button-primary">
            Voir la formation
          </Link>
          <Link href="/devis" className="training-card-inline-link">
            Demander un devis
          </Link>
        </div>
      </div>
    </article>
  );
}
