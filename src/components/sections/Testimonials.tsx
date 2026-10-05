import SectionHead from "./SectionHead";
import { testimonials } from "../../data/testimonials";
import "./testimonials.css";

const Testimonials = () => (
  <section id="testimonials" className="section page" aria-labelledby="testimonials-title">
    <SectionHead index="07" eyebrow="From peers" title="What people say" id="testimonials-title" />
    <ul className="quotes">
      {testimonials.map((t) => (
        <li key={t.name} className="quote reveal">
          <figure>
            <blockquote>
              <p>{t.review}</p>
            </blockquote>
            <figcaption>
              <img src={t.avatar} alt="" width={40} height={40} loading="lazy" decoding="async" />
              <span>
                <span className="quote__name">{t.name}</span>
                <span className="quote__role">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  </section>
);

export default Testimonials;
