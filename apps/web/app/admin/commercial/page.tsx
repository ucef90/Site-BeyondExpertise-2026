import Link from "next/link";
import {
  CommercialBoard,
  type CommercialOverview,
  type ContactRequest,
  type QuoteRequest,
  type EnrollmentRequest
} from "@/components/commercial-board";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000/api/v1";

async function fetchJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 10 }
    });

    if (!response.ok) {
      return fallback;
    }

    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export default async function CommercialAdminPage() {
  const [overview, contacts, quotes, enrollments] = await Promise.all([
    fetchJson<CommercialOverview>("/admin/commercial/overview", {
      contacts: 0,
      quotes: 0,
      enrollments: 0,
      totalRequests: 0
    }),
    fetchJson<ContactRequest[]>("/contacts", []),
    fetchJson<QuoteRequest[]>("/quotes", []),
    fetchJson<EnrollmentRequest[]>("/enrollments", [])
  ]);

  return (
    <main className="section page-main-compact">
      <div className="page-shell">
        <span className="eyebrow">Back-office commercial</span>
        <h1 className="section-title" style={{ maxWidth: "unset" }}>
          Suivre les demandes entrantes, qualifier les leads et prioriser les actions.
        </h1>
        <p className="section-copy">
          Cette vue centralise les formulaires du tunnel commercial Beyond Expertise. Elle sert de premier cockpit avant la construction d’un vrai CRM ou d’un back-office complet.
        </p>

        <CommercialBoard
          initialOverview={overview}
          initialContacts={contacts}
          initialQuotes={quotes}
          initialEnrollments={enrollments}
        />

        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0 }}>Prochaine étape recommandée</h2>
          <p className="section-copy">
            La couche suivante peut ajouter un historique d’actions, des notes internes, l’assignation à un commercial et des notifications métier.
          </p>
          <Link href="/formations" className="button button-primary">
            Retour au catalogue
          </Link>
        </div>
      </div>
    </main>
  );
}
