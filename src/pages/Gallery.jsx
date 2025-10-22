import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FiArrowLeft, FiX, FiChevronLeft, FiChevronRight, FiZoomIn, FiImage } from "react-icons/fi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop"; // Import ScrollToTop component
import { imageService } from "../services/imageService"; // Import image service for backend integration
import SEO from "../components/SEO"; // Import SEO component

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Memoized image processing function
const processImageData = (imageData, index, fallbackImages, fallbackTitles, fallbackDescriptions) => {
  if (imageData && imageData.urls) {
    const imageUrl = imageService.getOptimizedImageUrl(imageData, 'high');
    if (imageUrl) {
      return {
        id: imageData.id || index + 1,
        src: imageUrl,
        title: imageData.content?.title || fallbackTitles[index] || `Gallery Image ${index + 1}`,
        category: imageData.section ? 
          ({'gallery': 'residential', 'entrance': 'residential', 'about': 'residential', 'contact': 'commercial'}[imageData.section] || 'residential') : 
          (index % 2 === 0 ? "residential" : "commercial"),
        description: imageData.content?.description || fallbackDescriptions[index] || "Beautiful interior design project"
      };
    }
  }
  
  return {
    id: index + 1,
    src: fallbackImages[index] || `/img/gallery-${(index % 6) + 1}.webp`,
    title: fallbackTitles[index] || `Gallery Image ${index + 1}`,
    category: index % 2 === 0 ? "residential" : "commercial",
    description: fallbackDescriptions[index] || "Beautiful interior design project"
  };
};

// Optimized category filtering using Map for O(1) lookups
const filterByCategory = (data, category) => {
  if (category === "all") return data;
  
  // Using Map for efficient filtering
  const filtered = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].category === category) {
      filtered.push(data[i]);
    }
  }
  return filtered;
};

