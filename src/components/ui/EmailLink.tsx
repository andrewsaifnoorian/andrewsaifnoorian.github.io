import type { ReactNode } from "react";
import { getEmail } from "../../data/profile";

interface EmailLinkProps {
  className?: string;
  children: ReactNode;
  subject?: string;
}

/**
 * The address is assembled only when clicked, so it never appears as a
 * plain mailto: in the rendered HTML that harvesters crawl.
 */
const EmailLink = ({ className, children, subject }: EmailLinkProps) => (
  <a
    href="#contact"
    className={className}
    onClick={(e) => {
      e.preventDefault();
      const q = subject ? `?subject=${encodeURIComponent(subject)}` : "";
      window.location.href = `mailto:${getEmail()}${q}`;
    }}
  >
    {children}
  </a>
);

export default EmailLink;
