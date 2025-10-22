import gsap from "gsap";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { imageService } from "../services/imageService"; // Import image service for backend integration

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const FloatingImage = () => {
  const frameRef = useRef(null);
  const imageContainerRef = useRef(null); // Ref for the image container only
  const animationFrameRef = useRef(null);
  const lastMoveTimeRef = useRef(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [entranceImages, setEntranceImages] = useState([]); // State for backend images
  const [loading, setLoading] = useState(true); // Loading state
  const mousePositionRef = useRef({ x: 0, y: 0 }); // Track mouse position
  const isMobileRef = useRef(false); // Track if device is mobile

  // Check if device is mobile
  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
  }, []);

  // Fetch entrance images from backend on component mount
  useEffect(() => {
    const fetchEntranceImages = async () => {
      try {
        setLoading(true);
        const images = await imageService.getEntranceImages();
        setEntranceImages(images);
        console.log('Fetched entrance images from backend:', images);
      } catch (error) {
        console.error('Failed to fetch entrance images from backend:', error);
        // Will use fallback image
      } finally {
        setLoading(false);
      }
    };

    fetchEntranceImages();
  }, []);

  // Function to get image source with fallback
  const getEntranceImageSrc = () => {
    if (entranceImages.length > 0) {
      // Get optimized URL for high quality from backend
      const imageUrl = imageService.getOptimizedImageUrl(entranceImages[0], 'high');
      if (imageUrl) {
        return imageUrl;
      }
    }
    // Fallback to local image
    return "/img/entrance.webp";
  };

  // Optimized ripple effect with throttling
  const createRipple = useCallback((x, y) => {
    const now = Date.now();
    if (now - lastMoveTimeRef.current < 150) return; // Throttle ripples more aggressively
    
    lastMoveTimeRef.current = now;
    
    const newRipple = {
      id: now + Math.random(),
      x,
      y
    };
    
    setRipples(prev => {
      const updated = [...prev, newRipple];
      return updated.slice(-2); // Keep only last 2 ripples for better performance
    });
  }, []);

  // Clean up ripples automatically
  useEffect(() => {
    const cleanup = setInterval(() => {
      setRipples(prev => prev.slice(1)); // Remove oldest ripple
    }, 1200);
    
    return () => clearInterval(cleanup);
  }, []);

  // Enhanced mouse move with optimized interpolation (only on image container)
  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e.touches ? e.touches[0] : e;
    const element = frameRef.current;
    const container = imageContainerRef.current; // Use image container ref

    if (!element || !container) return;

    // Store current mouse position
    mousePositionRef.current = { x: clientX, y: clientY };

    // Throttle animation frames for better performance
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const rect = container.getBoundingClientRect();
      const xPos = clientX - rect.left;
      const yPos = clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Optimized rotation calculation with smoother interpolation
      const rotateX = ((yPos - centerY) / centerY) * -5; // Reduced intensity for smoother effect
      const rotateY = ((xPos - centerX) / centerX) * 5;

      // Use gsap for hardware-accelerated transforms (more performant than direct style manipulation)
      gsap.to(element, {
        rotationX: rotateX,
        rotationY: rotateY,
        scale: isInteracting ? 1.03 : 1.02,
        duration: isMobileRef.current ? 0.8 : 0.4, // Slower on mobile for smoother effect
        ease: "power2.out",
        overwrite: "auto"
      });

      // Create ripple less frequently for performance
      if (Math.random() < 0.03 && isInteracting) { // Reduced frequency
        createRipple(xPos, yPos);
      }
    });
  }, [isInteracting, createRipple]);

  const handleMouseEnter = useCallback(() => {
    setIsInteracting(true);
    const element = frameRef.current;
    
    if (element) {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsInteracting(false);
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)" // More natural elastic effect
      });
    }

    // Cancel any pending animation frames
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  // Enhanced floating animation using GSAP for better performance
  useEffect(() => {
    const element = frameRef.current;
    if (!element) return;

    // Use GSAP for smoother, more controllable animations
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    tl.to(element, {
      y: -15,
      duration: 3,
      ease: "sine.inOut"
    }).to(element, {
      y: 0,
      duration: 3,
      ease: "sine.inOut"
    }, "+=0");

    return () => {
      tl.kill();
    };
  }, []);

  // Memoized particles to prevent unnecessary re-renders
  const particles = useMemo(() => 
    [...Array(6)].map((_, i) => ({
      id: i,
      left: `${15 + i * 15}%`,
      top: `${25 + (i % 3) * 20}%`,
      delay: `${i * 0.4}s`,
      duration: `${4 + i * 0.2}s`,
      size: `${4 + (i % 3)}px`
    })), []
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      id="story"
      className="min-h-dvh w-screen bg-black text-gray-900 relative overflow-hidden"
    >
      {/* Enhanced water-like background effect */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-purple-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(139,92,246,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(168,85,247,0.15),transparent_50%)]"></div>
      </div>

      <div className="flex size-full flex-col items-center py-10 pb-24 relative z-10">
        <p className="font-general text-sm uppercase md:text-[10px] text-gray-600 tracking-wider">
          Explore Modern Living Spaces
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="the story of <b>elegance</b> in design"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container relative">
            {/* Water ripple effects */}
            {ripples.map((ripple) => (
              <div
                key={ripple.id}
                className="absolute pointer-events-none water-ripple"
                style={{
                  left: ripple.x - 20,
                  top: ripple.y - 20,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  zIndex: 5,
                  willChange: 'transform, opacity'
                }}
              />
            ))}

            <div 
              ref={imageContainerRef} // Ref for the image container only
              className="story-img-mask"
              onTouchMove={handleMouseMove}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleMouseEnter}
              onTouchEnd={handleMouseLeave}
            >
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  src={getEntranceImageSrc()} // Use backend image with fallback
                  alt="entrance"
                  className="object-contain water-float"
                  style={{
                    filter: isInteracting ? 'brightness(1.03) contrast(1.01)' : 'brightness(1) contrast(1)',
                    willChange: 'transform, filter',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                    transformStyle: 'preserve-3d'
                  }}
                  loading="eager" // Eager loading for better performance
                />
              </div>
            </div>

            {/* for the rounded corner */}
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-gray-800 md:text-start leading-relaxed">
              Discover the elegance of interior design, where functionality meets
              beauty. Explore how thoughtful design enhances every living space.
            </p>

            <Button
              id="realm-btn"
              title="discover more"
              containerClass="mt-5"
            />
          </div>
        </div>

        {/* Enhanced floating particles with better distribution */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute bg-violet-400/30 rounded-full water-particle"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                willChange: 'transform, opacity'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;