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
        const response = await fetch(`${this.API_BASE}/api/videos/${section}`);
        
        if (!response.ok) {
          if (response.status === 429) {
            console.warn(`Rate limited for section: ${section}. Using fallback.`);
            // Return empty array as fallback to prevent app crash
            return [];
          }
          throw new Error(`Failed to fetch ${section} videos: ${response.status} ${response.statusText}`);
        }

        return await response.json();
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
      // Return empty array as fallback to prevent app crash
      return [];
    }
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

  // Get optimized video URL for different use cases
  getOptimizedVideoUrl(videoData, quality = 'original') {
    if (!videoData || !videoData.urls) {
      return null;
    }

    switch (quality) {
      case 'hd':
        return videoData.urls.hd || videoData.urls.original;
      case 'sd':
        return videoData.urls.sd || videoData.urls.original;
      case 'mobile':
        return videoData.urls.mobile || videoData.urls.original;
      default:
        return videoData.urls.original;
    }
  }
}

// Export singleton instance
export const videoService = new VideoService();