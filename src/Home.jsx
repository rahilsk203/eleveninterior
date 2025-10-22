import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Suspense, lazy } from "react";
import SEO from "./components/SEO"; // Import SEO component
import StatsStructuredData from "./components/StatsStructuredData"; // Import structured data

// Lazy load components for better performance
const LazyGallery = lazy(() => import("./components/Gallery"));

function Main() {
  // Structured data for home page
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Eleven Interior World",
    "description": "Premium interior design services for residential and commercial spaces. Transform your spaces with elegant designs.",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${typeof window !== 'undefined' ? window.location.origin : ''}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": typeof window !== 'undefined' ? window.location.origin : ''
        }
      ]
    }
  };

  return (
    <>
      <SEO
        title="Eleven Interior World - Premium Interior Design Services"
        description="Transform your spaces with Eleven Interior's premium interior design services. Luxury designs for residential and commercial spaces."
        keywords="interior design, luxury design, residential design, commercial design, home design, office design"
        ogTitle="Eleven Interior World"
        ogDescription="Transform your spaces with premium interior design services"
        ogImage="/img/og-home.jpg"
        ogUrl="/"
        canonical="/"
        structuredData={homeStructuredData}
      />
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
          <StatsStructuredData /> {/* Add structured data for stats */}
        </div>
      </main>
    </>
  );
}

export default Main;