/**
 * Inquiry Service - Submit inquiries to backend API
 * This service handles submitting customer inquiries to the admin backend
 * Optimized with DSA patterns: Retry Logic, Request Queue, and Validation Caching
 */

class InquiryService {
  constructor() {
    // Base API URL for the admin backend
    this.API_BASE = 'https://eleven-interior-api.eleveninteriorworld.workers.dev';
    
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

  // Queue management for request submission
  async queueSubmission(inquiryData) {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({
        data: inquiryData,
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
        const result = await this.submitInquiry(request.data);
        request.resolve(result);
      } catch (error) {
        request.reject(error);
      }
      
      // Small delay between requests to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    this.isProcessing = false;
  }

  // Submit a new inquiry with full optimization
  async submitInquiry(inquiryData) {
    try {
      // Validate required fields with caching
      const validations = [
        { field: 'name', value: inquiryData.name, minLen: 2 },
        { field: 'email', value: inquiryData.email, validator: this.isValidEmail.bind(this) },
        { field: 'phone', value: inquiryData.phone, minLen: 10 },
        { field: 'location', value: inquiryData.location, minLen: 2 },
        { field: 'project_description', value: inquiryData.project_description, minLen: 10 }
      ];

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

      // Submit with retry mechanism
      const result = await this.retry(async () => {
        const response = await fetch(`${this.API_BASE}/api/inquiries`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: inquiryData.name.toLowerCase().trim(),
            email: inquiryData.email.toLowerCase().trim(),
            phone: inquiryData.phone.trim(),
            location: inquiryData.location.trim(),
            project_description: inquiryData.project_description.trim()
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.error?.message || errorData.message || `Failed to submit inquiry: ${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }

        return await response.json();
      });

      if (!result.success) {
        throw new Error(result.error?.message || 'Failed to submit inquiry');
      }

      console.log('Inquiry submitted successfully:', result.data);
      return result.data;
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      throw error;
    }
  }

  // Batch submission for multiple inquiries
  async submitInquiriesBatch(inquiries) {
    const results = [];
    const errors = [];
    
    // Process in parallel with controlled concurrency
    const concurrencyLimit = 3;
    const batches = [];
    
    for (let i = 0; i < inquiries.length; i += concurrencyLimit) {
      batches.push(inquiries.slice(i, i + concurrencyLimit));
    }
    
    for (const batch of batches) {
      const batchPromises = batch.map(inquiry => 
        this.submitInquiry(inquiry).catch(error => {
          errors.push({ inquiry, error });
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
export const inquiryService = new InquiryService();