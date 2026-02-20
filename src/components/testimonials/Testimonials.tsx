import "./testimonials.css";
import AVTR1 from "../../assets/psmelvinson.webp";
import AVTR2 from "../../assets/mahdyf.webp";
import AVTR3 from "../../assets/tnoble.webp";
import AVTR4 from "../../assets/shorrigan.webp";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import TiltCard from "../tilt-card/TiltCard";
import ScrambleText from "../scramble-text/ScrambleText";

const peers = [
  {
    avatar: AVTR1,
    name: "Pawel Morysewicz",
    role: "Colleague",
    review:
      "Andrew is the best teammate I have ever worked with in and out of work.",
  },
  {
    avatar: AVTR2,
    name: "Mahdy Ferdaos",
    role: "Colleague",
    review:
      "Working alongside Andrew has been great. His learning is exponential. He is always eager to learn and improve his skills.",
  },
  {
    avatar: AVTR3,
    name: "Tyler Noble",
    role: "Peer",
    review:
      "Andrew is next up in cyber. He is a great team player and has a strong work ethic.",
  },
  {
    avatar: AVTR4,
    name: "Samuel Horrigan",
    role: "Peer",
    review:
      "There is no one that has more conviction than Andrew when it comes to data structures, algorithms, and system design.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 18,
      delay: i * 0.1,
    },
  }),
};

const Testimonials = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="testimonials">
      <h5>Review from Peers</h5>
      <ScrambleText text="Testimonials" />

      <div ref={ref} className="testimonials_grid container">
        {peers.map(({ avatar, name, role, review }, i) => (
          <TiltCard key={name}>
            {reducedMotion ? (
              <div className="testimonial-card">
                <span className="testimonial-quote" aria-hidden="true">
                  &ldquo;
                </span>
                <div className="testimonial-avatar">
                  <img src={avatar} alt={name} loading="lazy" />
                </div>
                <h5 className="testimonial-name">{name}</h5>
                <span className="testimonial-role">{role}</span>
                <p className="testimonial-review">&ldquo;{review}&rdquo;</p>
              </div>
            ) : (
              <motion.div
                className="testimonial-card"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <span className="testimonial-quote" aria-hidden="true">
                  &ldquo;
                </span>
                <div className="testimonial-avatar">
                  <img src={avatar} alt={name} loading="lazy" />
                </div>
                <h5 className="testimonial-name">{name}</h5>
                <span className="testimonial-role">{role}</span>
                <p className="testimonial-review">&ldquo;{review}&rdquo;</p>
              </motion.div>
            )}
          </TiltCard>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
