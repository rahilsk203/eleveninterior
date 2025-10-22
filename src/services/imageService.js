/**
 * Image Service - Fetch images from backend API for frontend display
 * This service handles fetching images from the admin backend
 * Optimized with DSA patterns: LRU Cache, Prefetching, Retry Logic, and Parallel Fetching
 */

class ImageService {
  constructor() {
    // Base API URL for the admin backend
    this.API_BASE = 'https://eleven-interior-api.eleveninteriorworld.workers.dev';
    
    // LRU Cache for storing fetched images with eviction policy
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    this.maxCacheSize = 50; // Maximum cache entries
    
    // Request deduplication to prevent multiple simultaneous requests for same resource
    this.pendingRequests = new Map();
    
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

  // Request deduplication to prevent multiple simultaneous requests for same resource
  async dedupeRequest(key, requestFn) {
    // If request is already pending, return the existing promise
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key);
    }
    
    // Create new request promise
    const promise = requestFn().finally(() => {
      // Remove from pending requests when completed
      this.pendingRequests.delete(key);
    });
    
    // Store the pending request
    this.pendingRequests.set(key, promise);
    
    return promise;
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

  // Prefetch images for anticipated requests
  async prefetchImages(sections = ['gallery', 'contact', 'entrance', 'about', 'logo', 'swordman']) {
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
        const cacheKey = `images_${section}`;
        if (this.getCache(cacheKey)) {
          this.prefetchQueue.delete(section);
          continue;
        }
        
        // Fetch and cache the images
        await this.getImagesBySection(section);
        this.prefetchQueue.delete(section);
      } catch (error) {
        console.warn(`Prefetch failed for section: ${section}`, error);
        this.prefetchQueue.delete(section);
      }
      
      // Small delay between prefetch requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Fetch images from a specific section with optimization
  async getImagesBySection(section) {
    // Use request deduplication to prevent multiple simultaneous requests
    const requestKey = `images_${section}`;
    return this.dedupeRequest(requestKey, async () => {
      try {
        // Check cache first with LRU update
        const cacheKey = `images_${section}`;
        const cachedData = this.getCache(cacheKey);
        if (cachedData) {
          console.log(`Returning cached images for section: ${section}`);
          return cachedData;
        }

        // Apply rate limiting
        await this.rateLimit(section);

        // Fetch with retry mechanism
        const result = await this.retry(async () => {
          const response = await fetch(`${this.API_BASE}/api/images/${section}`);
          
          if (!response.ok) {
            if (response.status === 429) {
              console.warn(`Rate limited for section: ${section}. Using fallback.`);
              // Return empty array as fallback to prevent app crash
              return [];
            }
            throw new Error(`Failed to fetch ${section} images: ${response.status} ${response.statusText}`);
          }

          return await response.json();
        });

        if (!result.success) {
          throw new Error(result.error?.message || `Failed to fetch ${section} images`);
        }

        // Extract image data
        let images = [];
        if (result.data.images && Array.isArray(result.data.images)) {
          // Multiple images response
          images = result.data.images;
        } else if (result.data.id) {
          // Single image response
          images = [result.data];
        } else if (Array.isArray(result.data)) {
          // Array of images response
          images = result.data;
        }

        // Cache the result
        this.setCache(cacheKey, images);
        
        console.log(`Fetched ${images.length} images for section: ${section}`);
        return images;
      } catch (error) {
        console.error(`Error fetching ${section} images:`, error);
        // Return empty array as fallback to prevent app crash
        return [];
      }
    });
  }

  // Get entrance images (used in Story component)
  async getEntranceImages() {
    return await this.getImagesBySection('entrance');
  }

  // Get gallery images
  async getGalleryImages() {
    return await this.getImagesBySection('gallery');
  }

  // Get about images
  async getAboutImages() {
    return await this.getImagesBySection('about');
  }

  // Get contact images
  async getContactImages() {
    return await this.getImagesBySection('contact');
  }

  // Get logo images
  async getLogoImages() {
    return await this.getImagesBySection('logo');
  }

  // Get swordman images
  async getSwordmanImages() {
    return await this.getImagesBySection('swordman');
  }

  // Get a specific image by ID
  async getImageById(section, id) {
    try {
      // Apply rate limiting
      await this.rateLimit(`${section}_${id}`);
      
      // Fetch with retry mechanism
      const result = await this.retry(async () => {
        const response = await fetch(`${this.API_BASE}/api/images/${section}/${id}`);
        
        if (!response.ok) {
          if (response.status === 429) {
            console.warn(`Rate limited for image: ${section}/${id}`);
            return null;
          }
          throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
        }

        return await response.json();
      });

      if (!result.success) {
        throw new Error(result.error?.message || 'Failed to fetch image');
      }

      return result.data;
    } catch (error) {
      console.error('Error fetching image by ID:', error);
      return null;
    }
  }

  // Get optimized image URL for different use cases
  getOptimizedImageUrl(imageData, quality = 'original') {
    if (!imageData || !imageData.urls) {
      return null;
    }

    switch (quality) {
      case 'high':
        return imageData.urls.high || imageData.urls.original;
      case 'medium':
        return imageData.urls.medium || imageData.urls.original;
      case 'low':
        return imageData.urls.low || imageData.urls.original;
      default:
        return imageData.urls.original;
    }
  }
}

// Export singleton instance
export const imageService = new ImageService();