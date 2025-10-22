import AboutComponent from "../components/About";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO"; // Import SEO component

const AboutPage = () => {
  // Structured data for about page
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Eleven Interior World",
    "description": "Learn about Eleven Interior World, our design philosophy, and what makes us the premier choice for interior design services",
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": typeof window !== 'undefined' ? window.location.origin : ''
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About",
          "item": typeof window !== 'undefined' ? window.location.href : ''
        }
      ]
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "Eleven Interior World",
      "description": "Premium interior design services for residential and commercial spaces",
      "knowsAbout": [
        "Interior Design",
        "Luxury Design",
        "Residential Design",
        "Commercial Design"
      ]
    }
  };

  return (
    <>
      <SEO
        title="About Eleven Interior World - Premium Interior Design Services"
        description="Learn about Eleven Interior World, our design philosophy, and what makes us the premier choice for interior design services for residential and commercial spaces."
        keywords="interior design, luxury design, residential design, commercial design, design philosophy, about us"
        ogTitle="About Eleven Interior World"
        ogDescription="Learn about our design philosophy and what makes us the premier choice for interior design services"
        ogImage="/img/og-about.jpg"
        ogUrl="/about"
        canonical="/about"
        structuredData={aboutStructuredData}
      />
      <div className="min-h-screen w-screen bg-white">
        <NavBar />
        <div className="pt-20"> {/* Standardized padding to account for fixed navbar */}
          <AboutComponent />
        </div>
        
        {/* Additional Information Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Why Choose Eleven Interior World?</h2>
              <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
                We bring a unique blend of creativity, expertise, and dedication to every project we undertake.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">Quality Assurance</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  We use only the finest materials and employ skilled craftsmen to ensure every detail meets our high standards.
                </p>
              </div>
              
              <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">Timely Delivery</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  We understand the value of time and commit to completing projects within agreed timeframes without compromising quality.
                </p>
              </div>
              
              <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">Comprehensive Solutions</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  From concept to completion, we provide end-to-end interior design solutions tailored to your specific needs.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Process Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Our Design Process</h2>
              <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
                We follow a structured approach to ensure exceptional results for every project.
              </p>
            </div>
            
            <div className="relative">
              {/* Process content for mobile */}
              <div className="space-y-10 md:hidden">
                {[
                  { step: 1, title: "Consultation", desc: "We begin with a detailed discussion to understand your vision, requirements, and budget constraints." },
                  { step: 2, title: "Concept Development", desc: "Our designers create initial concepts and mood boards based on your preferences and our expertise." },
                  { step: 3, title: "Design Finalization", desc: "We refine the design based on your feedback and finalize all technical drawings and material selections." },
                  { step: 4, title: "Execution", desc: "Our skilled team brings the design to life with precision and attention to detail." },
                  { step: 5, title: "Final Walkthrough", desc: "We conduct a thorough walkthrough to ensure every detail meets your expectations and our quality standards." }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-blue-800 font-bold">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Process content for desktop */}
              <div className="hidden md:block">
                {/* Process line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
                
                <div className="space-y-12 lg:space-y-0">
                  {/* Step 1 */}
                  <div className="lg:flex lg:items-center">
                    <div className="lg:w-1/2 mb-6 lg:mb-0 lg:pr-8 lg:text-right">
                      <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto lg:ml-auto lg:mr-0 mb-4">
                        <span className="text-blue-800 font-bold">1</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Consultation</h3>
                      <p className="text-gray-600">
                        We begin with a detailed discussion to understand your vision, requirements, and budget constraints.
                      </p>
                    </div>
                    <div className="lg:w-1/2 lg:pl-8"></div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="lg:flex lg:items-center">
                    <div className="lg:w-1/2 lg:pr-8 lg:text-right order-2 lg:order-1"></div>
                    <div className="lg:w-1/2 mb-6 lg:mb-0 lg:pl-8 order-1 lg:order-2">
                      <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto lg:mr-auto lg:ml-0 mb-4">
                        <span className="text-blue-800 font-bold">2</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Concept Development</h3>
                      <p className="text-gray-600">
                        Our designers create initial concepts and mood boards based on your preferences and our expertise.
                      </p>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="lg:flex lg:items-center">
                    <div className="lg:w-1/2 mb-6 lg:mb-0 lg:pr-8 lg:text-right">
                      <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto lg:ml-auto lg:mr-0 mb-4">
                        <span className="text-blue-800 font-bold">3</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Design Finalization</h3>
                      <p className="text-gray-600">
                        We refine the design based on your feedback and finalize all technical drawings and material selections.
                      </p>
                    </div>
                    <div className="lg:w-1/2 lg:pl-8"></div>
                  </div>
                  
                  {/* Step 4 */}
                  <div className="lg:flex lg:items-center">
                    <div className="lg:w-1/2 lg:pr-8 lg:text-right order-2 lg:order-1"></div>
                    <div className="lg:w-1/2 mb-6 lg:mb-0 lg:pl-8 order-1 lg:order-2">
                      <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto lg:mr-auto lg:ml-0 mb-4">
                        <span className="text-blue-800 font-bold">4</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Execution</h3>
                      <p className="text-gray-600">
                        Our skilled team brings the design to life with precision and attention to detail.
                      </p>
                    </div>
                  </div>
                  
                  {/* Step 5 */}
                  <div className="lg:flex lg:items-center">
                    <div className="lg:w-1/2 mb-6 lg:mb-0 lg:pr-8 lg:text-right">
                      <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto lg:ml-auto lg:mr-0 mb-4">
                        <span className="text-blue-800 font-bold">5</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Final Walkthrough</h3>
                      <p className="text-gray-600">
                        We conduct a thorough walkthrough to ensure every detail meets your expectations and our quality standards.
                      </p>
                    </div>
                    <div className="lg:w-1/2 lg:pl-8"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default AboutPage;