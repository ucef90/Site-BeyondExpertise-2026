"use client";

import { lazy, Suspense } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

/**
 * Animated 3D Spline scene used as a decorative, non-interactive background that
 * fills its (positioned) parent. Lazy-loaded behind a Suspense dark fallback so
 * it never blocks rendering. `pointer-events: none` keeps any wrapping link/card
 * fully clickable.
 */
export function SplineBackground({ scene }: { scene: string }) {
  return (
    <div className="bx-spline" aria-hidden="true">
      <Suspense fallback={<div className="bx-spline-fallback" />}>
        <Spline scene={scene} className="bx-spline-canvas" />
      </Suspense>
    </div>
  );
}
