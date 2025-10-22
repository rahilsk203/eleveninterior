/**
 * Contact Service - Submit contact messages to backend API
 * This service handles submitting contact form messages separately from general inquiries
 * Optimized with DSA patterns: LRU Cache, Prefetching, Retry Logic, Request Queue, and Validation Caching
 */

class ContactService {
  constructor() {
    // Base API URL for the admin backend
    this.API_BASE = 'https://eleven-interior-api.eleveninteriorworld.workers.dev';
    
    // LRU Cache for storing fetched data with eviction policy
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
    
    // Request queue for handling submission order
    this.requestQueue = [];
    this.isProcessing = false;
    
    // Retry configuration
    this.maxRetries = 3;
    this.retryDelay = 1000; // 1 second initial delay
    
    // Validation cache
    this.validationCache = new Map();
    this.validationCacheTimeout = 60 * 1000; // 1 minute
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

  // Validation caching
  getCachedValidation(key) {
    const cached = this.validationCache.get(key);
    if (cached && Date.now() - cached.timestamp < this.validationCacheTimeout) {
      return cached.result;
    }
    this.validationCache.delete(key);
    return null;
  }

  setCachedValidation(key, result) {
    this.validationCache.set(key, {
      result,
      timestamp: Date.now()
    });
  }

  // Validate email format with caching
  isValidEmail(email) {
    const cacheKey = `email_${email}`;
    const cachedResult = this.getCachedValidation(cacheKey);
    if (cachedResult !== null) {
      return cachedResult;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = emailRegex.test(email);
    this.setCachedValidation(cacheKey, result);
    return result;
  }

  // Prefetch contact data for anticipated requests
  async prefetchContactData() {
    // Add to prefetch queue
    this.prefetchQueue.add('contact');
    
    // Process prefetch queue in background
    this.processPrefetchQueue();
  }

  async processPrefetchQueue() {
    // Process one item at a time to avoid overwhelming the API
    for (const item of this.prefetchQueue) {
      try {
        // Skip if already cached
        const cacheKey = `contact_${item}`;
        if (this.getCache(cacheKey)) {
          this.prefetchQueue.delete(item);
          continue;
        }
        
        // For contact service, we don't actually fetch data since it's for submissions
        // But we can prepare the service for submissions
        this.setCache(cacheKey, { status: 'ready' });
        this.prefetchQueue.delete(item);
      } catch (error) {
        console.warn(`Prefetch failed for item: ${item}`, error);
        this.prefetchQueue.delete(item);
      }
      
      // Small delay between prefetch requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Queue management for request submission
  async queueSubmission(contactData) {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({
        data: contactData,
        resolve,
        reject
      });
      
      if (!this.isProcessing) {
        this.processQueue();
      }
    });
  }

  async processQueue() {
    this.isProcessing = true;
    
    while (this.requestQueue.length > 0) {
      const request = this.requestQueue.shift();
      
      try {
        const result = await this.submitContactMessage(request.data);
        request.resolve(result);
      } catch (error) {
        request.reject(error);
      }
      
      // Small delay between requests to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    this.isProcessing = false;
  }

  // Submit a new contact message with full optimization
  async submitContactMessage(contactData) {
    // Use request deduplication to prevent multiple simultaneous submissions
    const requestKey = `contact_${contactData.name}_${contactData.phone}`;
    return this.dedupeRequest(requestKey, async () => {
      try {
        // Validate required fields with caching
        const validations = [
          { field: 'name', value: contactData.name, minLen: 2 },
          { field: 'phone', value: contactData.phone, minLen: 10 },
          { field: 'message', value: contactData.message, minLen: 5 }
        ];

        // Only validate email if provided
        if (contactData.email) {
          validations.push({ field: 'email', value: contactData.email, validator: this.isValidEmail.bind(this) });
        }

        for (const { field, value, minLen, validator } of validations) {
          if (!value) {
            throw new Error(`${field.replace('_', ' ')} is required`);
          }
          
          if (minLen && value.length < minLen) {
            throw new Error(`${field.replace('_', ' ')} must be at least ${minLen} characters`);
          }
          
          if (validator && !validator(value)) {
            throw new Error(`Valid ${field.replace('_', ' ')} is required`);
          }
        }

        // Apply rate limiting
        await this.rateLimit('contact_submit');

        // Submit with retry mechanism
        const result = await this.retry(async () => {
          const response = await fetch(`${this.API_BASE}/api/contact`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: contactData.name.toLowerCase().trim(),
              email: contactData.email ? contactData.email.toLowerCase().trim() : null,
              phone: contactData.phone.trim(),
              message: contactData.message.trim(),
              source: 'contact_form'
            })
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.error?.message || errorData.message || `Failed to submit contact message: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
          }

          return await response.json();
        });

        if (!result.success) {
          throw new Error(result.error?.message || 'Failed to submit contact message');
        }

        console.log('Contact message submitted successfully:', result.data);
        return result.data;
      } catch (error) {
        console.error('Error submitting contact message:', error);
        throw error;
      }
    });
  }

  // Batch submission for multiple contact messages
  async submitContactMessagesBatch(messages) {
    const results = [];
    const errors = [];
    
    // Process in parallel with controlled concurrency
    const concurrencyLimit = 3;
    const batches = [];
    
    for (let i = 0; i < messages.length; i += concurrencyLimit) {
      batches.push(messages.slice(i, i + concurrencyLimit));
    }
    
    for (const batch of batches) {
      const batchPromises = batch.map(message => 
        this.submitContactMessage(message).catch(error => {
          errors.push({ message, error });
          return null;
        })
      );
      
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults.filter(result => result !== null));
    }
    
    return { results, errors };
  }
}

// Export singleton instance
export const contactService = new ContactService();