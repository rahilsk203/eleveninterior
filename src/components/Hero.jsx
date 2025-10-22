import gsap from "gsap"; // GSAP for animations
import { useGSAP } from "@gsap/react"; // React hook for GSAP
import { ScrollTrigger } from "gsap/all"; // GSAP ScrollTrigger plugin
import { TiLocationArrow } from "react-icons/ti"; // Arrow icon for the button
import { useEffect, useRef, useState, useCallback, useMemo } from "react"; // React hooks
import { scroller } from "react-scroll"; // Add this import for smooth scrolling

import Button from "./Button"; // Custom Button component
import VideoPreview from "./VideoPreview"; // Custom VideoPreview component
import { videoService } from "../services/videoService"; // Video service for fetching backend videos
import { useIntersectionObserver } from "../hooks/useIntersectionObserver"; // Performance hook for lazy loading

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Performance monitoring utility
const logPerformanceMetric = (metricName, value, threshold) => {
  console.log(`[Performance] ${metricName}: ${value.toFixed(2)}ms`);
  
  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // In a real implementation, you would send this to your analytics service
    // analyticsService.track('performance_metric', { metricName, value });
  }
  
  // Warn if threshold is exceeded
  if (threshold && value > threshold) {
    console.warn(`[Performance Warning] ${metricName} exceeded threshold of ${threshold}ms: ${value.toFixed(2)}ms`);
  }
};

// Video loading performance tracker
const trackVideoLoadPerformance = (videoElement, videoSrc) => {
  if (!videoElement || typeof window === 'undefined' || !window.performance) return;
  
  const startTime = performance.now();
  const handleLoad = () => {
    const loadTime = performance.now() - startTime;
    logPerformanceMetric(`Video load time (${videoSrc})`, loadTime, 2000);
    videoElement.removeEventListener('loadeddata', handleLoad);
  };
  
  videoElement.addEventListener('loadeddata', handleLoad);
};

// Function to get the video source based on the index with fallback mechanism
const getVideoSrc = (index, heroVideos, totalVideos) => {
  // Use backend videos if available
  if (heroVideos.length > 0 && index < heroVideos.length) {
    // Try to get optimized URL based on browser capabilities
    const videoUrl = videoService.getOptimizedVideoUrl(heroVideos[index], 'mobile');
    if (videoUrl) {
      return videoUrl;
    }
  }
  
  // Fallback to local videos with multiple format support
  const formats = ['mp4', 'webm'];
  for (const format of formats) {
    try {
      const videoSrc = `videos/hero-${index + 1}.${format}`;
      // In a real implementation, you might want to check if the file exists
      return videoSrc;
    } catch (e) {
      continue;
    }
  }
  
  // Final fallback
  return `videos/hero-${index + 1}.mp4`;
};

