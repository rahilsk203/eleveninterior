import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * High-performance Intersection Observer hook with throttling and memory optimization
 * @param {Object} options - Intersection Observer options
 * @param {number} threshold - Visibility threshold (0-1)
 * @param {string} rootMargin - Root margin for early triggering
 * @param {boolean} triggerOnce - Only trigger once
 * @param {number} throttleMs - Throttle callback execution
 * @returns {[React.RefObject, boolean]} - [ref to attach to element, isIntersecting]
 */
export const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = '0px 0px -10% 0px',
  triggerOnce = false,
  throttleMs = 100
} = {}) => {
  const elementRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const observerRef = useRef(null);
  const throttleRef = useRef(null);

  // Throttled callback to reduce excessive state updates
  const throttledCallback = useCallback((entries) => {
    if (throttleRef.current) {
      clearTimeout(throttleRef.current);
    }
    
    throttleRef.current = setTimeout(() => {
      const [entry] = entries;
      const isVisible = entry.isIntersecting;
      
      if (triggerOnce) {
        if (isVisible && !hasTriggered) {
          setIsIntersecting(true);
          setHasTriggered(true);
          // Disconnect observer after first trigger for memory optimization
          if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
          }
        }
      } else {
        setIsIntersecting(isVisible);
      }
    }, throttleMs);
  }, [triggerOnce, hasTriggered, throttleMs]);

  useEffect(() => {
    const element = elementRef.current;
    
    if (!element || typeof window === 'undefined' || !window.IntersectionObserver) {
      // Fallback for SSR or older browsers
      setIsIntersecting(true);
      return;
    }

    // Create optimized observer with passive options
    observerRef.current = new IntersectionObserver(throttledCallback, {
      threshold: Array.isArray(threshold) ? threshold : [threshold],
      rootMargin,
      // Use passive observation for better performance
      passive: true
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
        throttleRef.current = null;
      }
    };
  }, [throttledCallback, threshold, rootMargin]);

  return [elementRef, isIntersecting];
};

/**
 * Performance monitoring hook for component render tracking
 * @param {string} componentName - Name of the component for tracking
 */
export const usePerformanceMonitor = (componentName) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.performance) {
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        
        // Log performance in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
        }
        
        // Send to analytics in production (implement your analytics service)
        if (process.env.NODE_ENV === 'production' && renderTime > 16) {
          // Flag renders slower than 16ms (60fps threshold)
          console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
        }
      };
    }
  }, [componentName]);
};

/**
 * Preload critical resources hook
 * @param {Array} resources - Array of resource URLs to preload
 * @param {string} type - Resource type ('image', 'font', 'style', etc.)
 */
export const useResourcePreloader = (resources = [], type = 'image') => {
  useEffect(() => {
    if (typeof window === 'undefined' || !resources.length) return;

    const preloadPromises = resources.map(resource => {
      return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = type;
        
        if (type === 'font') {
          link.crossOrigin = 'anonymous';
        }
        
        link.onload = resolve;
        link.onerror = reject;
        
        document.head.appendChild(link);
      });
    });

    return () => {
      // Cleanup preload links
      resources.forEach(resource => {
        const existingLink = document.querySelector(`link[href="${resource}"]`);
        if (existingLink) {
          document.head.removeChild(existingLink);
        }
      });
    };
  }, [resources, type]);
};