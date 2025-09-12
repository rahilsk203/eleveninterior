import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GalleryItem = ({ src, alt, index }) => {
  const itemRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(() => {
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

  useGSAP(() => {
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
  }, []);

  const galleryItems = [
    { src: "/img/gallery-1.webp", alt: "Modern Living Room" },
    { src: "/img/gallery-2.webp", alt: "Luxury Bedroom" },
    { src: "/img/gallery-3.webp", alt: "Contemporary Kitchen" },
    { src: "/img/gallery-4.webp", alt: "Elegant Dining Room" },
    { src: "/img/gallery-5.webp", alt: "Minimalist Office" },
    { src: "/img/gallery-6.webp", alt: "Cozy Reading Nook" }
  ];

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
            attention to detail, and commitment to excellence.
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
          <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