const Hero = () => {
  // State to track the current video index
  const [currentIndex, setCurrentIndex] = useState(0);

  // State to track if the user has clicked on the mini video
  const [hasClicked, setHasClicked] = useState(false);

  // State to track loading status of videos
  const [loading, setLoading] = useState(true);

  // State to track the number of videos loaded
  const [loadedVideos, setLoadedVideos] = useState(0);

  // State to store fetched hero videos
  const [heroVideos, setHeroVideos] = useState([]);

  // State to track video loading errors
  const [videoError, setVideoError] = useState(false);

  // State to track if component is visible (for lazy loading)
  const [elementRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  });

  const totalVideos = 4; // Total number of videos
  const nextVdRef = useRef(null); // Ref for the next video element
  const mainVideoRef = useRef(null); // Ref for the main background video
  const isPreloadingRef = useRef(false); // Ref to track if preloading is in progress
  const performanceRef = useRef({}); // Ref to track performance metrics
  const retryCountRef = useRef(0); // Ref to track retry attempts

  // Performance monitoring
  useEffect(() => {
    if (typeof window !== 'undefined' && window.performance) {
      performanceRef.current.loadStart = performance.now();
    }
    
    return () => {
      if (performanceRef.current.loadStart) {
        const loadTime = performance.now() - performanceRef.current.loadStart;
        logPerformanceMetric('Hero component total load time', loadTime, 3000);
      }
    };
  }, []);

  // Fetch hero videos from backend on component mount
  useEffect(() => {
    const fetchHeroVideos = async () => {
      try {
        setLoading(true);
        performanceRef.current.fetchStart = performance.now();
        
        const videos = await videoService.getHeroVideos();
        setHeroVideos(videos);
        
        if (performanceRef.current.fetchStart) {
          const fetchTime = performance.now() - performanceRef.current.fetchStart;
          logPerformanceMetric('Hero videos fetch time', fetchTime, 1500);
        }
        
        console.log('Fetched hero videos:', videos);
      } catch (error) {
        console.error('Failed to fetch hero videos:', error);
        // Fallback to local videos if backend fetch fails
      } finally {
        setLoading(false);
      }
    };

    // Only fetch videos when component is visible
    if (isVisible) {
      fetchHeroVideos();
    }
    
    // Prefetch feature videos for anticipated navigation
    videoService.prefetchVideos(['feature']);
  }, [isVisible]);

  // Function to handle video load event with optimization
  const handleVideoLoad = useCallback(() => {
    setLoadedVideos((prev) => {
      const newCount = prev + 1;
      // Only wait for the main video to load, not all videos
      if (newCount >= 1) {
        setLoading(false);
        if (performanceRef.current.loadStart) {
          const loadTime = performance.now() - performanceRef.current.loadStart;
          logPerformanceMetric('Main video loaded', loadTime, 2500);
        }
      }
      return newCount;
    });
  }, []);

  // Optimized video loading - only load main video initially
  useEffect(() => {
    // Set a timeout to show content even if video takes too long
    const timeout = setTimeout(() => {
      setLoading(false);
      console.warn('Video loading timeout - showing content anyway');
      logPerformanceMetric('Video loading timeout', 3000, 3000);
    }, 3000); // 3 second timeout

    return () => clearTimeout(timeout);
  }, []);

  // Function to preload video with enhanced strategy
  const preloadVideo = useCallback(async (src) => {
    if (!src || isPreloadingRef.current) return;
    
    isPreloadingRef.current = true;
    try {
      const preloadStart = performance.now();
      await videoService.preloadVideo(src, 'high');
      const preloadTime = performance.now() - preloadStart;
      logPerformanceMetric(`Video preload time (${src})`, preloadTime, 1000);
    } catch (error) {
      console.warn('Failed to preload video:', src, error);
    } finally {
      isPreloadingRef.current = false;
    }
  }, []);

  // Enhanced preloading for multiple videos
  const preloadVideosBatch = useCallback(async (videoUrls) => {
    if (isPreloadingRef.current) return;
    
    isPreloadingRef.current = true;
    try {
      const batchStart = performance.now();
      await videoService.preloadVideos(videoUrls, 'low');
      const batchTime = performance.now() - batchStart;
      logPerformanceMetric('Video batch preload time', batchTime, 3000);
    } catch (error) {
      console.warn('Failed to preload video batch:', error);
    } finally {
      isPreloadingRef.current = false;
    }
  }, []);

  // Function to handle mini video click
  const handleMiniVdClick = useCallback(() => {
    setHasClicked(true); // Set hasClicked to true
    const newIndex = (currentIndex + 1) % (heroVideos.length > 0 ? heroVideos.length : totalVideos);
    setCurrentIndex(newIndex);
    
    // Preload the next video for smoother transition
    if (heroVideos.length > 0 && newIndex + 1 < heroVideos.length) {
      const nextVideoUrl = videoService.getOptimizedVideoUrl(heroVideos[newIndex + 1], 'preview');
      if (nextVideoUrl) {
        preloadVideo(nextVideoUrl);
      }
    }
  }, [currentIndex, heroVideos, totalVideos, preloadVideo]);

  // Preload all videos when videos are fetched - but only preload current video initially
  useEffect(() => {
    if (heroVideos.length > 0) {
      // Only preload the current video initially to reduce bandwidth usage
      const currentVideoUrl = videoService.getOptimizedVideoUrl(heroVideos[currentIndex], 'mobile');
      if (currentVideoUrl) {
        preloadVideo(currentVideoUrl);
      }
    }
  }, [heroVideos, currentIndex, preloadVideo]);

  // Memoized video sources to prevent unnecessary re-renders
  const videoSources = useMemo(() => {
    return {
      current: getVideoSrc(currentIndex, heroVideos, totalVideos),
      next: getVideoSrc((currentIndex + 1) % (heroVideos.length > 0 ? heroVideos.length : totalVideos), heroVideos, totalVideos)
    };
  }, [currentIndex, heroVideos, totalVideos]);

  // GSAP animation for video transition
  useGSAP(
    () => {
      if (hasClicked) {
        // Show the next video
        gsap.set("#next-video", { visibility: "visible" });

        // Animate the next video to full size
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1.2,
          ease: "power3.out",
          onStart: () => {
            if (nextVdRef.current) {
              nextVdRef.current.play(); // Play the video when the animation starts
            }
          },
        });

        // Animate the current video to disappear
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power3.out",
        });
      }
    },
    {
      dependencies: [currentIndex, hasClicked, heroVideos], // Re-run animation when currentIndex or heroVideos changes
      revertOnUpdate: true, // Revert animations on component update
    }
  );

  // GSAP animation for the video frame
  useGSAP(() => {
    // Set initial clip-path and border-radius for the video frame
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });

    // Animate the video frame to full size
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power2.inOut",
      duration: 2,
      scrollTrigger: {
        trigger: "#video-frame", // Trigger animation when the video frame is in view
        start: "center center", // Start animation when the center of the video frame is in the center of the viewport
        end: "bottom center", // End animation when the bottom of the video frame is in the center of the viewport
        scrub: 0.5, // Smoothly scrub through the animation
      },
    });
  });

  // Enhanced video error handling with retry mechanism
  const handleVideoError = useCallback((e) => {
    console.error('Video loading error:', e);
    setVideoError(true);
    
    // Retry mechanism - only retry once
    if (retryCountRef.current < 1) {
      retryCountRef.current += 1;
      console.log(`Retrying video load (attempt ${retryCountRef.current})`);
      
      // Reset loading state and try again
      setTimeout(() => {
        setVideoError(false);
        setLoading(true);
        
        // Force re-render by updating state
        setLoadedVideos(0);
      }, 500);
    } else {
      // Final fallback - show content without video
      console.warn('Video loading failed after retries - showing content without video');
      setLoading(false);
    }
  }, []);

  // Fallback image optimization
  const fallbackImage = useMemo(() => {
    // Use webp for better compression if supported
    const supportsWebP = (() => {
      try {
        return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
      } catch (err) {
        return false;
      }
    })();
    
    return supportsWebP ? '/img/hero-1.webp' : '/img/hero-1.jpg';
  }, []);

  // Track video loading performance when refs are available
  useEffect(() => {
    if (mainVideoRef.current && videoSources.current) {
      trackVideoLoadPerformance(mainVideoRef.current, videoSources.current);
    }
    
    if (nextVdRef.current && videoSources.next) {
      trackVideoLoadPerformance(nextVdRef.current, videoSources.next);
    }
  }, [videoSources]);

  // Function to handle button click with smooth scroll to about section
  const handleButtonClick = useCallback(() => {
    scroller.scrollTo('about', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -80 // Adjust for navbar height
    });
  }, []);

  return (
    <div ref={elementRef} className="relative h-dvh w-screen overflow-x-hidden">
      {/* Loading spinner */}
      {loading && !videoError && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-100">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Video frame */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {/* Fallback background image for faster loading */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${fallbackImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div>
          {/* Mini video preview */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={nextVdRef}
                  src={videoSources.next}
                  loop
                  muted
                  playsInline
                  preload="none"
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onError={handleVideoError}
                />
              </div>
            </VideoPreview>
          </div>

          {/* Next video */}
          <video
            ref={nextVdRef}
            src={videoSources.next}
            loop
            muted
            playsInline
            preload="none"
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onError={handleVideoError}
          />

          {/* Main background video */}
          <video
            ref={mainVideoRef}
            src={videoSources.current}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata" // Changed from 'auto' to 'metadata' for faster initial load
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
            onCanPlay={handleVideoLoad}
            onError={handleVideoError}
          />
        </div>

        {/* Heading at the bottom right */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          EL<b>EVEN</b>
          <span className="block">
            <b>INTERIOR</b>
          </span>
        </h1>

        {/* Content overlay */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              Eleva<b>t</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              At Eleven Interior World, we craft stunning interiors tailored to
              your vision. From luxurious homes to chic commercial spaces, our
              designs combine functionality with style to create spaces you'll
              love. Let's bring your dream space to life—where creativity meets
              comfort.
            </p>

            {/* Button with arrow icon */}
            <Button
              id="watch-trailer"
              title="Enter Eleven"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
              method={handleButtonClick} // Add the click handler
            />
          </div>
        </div>
      </div>

      {/* Heading at the bottom right (outside the video frame) */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        EL<b>EVEN</b>
        <span className="block">
          <b>INTERIOR</b>
        </span>
      </h1>
    </div>
  );
};

export default Hero;