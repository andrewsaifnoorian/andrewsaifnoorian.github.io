import { useState, useEffect, useCallback } from "react";
import "./about.css";
import Me from "../../assets/me.png";
import { FaAward, FaCertificate, FaFolder } from "react-icons/fa";
import AnimatedSection from "../animated-section/AnimatedSection";

const useTypewriter = (text: string, speed = 80) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  const type = useCallback(() => {
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
  }, [text, speed]);

  useEffect(() => {
    return type();
  }, [type]);

  return { displayed, done };
};

const About = () => {
  const { displayed, done } = useTypewriter("Andrew Saifnoorian", 90);

  return (
    <section id="about">
      <div className="hero">
        <h5 className="hero_greeting">Hey I'm</h5>
        <h1 className="hero_name">
          {displayed}
          <span className={`hero_caret ${done ? "blink" : ""}`}>|</span>
        </h1>
        <p className="hero_subtitle text-light">
          Full-Stack Software Engineer
        </p>
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
                <small>2+ Years Working</small>
              </article>
              <article className="about_card">
                <FaCertificate className="about_icon" />
                <h5>Certificates</h5>
                <small>3</small>
              </article>
              <article className="about_card">
                <FaFolder className="about_icon" />
                <h5>Projects</h5>
                <small>10+ projects completed</small>
              </article>
            </div>
            <p>
              Full-stack software engineer focused on building secure, scalable
              applications using React + TypeScript, Java/Spring Boot, and AWS
              (Aurora/Postgres). Strong interest in neural networks and machine
              learning, currently preparing for the AWS Solutions Architect -
              Associate certification and completing Anthropic's Claude training
              courses on applied AI and model capability.
            </p>
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
