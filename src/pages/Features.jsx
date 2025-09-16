import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FiArrowLeft, FiArrowUp, FiCheck, FiStar, FiUsers, FiAward, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BentoTilt, BentoCard } from "../components/Features";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);

  // Features data
  const features = [
    {
      id: 1,
      title: "Luxury Design",
      description: "Experience the Art of Luxury – Redefining Interiors with Elegance and Precision. Eleven Interiors – Where Dreams Turn Into Spaces.",
      video: "videos/feature-1.mp4",
      icon: "✨",
      benefits: ["Premium Materials", "Custom Solutions", "Exclusive Designs", "Luxury Finishes"]
    },
    {
      id: 2,
      title: "Modern Bedroom",
      description: "Dream. Relax. Repeat – Crafted Elegance by Eleven Interiors. Your Personal Sanctuary, Designed with Perfection.",
      video: "videos/feature-2.mp4",
      icon: "🛏️",
      benefits: ["Smart Storage", "Comfort Focus", "Modern Aesthetics", "Personal Space"]
    },
    {
      id: 3,
      title: "Contemporary Living",
      description: "Transform Your Home Into a Modern Masterpiece – Eleven Interiors. Where contemporary meets comfort.",
      video: "videos/feature-3.mp4",
      icon: "🏠",
      benefits: ["Open Layouts", "Natural Light", "Functional Design", "Family Friendly"]
    },
    {
      id: 4,
      title: "Commercial Spaces",
      description: "Professional environments that inspire productivity and creativity. Business spaces that make an impact.",
      video: "videos/feature-4.mp4",
      icon: "🏢",
      benefits: ["Professional Look", "Productivity Focus", "Brand Alignment", "Client Impressions"]
    }
  ];

  // Statistics data
  const stats = [
    { number: "500+", label: "Projects Completed", icon: FiAward },
    { number: "98%", label: "Client Satisfaction", icon: FiStar },
    { number: "50+", label: "Expert Designers", icon: FiUsers },
    { number: "15+", label: "Years Experience", icon: FiTrendingUp }
  ];

  // GSAP animations
  useGSAP(() => {
    if (featuresRef.current) {
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  useGSAP(() => {
    if (statsRef.current) {
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-violet-900">
      <Navbar />
      
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition-all duration-300 hover:bg-violet-700 hover:scale-110"
      >
        <FiArrowUp className="h-5 w-5" />
      </button>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 pt-32 pb-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="font-circular-web text-lg text-violet-200 mb-6 tracking-wider uppercase">
              ELEVEN INTERIOR WORLD
            </p>
            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl leading-tight">
              Our <span className="text-yellow-300">Features</span> & Services
            </h1>
            <p className="mx-auto max-w-3xl text-lg md:text-xl text-violet-100 leading-relaxed">
              Discover the comprehensive range of interior design services and features that make 
              Eleven Interior World the premier choice for transforming your spaces into extraordinary environments.
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-300/20 rounded-full blur-xl"></div>
      </div>

      {/* Features Grid Section */}
      <section ref={featuresRef} className="py-24 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 md:px-8 lg:px-10 relative z-10">
          <div className="text-center mb-20">
            <div className="max-w-4xl mx-auto">
              <p className="font-circular-web text-lg text-violet-400 mb-4 tracking-wider uppercase">
                DESIGN PHILOSOPHY
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Transforming <span className="text-violet-400">Spaces</span> with Excellence
              </h2>
              <p className="max-w-3xl mx-auto font-circular-web text-lg md:text-xl text-gray-300 leading-relaxed">
                We create bespoke interior designs that seamlessly blend style, comfort, and functionality. 
                Every space tells a story, and we're here to help you write yours.
              </p>
            </div>
          </div>

          {/* Main Feature Card */}
          <div className="mb-12">
            <BentoTilt className="border-hsla relative h-96 w-full overflow-hidden rounded-xl md:h-[65vh] feature-card shadow-2xl">
              <BentoCard
                src="videos/feature-1.mp4"
                title={
                  <>
                    luxu<b>r</b>y
                  </>
                }
                description="Experience the Art of Luxury – Redefining Interiors with Elegance and Precision. Eleven Interiors – Where Dreams Turn Into Spaces."
                isComingSoon
              />
            </BentoTilt>
          </div>

          {/* Features Grid */}
          <div className="grid h-auto lg:h-[135vh] w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-2 grid-rows-auto lg:grid-rows-3 gap-6 md:gap-8">
            <BentoTilt className="bento-tilt_1 h-80 md:h-96 lg:row-span-2 feature-card">
              <BentoCard
                src="videos/feature-2.mp4"
                title={
                  <>
                    bedro<b>o</b>m
                  </>
                }
                description="Dream. Relax. Repeat – Crafted Elegance by Eleven Interiors."
                isComingSoon
              />
            </BentoTilt>

            <BentoTilt className="bento-tilt_1 h-80 md:h-96 feature-card">
              <BentoCard
                src="videos/feature-3.mp4"
                title={
                  <>
                    living <b>r</b>oom
                  </>
                }
                description="Your Personal Sanctuary, Designed with Perfection – Eleven Interiors."
                isComingSoon
              />
            </BentoTilt>

            <BentoTilt className="bento-tilt_1 h-80 md:h-96 feature-card">
              <BentoCard
                src="videos/feature-4.mp4"
                title={
                  <>
                    Mode<b>r</b>n desi<b>g</b>n
                  </>
                }
                description="Transform Your Home Into a Modern Masterpiece – Eleven Interiors."
                isComingSoon
              />
            </BentoTilt>

            <BentoTilt className="bento-tilt_2 h-80 md:h-96 feature-card">
              <div className="flex size-full flex-col justify-between bg-gradient-to-br from-gray-100 to-gray-200 p-6 md:p-8">
                <h1 className="bento-title special-font max-w-64 text-black text-2xl md:text-3xl">
                  Stunning <b>Interior</b> Designs, <b>Coming Soon</b>.
                </h1>
                <FiArrowUp className="self-end text-violet-500 text-4xl md:text-5xl" />
              </div>
            </BentoTilt>

            <BentoTilt className="bento-tilt_2 h-80 md:h-96 feature-card col-span-1 md:col-span-2 lg:col-span-1">
              <video
                src="videos/feature-5.mp4"
                loop
                muted
                autoPlay
                className="size-full object-cover object-center rounded-lg"
              />
            </BentoTilt>
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-24 bg-gradient-to-br from-violet-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <p className="text-violet-600 text-lg font-medium mb-4 tracking-wider uppercase">
              Why Choose Us
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Why Choose <span className="text-violet-600">Eleven Interior</span>?
            </h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
              We combine creativity, expertise, and attention to detail to deliver exceptional 
              interior design solutions that exceed your expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="feature-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100"
                onClick={() => setActiveFeature(index)}
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{feature.description}</p>
                
                <div className="space-y-3">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-violet-600">
                      <FiCheck className="h-4 w-4 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section ref={statsRef} className="py-24 bg-gradient-to-r from-violet-600 to-purple-600 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <p className="text-violet-200 text-lg font-medium mb-4 tracking-wider uppercase">
              Our Track Record
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Our <span className="text-yellow-300">Achievements</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-violet-100 leading-relaxed">
              Numbers that speak for our commitment to excellence and client satisfaction in every project we undertake.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="stat-item text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/20">
                    <IconComponent className="h-12 w-12 text-yellow-300 mx-auto mb-6" />
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">{stat.number}</div>
                    <div className="text-violet-100 font-medium text-lg">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <p className="text-violet-600 text-lg font-medium mb-4 tracking-wider uppercase">
              How We Work
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Our <span className="text-violet-600">Process</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
              A systematic approach to delivering exceptional interior design solutions that bring your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "Consultation & Planning",
                description: "We begin with understanding your vision, needs, and preferences through detailed consultation and space analysis."
              },
              {
                step: "02", 
                title: "Design & Visualization",
                description: "Our expert designers create detailed plans, mood boards, and 3D visualizations of your dream space."
              },
              {
                step: "03",
                title: "Execution & Delivery",
                description: "Professional implementation with quality materials, skilled craftsmanship, and timely project completion."
              }
            ].map((process, index) => (
              <div key={index} className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-8">
                  {process.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{process.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Ready to Transform Your Space?
            </h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-violet-100 mb-12 leading-relaxed">
              Let's discuss your project and bring your interior design dreams to life. 
              Our expert team is ready to create something extraordinary for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/inquiry"
                className="inline-flex items-center gap-3 bg-yellow-400 text-gray-900 px-10 py-5 rounded-full font-semibold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Start Your Project
                <FiArrowUp className="h-6 w-6 rotate-45" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
