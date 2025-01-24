import gsap from "gsap"; // GSAP for animations
import { useGSAP } from "@gsap/react"; // React hook for GSAP
import { ScrollTrigger } from "gsap/all"; // GSAP ScrollTrigger plugin
import { TiLocationArrow } from "react-icons/ti"; // Arrow icon for the button
import { useEffect, useRef, useState } from "react"; // React hooks

import Button from "./Button"; // Custom Button component
import VideoPreview from "./VideoPreview"; // Custom VideoPreview component

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // State to track the current video index
  const [currentIndex, setCurrentIndex] = useState(1);

  // State to track if the user has clicked on the mini video
  const [hasClicked, setHasClicked] = useState(false);

  // State to track loading status of videos
  const [loading, setLoading] = useState(true);

  // State to track the number of videos loaded
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4; // Total number of videos
  const nextVdRef = useRef(null); // Ref for the next video element

  // Function to handle video load event
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  // Effect to check if all videos are loaded
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false); // Set loading to false once all videos are loaded
    }
  }, [loadedVideos]);

  // Function to handle mini video click
  const handleMiniVdClick = () => {
    setHasClicked(true); // Set hasClicked to true
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1); // Update currentIndex
  };

  // GSAP animation for video transition
  useGSAP(
    () => {
      if (hasClicked) {
        // Show the next video
        gsap.set("#next-video", { visibility: "visible" });

        // Animate the next video to full size
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1.2,
          ease: "power3.out",
          onStart: () => nextVdRef.current.play(), // Play the video when the animation starts
        });

        // Animate the current video to disappear
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power3.out",
        });
      }
    },
    {
      dependencies: [currentIndex], // Re-run animation when currentIndex changes
      revertOnUpdate: true, // Revert animations on component update
    }
  );

  // GSAP animation for the video frame
  useGSAP(() => {
    // Set initial clip-path and border-radius for the video frame
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });

    // Animate the video frame to full size
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power2.inOut",
      duration: 2,
      scrollTrigger: {
        trigger: "#video-frame", // Trigger animation when the video frame is in view
        start: "center center", // Start animation when the center of the video frame is in the center of the viewport
        end: "bottom center", // End animation when the bottom of the video frame is in the center of the viewport
        scrub: 0.5, // Smoothly scrub through the animation
      },
    });
  });

  // Function to get the video source based on the index
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Loading spinner */}
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-100">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Video frame */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          {/* Mini video preview */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={nextVdRef}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad}
                />
              </div>
            </VideoPreview>
          </div>

          {/* Next video */}
          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          {/* Main background video */}
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        {/* Heading at the bottom right */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          EL<b>EVEN</b>
          <span className="block">
            <b>INTERIOR</b>
          </span>
        </h1>

        {/* Content overlay */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              Eleva<b>t</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              At Eleven Interior World, we craft stunning interiors tailored to
              your vision. From luxurious homes to chic commercial spaces, our
              designs combine functionality with style to create spaces you'll
              love. Let’s bring your dream space to life—where creativity meets
              comfort.
            </p>

            {/* Button with arrow icon */}
            <Button
              id="watch-trailer"
              title="Enter Eleven"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      {/* Heading at the bottom right (outside the video frame) */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        EL<b>EVEN</b>
        <span className="block">
          <b>INTERIOR</b>
        </span>
      </h1>
    </div>
  );
};

export default Hero;