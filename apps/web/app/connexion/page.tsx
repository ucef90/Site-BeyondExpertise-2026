export default function LoginPage() {
  return (
    <main className="section page-main-compact">
      <div className="page-shell" style={{ maxWidth: 560 }}>
        <span className="eyebrow">Authentification</span>
        <h1 className="section-title">Connexion à l’espace client et apprenant.</h1>
        <form className="card" style={{ padding: 24, display: "grid", gap: 14 }}>
          <input className="input" placeholder="Email" />
          <input className="input" type="password" placeholder="Mot de passe" />
          <button type="submit" className="button button-primary">Se connecter</button>
        </form>
      </div>
    </main>
  );
}
