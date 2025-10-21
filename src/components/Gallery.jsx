import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { imageService } from "../services/imageService"; // Import image service for backend integration

gsap.registerPlugin(ScrollTrigger);

const GalleryItem = ({ src, alt, index }) => {
  const itemRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(() => {
    // Check if itemRef.current exists before animating
    if (itemRef.current) {
      gsap.fromTo(itemRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <div 
      ref={itemRef}
      className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={src} 
        alt={alt}
        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-semibold text-lg mb-2">{alt}</h3>
          <p className="text-gray-200 text-sm">View Project Details</p>
        </div>
      </div>

      {/* Hover Effect */}
      <div className={`absolute inset-0 bg-violet-500/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
    </div>
  );
};

const Gallery = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [galleryImages, setGalleryImages] = useState([]); // State for backend images
  const [loading, setLoading] = useState(true); // Loading state

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
    
    // Prefetch images for other sections
    imageService.prefetchImages(['contact', 'entrance', 'about']);
  }, []);

  // Function to get image source with fallback
  const getImageSrc = (imageData, index) => {
    if (imageData && imageData.urls) {
      // Get optimized URL for medium quality from backend
      const imageUrl = imageService.getOptimizedImageUrl(imageData, 'medium');
      if (imageUrl) {
        return imageUrl;
      }
    }
    // Fallback to local images
    return `/img/gallery-${index + 1}.webp`;
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
      "Contemporary Kitchen",
      "Elegant Dining Room",
      "Minimalist Office",
      "Cozy Reading Nook"
    ];
    return fallbackTitles[index] || `Gallery Image ${index + 1}`;
  };

  useGSAP(() => {
    // Check if titleRef.current exists before animating
    if (titleRef.current) {
      // Animate title
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  // Use backend images if available, otherwise fallback to local images
  const galleryItems = galleryImages.length > 0 
    ? galleryImages.slice(0, 6).map((imageData, index) => ({
        src: getImageSrc(imageData, index),
        alt: getImageAlt(imageData, index)
      }))
    : [
        { src: "/img/gallery-1.webp", alt: "Modern Living Room" },
        { src: "/img/gallery-2.webp", alt: "Luxury Bedroom" },
        { src: "/img/gallery-3.webp", alt: "Contemporary Kitchen" },
        { src: "/img/gallery-4.webp", alt: "Elegant Dining Room" },
        { src: "/img/gallery-5.webp", alt: "Minimalist Office" },
        { src: "/img/gallery-6.webp", alt: "Cozy Reading Nook" }
      ].slice(0, 6); // Show only 6 items as preview

  return (
    <section ref={sectionRef} className="py-20 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-purple-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05),transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <p className="font-general text-sm uppercase text-violet-400 mb-4 tracking-wider">
            Our Portfolio
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Design <span className="text-violet-400">Gallery</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg leading-relaxed">
            Explore our collection of stunning interior design projects that showcase our creativity, 
            attention to detail, and commitment to excellence. View our complete portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {galleryItems.map((item, index) => (
            <GalleryItem 
              key={index}
              src={item.src}
              alt={item.alt}
              index={index}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link 
            to="/gallery"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Projects
            <FiArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;