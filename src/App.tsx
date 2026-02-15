import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import About from "./components/about/About";
import Experience from "./components/experience/Experience";
import Services from "./components/services/Services";
import Projects from "./components/project/Projects";
import Testimonials from "./components/testimonials/Testimonials";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Resume from "./components/resume/Resume";

const Home = () => (
  <>
    <About />
    <Projects />
    <Nav />
    <Experience />
    <Services />
    <Testimonials />
    <Contact />
    <Footer />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
