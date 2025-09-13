import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti"; // Corrected import
import { Link } from "react-scroll";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import Button from "./Button";

const navItems = ["Home", "About", "Features", "Story", "Testimonials", "Gallery", "Contact", "Inquiry"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  const { y: currentScrollY } = useWindowScroll();

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (item) => {
    closeMobileMenu();
    
    // Handle page navigation
    if (item === "Home") {
      navigate("/");
    } else if (item === "Contact") {
      navigate("/contact");
    } else if (item === "Inquiry") {
      navigate("/inquiry");
    } else if (item === "Gallery") {
      navigate("/gallery");
    } else if (item === "Features") {
      navigate("/features");
    }
    // For other items (About, Story, etc.), they will use scroll navigation
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  useEffect(() => {
    const bars = document.querySelectorAll(".indicator-line");
    if (isIndicatorActive) {
      gsap.to(bars, {
        scaleY: 1.5,
        duration: 0.2,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
      });
    } else {
      gsap.to(bars, {
        scaleY: 1,
        duration: 0.2,
      });
    }
  }, [isIndicatorActive]);

  // Mobile menu animations
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
        
        // Animate menu items
        const menuItems = mobileMenuRef.current.querySelectorAll('.mobile-menu-item');
        gsap.fromTo(
          menuItems,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.1, ease: "power2.out" }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          y: -50,
          duration: 0.2,
          ease: "power2.in"
        });
      }
    }
  }, [isMobileMenuOpen]);

  return (
    <div
      ref={navContainerRef}
      className={clsx(
        "fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6",
        {
          "floating-nav": currentScrollY > 0,
        }
      )}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo and Product Button */}
          <div className="flex items-center gap-7">
            <img src="/img/logo1.png" alt="logo" className="w-10 rounded-full" />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Navigation Links and Audio Button */}
          <div className="flex h-full items-center">
            {/* Navigation Links (Hidden on Mobile) */}
            <div className="hidden md:block">
              {navItems.map((item, index) => {
                // Handle page navigation for specific items
                if (item === "Home" || item === "Contact" || item === "Inquiry" || item === "Gallery" || item === "Features") {
                  return (
                    <button
                      key={index}
                      onClick={() => handleNavigation(item)}
                      className="nav-hover-btn cursor-pointer"
                    >
                      {item}
                    </button>
                  );
                }
                // Handle scroll navigation for section items
                return (
                  <Link
                    key={index}
                    to={item.toLowerCase()}
                    smooth={true}
                    duration={500}
                    className="nav-hover-btn cursor-pointer"
                  >
                    {item}
                  </Link>
                );
              })}
            </div>

            {/* Audio Button (Hidden on Mobile) */}
            <button
              onClick={toggleAudioIndicator}
              className="ml-10 hidden md:flex items-center space-x-0.5 focus:outline-none"
              aria-label={isAudioPlaying ? "Pause audio" : "Play audio"}
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className="indicator-line h-4 w-1 bg-gray-700 transition-transform origin-bottom"
                />
              ))}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden ml-4 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <HiX className="w-6 h-6 text-white" />
              ) : (
                <HiMenuAlt3 className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          
          {/* Mobile Menu */}
          <div
            ref={mobileMenuRef}
            className="absolute top-20 left-4 right-4 bg-black/90 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl"
          >
            {/* Mobile Navigation Links */}
            <div className="space-y-4">
              {navItems.map((item, index) => {
                // Handle page navigation for specific items
                if (item === "Home" || item === "Contact" || item === "Inquiry" || item === "Gallery" || item === "Features") {
                  return (
                    <button
                      key={index}
                      onClick={() => handleNavigation(item)}
                      className="mobile-menu-item block text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-200 border-b border-white/10 last:border-b-0 w-full text-left"
                    >
                      {item}
                    </button>
                  );
                }
                // Handle scroll navigation for section items
                return (
                  <Link
                    key={index}
                    to={item.toLowerCase()}
                    smooth={true}
                    duration={500}
                    onClick={closeMobileMenu}
                    className="mobile-menu-item block text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-200 border-b border-white/10 last:border-b-0"
                  >
                    {item}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Audio Button */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <button
                onClick={toggleAudioIndicator}
                className="mobile-menu-item flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
                aria-label={isAudioPlaying ? "Pause audio" : "Play audio"}
              >
                <span className="text-white font-medium">
                  {isAudioPlaying ? "Pause Audio" : "Play Audio"}
                </span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((bar) => (
                    <div
                      key={bar}
                      className="indicator-line h-4 w-1 bg-white transition-transform origin-bottom"
                    />
                  ))}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;