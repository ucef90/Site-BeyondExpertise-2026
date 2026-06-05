"use client";

import { useEffect } from "react";

/**
 * MotionLayer — site-wide motion without per-page markup.
 *
 * - Auto-tags a curated set of blocks/cards with `.reveal` and reveals them
 *   on scroll via IntersectionObserver (with a staggered delay between siblings).
 * - Re-scans on client navigation via a MutationObserver.
 * - Renders a thin scroll-progress bar at the top of the page.
 * - Fully gated by `html[data-motion="on"]`: when JS is off or the user prefers
 *   reduced motion, nothing is hidden and no animation runs.
 */
const REVEAL_SELECTOR = [
  ".section-heading-row",
  ".section-intro",
  ".cards-grid > *",
  ".feature-grid > *",
  ".home-stat-card",
  ".home-advantage-card",
  ".about-value-card",
  ".about-number-item",
  ".entreprises-use-case",
  ".entreprises-process-step",
  ".entreprises-funding-item",
  ".methodo-step",
  ".home-trust-item",
  ".home-resource-feature",
  ".home-resource-card",
  ".quote-benefit-card",
  ".training-content-card",
  ".premium-group-block",
  ".catalog-highlight",
  ".home-stats-panel",
  ".home-advantages-panel",
  ".home-interest-band",
  ".home-faq-band",
  ".home-logos-band",
  ".home-hero-plb",
  ".about-hero",
  ".entreprises-hero",
  ".contact-hero",
  ".catalog-page-hero",
  ".methodo-hero",
  "[data-reveal]"
].join(",");

export function MotionLayer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const root = document.documentElement;
    root.setAttribute("data-motion", "on");

    const processed = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    const scan = () => {
      const els = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
      els.forEach((el) => {
        if (processed.has(el)) return;
        processed.add(el);
        el.classList.add("reveal");

        // Stagger by position among matching siblings (capped for sanity).
        let index = 0;
        let prev = el.previousElementSibling;
        while (prev && index < 6) {
          if ((prev as HTMLElement).matches(REVEAL_SELECTOR)) index += 1;
          prev = prev.previousElementSibling;
        }
        el.style.setProperty("--reveal-i", String(Math.min(index, 6)));
        io.observe(el);
      });
    };

    let scheduled = false;
    const scheduleScan = () => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(() => {
        scheduled = false;
        scan();
      });
    };

    scan();

    const mo = new MutationObserver(scheduleScan);
    mo.observe(document.body, { childList: true, subtree: true });

    // Scroll progress bar
    const bar = document.createElement("div");
    bar.className = "be-scroll-progress";
    document.body.appendChild(bar);

    const onScroll = () => {
      const max = root.scrollHeight - root.clientHeight;
      const pct = max > 0 ? (root.scrollTop / max) * 100 : 0;
      bar.style.width = `${pct}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      bar.remove();
      root.removeAttribute("data-motion");
    };
  }, []);

  return null;
}
