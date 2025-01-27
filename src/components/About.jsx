import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=1000", // Extended scroll area for a more immersive experience
        scrub: 2, // Increased scrub duration for smoother control
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: "1%", // Start with a smooth circular transition
      duration: 3, // Extended for a more gradual effect
      ease: "expo.inOut", // Easing with a professional touch
    })
    .to(".mask-clip-path", {
      borderRadius: 0, // Morph to full-screen view
      duration: 2, // Additional smooth transition
      ease: "expo.inOut",
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      {/* Section Header */}
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Eleven Interior
        </p>

        {/* Animated Title */}
        <AnimatedTitle
          title="E<b>l</b>evate Your Space with <br /> ELEVEN INTERIOR  <b>W</b>ORLD"
          containerClass="mt-5 !text-black text-center"
        />

        {/* Subtext */}
        <div className="about-subtext">
          <p>Ayaan Siddique Founder</p>
          <p className="text-gray-500">15 Years Of Experience</p>
        </div>
      </div>

      {/* Animated Clip Section */}
      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image relative overflow-hidden">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;