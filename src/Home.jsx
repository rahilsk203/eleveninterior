import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Suspense, lazy } from "react";

// Lazy load components for better performance
const LazyTestimonials = lazy(() => import("./components/Testimonials"));
const LazyGallery = lazy(() => import("./components/Gallery"));

function Main() {

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {/* Main Content */}
      <div className="animate-fadeIn">
        <NavBar />
        
        {/* Hero Section */}
        <section id="hero" className="relative">
          <Hero />
        </section>
        
        {/* About Section */}
        <section id="about" className="relative">
          <About />
        </section>
        
        {/* Features Section */}
        <section id="features" className="relative">
          <Features />
        </section>
        
        {/* Story Section */}
        <section id="story" className="relative">
          <Story />
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="relative">
          <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="three-body"><div className="three-body__dot"></div><div className="three-body__dot"></div><div className="three-body__dot"></div></div></div>}>
            <LazyTestimonials />
          </Suspense>
        </section>
        
        {/* Gallery Section */}
        <section id="gallery" className="relative">
          <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="three-body"><div className="three-body__dot"></div><div className="three-body__dot"></div><div className="three-body__dot"></div></div></div>}>
            <LazyGallery />
          </Suspense>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="relative">
          <Contact />
        </section>
        
        <Footer />
        <ScrollToTop />
      </div>
    </main>
  );
}

export default Main;