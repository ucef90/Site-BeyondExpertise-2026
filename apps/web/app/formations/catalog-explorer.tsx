"use client";

import { useState } from "react";
import { TrainingCard } from "@/components/training-card";
import type { PremiumCatalogGroup, UiTraining } from "@/lib/api";

type CatalogExplorerProps = {
  trainings: UiTraining[];
  priorityTrainings: UiTraining[];
  premiumGroups: PremiumCatalogGroup[];
  initialQuery?: string;
};

function matchesDurationFilter(duration: string, selected: string) {
  if (!selected) {
    return true;
  }

  const days = Number(duration.split(" ")[0]);

  if (selected === "1") {
    return days === 1;
  }

  if (selected === "2") {
    return days === 2;
  }

  if (selected === "3plus") {
    return days >= 3;
  }

  return true;
}

function matchesPriceFilter(priceFrom: string, selected: string) {
  if (!selected) {
    return true;
  }

  if (priceFrom === "Sur demande") {
    return selected === "quote";
  }

  const numericValue = Number(priceFrom.replace(/[^\d]/g, ""));

  if (selected === "1000") {
    return numericValue <= 1000;
  }

  if (selected === "2000") {
    return numericValue > 1000 && numericValue <= 2000;
  }

  if (selected === "2000plus") {
    return numericValue > 2000;
  }

  return true;
}

export function CatalogExplorer({
  trainings,
  priorityTrainings,
  premiumGroups,
  initialQuery = ""
}: CatalogExplorerProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("");
  const [format, setFormat] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  const categories = Array.from(new Set(trainings.map((training) => training.category))).sort((a, b) => a.localeCompare(b));
  const formats = Array.from(new Set(trainings.map((training) => training.format))).sort((a, b) => a.localeCompare(b));
  const levels = Array.from(new Set(trainings.map((training) => training.level))).sort((a, b) => a.localeCompare(b));

  const normalizedQuery = query.trim().toLowerCase();

  const filteredTrainings = trainings.filter((training) => {
    const matchesQuery = !normalizedQuery || [
      training.title,
      training.category,
      training.summary,
      training.goals.join(" "),
      training.audience ?? ""
    ].join(" ").toLowerCase().includes(normalizedQuery);

    return (
      matchesQuery &&
      (!category || training.category === category) &&
      (!format || training.format === format) &&
      (!level || training.level === level) &&
      matchesDurationFilter(training.duration, duration) &&
      matchesPriceFilter(training.priceFrom, price)
    );
  });

  const filteredPriority = priorityTrainings.filter((training) => filteredTrainings.some((item) => item.id === training.id));
  const filteredGroups = premiumGroups
    .map((group) => ({
      ...group,
      trainings: group.trainings.filter((training) => filteredTrainings.some((item) => item.id === training.id))
    }))
    .filter((group) => group.trainings.length > 0);

  return (
    <>
      <div className="catalog-search-shell card" style={{ padding: 20, margin: "24px 0", display: "grid", gridTemplateColumns: "2fr repeat(5, 1fr)", gap: 12 }}>
        <input
          className="input"
          placeholder="Rechercher une formation, une expertise ou un besoin"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select className="select" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">Catégorie</option>
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <select className="select" value={format} onChange={(event) => setFormat(event.target.value)}>
          <option value="">Modalité</option>
          {formats.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <select className="select" value={level} onChange={(event) => setLevel(event.target.value)}>
          <option value="">Niveau</option>
          {levels.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <select className="select" value={duration} onChange={(event) => setDuration(event.target.value)}>
          <option value="">Durée</option>
          <option value="1">1 jour</option>
          <option value="2">2 jours</option>
          <option value="3plus">3 jours et +</option>
        </select>
        <select className="select" value={price} onChange={(event) => setPrice(event.target.value)}>
          <option value="">Prix</option>
          <option value="1000">Jusqu'à 1 000 €</option>
          <option value="2000">1 001 € à 2 000 €</option>
          <option value="2000plus">Plus de 2 000 €</option>
          <option value="quote">Sur demande</option>
        </select>
      </div>

      <div className="catalog-filter-summary">
        <strong>{filteredTrainings.length}</strong>
        <span>formation{filteredTrainings.length > 1 ? "s" : ""} correspondant à vos critères</span>
        {(query || category || format || level || duration || price) ? (
          <button
            type="button"
            className="catalog-reset-button"
            onClick={() => {
              setQuery("");
              setCategory("");
              setFormat("");
              setLevel("");
              setDuration("");
              setPrice("");
            }}
          >
            Réinitialiser les filtres
          </button>
        ) : null}
      </div>

      <section className="catalog-hero-band">
        <div>
          <span className="eyebrow">Vue d'ensemble</span>
          <h2 style={{ margin: "16px 0 10px", fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
            Un catalogue premium pensé pour les compétences les plus recherchées
          </h2>
          <p className="section-copy" style={{ marginBottom: 0 }}>
            Data, BI, IA, gouvernance, pilotage de projet, scrum, product et business analysis : chaque section aide à repérer rapidement les parcours les plus adaptés au métier, au niveau et au besoin entreprise.
          </p>
        </div>
        <div className="catalog-stats">
          <div className="card" style={{ padding: 18 }}>
            <strong>{trainings.length}</strong>
            <span>formations disponibles</span>
          </div>
          <div className="card" style={{ padding: 18 }}>
            <strong>{filteredTrainings.length}</strong>
            <span>résultats après filtres</span>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 34 }}>
        <div className="section-heading-row">
          <div>
            <span className="eyebrow">Sélection prioritaire</span>
            <h2 style={{ margin: "16px 0 10px", fontSize: "clamp(1.7rem, 2.8vw, 2.5rem)" }}>
              Les formations les plus visibles dans le tunnel de conversion
            </h2>
          </div>
          <p className="section-copy section-copy-narrow" style={{ marginBottom: 0 }}>
            Une mise en avant dédiée aux sujets qui génèrent le plus d’intérêt commercial aujourd’hui.
          </p>
        </div>
        <div className="cards-grid">
          {filteredPriority.slice(0, 6).map((training) => (
            <TrainingCard key={training.id} training={training} />
          ))}
        </div>
      </section>

      <section style={{ marginTop: 48 }}>
        {filteredGroups.map((group) => (
          <div key={group.key} id={group.key} className="premium-group-block" style={{ scrollMarginTop: 120 }}>
            <div className="premium-group-header">
              <div>
                <span className="premium-category-accent">{group.accent}</span>
                <h2 style={{ margin: "14px 0 10px", fontSize: "clamp(1.7rem, 2.8vw, 2.5rem)" }}>{group.title}</h2>
                <p className="section-copy" style={{ marginBottom: 0 }}>{group.description}</p>
              </div>
              <div className="premium-group-meta">
                <strong>{group.trainings.length}</strong>
                <span>{group.audience}</span>
              </div>
            </div>

            <div className="cards-grid" style={{ marginTop: 24 }}>
              {group.trainings.slice(0, 6).map((training) => (
                <TrainingCard key={training.id} training={training} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 56 }}>
        <span className="eyebrow">Catalogue complet</span>
        <h2 style={{ margin: "16px 0 24px", fontSize: "clamp(1.7rem, 2.8vw, 2.5rem)" }}>Toutes les formations disponibles</h2>
        <div className="cards-grid">
          {filteredTrainings.map((training) => (
            <TrainingCard key={training.id} training={training} />
          ))}
        </div>
      </section>
    </>
  );
}
