import { useState, useEffect, useCallback, useRef } from "react";
import "./about.css";
import Me from "../../assets/me.webp";
import { FaAward, FaCertificate, FaFolder } from "react-icons/fa";
import AnimatedSection from "../animated-section/AnimatedSection";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useInView,
  animate,
} from "framer-motion";
import useIsMobile from "../../hooks/useIsMobile";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const useTypewriter = (text: string, speed = 80, skip = false) => {
  const [displayed, setDisplayed] = useState(skip ? text : "");
  const [done, setDone] = useState(skip);

  const type = useCallback(() => {
    if (skip) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, skip]);

  useEffect(() => {
    return type();
  }, [type]);

  return { displayed, done };
};

/* ── Feature 3: Counting Stat ── */
interface CountingStatProps {
  target: number;
  suffix: string;
  label: string;
}

const CountingStat = ({ target, suffix, label }: CountingStatProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, {
      duration: 2,
      ease: "easeOut",
    });
    const unsubscribe = count.on("change", (v) => {
      setDisplay(Math.round(v).toString());
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [inView, count, target]);

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
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span className="word-reveal_word" style={{ opacity }}>
      {children}
    </motion.span>
  );
};

const WordReveal = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const isMobile = useIsMobile(1024);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.2"],
  });

  const words = text.split(" ");

  if (isMobile) {
    return <p>{text}</p>;
  }

  return (
    <p ref={containerRef} className="word-reveal">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
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
  const { displayed, done } = useTypewriter("Andrew Saifnoorian", 90, prefersReducedMotion);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(600);

  const { scrollYProgress } = useScroll({
    target: heroWrapperRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <section id="about">
      <div className="hero_wrapper" ref={heroWrapperRef}>
        <motion.div
          className="hero"
          style={isMobile ? { opacity: heroOpacity } : { opacity: heroOpacity, scale: heroScale }}
        >
          <h5 className="hero_greeting">Hey I'm</h5>
          <h1 className="hero_name">
            <span className={done ? "hero_name--gradient" : ""}>{displayed}</span>
            <span className={`hero_caret ${done ? "blink" : ""}`}>|</span>
          </h1>
          <p className="hero_subtitle text-light">
            Full-Stack Software Engineer
          </p>
        </motion.div>
      </div>

      <AnimatedSection>
        <div className="container about_container">
          <div className="about_me">
            <div className="about_me-image">
              <img src={Me} alt="About me" />
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
            <a href="#project" className="btn btn-primary">
              {" "}
              See my projects
            </a>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default About;
