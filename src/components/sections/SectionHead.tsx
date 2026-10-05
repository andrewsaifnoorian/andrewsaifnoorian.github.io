import type { ReactNode } from "react";

interface SectionHeadProps {
  index: string;
  eyebrow: string;
  title: string;
  id: string;
  children?: ReactNode;
  action?: ReactNode;
}

const SectionHead = ({ index, eyebrow, title, id, children, action }: SectionHeadProps) => (
  <div className="section-head-row reveal">
    <div className="section-head">
      <p className="eyebrow">
        <span className="eyebrow__index">{index}</span>
        {eyebrow}
      </p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {children && <div className="section-lede">{children}</div>}
    </div>
    {action && <div className="section-head-action">{action}</div>}
  </div>
);

export default SectionHead;
