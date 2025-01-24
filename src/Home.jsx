import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { useState, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti"; // Import TiLocationArrow (if needed)

function Main() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {/* Loading Spinner */}
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-100">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!loading && (
        <>
          <NavBar />
          <section id="hero">
            <Hero />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="features">
            <Features />
          </section>
          <section id="story">
            <Story />
          </section>
          <section id="contact">
            <Contact />
          </section>
          <Footer />
          <ScrollToTop />
        </>
      )}
    </main>
  );
}

export default Main;