import React from "react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} alt="Decorative" />
  </div>
);

const Contact = () => {
  const navigate = useNavigate();

  // Function to navigate to the contact page
  const openContactPage = () => {
    navigate('/contact');
  };

  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-gray-800 py-24 text-gray-200 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/swordman-partial.webp"
            clipClass="absolute md:scale-125"
          />
          <ImageClipBox
            src="/img/swordman.webp"
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

          <Button
            title="contact us"
            method={openContactPage}
            containerClass="mt-10 cursor-pointer bg-violet-700 text-white"
          />
          
          {/* Display child components here */}
          
        </div>
      </div>
    </div>
  );
};

export default Contact;