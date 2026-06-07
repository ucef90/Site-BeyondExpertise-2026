"use client";

import { useState } from "react";

/**
 * Displays a client reference: the company's brand icon (fetched at runtime by
 * the visitor's browser from a favicon service) next to its name. If the icon
 * can't be loaded, only the styled name is shown — the wall never breaks.
 */
export function ClientLogo({
  name,
  domain,
  decorative = false
}: {
  name: string;
  domain: string;
  decorative?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="home-logo-item home-logo-item-img" title={name} aria-hidden={decorative}>
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://icons.duckduckgo.com/ip3/${domain}.ico`}
          alt=""
          aria-hidden="true"
          width={24}
          height={24}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : null}
      <span>{name}</span>
    </div>
  );
}
