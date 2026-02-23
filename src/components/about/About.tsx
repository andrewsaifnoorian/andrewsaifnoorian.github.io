import { useRef } from "react";
import "./about.css";
import Me from "../../assets/me.webp";
import { FaAward, FaCertificate, FaFolder } from "react-icons/fa";
import AnimatedSection from "../animated-section/AnimatedSection";
import MagneticButton from "../magnetic-button/MagneticButton";
import BlurImage from "../blur-image/BlurImage";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import useIsMobile from "../../hooks/useIsMobile";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { useIsLowPerformance } from "../../hooks/usePerformanceTier";
import useTypewriter from "../../hooks/useTypewriter";
import useCountingAnimation from "../../hooks/useCountingAnimation";

interface CountingStatProps {
  target: number;
  suffix: string;
  label: string;
}

const CountingStat = ({ target, suffix, label }: CountingStatProps) => {
  const lowPerf = useIsLowPerformance();
  const { ref, display } = useCountingAnimation(target, lowPerf);

  return (
    <small ref={ref}>
      {display}
      {suffix} {label}
    </small>
  );
};

/* ── Feature 4: Word-by-Word Reveal ── */
interface WordProps {
  children: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}

const Word = ({ children, range, progress }: WordProps) => {
  const opacity = useTransform(progress, range, [0.65, 1]);
  return (
    <motion.span className="word-reveal_word" style={{ opacity }}>
      {children}{" "}
    </motion.span>
  );
};

const WordReveal = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const isMobile = useIsMobile(1024);
  const lowPerf = useIsLowPerformance();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.95", "start 0.65"],
  });

  const words = text.split(" ");

  if (isMobile || lowPerf) {
    return <p>{text}</p>;
  }

  return (
    <p ref={containerRef} className="word-reveal">
      {words.map((word, i) => {
        const start = (i / words.length) * 0.75;
        const end = ((i + 1) / words.length) * 0.75;
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

const About = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const lowPerf = useIsLowPerformance();
  const { displayed, done } = useTypewriter("Andrew Saifnoorian", 90, prefersReducedMotion);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(600);

  const { scrollYProgress } = useScroll({
    target: heroWrapperRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  const HeroTag = lowPerf ? "div" : motion.div;
  const heroStyle = lowPerf
    ? undefined
    : isMobile
      ? { opacity: heroOpacity }
      : { opacity: heroOpacity, scale: heroScale };

  return (
    <section id="about">
      <div className="hero_wrapper" ref={heroWrapperRef}>
        <HeroTag
          className="hero"
          style={heroStyle}
        >
          <h5 className="hero_greeting">Hey I'm</h5>
          <h1 className="hero_name">
            <span className={done ? "hero_name--gradient" : ""}>{displayed}</span>
            <span className={`hero_caret ${done ? "blink" : ""}`}>|</span>
          </h1>
          <p className="hero_subtitle text-light">
            Full-Stack Software Engineer
          </p>
        </HeroTag>
      </div>

      <AnimatedSection>
        <div className="container about_container">
          <div className="about_me">
            <div className="about_me-image">
              <BlurImage src={Me} alt="About me" />
            </div>
          </div>
          <div className="about_content">
            <div className="about_cards">
              <article className="about_card">
                <FaAward className="about_icon" />
                <h5>Experience</h5>
                <CountingStat target={2} suffix="+" label="Years Working" />
              </article>
              <article className="about_card">
                <FaCertificate className="about_icon" />
                <h5>Certificates</h5>
                <CountingStat target={3} suffix="" label="" />
              </article>
              <article className="about_card">
                <FaFolder className="about_icon" />
                <h5>Projects</h5>
                <CountingStat target={10} suffix="+" label="projects completed" />
              </article>
            </div>
            <WordReveal text="Full-stack software engineer focused on building secure, scalable applications using React + TypeScript, Java/Spring Boot, and AWS (Aurora/Postgres). Strong interest in neural networks and machine learning, currently preparing for the AWS Solutions Architect - Associate certification and completing Anthropic's Claude training courses on applied AI and model capability." />
            <MagneticButton>
              <a href="#project" className="btn btn-primary">
                {" "}
                See my projects
              </a>
            </MagneticButton>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default About;
