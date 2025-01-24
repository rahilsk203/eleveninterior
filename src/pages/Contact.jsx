import React, { useState, useRef, useEffect } from "react";
import { FiMenu, FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import AnimatedTitle from "./AnimatedTitle.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Footer from "./Footer.jsx";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

// ContactForm Component
const ContactForm = ({ formRef, handleSubmit, name, setName, number, setNumber, message, setMessage }) => (
  <form
    ref={formRef}
    onSubmit={handleSubmit}
    className="w-full max-w-2xl mt-10 bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20 transform hover:scale-105 transition-transform duration-300"
  >
    <div className="mb-6">
      <label htmlFor="name" className="block text-left text-gray-700 font-medium mb-2">
        Your Name
      </label>
      <input
        type="text"
        id="name"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/20 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder-gray-600"
        required
      />
    </div>

    <div className="mb-6">
      <label htmlFor="number" className="block text-left text-gray-700 font-medium mb-2">
        Your Phone Number
      </label>
      <input
        type="tel"
        id="number"
        placeholder="+123 456 7890"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/20 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder-gray-600"
        required
      />
    </div>

    <div className="mb-6">
      <label htmlFor="message" className="block text-left text-gray-700 font-medium mb-2">
        Your Message
      </label>
      <textarea
        id="message"
        placeholder="Write your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/20 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder-gray-600"
        rows="5"
        required
      />
    </div>

    <button
      type="submit"
      className="w-full px-6 py-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-lg hover:from-gray-800 hover:to-black transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
    >
      Submit
    </button>
  </form>
);

// CompanyInfo Component
const CompanyInfo = ({ companyInfoRef }) => (
  <div
    ref={companyInfoRef}
    className="w-full max-w-2xl mt-10 bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20"
  >
    <h3 className="text-2xl font-bold text-black mb-6">Our Contact Information</h3>
    <div className="space-y-4 text-left">
      {/* Address */}
      <div className="flex items-start">
        <a
          href="https://www.google.com/maps?q=123+Main+Street,City,Country"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <FiMapPin className="text-gray-700 w-6 h-6 mr-4 flex-shrink-0 cursor-pointer" />
        </a>
        <div>
          <span className="text-gray-700 font-medium">Address:</span>
          <span className="text-gray-900 block">123 Main Street, City, Country</span>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-start">
        <a href="tel:+1234567890" className="hover:opacity-80 transition-opacity">
          <FiPhone className="text-gray-700 w-6 h-6 mr-4 flex-shrink-0 cursor-pointer" />
        </a>
        <div>
          <span className="text-gray-700 font-medium">Phone:</span>
          <span className="text-gray-900 block">+123 456 7890</span>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-start">
        <a href="mailto:info@eleveninteriorworld.com" className="hover:opacity-80 transition-opacity">
          <FiMail className="text-gray-700 w-6 h-6 mr-4 flex-shrink-0 cursor-pointer" />
        </a>
        <div>
          <span className="text-gray-700 font-medium">Email:</span>
          <span className="text-gray-900 block">info@eleveninteriorworld.com</span>
        </div>
      </div>

      {/* Work Hours */}
      <div className="flex items-start">
        <FiClock className="text-gray-700 w-6 h-6 mr-4 flex-shrink-0" />
        <div>
          <span className="text-gray-700 font-medium">Work Hours:</span>
          <span className="text-gray-900 block">Mon - Fri: 9 AM - 6 PM</span>
        </div>
      </div>
    </div>
  </div>
);

// MapSection Component
const MapSection = ({ mapRef }) => (
  <div
    ref={mapRef}
    className="w-full max-w-2xl mt-10 rounded-2xl overflow-hidden shadow-lg"
  >
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d144.9537353153166!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d2a2c0b4a1a4!2s123%20Main%20St%2C%20City%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sus!4v1633039290000!5m2!1sen!2sus"
      width="100%"
      height="400"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
    ></iframe>
  </div>
);

// Main Contact Component
function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [number, setNumber] = useState("");

  const formRef = useRef(null);
  const companyInfoRef = useRef(null);
  const mapRef = useRef(null);
  const animatedTitleRef = useRef(null);

  // Ensure the page scrolls to the top on load
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
    document.documentElement.style.scrollBehavior = "smooth"; // Enable smooth scrolling
    return () => {
      document.documentElement.style.scrollBehavior = "auto"; // Reset smooth scrolling on unmount
    };
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
        start: "top 80%", // Animation starts when the top of the element is 80% from the top of the viewport
        end: "bottom 20%", // Animation ends when the bottom of the element is 20% from the top of the viewport
        toggleActions: "play none none reverse", // Play animation on enter, reverse on leave
        markers: false, // Disable debug markers
      },
      willChange: "transform, opacity", // Optimize for animations
    });

    // Animate form
    gsap.from(formRef.current, {
      opacity: 0,
      y: 50,
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

    // Animate company info
    gsap.from(companyInfoRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: companyInfoRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        markers: false,
      },
      willChange: "transform, opacity",
    });

    // Animate map
    gsap.from(mapRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: mapRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        markers: false,
      },
      willChange: "transform, opacity",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Contact Form Submission from ${name}`;
    const body = `Name: ${name}%0D%0APhone: ${number}%0D%0AMessage: ${message}`;
    window.location.href = `mailto:info@eleveninteriorworld.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-center px-6 bg-gradient-to-br from-yellow-300 to-yellow-100">
      {/* Header Section */}
      <div className="w-full flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="text-4xl font-bold text-black">E</div>
        <FiMenu className="text-2xl text-black cursor-pointer hover:text-gray-700 transition-colors" />
      </div>

      {/* Main Section */}
      <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto">
        {/* Animated "CONTACT US" Text */}
        <div ref={animatedTitleRef} className="text-center sm:mt-20">
          <AnimatedTitle
            title="C<b>O</b>NTACT US"
            containerClass="font-extrabold hero-heading-big px-5 !text-black"
          />
        </div>

        <h2 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-black">
          Feel Free To Reach Us!
        </h2>
        <p className="text-gray-900 mt-5 text-lg max-w-2xl">
          Have a project in mind or need expert advice? Fill out the form below, and our team will get back to you promptly! Let’s create something amazing together.
        </p>

        <ContactForm
          formRef={formRef}
          handleSubmit={handleSubmit}
          name={name}
          setName={setName}
          number={number}
          setNumber={setNumber}
          message={message}
          setMessage={setMessage}
        />
        <CompanyInfo companyInfoRef={companyInfoRef} />
        <MapSection mapRef={mapRef} />
      </div>
      <Footer />
    </div>
  );
}

export default Contact;