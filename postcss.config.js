export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Production optimizations
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: [
          'default',
          {
            // Optimize CSS for production
            discardComments: { removeAll: true },
            normalizeWhitespace: true,
            colormin: true,
            convertValues: true,
            discardDuplicates: true,
            discardEmpty: true,
            mergeIdents: true,
            mergeLonghand: true,
            mergeRules: true,
            minifyFontValues: true,
            minifyGradients: true,
            minifyParams: true,
            minifySelectors: true,
            normalizeCharset: true,
            normalizeDisplayValues: true,
            normalizePositions: true,
            normalizeRepeatStyle: true,
            normalizeString: true,
            normalizeTimingFunctions: true,
            normalizeUnicode: true,
            normalizeUrl: true,
            orderedValues: true,
            reduceIdents: true,
            reduceInitial: true,
            reduceTransforms: true,
            svgo: true,
            uniqueSelectors: true
          }
        ]
      },
      '@fullhuman/postcss-purgecss': {
        content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: [
            // GSAP classes
            /^gsap/,
            /^tween/,
            // Animation classes
            /^animate-/,
            // Dynamic classes
            /^stat-/,
            /^water-/,
            /^three-body/
          ],
          deep: [/.*-enter.*/, /.*-exit.*/],
          greedy: [/^hover:/, /^focus:/, /^active:/]
        }
      }
    })
  }
}
