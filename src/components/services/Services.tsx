import "./services.css";
import { FaCheckSquare } from "react-icons/fa";
import { motion } from "framer-motion";
import AnimatedSection from "../animated-section/AnimatedSection";
import ScrambleText from "../scramble-text/ScrambleText";

const services = [
  {
    title: "Workflow Automation, Batch Processing & Platform Modernization",
    items: [
      "Refactoring and modernizing Java/Spring Boot batch-processing systems, boosting throughput up to 4x and cutting runtimes from 20 minutes to under 5.",
      "Leading release management, orchestrating RFC cycles, cutovers, rollback plans, and stakeholder approvals for production deployments.",
      "Building Selenium/Cucumber automation that reduced regression workload by 2–3 days per cycle and surfaced 17+ critical issues pre-production.",
    ],
  },
  {
    title: "Full-Stack Development for Secure & Scalable Applications",
    items: [
      "Developing full-stack applications with React + TypeScript, Java/Spring Boot, and AWS (Aurora/Postgres), with a strong focus on security and performance.",
      "Migration and modernization of legacy Angular apps (v8/v10 → v19), removing technical debt, improving first-paint speed by 35%, and integrating MSAL SSO with OAuth 2.0 + PKCE.",
      "Designing RESTful APIs, scalable database schemas, and seamless authentication flows to support enterprise-level workflows and payment-secure systems.",
    ],
  },
  {
    title: "DevOps, CI/CD Automation & Application Performance Optimization",
    items: [
      "Implementing GitLab CI/CD pipelines with SonarQube, Docker, and AWS integrations to automate deployments, testing, and quality gates.",
      "Improving application stability through rigorous debugging, log analysis, code reviews, and real-time error monitoring.",
      "Optimizing frontend and backend performance, enhancing user experience, reducing latency, and strengthening system reliability.",
    ],
  },
];

const Services = () => {
  return (
    <section id="services">
      <h5>What I Offer</h5>
      <ScrambleText text="Services" />

      <AnimatedSection>
        <div className="container services_container">
          {services.map((service, index) => (
            <motion.article
              key={index}
              className="services"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="service_head">
                <h3>{service.title}</h3>
              </div>
              <ul className="service_list">
                {service.items.map((item, i) => (
                  <li key={i}>
                    <FaCheckSquare className="service_list-icon" />
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
};

export default Services;
