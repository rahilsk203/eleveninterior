import React, { useState, useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { imageService } from "../services/imageService"; // Import image service for backend integration

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} alt="Decorative" />
  </div>
);

const Contact = () => {
  const navigate = useNavigate();
  const [contactImages, setContactImages] = useState([]); // State for backend images
  const [swordmanImages, setSwordmanImages] = useState([]); // State for swordman images
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch contact and swordman images from backend on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const contactImgs = await imageService.getContactImages();
        const swordmanImgs = await imageService.getSwordmanImages();
        setContactImages(contactImgs);
        setSwordmanImages(swordmanImgs);
        console.log('Fetched contact images from backend:', contactImgs);
        console.log('Fetched swordman images from backend:', swordmanImgs);
      } catch (error) {
        console.error('Failed to fetch images from backend:', error);
        // Will use fallback images
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
    
    // Prefetch images for other sections
    imageService.prefetchImages(['about', 'gallery']);
  }, []);

  // Function to get contact image source with fallback
  const getContactImageSrc = (imageIndex) => {
    if (contactImages.length > imageIndex) {
      // Get optimized URL for medium quality from backend
      const imageUrl = imageService.getOptimizedImageUrl(contactImages[imageIndex], 'medium');
      if (imageUrl) {
        return imageUrl;
      }
    }
    // Fallback to local images
    const fallbackImages = [
      "/img/contact-1.webp",
      "/img/contact-2.webp"
    ];
    return fallbackImages[imageIndex] || fallbackImages[0];
  };

  // Function to get swordman image source with fallback
  const getSwordmanImageSrc = (imageIndex) => {
    if (swordmanImages.length > imageIndex) {
      // Get optimized URL for medium quality from backend
      const imageUrl = imageService.getOptimizedImageUrl(swordmanImages[imageIndex], 'medium');
      if (imageUrl) {
        return imageUrl;
      }
    }
    // Fallback to local images
    const fallbackImages = [
      "/img/swordman-partial.webp",
      "/img/swordman.webp"
    ];
    return fallbackImages[imageIndex] || fallbackImages[0];
  };

  // Function to navigate to the contact page
  const openContactPage = () => {
    navigate('contact');
  };

  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-gray-800 py-24 text-gray-200 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src={getContactImageSrc(0)} // Use backend image with fallback
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src={getContactImageSrc(1)} // Use backend image with fallback
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src={getSwordmanImageSrc(0)} // Use backend swordman image with fallback
            clipClass="absolute md:scale-125"
          />
          <ImageClipBox
            src={getSwordmanImageSrc(1)} // Use backend swordman image with fallback
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-xs uppercase text-gray-500">
            Discover Interior Mastery
          </p>

          <AnimatedTitle
            title="let&#39;s create <b>timeless</b> spaces <br /> for the <b>modern</b> lifestyle."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-4xl !font-black !leading-[.9] text-gray-900"
          />

          <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
            <Button
              title="contact us"
              method={openContactPage}
              containerClass="cursor-pointer bg-violet-700 text-white"
            />
            <Button
              title="project inquiry"
              method={() => navigate('/inquiry')}
              containerClass="cursor-pointer bg-yellow-400 text-black hover:bg-yellow-500"
            />
          </div>
          
          {/* Display child components here */}
          
        </div>
      </div>
    </div>
  );
};

export default Contact;