// Debounce function for performance optimization
const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);
  
  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState([]); // State for backend images
  const [loading, setLoading] = useState(true); // Loading state
  const galleryRef = useRef(null);
  const imageRefs = useRef([]);
  const modalRef = useRef(null);

  // Fetch gallery images from backend on component mount with error boundaries
  useEffect(() => {
    let isMounted = true;
    
    const fetchGalleryImages = async () => {
      try {
        setLoading(true);
        // Use deduplicated request for gallery images
        const images = await imageService.getGalleryImages();
        
        if (isMounted) {
          setGalleryImages(images);
          console.log('Fetched gallery images from backend:', images);
          
          // Prefetch other image sections for anticipated navigation
          imageService.prefetchImages(['contact', 'about']);
        }
      } catch (error) {
        console.error('Failed to fetch gallery images from backend:', error);
        // Will use fallback images
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGalleryImages();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Memoized fallback data to prevent recreation on every render
  const fallbackData = useMemo(() => ({
    images: [
      "/img/gallery-1.webp",
      "/img/gallery-2.webp",
      "/img/gallery-3.webp",
      "/img/gallery-4.webp",
      "/img/gallery-5.webp",
      "/img/gallery-6.webp",
      "/img/gallery-1.webp",
      "/img/gallery-2.webp",
      "/img/gallery-3.webp"
    ],
    titles: [
      "Modern Living Room",
      "Luxury Bedroom",
      "Office Reception",
      "Kitchen Design",
      "Conference Room",
      "Master Bathroom",
      "Open Plan Living",
      "Corporate Lobby",
      "Home Office"
    ],
    descriptions: [
      "Contemporary living space with clean lines and natural lighting",
      "Elegant master bedroom with premium finishes",
      "Professional reception area with modern design",
      "Gourmet kitchen with custom cabinetry and premium appliances",
      "Executive conference room with state-of-the-art technology",
      "Spa-like bathroom with marble finishes and luxury fixtures",
      "Spacious open concept living and dining area",
      "Impressive corporate lobby with architectural elements",
      "Productive home office space with built-in storage"
    ]
  }), []);

  // Memoized processed gallery data
  const processedGalleryData = useMemo(() => {
    return galleryImages.length > 0
      ? galleryImages.map((imageData, index) => 
          processImageData(imageData, index, fallbackData.images, fallbackData.titles, fallbackData.descriptions))
      : fallbackData.images.map((_, index) => 
          processImageData(null, index, fallbackData.images, fallbackData.titles, fallbackData.descriptions));
  }, [galleryImages, fallbackData]);

  // Memoized categories with counts
  const categories = useMemo(() => {
    const residentialCount = processedGalleryData.filter(item => item.category === "residential").length;
    const commercialCount = processedGalleryData.filter(item => item.category === "commercial").length;
    
    return [
      { id: "all", name: "All Projects", count: processedGalleryData.length },
      { id: "residential", name: "Residential", count: residentialCount },
      { id: "commercial", name: "Commercial", count: commercialCount }
    ];
  }, [processedGalleryData]);

  // Optimized filtered gallery data using memoization
  const filteredGallery = useMemo(() => {
    return filterByCategory(processedGalleryData, selectedCategory);
  }, [processedGalleryData, selectedCategory]);

  // GSAP animations with null check and performance optimization
  useGSAP(() => {
    if (galleryRef.current) {
      // Animate gallery items on scroll with better performance
      const galleryItems = imageRefs.current.filter(ref => ref !== null);
      
      if (galleryItems.length > 0) {
        gsap.fromTo(
          galleryItems,
          {
            opacity: 0,
            y: 50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08, // Reduced stagger for smoother animation
            ease: "power2.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }
  }, [filteredGallery]);

  // Handle image click with optimized index calculation
  const handleImageClick = useCallback((image, index) => {
    setSelectedImage(image);
    // Find the actual index in filtered gallery
    const actualIndex = filteredGallery.findIndex(item => item.id === image.id);
    setCurrentImageIndex(actualIndex !== -1 ? actualIndex : index);
  }, [filteredGallery]);

  // Handle modal navigation with optimized array access
  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex(prevIndex => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : filteredGallery.length - 1;
      setSelectedImage(filteredGallery[newIndex]);
      return newIndex;
    });
  }, [filteredGallery]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex(prevIndex => {
      const newIndex = prevIndex < filteredGallery.length - 1 ? prevIndex + 1 : 0;
      setSelectedImage(filteredGallery[newIndex]);
      return newIndex;
    });
  }, [filteredGallery]);

  // Handle keyboard navigation with debounce for performance
  const debouncedKeyDown = useDebounce((e) => {
    if (selectedImage) {
      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    }
  }, 150);

  useEffect(() => {
    document.addEventListener("keydown", debouncedKeyDown);
    return () => document.removeEventListener("keydown", debouncedKeyDown);
  }, [debouncedKeyDown]);

  // Reset imageRefs when filteredGallery changes with cleanup
  useEffect(() => {
    const currentLength = imageRefs.current.length;
    const newLength = filteredGallery.length;
    
    if (currentLength > newLength) {
      // Clean up excess refs
      imageRefs.current = imageRefs.current.slice(0, newLength);
    }
  }, [filteredGallery]);

  // Modal animation with GSAP for smooth transitions
  useGSAP(() => {
    if (selectedImage && modalRef.current) {
      // Animate modal entrance
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [selectedImage]);

  // Structured data for gallery page
  const galleryStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Interior Design Gallery - Eleven Interior",
    "description": "Explore our portfolio of stunning interior design projects including residential spaces and commercial environments",
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": typeof window !== 'undefined' ? window.location.origin : ''
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Gallery",
          "item": typeof window !== 'undefined' ? window.location.href : ''
        }
      ]
    },
    "collection": {
      "@type": "ItemList",
      "name": "Interior Design Projects",
      "itemListElement": processedGalleryData.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "ImageObject",
          "name": item.title,
          "description": item.description,
          "contentUrl": item.src
        }
      }))
    }
  };

  return (
    <>
      <SEO
        title="Interior Design Gallery - Eleven Interior"
        description="Explore our portfolio of stunning interior design projects. From residential spaces to commercial environments, each project reflects our commitment to excellence and innovation."
        keywords="interior design gallery, residential design, commercial design, luxury interiors, modern design, home design, office design"
        ogTitle="Interior Design Gallery - Eleven Interior"
        ogDescription="Explore our portfolio of stunning interior design projects"
        ogImage="/img/og-gallery.jpg"
        ogUrl="/gallery"
        canonical="/gallery"
        structuredData={galleryStructuredData}
      />
      <div className="min-h-screen w-screen bg-white">
        <Navbar />
        
        {/* Header Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container relative mx-auto px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
              Our <span className="text-yellow-300">Gallery</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-violet-100">
              Explore our portfolio of stunning interior design projects. From residential spaces to commercial environments, 
              each project reflects our commitment to excellence and innovation.
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full px-6 py-3 font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-white text-blue-600 shadow-md hover:bg-blue-50 hover:scale-105"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div ref={galleryRef} className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredGallery.map((item, index) => (
              <div
                key={`${item.id}-${selectedCategory}`} // Include category in key for better re-rendering
                ref={(el) => {
                  if (el) {
                    imageRefs.current[index] = el;
                  }
                }}
                className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                onClick={() => handleImageClick(item, index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleImageClick(item, index);
                  }
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy" // Lazy loading for better performance
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-violet-200 truncate">{item.description}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <FiZoomIn className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div 
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-2 sm:p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="relative w-full max-h-[95vh] sm:max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container */}
              <div className="overflow-hidden rounded-lg sm:rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/10">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/50 text-white transition-all duration-300 hover:bg-black/70 hover:scale-110 backdrop-blur-sm shadow-lg z-20"
                  aria-label="Close image preview"
                >
                  <FiX className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                {/* Navigation Buttons */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/50 text-white transition-all duration-300 hover:bg-black/70 hover:scale-110 backdrop-blur-sm shadow-lg z-10"
                  aria-label="Previous image"
                  disabled={filteredGallery.length <= 1}
                >
                  <FiChevronLeft className="h-5 w-5 sm:h-8 sm:w-8" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/50 text-white transition-all duration-300 hover:bg-black/70 hover:scale-110 backdrop-blur-sm shadow-lg z-10"
                  aria-label="Next image"
                  disabled={filteredGallery.length <= 1}
                >
                  <FiChevronRight className="h-5 w-5 sm:h-8 sm:w-8" />
                </button>

                <div className="flex items-center justify-center p-2 sm:p-4 md:p-8 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-indigo-900/20">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="max-h-[50vh] sm:max-h-[60vh] w-auto object-contain rounded-lg shadow-lg"
                    loading="eager" // Eager loading for modal images
                  />
                </div>

                {/* Image Info */}
                <div className="p-4 sm:p-6 bg-gradient-to-t from-black/90 to-black/60">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                    <p className="text-violet-200 mb-3 sm:mb-4 text-sm sm:text-base max-w-2xl mx-auto">{selectedImage.description}</p>
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm text-white">
                      <FiImage className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{currentImageIndex + 1} of {filteredGallery.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Gallery;