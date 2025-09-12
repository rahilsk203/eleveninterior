import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import { useState, useEffect, useRef, Suspense, lazy } from "react";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Lazy load components for better performance
const LazyTestimonials = lazy(() => import("./components/Testimonials"));
const LazyGallery = lazy(() => import("./components/Gallery"));

function Main() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const loadingRef = useRef(null);

  // Enhanced loading animation
  useGSAP(() => {
    if (loading) {
      // Animate loading progress
      gsap.to({}, {
        duration: 2,
        ease: "power2.out",
        onUpdate: function() {
          setLoadingProgress(Math.round(this.progress() * 100));
        },
        onComplete: () => {
          setLoading(false);
        }
      });

      // Animate loading elements
      gsap.fromTo(loadingRef.current, 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
      );
    }
  }, [loading]);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {/* Enhanced Loading Screen */}
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-gradient-to-br from-violet-100 via-purple-50 to-indigo-100">
          <div ref={loadingRef} className="flex flex-col items-center space-y-8">
            {/* Logo */}
            <div className="relative">
              <img 
                src="/img/logo1.png" 
                alt="Eleven Interior" 
                className="w-20 h-20 rounded-full shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full bg-violet-500/20 animate-pulse"></div>
            </div>
            
            {/* Brand Name */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-violet-800 mb-2">ELEVEN INTERIOR</h1>
              <p className="text-violet-600 font-medium">Creating Timeless Spaces</p>
            </div>
            
            {/* Enhanced Loading Animation */}
            <div className="relative w-64 h-2 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            
            {/* Progress Text */}
            <p className="text-violet-700 font-semibold">{loadingProgress}%</p>
            
            {/* Animated Dots */}
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-violet-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-violet-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-violet-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!loading && (
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
      )}
    </main>
  );
}

export default Main;