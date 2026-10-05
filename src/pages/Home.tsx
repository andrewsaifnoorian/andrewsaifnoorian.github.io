import Hero from "../components/sections/Hero";
import Research from "../components/sections/Research";
import Work from "../components/sections/Work";
import Lab from "../components/sections/Lab";
import Kaggle from "../components/sections/Kaggle";
import Writing from "../components/sections/Writing";
import Experience from "../components/sections/Experience";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contact";
import useDocumentMeta from "../hooks/useDocumentMeta";
import useReveal from "../hooks/useReveal";
import { SITE_DESCRIPTION } from "../lib/site";

const Home = () => {
  useDocumentMeta(undefined, SITE_DESCRIPTION);
  useReveal();

  return (
    <>
      <Hero />
      <Research />
      <Work />
      <Lab />
      <Kaggle />
      <Writing />
      <Experience />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;
