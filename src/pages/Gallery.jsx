import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FiArrowLeft, FiArrowUp, FiX, FiChevronLeft, FiChevronRight, FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { imageService } from "../services/imageService"; // Import image service for backend integration

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState([]); // State for backend images
  const [loading, setLoading] = useState(true); // Loading state
  const galleryRef = useRef(null);
  const imageRefs = useRef([]);

  // Fetch gallery images from backend on component mount
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setLoading(true);
        const images = await imageService.getGalleryImages();
        setGalleryImages(images);
        console.log('Fetched gallery images from backend:', images);
      } catch (error) {
        console.error('Failed to fetch gallery images from backend:', error);
        // Will use fallback images
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  // Function to get image source with fallback
  const getImageSrc = (imageData, index) => {
    if (imageData && imageData.urls) {
      // Get optimized URL for high quality from backend
      const imageUrl = imageService.getOptimizedImageUrl(imageData, 'high');
      if (imageUrl) {
        return imageUrl;
      }
    }
    // Fallback to local images
    const fallbackImages = [
      "/img/gallery-1.webp",
      "/img/gallery-2.webp",
      "/img/gallery-3.webp",
      "/img/gallery-4.webp",
      "/img/gallery-5.webp",
      "/img/gallery-6.webp",
      "/img/gallery-1.webp",
      "/img/gallery-2.webp",
      "/img/gallery-3.webp"
    ];
    return fallbackImages[index] || `/img/gallery-${(index % 6) + 1}.webp`;
  };

  // Function to get image alt text
  const getImageAlt = (imageData, index) => {
    if (imageData && imageData.content && imageData.content.title) {
      return imageData.content.title;
    }
    // Fallback alt text
    const fallbackTitles = [
      "Modern Living Room",
      "Luxury Bedroom",
      "Office Reception",
      "Kitchen Design",
      "Conference Room",
      "Master Bathroom",
      "Open Plan Living",
      "Corporate Lobby",
      "Home Office"
    ];
    return fallbackTitles[index] || `Gallery Image ${index + 1}`;
  };

  // Function to get image description
  const getImageDescription = (imageData, index) => {
    if (imageData && imageData.content && imageData.content.description) {
      return imageData.content.description;
    }
    // Fallback descriptions
    const fallbackDescriptions = [
      "Contemporary living space with clean lines and natural lighting",
      "Elegant master bedroom with premium finishes",
      "Professional reception area with modern design",
      "Gourmet kitchen with custom cabinetry and premium appliances",
      "Executive conference room with state-of-the-art technology",
      "Spa-like bathroom with marble finishes and luxury fixtures",
      "Spacious open concept living and dining area",
      "Impressive corporate lobby with architectural elements",
      "Productive home office space with built-in storage"
    ];
    return fallbackDescriptions[index] || "Beautiful interior design project";
  };

  // Function to get image category
  const getImageCategory = (imageData, index) => {
    if (imageData && imageData.section) {
      // Map section names to categories
      const sectionToCategory = {
        'gallery': 'residential',
        'entrance': 'residential',
        'about': 'residential',
        'contact': 'commercial'
      };
      return sectionToCategory[imageData.section] || 'residential';
    }
    // Default categories based on index
    return index % 2 === 0 ? "residential" : "commercial";
  };

  // Process gallery data from backend or use fallback
  const processedGalleryData = galleryImages.length > 0
    ? galleryImages.map((imageData, index) => ({
        id: imageData.id || index + 1,
        src: getImageSrc(imageData, index),
        title: getImageAlt(imageData, index),
        category: getImageCategory(imageData, index),
        description: getImageDescription(imageData, index)
      }))
    : [
        {
          id: 1,
          src: "/img/gallery-1.webp",
          title: "Modern Living Room",
          category: "residential",
          description: "Contemporary living space with clean lines and natural lighting"
        },
        {
          id: 2,
          src: "/img/gallery-2.webp",
          title: "Luxury Bedroom",
          category: "residential",
          description: "Elegant master bedroom with premium finishes"
        },
        {
          id: 3,
          src: "/img/gallery-3.webp",
          title: "Office Reception",
          category: "commercial",
          description: "Professional reception area with modern design"
        },
        {
          id: 4,
          src: "/img/gallery-4.webp",
          title: "Kitchen Design",
          category: "residential",
          description: "Gourmet kitchen with custom cabinetry and premium appliances"
        },
        {
          id: 5,
          src: "/img/gallery-5.webp",
          title: "Conference Room",
          category: "commercial",
          description: "Executive conference room with state-of-the-art technology"
        },
        {
          id: 6,
          src: "/img/gallery-6.webp",
          title: "Master Bathroom",
          category: "residential",
          description: "Spa-like bathroom with marble finishes and luxury fixtures"
        },
        {
          id: 7,
          src: "/img/gallery-1.webp",
          title: "Open Plan Living",
          category: "residential",
          description: "Spacious open concept living and dining area"
        },
        {
          id: 8,
          src: "/img/gallery-2.webp",
          title: "Corporate Lobby",
          category: "commercial",
          description: "Impressive corporate lobby with architectural elements"
        },
        {
          id: 9,
          src: "/img/gallery-3.webp",
          title: "Home Office",
          category: "residential",
          description: "Productive home office space with built-in storage"
        }
      ];

  const categories = [
    { id: "all", name: "All Projects", count: processedGalleryData.length },
    { id: "residential", name: "Residential", count: processedGalleryData.filter(item => item.category === "residential").length },
    { id: "commercial", name: "Commercial", count: processedGalleryData.filter(item => item.category === "commercial").length }
  ];

  // Filter gallery data based on selected category
  const filteredGallery = selectedCategory === "all" 
    ? processedGalleryData 
    : processedGalleryData.filter(item => item.category === selectedCategory);

  // GSAP animations with null check
  useGSAP(() => {
    if (galleryRef.current) {
      // Animate gallery items on scroll
      gsap.fromTo(
        imageRefs.current.filter(ref => ref !== null), // Filter out null refs
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

  // Reset imageRefs when filteredGallery changes
  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, filteredGallery.length);
  }, [filteredGallery]);

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
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 py-20">
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
                  ? "bg-violet-600 text-white shadow-lg"
                  : "bg-white text-violet-600 shadow-md hover:bg-violet-50"
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
              key={item.id}
              ref={(el) => {
                if (el) {
                  imageRefs.current[index] = el;
                }
              }}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
              onClick={() => handleImageClick(item, index)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-violet-200">{item.description}</p>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
            >
              <FiX className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
            >
              <FiChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
            >
              <FiChevronRight className="h-6 w-6" />
            </button>

            {/* Image */}
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-h-[80vh] w-full rounded-lg object-contain"
            />

            {/* Image Info */}
            <div className="mt-4 text-center text-white">
              <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
              <p className="mt-2 text-violet-200">{selectedImage.description}</p>
              <p className="mt-2 text-sm text-violet-300">
                {currentImageIndex + 1} of {filteredGallery.length}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;