import React, { useState, useRef, useEffect } from "react";
import { FiMapPin, FiPhone, FiMail, FiUser, FiNavigation, FiCheck } from "react-icons/fi";
import AnimatedTitle from "./AnimatedTitle.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Footer from "./Footer.jsx";
import NavBar from "../components/Navbar";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Inquiry Form Component
const InquiryForm = ({ formRef, handleSubmit, formData, setFormData, isSubmitting }) => {
  const [locationPermission, setLocationPermission] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Reverse geocoding to get address
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
          .then(response => response.json())
          .then(data => {
            const address = `${data.city || ''}, ${data.principalSubdivision || ''}, ${data.countryName || ''}`.replace(/^,\s*|,\s*$/g, '');
            setFormData(prev => ({
              ...prev,
              location: address
            }));
            setLocationPermission(true);
            setIsGettingLocation(false);
          })
          .catch(error => {
            console.error('Error getting address:', error);
            setFormData(prev => ({
              ...prev,
              location: `${latitude}, ${longitude}`
            }));
            setIsGettingLocation(false);
          });
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please enter it manually.');
        setIsGettingLocation(false);
      }
    );
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-black/90 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300"
    >
      <h3 className="text-xl font-bold text-white mb-4 text-center">Project Inquiry Form</h3>
      
      {/* Name Field */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-left text-white font-medium mb-1">
          <FiUser className="inline w-4 h-4 mr-2" />
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-3 py-2 rounded-lg border border-white/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder-gray-400 text-white hover:bg-white/15"
          required
        />
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-left text-white font-medium mb-1">
          <FiMail className="inline w-4 h-4 mr-2" />
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-3 py-2 rounded-lg border border-white/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder-gray-400 text-white hover:bg-white/15"
          required
        />
      </div>

      {/* Phone Field */}
      <div className="mb-4">
        <label htmlFor="phone" className="block text-left text-white font-medium mb-1">
          <FiPhone className="inline w-4 h-4 mr-2" />
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full px-3 py-2 rounded-lg border border-white/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder-gray-400 text-white hover:bg-white/15"
          required
        />
      </div>

      {/* Location Field */}
      <div className="mb-4">
        <label htmlFor="location" className="block text-left text-white font-medium mb-1">
          <FiMapPin className="inline w-4 h-4 mr-2" />
          Location *
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="location"
            placeholder="Enter your location or use current location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="flex-1 px-3 py-2 rounded-lg border border-white/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder-gray-400 text-white hover:bg-white/15"
            required
          />
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
            className="px-3 py-2 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-600 text-white rounded-lg transition-all duration-300 flex items-center gap-1 min-w-fit"
          >
            {isGettingLocation ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FiNavigation className="w-4 h-4" />
            )}
            <span className="hidden sm:inline text-sm">
              {isGettingLocation ? 'Getting...' : 'Current'}
            </span>
          </button>
        </div>
        {locationPermission && (
          <p className="text-green-400 text-xs mt-1 flex items-center">
            <FiCheck className="w-3 h-3 mr-1" />
            Location detected successfully
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="mb-4">
        <label htmlFor="message" className="block text-left text-white font-medium mb-1">
          Project Description
        </label>
        <textarea
          id="message"
          placeholder="Tell us about your project, requirements, and vision..."
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className="w-full px-3 py-2 rounded-lg border border-white/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder-gray-400 text-white hover:bg-white/15 resize-none"
          rows="3"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-800 text-white rounded-lg hover:from-violet-700 hover:to-violet-900 disabled:from-gray-600 disabled:to-gray-700 transition-all font-semibold text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Submitting...
          </>
        ) : (
          'Submit Inquiry'
        )}
      </button>
    </form>
  );
};

// Main Inquiry Component
function Inquiry() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formRef = useRef(null);
  const animatedTitleRef = useRef(null);

  // Ensure the page scrolls to the top on load
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  // GSAP animations
  useGSAP(() => {
    // Animate the title
    gsap.fromTo(animatedTitleRef.current, {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
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

    // Animate form
    gsap.fromTo(formRef.current, {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        markers: false,
      },
      willChange: "transform, opacity",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      setIsSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          location: '',
          message: ''
        });
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen w-screen overflow-x-hidden bg-violet-100">
        <NavBar />
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-black mb-4">Thank You!</h2>
            <p className="text-gray-700 text-lg mb-6">
              Your inquiry has been submitted successfully. Our team will review your project details and get back to you within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-violet-600 to-violet-800 text-white px-8 py-3 rounded-lg hover:from-violet-700 hover:to-violet-900 transition-all font-semibold"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-violet-100">
      {/* Navigation */}
      <NavBar />
      
      {/* Main Section */}
      <div className="min-h-screen flex flex-col items-center text-center px-4 sm:px-6 pt-16 pb-8">
        {/* Section Header */}
        <div className="relative mb-8 mt-8 flex flex-col items-center gap-4 max-w-4xl mx-auto">
          <p className="font-general text-xs uppercase text-gray-500 tracking-wider">
            Start Your Project
          </p>

          {/* Animated Title */}
          <div ref={animatedTitleRef} className="text-center">
            <AnimatedTitle
              title="PROJECT <b>INQUIRY</b>"
              containerClass="font-extrabold text-4xl sm:text-5xl md:text-6xl px-5 !text-black"
            />
          </div>

          <h2 className="font-bold text-xl sm:text-2xl md:text-3xl text-black leading-tight">
            Let's Create Something Amazing Together!
          </h2>
          <p className="text-gray-700 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
            Tell us about your vision and we'll help bring it to life.
          </p>
        </div>

        {/* Inquiry Form */}
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
          <InquiryForm
            formRef={formRef}
            handleSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Inquiry;
