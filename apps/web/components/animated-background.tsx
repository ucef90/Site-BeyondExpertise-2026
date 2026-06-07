import type { ReactNode } from "react";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4";

/**
 * Full-screen looping video background (autoplay, muted, inline, looped).
 * The video sits behind everything via z-index; `children` are rendered on top.
 */
export function AnimatedBackground({ children }: { children?: ReactNode }) {
  return (
    <section className="bx-video-hero">
      <video
        className="bx-video-hero-media"
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="bx-video-hero-scrim" aria-hidden="true" />
      {children ? <div className="bx-video-hero-content">{children}</div> : null}
    </section>
  );
}
