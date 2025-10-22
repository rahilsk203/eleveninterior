import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO"; // Import SEO component

gsap.registerPlugin(ScrollTrigger);

const TestimonialCard = ({ name, role, content, rating, image }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 group">
    <div className="flex items-center mb-6">
      <img 
        src={image} 
        alt={name}
        className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-violet-400"
      />
      <div>
        <h4 className="text-gray-900 font-semibold text-lg">{name}</h4>
        <p className="text-violet-600 text-sm">{role}</p>
      </div>
    </div>
    
    <div className="flex mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    
    <p className="text-gray-700 leading-relaxed italic">"{content}"</p>
  </div>
);

const TestimonialsPage = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    // Animate title
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content: "Eleven Interior transformed our living space beyond our expectations. Their attention to detail and creative vision made our house feel like a luxury home. Highly recommended!",
      rating: 5,
      image: "/img/gallery-1.webp"
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      content: "The team at Eleven Interior understood our vision perfectly. They delivered a modern, functional office space that impresses our clients every day. Professional and innovative!",
      rating: 5,
      image: "/img/gallery-2.webp"
    },
    {
      name: "Emily Rodriguez",
      role: "Interior Designer",
      content: "Working with Eleven Interior was a dream collaboration. Their expertise in luxury design and commitment to quality is unmatched. They truly elevate every project they touch.",
      rating: 5,
      image: "/img/gallery-3.webp"
    },
    {
      name: "David Wilson",
      role: "Restaurant Owner",
      content: "Our restaurant's interior design by Eleven Interior has been a game-changer. Customers constantly compliment the ambiance, and it's helped boost our business significantly.",
      rating: 5,
      image: "/img/gallery-4.webp"
    },
    {
      name: "Priya Sharma",
      role: "Architect",
      content: "Eleven Interior's attention to detail and innovative approach to space planning made our office renovation a huge success. They understood our needs and delivered beyond expectations.",
      rating: 5,
      image: "/img/gallery-5.webp"
    },
    {
      name: "Robert Taylor",
      role: "Hotel Manager",
      content: "The luxury suite renovations by Eleven Interior have received rave reviews from our guests. Their ability to blend elegance with functionality is truly exceptional.",
      rating: 5,
      image: "/img/gallery-6.webp"
    }
  ];

  // Structured data for testimonials page
  const testimonialsStructuredData = {
    "@context": "https://schema.org",
    "@type": "Review",
    "name": "Client Testimonials - Eleven Interior World",
    "description": "Read what our satisfied clients have to say about their experience with Eleven Interior World's premium interior design services",
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
          "name": "Testimonials",
          "item": typeof window !== 'undefined' ? window.location.href : ''
        }
      ]
    },
    "review": testimonials.map((testimonial, index) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": testimonial.name
      },
      "reviewBody": testimonial.content,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": testimonial.rating,
        "bestRating": "5"
      }
    }))
  };

  return (
    <>
      <SEO
        title="Client Testimonials - Eleven Interior World"
        description="Read what our satisfied clients have to say about their experience with Eleven Interior World's premium interior design services for residential and commercial spaces"
        keywords="interior design testimonials, client reviews, luxury design reviews, residential design testimonials, commercial design reviews"
        ogTitle="Client Testimonials - Eleven Interior World"
        ogDescription="Read what our satisfied clients have to say about Eleven Interior World"
        ogImage="/img/og-testimonials.jpg"
        ogUrl="/testimonials"
        canonical="/testimonials"
        structuredData={testimonialsStructuredData}
      />
      <div className="min-h-screen w-screen bg-white">
        <Navbar />
        
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container relative mx-auto px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
              Client <span className="text-yellow-300">Testimonials</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-violet-100">
              Don't just take our word for it. Here's what our satisfied clients have to say about their experience with Eleven Interior World.
            </p>
          </div>
        </div>

        <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div ref={titleRef} className="text-center mb-16">
              <p className="font-general text-sm uppercase text-violet-600 mb-4 tracking-wider">
                What Our Clients Say
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Client <span className="text-blue-600">Testimonials</span>
              </h2>
              <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
                We take pride in delivering exceptional interior design solutions. Here's what our valued clients have to say about their experience with us.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  ref={el => cardsRef.current[index] = el}
                >
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "500+", label: "Projects Completed" },
                { number: "15+", label: "Years Experience" },
                { number: "98%", label: "Client Satisfaction" },
                { number: "50+", label: "Awards Won" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-700 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default TestimonialsPage;