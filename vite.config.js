import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh for better development experience
      fastRefresh: true,
      // Optimize JSX runtime for production
      jsxRuntime: 'automatic'
    })
  ],
  server: {
    host: '0.0.0.0', // Exposes the app to the network
    port: 3000, // Optional: Change the port number if you need
  },
  
  // Production optimizations
  build: {
    // Enable minification
    minify: 'terser',
    
    // Terser options for better compression
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      mangle: {
        safari10: true
      }
    },
    
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        // Split vendor code
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['gsap', '@gsap/react'],
          utils: ['clsx']
        },
        // Optimize chunk names for caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    // Enable source maps for debugging (can be disabled for production)
    sourcemap: false,
    
    // Target modern browsers for better optimization
    target: 'esnext',
    
    // Enable CSS code splitting
    cssCodeSplit: true
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'gsap',
      '@gsap/react',
      'clsx'
    ],
    exclude: []
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@pages': resolve(__dirname, 'src/pages')
    }
  },
  
  // CSS optimization
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      // PostCSS optimizations are handled by postcss.config.js
    }
  },
  
  // Performance optimizations
  esbuild: {
    // Remove console statements in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    // Enable JSX optimization
    jsx: 'automatic'
  }
})
