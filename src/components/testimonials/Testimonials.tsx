import "./testimonials.css";
import AVTR1 from "../../assets/psmelvinson.webp";
import AVTR2 from "../../assets/mahdyf.webp";
import AVTR3 from "../../assets/tnoble.webp";
import AVTR4 from "../../assets/shorrigan.webp";
import { useRef, type MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import useRelativeMouse from "../../hooks/useRelativeMouse";
import useIsMobile from "../../hooks/useIsMobile";
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
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 2 === 0 ? -60 : 60,
    y: 20,
    scale: 0.92,
    rotateY: i % 2 === 0 ? -8 : 8,
  }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      mass: 0.8,
      delay: i * 0.12,
    },
  }),
};

const handleSpotlight = (e: MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  e.currentTarget.style.setProperty("--spotlight-x", `${x}%`);
  e.currentTarget.style.setProperty("--spotlight-y", `${y}%`);
};

/* ── Individual card with inner parallax ── */
const TestimonialCard = ({
  avatar,
  name,
  role,
  review,
  index,
  isInView,
  isMobile,
  reducedMotion,
}: {
  avatar: string;
  name: string;
  role: string;
  review: string;
  index: number;
  isInView: boolean;
  isMobile: boolean;
  reducedMotion: boolean;
}) => {
  const { ref, relX, relY, isHovered } = useRelativeMouse<HTMLDivElement>();

  const enableParallax = isHovered && !isMobile && !reducedMotion;

  const quoteStyle = enableParallax
    ? { transform: `translate(${-relX * 12}px, ${-relY * 10}px)` }
    : undefined;

  const avatarStyle = enableParallax
    ? { transform: `translate(${relX * 6}px, ${relY * 5}px) scale(1)` }
    : undefined;

  const content = (
    <div className="testimonial-card-inner">
      <span
        className="testimonial-quote"
        aria-hidden="true"
        style={quoteStyle}
      >
        &ldquo;
      </span>
      <div className="testimonial-avatar" style={avatarStyle}>
        <img src={avatar} alt={name} loading="lazy" />
      </div>
      <h5 className="testimonial-name">{name}</h5>
      <span className="testimonial-role">{role}</span>
      <div className="testimonial-divider" />
      <p className="testimonial-review">&ldquo;{review}&rdquo;</p>
    </div>
  );

  if (reducedMotion) {
    return (
      <TiltCard>
        <div className="testimonial-card">{content}</div>
      </TiltCard>
    );
  }

  return (
    <TiltCard>
      <motion.div
        ref={ref}
        className="testimonial-card"
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        onMouseMove={handleSpotlight}
      >
        {content}
      </motion.div>
    </TiltCard>
  );
};

/* ── Main component ── */
const Testimonials = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile(1024);

  return (
    <section id="testimonials">
      <h5>Review from Peers</h5>
      <ScrambleText text="Testimonials" />

      <div ref={ref} className="testimonials_grid container">
        {peers.map(({ avatar, name, role, review }, i) => (
          <TestimonialCard
            key={name}
            avatar={avatar}
            name={name}
            role={role}
            review={review}
            index={i}
            isInView={isInView}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
