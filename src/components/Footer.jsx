import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaMapPin, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "https://facebook.com", icon: <FaFacebook />, label: "Facebook" },
    { href: "https://instagram.com", icon: <FaInstagram />, label: "Instagram" },
    { href: "https://twitter.com", icon: <FaTwitter />, label: "Twitter" },
    { href: "https://linkedin.com", icon: <FaLinkedin />, label: "LinkedIn" },
    { href: "https://youtube.com", icon: <FaYoutube />, label: "YouTube" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Services", path: "/#features" },
    { name: "Gallery", path: "/#gallery" },
    { name: "Contact", path: "/contact" },
    { name: "Inquiry", path: "/inquiry" },
  ];

  const services = [
    "Residential Interior Design",
    "Commercial Interior Design",
    "Office Space Design",
    "Restaurant Design",
    "Retail Store Design",
    "Consultation Services"
  ];

  return (
    <footer className="w-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/img/logo1.png" alt="Eleven Interior" className="w-10 h-10 rounded-full" />
              <h3 className="text-2xl font-bold text-white">ELEVEN INTERIOR</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Creating timeless spaces that blend style, comfort, and functionality. 
              We transform your vision into reality with expert interior design services.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-violet-500 transition-all duration-300 hover:scale-110"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-violet-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapPin className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  123 Main Street, City, Country
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">
                  +123 456 7890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <a href="mailto:info@eleveninteriorworld.com" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">
                  info@eleveninteriorworld.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <FaClock className="w-4 h-4 text-violet-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Mon - Fri: 9 AM - 6 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm text-center md:text-left">
              © {currentYear} ELEVEN INTERIOR. All rights reserved. | Powered by sksohel
            </p>
            <div className="flex space-x-6">
              <a href="#privacy-policy" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#terms-of-service" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#cookie-policy" className="text-gray-300 hover:text-violet-400 transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
