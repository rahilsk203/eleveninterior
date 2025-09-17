import { useRef, useMemo, useCallback, memo, Suspense, lazy } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIntersectionObserver, usePerformanceMonitor } from '../hooks/useIntersectionObserver';
import StatsStructuredData from './StatsStructuredData';

// Register GSAP plugins only once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Lazy load the background component for better initial load
const StatsBackground = lazy(() => import('./StatsBackground'));

// Create a fallback component for the background
const BackgroundFallback = () => (
  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900" />
);

// Optimized stats data with stable references
const STATS_DATA = Object.freeze([
  {
    id: 'projects',
    number: "500+",
    label: "Projects Completed",
    description: "Successfully delivered interior design projects",
    ariaLabel: "500 plus projects completed",
    delay: 0
  },
  {
    id: 'experience',
    number: "15+",
    label: "Years Experience",
    description: "Professional interior design expertise",
    ariaLabel: "15 plus years of experience",
    delay: 0.2
  },
  {
    id: 'satisfaction',
    number: "98%",
    label: "Client Satisfaction",
    description: "Happy clients who recommend our services",
    ariaLabel: "98 percent client satisfaction rate",
    delay: 0.4
  },
  {
    id: 'awards',
    number: "50+",
    label: "Awards Won",
    description: "Recognition for outstanding design excellence",
    ariaLabel: "50 plus awards won",
    delay: 0.6
  }
]);

// Performance optimized animation configurations
const ANIMATION_CONFIG = Object.freeze({
  container: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, duration: 1 },
    trigger: { start: "top 80%", end: "bottom 20%", toggleActions: "play none none reverse" }
  },
  numbers: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
  }
});

// Optimized Stats component with memoization and performance improvements
const Stats = memo(() => {
  const statsRef = useRef(null);
  const [containerRef, isVisible] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px',
    triggerOnce: true,
    throttleMs: 100
  });
  
  // Performance monitoring in development
  usePerformanceMonitor('Stats');
  
  // Memoized animation callback to prevent recreation
  const initializeAnimations = useCallback(() => {
    if (!statsRef.current || !isVisible) return;
    
    // Container animation with GPU acceleration
    gsap.fromTo(statsRef.current,
      ANIMATION_CONFIG.container.initial,
      {
        ...ANIMATION_CONFIG.container.animate,
        force3D: true, // Force GPU acceleration
        scrollTrigger: {
          trigger: statsRef.current,
          ...ANIMATION_CONFIG.container.trigger
        }
      }
    );

    // Batch number animations for better performance
    const numberElements = gsap.utils.toArray('.stat-number');
    if (numberElements.length) {
      gsap.set(numberElements, {
        ...ANIMATION_CONFIG.numbers.initial,
        force3D: true
      });
      
      gsap.to(numberElements, {
        ...ANIMATION_CONFIG.numbers.animate,
        stagger: 0.15, // Slightly faster stagger for better UX
        force3D: true,
        scrollTrigger: {
          trigger: statsRef.current,
          ...ANIMATION_CONFIG.container.trigger
        }
      });
    }
  }, [isVisible]);

  // Initialize animations with GSAP when component becomes visible
  useGSAP(() => {
    if (isVisible) {
      initializeAnimations();
    }
  }, { scope: statsRef, dependencies: [isVisible] });

  // Memoized stat items to prevent re-renders
  const statItems = useMemo(() => 
    STATS_DATA.map((stat, index) => (
      <StatItem
        key={stat.id}
        stat={stat}
        index={index}
        isVisible={isVisible}
      />
    )), [isVisible]);

  return (
    <>
      <StatsStructuredData />
      <section 
        ref={containerRef}
        className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900 relative overflow-hidden stats-container"
        aria-labelledby="stats-heading"
        itemScope 
        itemType="https://schema.org/Service"
      >
      {/* Lazy-loaded optimized background */}
      <Suspense fallback={<BackgroundFallback />}>
        {isVisible && <StatsBackground />}
      </Suspense>
      
      <div className="container mx-auto px-6 relative z-10">
        <header ref={statsRef} className="text-center mb-16">
          <p className="font-general text-sm uppercase text-violet-400 mb-4 tracking-wider stats-critical">
            Our Achievements
          </p>
          <h2 
            id="stats-heading"
            className="text-4xl md:text-6xl font-bold text-white mb-6 stats-critical"
            itemProp="name"
          >
            Numbers That <span className="text-violet-400">Speak</span>
          </h2>
          <p 
            className="max-w-2xl mx-auto text-gray-300 text-lg"
            itemProp="description"
          >
            Our track record speaks for itself. Here are some impressive numbers that showcase our commitment to excellence.
          </p>
        </header>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stats-grid"
          role="list"
          aria-label="Company statistics"
        >
          {statItems}
        </div>
      </div>
    </section>
    </>
  );
});

// Optimized StatItem component with memoization
const StatItem = memo(({ stat, index, isVisible }) => {
  const cardRef = useRef(null);
  const [itemRef, isItemVisible] = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true,
    throttleMs: 50
  });
  
  // Memoized card interaction handlers
  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      force3D: true
    });
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      force3D: true
    });
  }, []);
  
  // Only render when visible to reduce DOM nodes
  if (!isVisible && !isItemVisible) {
    return (
      <div 
        ref={itemRef}
        className="text-center group h-48" // Maintain layout space
        style={{ minHeight: '192px' }} // Prevent layout shift
      />
    );
  }
  
  return (
    <article 
      ref={itemRef}
      role="listitem"
      className="text-center group"
      itemScope 
      itemType="https://schema.org/QuantitativeValue"
    >
      <div 
        ref={cardRef}
        className="stat-card bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-violet-400/50 transition-colors duration-300 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ 
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)' // Force GPU layer
        }}
      >
        <div 
          className="stat-number text-4xl md:text-5xl font-bold text-violet-400 mb-4"
          itemProp="value"
          aria-label={stat.ariaLabel}
        >
          {stat.number}
        </div>
        <h3 
          className="text-xl font-semibold text-white mb-2"
          itemProp="name"
        >
          {stat.label}
        </h3>
        <p 
          className="text-gray-400 text-sm"
          itemProp="description"
        >
          {stat.description}
        </p>
      </div>
    </article>
  );
});

// Set display names for debugging
Stats.displayName = 'Stats';
StatItem.displayName = 'StatItem';

export default Stats;
