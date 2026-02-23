import { useRef, FormEvent } from "react";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import "./contact.css";
import { FaFileAlt, FaLinkedin } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import AnimatedSection from "../animated-section/AnimatedSection";
import MagneticButton from "../magnetic-button/MagneticButton";
import ScrambleText from "../scramble-text/ScrambleText";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current!,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          toast.success("Message sent successfully!");
          form.current?.reset();
        },
        () => {
          toast.error("Failed to send the message. Please try again.");
        }
      );
  };

  return (
    <section id="contact">
      <Toaster />
      <h5>Get in Touch</h5>
      <ScrambleText text="Contact Me" />
      <AnimatedSection>
        <div className="container contact_container">
          <div className="contact_options">
            <article className="contact_option">
              <Link to="/resume">
                <FaFileAlt className="contact_option-icon" />
                <h4>Check out my resume!</h4>
              </Link>
            </article>
            <article className="contact_option">
              <a
                href="https://www.linkedin.com/in/andrewsaifnoorian/"
                target="_blank"
                rel="noreferrer"
                className="contact_option-link"
              >
                <FaLinkedin className="contact_option-icon" />
                <h4>Send a message to my LinkedIn!</h4>
              </a>
            </article>
          </div>
          <form ref={form} onSubmit={sendEmail}>
            <input type="text" name="name" placeholder="Your Full Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea
              name="message"
              rows={7}
              placeholder="Your Message"
              required
            ></textarea>
            <MagneticButton>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </MagneticButton>
          </form>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default Contact;
