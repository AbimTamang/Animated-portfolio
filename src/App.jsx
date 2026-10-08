import { useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PortraitJourney from "./components/PortraitJourney";
import Journey from "./components/Journey";
import Services from "./components/Services";
import Process from "./components/Process";
import GitHubActivity from "./components/GitHubActivity";
export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      {!loading && (
        <>
          <Navbar />
          <PortraitJourney>
            <Hero />
            <Intro />
          </PortraitJourney>
          <Journey />
          <Services />
          <Projects />
          <Process />
          <GitHubActivity />
          <Contact />
          <Footer />
        </>
      )}
    </>
  );
}
