"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ContactRound, GraduationCap, Phone, Users } from "lucide-react";

const links = [
  { href: "/formations", label: "Formations" },
  { href: "/entreprises", label: "Entreprises" },
  { href: "/expertises", label: "Expertises" },
  { href: "/ressources", label: "Ressources" },
  { href: "/contact", label: "Contact" }
] as const;

const LMS_LEARNER_URL = process.env.NEXT_PUBLIC_LMS_LEARNER_URL || "/apprenant";
const LMS_TRAINER_URL = process.env.NEXT_PUBLIC_LMS_TRAINER_URL || "/formateur";
const CLIENT_PORTAL_URL = "/espace";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="site-header">
      <div className="header-topbar">
        <div className="page-shell header-topbar-inner">
          <div className="header-topbar-copy">
            <span>Formations inter, intra et parcours entreprise</span>
            <span>Catalogue premium data, IA, projet, agile et product</span>
          </div>
          <div className="header-topbar-actions">
            <a href="tel:+33186762424" className="header-topbar-link">
              <Phone size={14} />
              <span>Parler à un conseiller</span>
            </a>
            <Link href="/contact" className="header-topbar-link">Contact</Link>
          </div>
        </div>
      </div>

      <div className="page-shell header-main-shell">
        <div className={`card header-main${mobileOpen ? " is-open" : ""}`}>
          <Link href="/" className="brand-lockup" aria-label="Beyond Expertise" onClick={closeMobile}>
            <Image
              src="/logo-beyond.png"
              alt="Beyond Expertise"
              width={235}
              height={84}
              priority
              className="brand-logo"
            />
          </Link>

          <button
            type="button"
            className={`header-burger${mobileOpen ? " is-open" : ""}`}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            aria-controls="header-collapse"
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span className="header-burger-box">
              <span />
              <span />
              <span />
            </span>
          </button>

          <div id="header-collapse" className={`header-collapse${mobileOpen ? " is-open" : ""}`}>
            <div className="header-nav-stack">
              <nav className="header-nav-primary">
                {links.map((link) => (
                  <Link key={link.href} href={link.href} className="header-nav-link" onClick={closeMobile}>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="header-quick-links">
                <Link href="/formations" className="header-quick-pill" onClick={closeMobile}>Formations les plus demandées</Link>
                <Link href="/expertises/copilot" className="header-quick-pill" onClick={closeMobile}>Copilot</Link>
                <Link href="/expertises/ai-agents" className="header-quick-pill" onClick={closeMobile}>Agents IA</Link>
                <Link href="/expertises/llmops" className="header-quick-pill" onClick={closeMobile}>LLMOps</Link>
              </div>
            </div>

            <div className="header-cta-stack">
              <Link href="/contact" className="button button-secondary header-contact-button" onClick={closeMobile}>
                <ContactRound size={17} />
                Contactez-nous
              </Link>
              <div className="header-space-menu" ref={menuRef}>
                <button
                  type="button"
                  className="button button-accent header-space-trigger"
                  onClick={() => setMenuOpen((value) => !value)}
                  aria-expanded={menuOpen}
                  aria-haspopup="menu"
                >
                  Mon espace
                  <ChevronDown size={16} />
                </button>

                {menuOpen ? (
                  <div className="header-space-dropdown" role="menu">
                    <a href={LMS_LEARNER_URL} className="header-space-item" role="menuitem" onClick={() => { setMenuOpen(false); closeMobile(); }}>
                      <GraduationCap size={17} />
                      <div>
                        <strong>Espace apprenant</strong>
                        <span>Accès LMS, progression, cours et certificats</span>
                      </div>
                    </a>
                    <a href={LMS_TRAINER_URL} className="header-space-item" role="menuitem" onClick={() => { setMenuOpen(false); closeMobile(); }}>
                      <Users size={17} />
                      <div>
                        <strong>Espace formateur</strong>
                        <span>Sessions, présence, contenus, évaluations</span>
                      </div>
                    </a>
                    <Link href={CLIENT_PORTAL_URL} className="header-space-item" role="menuitem" onClick={() => { setMenuOpen(false); closeMobile(); }}>
                      <ContactRound size={17} />
                      <div>
                        <strong>Espace client</strong>
                        <span>Demandes, devis, validations et documents</span>
                      </div>
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
