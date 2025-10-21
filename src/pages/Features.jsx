import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FiArrowLeft, FiArrowUp, FiCheck, FiStar, FiUsers, FiAward, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BentoTilt, BentoCard } from "../components/Features";
import { videoService } from "../services/videoService"; // Import video service for backend integration
import ScrollToTop from "../components/ScrollToTop"; // Add this import for ScrollToTop component

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [featureVideos, setFeatureVideos] = useState([]); // State for backend videos
  const featuresRef = useRef(null);
  const statsRef = useRef(null);

  // Fetch feature videos from backend on component mount
  useEffect(() => {
    const fetchFeatureVideos = async () => {
      try {
        const videos = await videoService.getFeatureVideos();
        setFeatureVideos(videos);
        console.log('Fetched feature videos from backend:', videos);
        
        // Preload videos for better performance
        if (videos.length > 0) {
          const videoUrls = videos.map(video => 
            videoService.getOptimizedVideoUrl(video, 'hd') || `/videos/feature-${video.id}.mp4`
          ).filter(url => url);
          
          // Preload with low priority to avoid blocking initial render
          videoService.preloadVideos(videoUrls, 'low');
        }
      } catch (error) {
        console.error('Failed to fetch feature videos from backend:', error);
        // Will use fallback videos
      }
    };

    fetchFeatureVideos();
    
    // Prefetch other sections for better performance
    videoService.prefetchVideos(['hero']);
  }, []);

  // Function to get video source by index with fallback to local videos
  const getFeatureVideoSrc = (index) => {
    // If we have feature videos from the backend, use them
    if (featureVideos.length > index && featureVideos[index]) {
      const optimizedUrl = videoService.getOptimizedVideoUrl(featureVideos[index], 'hd');
      if (optimizedUrl) {
        return optimizedUrl;
      }
    }
    // Fallback to local videos
    return `/videos/feature-${index + 1}.mp4`;
  };

  // Features data
  const features = [
    {
      id: 1,
      title: "Luxury Design",
      description: "Experience the Art of Luxury – Redefining Interiors with Elegance and Precision. Eleven Interiors – Where Dreams Turn Into Spaces.",
      video: getFeatureVideoSrc(0), // Use backend video
      icon: "✨",
      benefits: ["Premium Materials", "Custom Solutions", "Exclusive Designs", "Luxury Finishes"]
    },
    {
      id: 2,
      title: "Modern Bedroom",
      description: "Dream. Relax. Repeat – Crafted Elegance by Eleven Interiors. Your Personal Sanctuary, Designed with Perfection.",
      video: getFeatureVideoSrc(1), // Use backend video
      icon: "🛏️",
      benefits: ["Smart Storage", "Comfort Focus", "Modern Aesthetics", "Personal Space"]
    },
    {
      id: 3,
      title: "Contemporary Living",
      description: "Transform Your Home Into a Modern Masterpiece – Eleven Interiors. Where contemporary meets comfort.",
      video: getFeatureVideoSrc(2), // Use backend video
      icon: "🏠",
      benefits: ["Open Layouts", "Natural Light", "Functional Design", "Family Friendly"]
    },
    {
      id: 4,
      title: "Commercial Spaces",
      description: "Professional environments that inspire productivity and creativity. Business spaces that make an impact.",
      video: getFeatureVideoSrc(3), // Use backend video
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
    <div className="min-h-screen w-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            Our <span className="text-yellow-300">Features</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-violet-100">
            Discover the comprehensive range of interior design services and features that make 
            Eleven Interior World the premier choice for transforming your spaces.
          </p>
        </div>
      </div>

      {/* Features Grid Section */}
      <section ref={featuresRef} className="py-20 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
        
        <div className="container mx-auto px-3 md:px-10 relative z-10">
          <div className="px-5 py-16 text-center">
            <div className="max-w-4xl mx-auto">
              <p className="font-circular-web text-lg text-violet-600 mb-4 tracking-wider">
                ELEVEN INTERIOR WORLD
              </p>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Our <span className="text-violet-600">Design</span> Philosophy
              </h2>
              <p className="max-w-2xl mx-auto font-circular-web text-lg text-gray-600 leading-relaxed">
                Transforming spaces with bespoke interior designs that blend style,
                comfort, and functionality. Let us bring your dream spaces to life!
              </p>
            </div>
          </div>

          {/* Main Feature Card */}
          <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh] feature-card">
            <BentoCard
              videoSrc={getFeatureVideoSrc(0)} // Use backend video
              title={
                <>
                  luxu<b>r</b>y
                </>
              }
              description="Experience the Art of Luxury – Redefining Interiors with Elegance and Precision. Eleven Interiors – Where Dreams Turn Into Spaces."
              isComingSoon
            />
          </BentoTilt>

          {/* Features Grid */}
          <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
            <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2 feature-card">
              <BentoCard
                videoSrc={getFeatureVideoSrc(1)} // Use backend video
                title={
                  <>
                    bedro<b>o</b>m
                  </>
                }
                description="Dream. Relax. Repeat – Crafted Elegance by Eleven Interiors."
                isComingSoon
              />
            </BentoTilt>

            <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0 feature-card">
              <BentoCard
                videoSrc={getFeatureVideoSrc(2)} // Use backend video
                title={
                  <>
                    bedro<b>o</b>m
                  </>
                }
                description="Your Personal Sanctuary, Designed with Perfection – Eleven Interiors."
                isComingSoon
              />
            </BentoTilt>

            <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0 feature-card">
              <BentoCard
                videoSrc={getFeatureVideoSrc(3)} // Use backend video
                title={
                  <>
                    Mode<b>r</b>n desi<b>g</b>n
                  </>
                }
                description="Transform Your Home Into a Modern Masterpiece – Eleven Interiors."
                isComingSoon
              />
            </BentoTilt>

            <BentoTilt className="bento-tilt_2 feature-card">
              <div className="flex size-full flex-col justify-between bg-gray-100 p-5">
                <h1 className="bento-title special-font max-w-64 text-gray-900">
                  Stunning <b>Interior</b> Designs, <b>Coming Soon</b>.
                </h1>
                <FiArrowUp className="m-5 scale-[5] self-end text-gray-900" />
              </div>
            </BentoTilt>

            <BentoTilt className="bento-tilt_2 feature-card">
              <video
                src={featureVideos.length > 4 && featureVideos[4] ? 
                     videoService.getOptimizedVideoUrl(featureVideos[4], 'hd') || "/videos/feature-5.mp4" : 
                     "/videos/feature-5.mp4"}
                loop
                muted
                autoPlay
                className="size-full object-cover object-center"
              />
            </BentoTilt>
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-blue-600">Eleven Interior</span>?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              We combine creativity, expertise, and attention to detail to deliver exceptional interior design solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="feature-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                onClick={() => setActiveFeature(index)}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{feature.description}</p>
                
                <div className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-blue-600">
                      <FiCheck className="h-4 w-4" />
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
      <section ref={statsRef} className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-yellow-300">Achievements</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-violet-100">
              Numbers that speak for our commitment to excellence and client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="stat-item text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                    <IconComponent className="h-12 w-12 text-yellow-300 mx-auto mb-4" />
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-violet-100 font-medium">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Process</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              A systematic approach to delivering exceptional interior design solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "We begin with understanding your vision, needs, and preferences through detailed consultation."
              },
              {
                step: "02", 
                title: "Design & Planning",
                description: "Our expert designers create detailed plans and 3D visualizations of your dream space."
              },
              {
                step: "03",
                title: "Execution",
                description: "Professional implementation with quality materials and skilled craftsmanship."
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{process.title}</h3>
                <p className="text-gray-600 leading-relaxed">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-violet-100 mb-8">
            Let's discuss your project and bring your interior design dreams to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/inquiry"
              className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Project
              <FiArrowUp className="h-5 w-5 rotate-45" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/30 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop /> {/* Add the shared ScrollToTop component */}
    </div>
  );
};

export default Features;