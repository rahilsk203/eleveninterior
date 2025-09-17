import { memo } from 'react';

/**
 * Optimized background component for Stats section
 * Lazy-loaded to improve initial page load performance
 */
const StatsBackground = memo(() => {
  return (
    <div 
      className="absolute inset-0 stats-bg-gradient"
      style={{
        background: `
          radial-gradient(circle at 20% 50%, rgba(139,92,246,0.1), transparent 50%),
          radial-gradient(circle at 80% 50%, rgba(168,85,247,0.1), transparent 50%)
        `,
        willChange: 'auto',
        transform: 'translate3d(0, 0, 0)'
      }}
      aria-hidden="true"
    />
  );
});

StatsBackground.displayName = 'StatsBackground';

export default StatsBackground;