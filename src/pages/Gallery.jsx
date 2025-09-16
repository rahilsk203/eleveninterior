import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FiArrowLeft, FiArrowUp, FiX, FiChevronLeft, FiChevronRight, FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const galleryRef = useRef(null);
  const imageRefs = useRef([]);

  // Gallery data with different categories - Enhanced with more projects
  const galleryData = [
    {
      id: 1,
      src: "/img/gallery-1.webp",
      title: "Modern Living Room",
      category: "residential",
      description: "Contemporary living space with clean lines, natural lighting, and premium furniture selection"
    },
    {
      id: 2,
      src: "/img/gallery-2.webp",
      title: "Luxury Master Bedroom",
      category: "residential",
      description: "Elegant master bedroom suite with premium finishes, custom lighting, and spa-like ambiance"
    },
    {
      id: 3,
      src: "/img/gallery-3.webp",
      title: "Corporate Office Reception",
      category: "commercial",
      description: "Professional reception area with modern design elements and impressive architectural features"
    },
    {
      id: 4,
      src: "/img/gallery-4.webp",
      title: "Gourmet Kitchen Design",
      category: "residential",
      description: "State-of-the-art kitchen with custom cabinetry, premium appliances, and functional island"
    },
    {
      id: 5,
      src: "/img/gallery-5.webp",
      title: "Executive Conference Room",
      category: "commercial",
      description: "Sophisticated conference space with cutting-edge technology and executive-level finishes"
    },
    {
      id: 6,
      src: "/img/gallery-6.webp",
      title: "Spa Master Bathroom",
      category: "residential",
      description: "Luxurious bathroom retreat with marble finishes, rainfall shower, and therapeutic lighting"
    },
    {
      id: 7,
      src: "/img/gallery-1.webp",
      title: "Open Concept Living",
      category: "residential",
      description: "Spacious open floor plan connecting living, dining, and kitchen areas seamlessly"
    },
    {
      id: 8,
      src: "/img/gallery-2.webp",
      title: "Corporate Headquarters Lobby",
      category: "commercial",
      description: "Grand entrance lobby with impressive architectural elements and brand integration"
    },
    {
      id: 9,
      src: "/img/gallery-3.webp",
      title: "Home Office Sanctuary",
      category: "residential",
      description: "Productive workspace with built-in storage, ergonomic design, and inspiring views"
    },
    {
      id: 10,
      src: "/img/gallery-4.webp",
      title: "Boutique Hotel Suite",
      category: "commercial",
      description: "Luxurious hotel accommodation with sophisticated design and premium amenities"
    },
    {
      id: 11,
      src: "/img/gallery-5.webp",
      title: "Kids' Playroom Paradise",
      category: "residential",
      description: "Creative and safe play space with custom storage and educational design elements"
    },
    {
      id: 12,
      src: "/img/gallery-6.webp",
      title: "Restaurant Interior",
      category: "commercial",
      description: "Atmospheric dining space with ambient lighting and carefully curated aesthetic"
    }
  ];

  const categories = [
    { id: "all", name: "All Projects", count: galleryData.length },
    { id: "residential", name: "Residential", count: galleryData.filter(item => item.category === "residential").length },
    { id: "commercial", name: "Commercial", count: galleryData.filter(item => item.category === "commercial").length }
  ];

  // Filter gallery data based on selected category
  const filteredGallery = selectedCategory === "all" 
    ? galleryData 
    : galleryData.filter(item => item.category === selectedCategory);

  // GSAP animations
  useGSAP(() => {
    if (galleryRef.current) {
      // Animate gallery items on scroll
      gsap.fromTo(
        imageRefs.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [filteredGallery]);

  // Handle image click
  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  // Handle modal navigation
  const handlePrevImage = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredGallery.length - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredGallery[newIndex]);
  };

  const handleNextImage = () => {
    const newIndex = currentImageIndex < filteredGallery.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredGallery[newIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedImage) {
        if (e.key === "Escape") {
          setSelectedImage(null);
        } else if (e.key === "ArrowLeft") {
          handlePrevImage();
        } else if (e.key === "ArrowRight") {
          handleNextImage();
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [selectedImage, currentImageIndex, filteredGallery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <Navbar />
      
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition-all duration-300 hover:bg-violet-700 hover:scale-110"
      >
        <FiArrowUp className="h-5 w-5" />
      </button>

      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 pt-32 pb-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="font-circular-web text-lg text-violet-200 mb-6 tracking-wider uppercase">
              OUR PORTFOLIO
            </p>
            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl leading-tight">
              Design <span className="text-yellow-300">Gallery</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg md:text-xl text-violet-100 leading-relaxed">
              Explore our portfolio of stunning interior design projects. From residential spaces to commercial environments, 
              each project reflects our commitment to excellence, innovation, and transforming ordinary spaces into extraordinary experiences.
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-300/20 rounded-full blur-xl"></div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Browse by <span className="text-violet-600">Category</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Filter our projects to find inspiration for your specific needs
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full px-8 py-4 font-semibold text-lg transition-all duration-300 border-2 ${
                  selectedCategory === category.id
                    ? "bg-violet-600 text-white border-violet-600 shadow-lg transform scale-105"
                    : "bg-white text-violet-600 border-violet-200 shadow-md hover:bg-violet-50 hover:border-violet-300 hover:scale-105"
                }`}
              >
                {category.name} <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div ref={galleryRef} className="container mx-auto px-4 pb-24">
        {/* Grid Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {selectedCategory === "all" ? "All Projects" : 
             selectedCategory === "residential" ? "Residential Projects" : "Commercial Projects"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {filteredGallery.length} {filteredGallery.length === 1 ? 'project' : 'projects'} found
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-7xl mx-auto">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (imageRefs.current[index] = el)}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-100"
              onClick={() => handleImageClick(item, index)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-violet-200 leading-relaxed">{item.description}</p>
                    <div className="mt-3">
                      <span className="inline-block bg-violet-500/80 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <FiZoomIn className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredGallery.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">Try selecting a different category to view more projects.</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
          <div className="relative max-w-6xl max-h-full w-full">
            {/* Header with info and close */}
            <div className="absolute -top-16 left-0 right-0 flex items-center justify-between text-white z-10">
              <div>
                <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
                <p className="text-violet-200">{selectedImage.description}</p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-colors hover:bg-white/30"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Buttons */}
            {filteredGallery.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-all hover:bg-white/30 hover:scale-110 z-10"
                >
                  <FiChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-all hover:bg-white/30 hover:scale-110 z-10"
                >
                  <FiChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            {/* Image Container */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[80vh] w-full object-contain"
              />
            </div>

            {/* Bottom Info */}
            <div className="absolute -bottom-16 left-0 right-0 text-center text-white">
              <div className="flex items-center justify-center gap-4 text-sm text-violet-300">
                <span className="bg-violet-500/80 px-3 py-1 rounded-full">
                  {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}
                </span>
                <span>
                  {currentImageIndex + 1} of {filteredGallery.length}
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Use arrow keys to navigate • Press ESC to close
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Inspired by Our Work?
            </h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-violet-100 mb-12 leading-relaxed">
              Let's collaborate to create your dream space. Our expert design team is ready to transform 
              your vision into reality with the same attention to detail you see in our portfolio.
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
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
