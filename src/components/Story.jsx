import gsap from "gsap";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { imageService } from "../services/imageService"; // Import image service for backend integration

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const FloatingImage = () => {
  const frameRef = useRef(null);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastMoveTimeRef = useRef(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [entranceImages, setEntranceImages] = useState([]); // State for backend images
  const [loading, setLoading] = useState(true); // Loading state

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
    if (now - lastMoveTimeRef.current < 200) return; // Throttle ripples
    
    lastMoveTimeRef.current = now;
    
    const newRipple = {
      id: now + Math.random(),
      x,
      y
    };
    
    setRipples(prev => {
      const updated = [...prev, newRipple];
      return updated.slice(-3); // Keep only last 3 ripples for performance
    });
  }, []);

  // Clean up ripples automatically
  useEffect(() => {
    const cleanup = setInterval(() => {
      setRipples(prev => prev.filter((_, index) => index < 2)); // Keep only 2 ripples
    }, 1500);
    
    return () => clearInterval(cleanup);
  }, []);

  // Optimized mouse move with requestAnimationFrame
  const handleMouseMove = useCallback((e) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const { clientX, clientY } = e.touches ? e.touches[0] : e;
      const element = frameRef.current;
      const container = containerRef.current;

      if (!element || !container) return;

      const rect = container.getBoundingClientRect();
      const xPos = clientX - rect.left;
      const yPos = clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Optimized rotation calculation
      const rotateX = ((yPos - centerY) / centerY) * -6; // Reduced intensity
      const rotateY = ((xPos - centerX) / centerX) * 6;

      // Use transform3d for hardware acceleration
      element.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      element.style.willChange = 'transform';

      // Create ripple less frequently for performance
      if (Math.random() < 0.05 && isInteracting) {
        createRipple(xPos, yPos);
      }
    });
  }, [isInteracting, createRipple]);

  const handleMouseEnter = useCallback(() => {
    setIsInteracting(true);
    const element = frameRef.current;
    
    if (element) {
      element.style.transition = 'transform 0.3s ease-out';
      element.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1.05)';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsInteracting(false);
    const element = frameRef.current;

    if (element) {
      element.style.transition = 'transform 0.6s ease-out';
      element.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
      element.style.willChange = 'auto';
    }

    // Cancel any pending animation frames
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  // Optimized floating animation using CSS
  useEffect(() => {
    const element = frameRef.current;
    if (!element) return;

    // Use CSS animation instead of GSAP for better performance
    element.style.animation = 'waterFloat 4s ease-in-out infinite';
    
    return () => {
      if (element) {
        element.style.animation = '';
      }
    };
  }, []);

  // Memoized particles to prevent unnecessary re-renders
  const particles = useMemo(() => 
    [...Array(4)].map((_, i) => ({
      id: i,
      left: `${25 + i * 20}%`,
      top: `${35 + i * 15}%`,
      delay: `${i * 0.3}s`,
      duration: `${3.5 + i * 0.3}s`
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
      {/* Water-like background effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-transparent to-purple-900/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)]"></div>
      </div>

      <div className="flex size-full flex-col items-center py-10 pb-24 relative z-10">
        <p className="font-general text-sm uppercase md:text-[10px] text-gray-600">
          Explore Modern Living Spaces
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="the story of <b>elegance</b> in design"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div 
            ref={containerRef}
            className="story-img-container relative"
            onTouchMove={handleMouseMove}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}
          >
            {/* Water ripple effects */}
            {ripples.map((ripple) => (
              <div
                key={ripple.id}
                className="absolute pointer-events-none water-ripple"
                style={{
                  left: ripple.x - 25,
                  top: ripple.y - 25,
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  border: '2px solid rgba(139, 92, 246, 0.6)',
                  zIndex: 5
                }}
              />
            ))}

            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  src={getEntranceImageSrc()} // Use backend image with fallback
                  alt="entrance"
                  className="object-contain water-float"
                  style={{
                    filter: isInteracting ? 'brightness(1.05) contrast(1.02)' : 'brightness(1) contrast(1)',
                    willChange: 'transform, filter',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)'
                  }}
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
            <p className="mt-3 max-w-sm text-center font-circular-web text-gray-800 md:text-start">
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

        {/* Optimized floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1.5 h-1.5 bg-violet-400/20 rounded-full water-particle"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;