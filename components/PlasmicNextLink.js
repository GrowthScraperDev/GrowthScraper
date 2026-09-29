import * as React from "react";
import Link from "next/link";

// Plasmic's default link drops the trailing slash from internal hrefs during
// server rendering, which conflicts with `trailingSlash: true` in next.config.
// Add it back here (skipping file paths like /file.pdf) so the SSR HTML matches.
function withTrailingSlash(href) {
  if (typeof href !== "string" || !href.startsWith("/") || href.startsWith("//")) {
    return href;
  }
  const match = href.match(/^([^?#]*)(.*)$/);
  const path = match[1];
  const rest = match[2];
  if (path.endsWith("/") || /\.[^/]+$/.test(path)) return href;
  return `${path}/${rest}`;
}

const PlasmicNextLink = React.forwardRef(function PlasmicNextLink(
  { href, ...props },
  ref
) {
  if (href === undefined || href === null || href === "") {
    return <a ref={ref} {...props} />;
  }
  return <Link ref={ref} href={withTrailingSlash(href)} {...props} />;
});

export default PlasmicNextLink;
