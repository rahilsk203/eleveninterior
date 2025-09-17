import { memo } from 'react';

/**
 * SEO-optimized structured data component for Stats section
 * Provides rich snippets for search engines
 */
const StatsStructuredData = memo(() => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Eleven Interior Design Services",
    "description": "Professional interior design services with 15+ years of experience, 500+ completed projects, and 98% client satisfaction rate.",
    "provider": {
      "@type": "Organization",
      "name": "Eleven Interior",
      "url": typeof window !== 'undefined' ? window.location.origin : '',
      "logo": {
        "@type": "ImageObject",
        "url": typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : ''
      }
    },
    "serviceType": "Interior Design",
    "areaServed": {
      "@type": "Place",
      "name": "Global"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "500"
    },
    "offers": {
      "@type": "Offer",
      "category": "Interior Design Services",
      "availability": "https://schema.org/InStock"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Projects Completed",
        "value": "500+"
      },
      {
        "@type": "PropertyValue",
        "name": "Years of Experience",
        "value": "15+"
      },
      {
        "@type": "PropertyValue",
        "name": "Client Satisfaction Rate",
        "value": "98%"
      },
      {
        "@type": "PropertyValue",
        "name": "Awards Won",
        "value": "50+"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
});

StatsStructuredData.displayName = 'StatsStructuredData';

export default StatsStructuredData;