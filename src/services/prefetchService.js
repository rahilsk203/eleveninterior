/**
 * Prefetch Service - Centralized service for prefetching data across the application
 * This service handles intelligent prefetching of videos, images, and other data
 * based on user behavior patterns and navigation predictions
 */

import { videoService } from './videoService';
import { imageService } from './imageService';
import { contactService } from './contactService';

class PrefetchService {
  constructor() {
    // Track user navigation patterns
    this.navigationHistory = [];
    this.maxHistorySize = 20;
    
    // Predictive prefetching configuration
    this.predictionWindow = 5000; // 5 seconds
    this.prefetchDelay = 1000; // 1 second delay before prefetching
    
    // Active prefetch timers
    this.prefetchTimers = new Map();
  }

  // Record navigation for pattern analysis
  recordNavigation(path) {
    this.navigationHistory.push({
      path,
      timestamp: Date.now()
    });
    
    // Maintain history size
    if (this.navigationHistory.length > this.maxHistorySize) {
      this.navigationHistory.shift();
    }
    
    // Trigger predictive prefetching
    this.schedulePredictivePrefetch(path);
  }

  // Schedule predictive prefetching based on current path
  schedulePredictivePrefetch(currentPath) {
    // Clear any existing timers for this path
    if (this.prefetchTimers.has(currentPath)) {
      clearTimeout(this.prefetchTimers.get(currentPath));
    }
    
    // Schedule prefetch after delay
    const timer = setTimeout(() => {
      this.predictivePrefetch(currentPath);
      this.prefetchTimers.delete(currentPath);
    }, this.prefetchDelay);
    
    this.prefetchTimers.set(currentPath, timer);
  }

  // Predictive prefetching based on navigation patterns
  predictivePrefetch(currentPath) {
    // Get likely next paths based on history
    const nextPaths = this.predictNextPaths(currentPath);
    
    // Prefetch data for predicted paths
    nextPaths.forEach(path => {
      this.prefetchPathData(path);
    });
  }

  // Predict next likely paths based on navigation history
  predictNextPaths(currentPath) {
    const predictions = new Set();
    
    // Add common navigation patterns
    const navigationPatterns = {
      '/': ['/about', '/features', '/gallery', '/contact', '/inquiry'],
      '/about': ['/features', '/gallery', '/contact'],
      '/features': ['/gallery', '/contact', '/inquiry'],
      '/gallery': ['/contact', '/inquiry'],
      '/contact': ['/inquiry', '/'],
      '/inquiry': ['/contact', '/']
    };
    
    // Add pattern-based predictions
    if (navigationPatterns[currentPath]) {
      navigationPatterns[currentPath].forEach(path => predictions.add(path));
    }
    
    // Add history-based predictions
    const recentPaths = this.navigationHistory
      .slice(-5)
      .map(entry => entry.path)
      .filter(path => path !== currentPath);
      
    recentPaths.forEach(path => predictions.add(path));
    
    return Array.from(predictions);
  }

  // Prefetch data for a specific path
  async prefetchPathData(path) {
    try {
      switch (path) {
        case '/':
          // Prefetch hero and feature videos
          videoService.prefetchVideos(['hero', 'feature']);
          imageService.prefetchImages(['logo']);
          break;
          
        case '/about':
          // Prefetch about images
          imageService.prefetchImages(['about', 'entrance']);
          videoService.prefetchVideos(['hero']);
          break;
          
        case '/features':
          // Prefetch feature videos
          videoService.prefetchVideos(['feature', 'hero']);
          imageService.prefetchImages(['gallery', 'about']);
          break;
          
        case '/gallery':
          // Prefetch gallery images
          imageService.prefetchImages(['gallery', 'contact', 'about']);
          break;
          
        case '/contact':
          // Prefetch contact images and prepare contact service
          imageService.prefetchImages(['contact', 'swordman', 'logo']);
          contactService.prefetchContactData();
          break;
          
        case '/inquiry':
          // No specific prefetching needed for inquiry form
          break;
          
        default:
          // Generic prefetch for unknown paths
          videoService.prefetchVideos(['hero', 'feature']);
          imageService.prefetchImages(['gallery', 'contact', 'logo']);
          contactService.prefetchContactData();
      }
    } catch (error) {
      console.warn(`Prefetch failed for path: ${path}`, error);
    }
  }

  // Manual prefetch trigger for specific sections
  prefetchSections(sections) {
    const { videos = [], images = [] } = sections;
    
    if (videos.length > 0) {
      videoService.prefetchVideos(videos);
    }
    
    if (images.length > 0) {
      imageService.prefetchImages(images);
    }
    
    // Always prefetch contact data when manually prefetching
    contactService.prefetchContactData();
  }

  // Clear all prefetch timers
  clearAllTimers() {
    this.prefetchTimers.forEach(timer => clearTimeout(timer));
    this.prefetchTimers.clear();
  }
}

// Export singleton instance
export const prefetchService = new PrefetchService();