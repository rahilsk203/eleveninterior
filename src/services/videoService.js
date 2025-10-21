/**
 * Video Service - Fetch videos from backend API for frontend display
 * This service handles fetching hero and feature videos from the admin backend
 * Optimized with DSA patterns: LRU Cache, Prefetching, Retry Logic, and Parallel Fetching
 */

class VideoService {
  constructor() {
    // Base API URL for the admin backend
    this.API_BASE = 'https://eleven-interior-api.eleveninteriorworld.workers.dev';
    
    // LRU Cache for storing fetched videos with eviction policy
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    this.maxCacheSize = 50; // Maximum cache entries
    
    // Rate limiting - track last request time
    this.lastRequestTime = new Map();
    this.minRequestInterval = 1000; // 1 second minimum between requests
    
    // Prefetch queue for anticipated requests
    this.prefetchQueue = new Set();
    
    // Retry configuration
    this.maxRetries = 3;
    this.retryDelay = 1000; // 1 second initial delay
    
    // Browser capabilities detection
    this.browserCapabilities = this.detectBrowserCapabilities();
    
    // Fallback to local videos if API fails
    this.useLocalVideos = false;
  }

  // Detect browser capabilities for video format support
  detectBrowserCapabilities() {
    const capabilities = {
      webm: false,
      mp4: true, // Most widely supported
      h264: true,
      h265: false,
      av1: false
    };
    
    if (typeof document !== 'undefined') {
      const video = document.createElement('video');
      
      // Check for WebM support
      try {
        capabilities.webm = !!video.canPlayType && 
          (video.canPlayType('video/webm; codecs="vp8, vorbis"') === 'probably' ||
           video.canPlayType('video/webm; codecs="vp9, vorbis"') === 'probably');
      } catch (e) {
        capabilities.webm = false;
      }
      
      // Check for H.265 support
      try {
        capabilities.h265 = !!video.canPlayType && 
          (video.canPlayType('video/mp4; codecs="hvc1.1.1.L120.90"') === 'probably' ||
           video.canPlayType('video/mp4; codecs="hev1.1.1.L120.90"') === 'probably');
      } catch (e) {
        capabilities.h265 = false;
      }
      
      // Check for AV1 support
      try {
        capabilities.av1 = !!video.canPlayType && 
          video.canPlayType('video/mp4; codecs="av01.0.08M.08"') === 'probably';
      } catch (e) {
        capabilities.av1 = false;
      }
    }
    
    return capabilities;
  }

