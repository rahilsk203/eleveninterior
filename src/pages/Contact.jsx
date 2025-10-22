import React, { useState, useRef, useEffect } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock, FiCheck, FiAlertCircle } from "react-icons/fi";
import AnimatedTitle from "./AnimatedTitle.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import { contactService } from "../services/contactService";
import { prefetchService } from "../services/prefetchService";
import SEO from "../components/SEO"; // Import SEO component

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

// ContactForm Component
const ContactForm = ({ formRef, handleSubmit, name, setName, email, setEmail, number, setNumber, message, setMessage, isSubmitting, submitStatus }) => (
  <form
    ref={formRef}
    onSubmit={handleSubmit}
    className="w-full max-w-2xl bg-black/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300"
  >
    <h3 className="text-2xl font-bold text-white mb-6 text-center">Send us a Message</h3>
    
    {/* Form fields */}
    <div className="mb-6">
      <label htmlFor="name" className="block text-left text-white font-medium mb-2">
        Your Name
      </label>
      <input
        type="text"
        id="name"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder-gray-400 text-white hover:bg-white/15"
        required
      />
    </div>

    <div className="mb-6">
      <label htmlFor="email" className="block text-left text-white font-medium mb-2">
        Your Email (Optional)
      </label>
      <input
        type="email"
        id="email"
        placeholder="john@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder-gray-400 text-white hover:bg-white/15"
      />
    </div>

    <div className="mb-6">
      <label htmlFor="number" className="block text-left text-white font-medium mb-2">
        Your Phone Number
      </label>
      <input
        type="tel"
        id="number"
        placeholder="+123 456 7890"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder-gray-400 text-white hover:bg-white/15"
        required
      />
    </div>

    <div className="mb-6">
      <label htmlFor="message" className="block text-left text-white font-medium mb-2">
        Your Message
      </label>
      <textarea
        id="message"
        placeholder="Write your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder-gray-400 text-white hover:bg-white/15 resize-none"
        rows="5"
        required
      />
    </div>

    {/* Status indicator */}
    {submitStatus && (
      <div className={`mb-4 p-4 rounded-lg flex items-center ${
        submitStatus.type === 'success' 
          ? 'bg-green-500/20 border border-green-500/50' 
          : 'bg-red-500/20 border border-red-500/50'
      }`}>
        {submitStatus.type === 'success' ? (
          <FiCheck className="h-5 w-5 text-green-400 mr-2" />
        ) : (
          <FiAlertCircle className="h-5 w-5 text-red-400 mr-2" />
        )}
        <span className={submitStatus.type === 'success' ? 'text-green-300' : 'text-red-300'}>
          {submitStatus.message}
        </span>
      </div>
    )}

    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full px-6 py-3 rounded-lg transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center gap-2 ${
        isSubmitting 
          ? 'bg-gray-600 cursor-not-allowed' 
          : 'bg-gradient-to-r from-violet-600 to-violet-800 hover:from-violet-700 hover:to-violet-900'
      }`}
    >
      {isSubmitting ? (
        <>
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
          Sending...
        </>
      ) : (
        'Send Message'
      )}
    </button>
  </form>
);

// CompanyInfo Component
const CompanyInfo = ({ companyInfoRef }) => (
  <div
    ref={companyInfoRef}
    className="w-full max-w-2xl bg-black/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300"
  >
    <h3 className="text-2xl font-bold text-white mb-6 text-center">Our Contact Information</h3>
    <div className="space-y-6 text-left">
      {/* Address, Phone, Email, Work Hours */}
      <div className="flex items-start group">
        <a
          href="https://www.google.com/maps?q=123+Main+Street,City,Country"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity group-hover:scale-110 transition-transform"
        >
          <FiMapPin className="text-violet-400 w-6 h-6 mr-4 flex-shrink-0 cursor-pointer" />
        </a>
        <div>
          <span className="text-gray-300 font-medium">Address:</span>
          <span className="text-white block">123 Main Street, City, Country</span>
        </div>
      </div>

      <div className="flex items-start group">
        <a href="tel:+1234567890" className="hover:opacity-80 transition-opacity group-hover:scale-110 transition-transform">
          <FiPhone className="text-violet-400 w-6 h-6 mr-4 flex-shrink-0 cursor-pointer" />
        </a>
        <div>
          <span className="text-gray-300 font-medium">Phone:</span>
          <span className="text-white block">+123 456 7890</span>
        </div>
      </div>

      <div className="flex items-start group">
        <a href="mailto:info@eleveninteriorworld.com" className="hover:opacity-80 transition-opacity group-hover:scale-110 transition-transform">
          <FiMail className="text-violet-400 w-6 h-6 mr-4 flex-shrink-0 cursor-pointer" />
        </a>
        <div>
          <span className="text-gray-300 font-medium">Email:</span>
          <span className="text-white block">info@eleveninteriorworld.com</span>
        </div>
      </div>

      <div className="flex items-start group">
        <FiClock className="text-violet-400 w-6 h-6 mr-4 flex-shrink-0" />
        <div>
          <span className="text-gray-300 font-medium">Work Hours:</span>
          <span className="text-white block">Mon - Fri: 9 AM - 6 PM</span>
        </div>
      </div>
    </div>
  </div>
);

// MapSection Component
const MapSection = ({ mapRef }) => (
  <div
    ref={mapRef}
    className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300"
  >
    <div className="bg-black/90 backdrop-blur-md p-4 border-b border-white/20">
      <h3 className="text-xl font-bold text-white text-center">Find Us Here</h3>
    </div>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d144.9537353153166!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d2a2c0b4a1a4!2s123%20Main%20St%2C%20City%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sus!4v1633039290000!5m2!1sen!2sus"
      width="100%"
      height="400"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      className="w-full"
    ></iframe>
  </div>
);

// Main Contact Component
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [number, setNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const formRef = useRef(null);
  const companyInfoRef = useRef(null);
  const mapRef = useRef(null);
  const animatedTitleRef = useRef(null);

  // Ensure the page scrolls to the top on load
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  // Prefetch contact data when component mounts
  useEffect(() => {
    // Prefetch contact data for better performance
    contactService.prefetchContactData();
    
    // Record navigation for prefetching
    prefetchService.recordNavigation('/contact');
  }, []);

  // GSAP animations
  useGSAP(() => {
    // Animate the "CONTACT US" text
    gsap.from(animatedTitleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: animatedTitleRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        markers: false,
      },
      willChange: "transform, opacity",
    });

    // Animate form, company info, and map
    [formRef.current, companyInfoRef.current, mapRef.current].forEach((ref) => {
      if (ref) {
        gsap.from(ref, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: ref,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            markers: false,
          },
          willChange: "transform, opacity",
        });
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset status
    setSubmitStatus(null);
    setIsSubmitting(true);
    
    try {
      // Prepare contact data
      const contactData = {
        name: name,
        email: email || null, // Optional email
        phone: number,
        message: message
      };
      
      // Submit contact message to backend
      const result = await contactService.submitContactMessage(contactData);
      
      // Show success message
      setSubmitStatus({
        type: 'success',
        message: "Thank you for your message! We'll get back to you soon."
      });
      
      // Reset form after successful submission
      setName("");
      setEmail("");
      setNumber("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting contact message:", error);
      setSubmitStatus({
        type: 'error',
        message: `There was an error submitting your message: ${error.message}. Please try again.`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Structured data for contact page
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Eleven Interior World",
    "description": "Get in touch with Eleven Interior World for premium interior design services for residential and commercial spaces",
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
          "name": "Contact",
          "item": typeof window !== 'undefined' ? window.location.href : ''
        }
      ]
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "Eleven Interior World",
      "url": typeof window !== 'undefined' ? window.location.origin : '',
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+123 456 7890",
        "contactType": "customer service",
        "email": "info@eleveninteriorworld.com",
        "availableLanguage": "en"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Main Street",
        "addressLocality": "City",
        "addressCountry": "Country"
      }
    }
  };

  return (
    <>
      <SEO
        title="Contact Eleven Interior World - Premium Interior Design Services"
        description="Get in touch with Eleven Interior World for premium interior design services for residential and commercial spaces. We're here to help transform your vision into reality."
        keywords="interior design contact, luxury design consultation, residential design, commercial design, design consultation"
        ogTitle="Contact Eleven Interior World"
        ogDescription="Get in touch with us for premium interior design services"
        ogImage="/img/og-contact.jpg"
        ogUrl="/contact"
        canonical="/contact"
        structuredData={contactStructuredData}
      />
      <div className="min-h-screen w-screen overflow-x-hidden bg-violet-100 contact-page">
        {/* Navigation */}
        <NavBar />

        {/* Main Section */}
        <div className="min-h-screen flex flex-col items-center text-center px-4 sm:px-6 pt-20 pb-20">
          {/* Section Header */}
          <div className="relative mb-12 mt-20 sm:mt-36 flex flex-col items-center gap-6 max-w-4xl mx-auto">
            <p className="font-general text-xs uppercase text-gray-500 tracking-wider">
              Get In Touch With Us
            </p>

          {/* Animated "CONTACT US" Text */}
            <div ref={animatedTitleRef} className="text-center">
            <AnimatedTitle
              title="C<b>O</b>NTACT US"
              containerClass="font-extrabold hero-heading-big px-5 !text-black"
            />
          </div>

            <h2 className="font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-black leading-tight">
            Feel Free To Reach Us!
          </h2>
            <p className="text-gray-700 mt-4 text-base sm:text-lg max-w-2xl leading-relaxed">
              Have a project in mind or need expert advice? Fill out the form below, and our team will get back to you promptly! Let's create something amazing together.
          </p>
          </div>

          {/* Contact Form and Info */}
          <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto space-y-8">
          <ContactForm
            formRef={formRef}
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            number={number}
            setNumber={setNumber}
            message={message}
            setMessage={setMessage}
            isSubmitting={isSubmitting}
            submitStatus={submitStatus}
          />
          <CompanyInfo companyInfoRef={companyInfoRef} />
          <MapSection mapRef={mapRef} />
        </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}

export default Contact;