import { Helmet } from 'react-helmet-async';

/**
 * SEO Component - Provides comprehensive SEO optimization for pages
 * Includes meta tags, structured data, and Open Graph properties
 */
const SEO = ({
  title,
  description,
  keywords,
  author = "Eleven Interior",
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType = "website",
  twitterCard = "summary_large_image",
  canonical,
  structuredData,
  children
}) => {
  // Default values
  const defaultTitle = "Eleven Interior - Premium Interior Design Services";
  const defaultDescription = "Transform your spaces with Eleven Interior's premium interior design services. Luxury designs for residential and commercial spaces.";
  const defaultImage = "/logo.png"; // Update with actual logo path
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  // Construct full URLs
  const fullOgUrl = ogUrl ? (ogUrl.startsWith('http') ? ogUrl : `${baseUrl}${ogUrl}`) : baseUrl;
  const fullOgImage = ogImage ? (ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`) : `${baseUrl}${defaultImage}`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle || title || defaultTitle} />
      <meta property="og:description" content={ogDescription || description || defaultDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={fullOgUrl} />
      <meta property="og:site_name" content="Eleven Interior" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || title || defaultTitle} />
      <meta name="twitter:description" content={ogDescription || description || defaultDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical.startsWith('http') ? canonical : `${baseUrl}${canonical}`} />}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {children}
    </Helmet>
  );
};

export default SEO;