  // LRU Cache management with eviction policy
  setCache(key, data) {
    // Evict oldest entry if cache is at max size
    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      lastAccessed: Date.now()
    });
  }

  getCache(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      // Update last accessed time for LRU
      cached.lastAccessed = Date.now();
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  // Move entry to end of cache (LRU implementation)
  updateLRU(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
    }
  }

  clearCache() {
    this.cache.clear();
  }

  // Rate limiting helper with exponential backoff
  async rateLimit(section) {
    const now = Date.now();
    const lastTime = this.lastRequestTime.get(section) || 0;
    const timeSinceLastRequest = now - lastTime;
    
    if (timeSinceLastRequest < this.minRequestInterval) {
      const delay = this.minRequestInterval - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    this.lastRequestTime.set(section, Date.now());
  }

  // Retry mechanism with exponential backoff
  async retry(fn, retries = this.maxRetries) {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0) {
        const delay = this.retryDelay * Math.pow(2, this.maxRetries - retries);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.retry(fn, retries - 1);
      }
      throw error;
    }
  }

  // Prefetch videos for anticipated requests
  async prefetchVideos(sections = ['hero', 'feature']) {
    // Add sections to prefetch queue
    sections.forEach(section => this.prefetchQueue.add(section));
    
    // Process prefetch queue in background
    this.processPrefetchQueue();
  }

  async processPrefetchQueue() {
    // Process one item at a time to avoid overwhelming the API
    for (const section of this.prefetchQueue) {
      try {
        // Skip if already cached
        const cacheKey = `videos_${section}`;
        if (this.getCache(cacheKey)) {
          this.prefetchQueue.delete(section);
          continue;
        }
        
        // Fetch and cache the videos
        await this.getVideosBySection(section);
        this.prefetchQueue.delete(section);
      } catch (error) {
        console.warn(`Prefetch failed for section: ${section}`, error);
        this.prefetchQueue.delete(section);
      }
      
      // Small delay between prefetch requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Fetch videos from a specific section with optimization
  async getVideosBySection(section) {
    // If API is not working, use local videos
    if (this.useLocalVideos) {
      console.log('Using local videos fallback for section:', section);
      return this.getLocalVideos(section);
    }
    
    try {
      // Check cache first with LRU update
      const cacheKey = `videos_${section}`;
      const cachedData = this.getCache(cacheKey);
      if (cachedData) {
        console.log(`Returning cached videos for section: ${section}`);
        this.updateLRU(cacheKey);
        return cachedData;
      }

      // Apply rate limiting
      await this.rateLimit(section);

      // Fetch with retry mechanism
      const result = await this.retry(async () => {
        // Try different possible endpoints
        const endpoints = [
          `${this.API_BASE}/api/videos/${section}`,
          `${this.API_BASE}/api/${section}/videos`,
          `${this.API_BASE}/${section}/videos`,
          `${this.API_BASE}/videos/${section}`
        ];
        
        let lastError;
        for (const endpoint of endpoints) {
          try {
            console.log(`Trying endpoint: ${endpoint}`);
            const response = await fetch(endpoint);
            
            if (response.ok) {
              return await response.json();
            }
            
            if (response.status === 429) {
              console.warn(`Rate limited for section: ${section}. Using fallback.`);
              // Return empty array as fallback to prevent app crash
              return [];
            }
            
            lastError = new Error(`Failed to fetch ${section} videos: ${response.status} ${response.statusText}`);
          } catch (e) {
            lastError = e;
            continue;
          }
        }
        
        throw lastError;
      });

      if (!result.success) {
        throw new Error(result.error?.message || `Failed to fetch ${section} videos`);
      }

      // Extract video data
      let videos = [];
      if (result.data.videos && Array.isArray(result.data.videos)) {
        // Multiple videos response
        videos = result.data.videos;
      } else if (result.data.id) {
        // Single video response
        videos = [result.data];
      } else if (Array.isArray(result.data)) {
        // Array of videos response
        videos = result.data;
      }

      // Cache the result
      this.setCache(cacheKey, videos);
      
      console.log(`Fetched ${videos.length} videos for section: ${section}`);
      return videos;
    } catch (error) {
      console.error(`Error fetching ${section} videos:`, error);
      
      // If API fails, switch to local videos and try again
      if (!this.useLocalVideos) {
        console.warn('Switching to local videos fallback');
        this.useLocalVideos = true;
        return this.getLocalVideos(section);
      }
      
      // Return empty array as fallback to prevent app crash
      return [];
    }
  }
  
  // Get local videos as fallback
  getLocalVideos(section) {
    // Return local video paths based on section
    if (section === 'hero') {
      return [
        { id: 1, urls: { original: 'videos/hero-1.mp4', mobile: 'videos/hero-1.mp4' } },
        { id: 2, urls: { original: 'videos/hero-2.mp4', mobile: 'videos/hero-2.mp4' } },
        { id: 3, urls: { original: 'videos/hero-3.mp4', mobile: 'videos/hero-3.mp4' } },
        { id: 4, urls: { original: 'videos/hero-4.mp4', mobile: 'videos/hero-4.mp4' } }
      ];
    }
    
    if (section === 'feature') {
      return [
        { id: 1, urls: { original: 'videos/feature-1.mp4', mobile: 'videos/feature-1.mp4' } },
        { id: 2, urls: { original: 'videos/feature-2.mp4', mobile: 'videos/feature-2.mp4' } }
      ];
    }
    
    return [];
  }

  // Get hero videos
  async getHeroVideos() {
    return await this.getVideosBySection('hero');
  }

  // Get feature videos
  async getFeatureVideos() {
    return await this.getVideosBySection('feature');
  }

  // Get a specific video by ID
  async getVideoById(section, id) {
    try {
      // Apply rate limiting
      await this.rateLimit(`${section}_${id}`);
      
      // Fetch with retry mechanism
      const result = await this.retry(async () => {
        const response = await fetch(`${this.API_BASE}/api/videos/${section}/${id}`);
        
        if (!response.ok) {
          if (response.status === 429) {
            console.warn(`Rate limited for video: ${section}/${id}`);
            return null;
          }
          throw new Error(`Failed to fetch video: ${response.status} ${response.statusText}`);
        }

        return await response.json();
      });

      if (!result.success) {
        throw new Error(result.error?.message || 'Failed to fetch video');
      }

      return result.data;
    } catch (error) {
      console.error('Error fetching video by ID:', error);
      return null;
    }
  }

  // Get optimized video URL for different use cases and formats
  getOptimizedVideoUrl(videoData, quality = 'original') {
    if (!videoData || !videoData.urls) {
      return null;
    }

    // Select the best format based on browser capabilities
    const formatPreference = this.getFormatPreference();
    
    // Try to get the preferred format first
    if (formatPreference && videoData.urls[`${quality}_${formatPreference}`]) {
      return videoData.urls[`${quality}_${formatPreference}`];
    }
    
    // Fallback to format without quality suffix
    if (videoData.urls[formatPreference]) {
      return videoData.urls[formatPreference];
    }

    // Standard quality fallbacks
    switch (quality) {
      case 'hd':
        return videoData.urls.hd || videoData.urls.original;
      case 'sd':
        return videoData.urls.sd || videoData.urls.original;
      case 'mobile':
        return videoData.urls.mobile || videoData.urls.original;
      case 'preview':
        return videoData.urls.preview || videoData.urls.mobile || videoData.urls.original;
      default:
        return videoData.urls.original;
    }
  }
  
  // Get the best format based on browser capabilities and network conditions
  getFormatPreference() {
    // In order of preference based on compression efficiency and browser support
    if (this.browserCapabilities.av1) return 'av1'; // Most efficient
    if (this.browserCapabilities.h265) return 'h265'; // Good compression
    if (this.browserCapabilities.webm) return 'webm'; // Good alternative
    return 'mp4'; // Widely supported fallback
  }
  
  // Enhanced video preloading with priority levels
  preloadVideo(url, priority = 'low') {
    if (!url) return Promise.resolve();
    
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      
      // Set attributes based on priority
      if (priority === 'high') {
        video.preload = 'auto';
        video.autoplay = false;
      } else {
        video.preload = 'metadata';
      }
      
      video.muted = true;
      video.playsInline = true;
      video.src = url;
      
      // Resolve when enough data is loaded
      video.addEventListener('loadeddata', resolve);
      video.addEventListener('canplay', resolve);
      video.addEventListener('error', reject);
      
      // Start loading
      video.load();
    });
  }

  // Intelligent batch preloading with priority management
  async preloadVideos(videoUrls, priority = 'low') {
    if (!Array.isArray(videoUrls) || videoUrls.length === 0) {
      return Promise.resolve();
    }
    
    // For high priority, preload all at once
    if (priority === 'high') {
      return Promise.all(
        videoUrls.map(url => this.preloadVideo(url, 'high'))
      );
    }
    
    // For low priority, preload sequentially to avoid bandwidth contention
    for (const url of videoUrls) {
      try {
        await this.preloadVideo(url, 'low');
      } catch (error) {
        console.warn('Failed to preload video:', url, error);
      }
    }
  }
}

// Export singleton instance
export const videoService = new VideoService();