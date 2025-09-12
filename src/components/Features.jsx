import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const calculateTilt = (x, y) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (x - left) / width;
    const relativeY = (y - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    return `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
  };

  const handleMouseMove = (event) => {
    const newTransform = calculateTilt(event.clientX, event.clientY);
    setTransformStyle(newTransform);
  };

  const handleTouchMove = (event) => {
    if (event.touches.length === 0) return;
    const touch = event.touches[0];
    const newTransform = calculateTilt(touch.clientX, touch.clientY);
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => setTransformStyle("");
  const handleTouchEnd = () => setTransformStyle("");

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleTouchEnd}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const videoRef = useRef(null);
  const hoverButtonRef = useRef(null);
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setHoverOpacity(1);
    if (videoRef.current) videoRef.current.play(); // Start video on hover
  };

  const handleMouseMove = (event) => {
    if (hoverButtonRef.current) {
      const rect = hoverButtonRef.current.getBoundingClientRect();
      setCursorPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoverOpacity(0);
    if (videoRef.current) videoRef.current.pause(); // Pause video on mouse leave
  };

  const handleTouchStart = (event) => {
    if (videoRef.current) videoRef.current.play(); // Start video on touch
    if (hoverButtonRef.current && event.touches.length) {
      const rect = hoverButtonRef.current.getBoundingClientRect();
      const touch = event.touches[0];
      setCursorPosition({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
      setHoverOpacity(1);
    }
  };

  const handleTouchMove = (event) => {
    if (hoverButtonRef.current && event.touches.length) {
      const rect = hoverButtonRef.current.getBoundingClientRect();
      const touch = event.touches[0];
      setCursorPosition({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    }
  };

  const handleTouchEnd = () => {
    if (videoRef.current) videoRef.current.pause(); // Pause video when touch ends
    setHoverOpacity(0);
  };

  return (
    <div
      className="relative size-full"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            className="relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white"
            style={{
              position: "relative",
              zIndex: 1,
              background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(101, 111, 226, 0.53), rgba(0, 0, 0, 0.15))`,
              opacity: hoverOpacity,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">Interior Design</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52 relative overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]"></div>
    
    <div className="container mx-auto px-3 md:px-10 relative z-10">
      <div className="px-5 py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="font-circular-web text-lg text-violet-400 mb-4 tracking-wider">
            ELEVEN INTERIOR WORLD
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-violet-400">Design</span> Philosophy
          </h2>
          <p className="max-w-2xl mx-auto font-circular-web text-lg text-gray-300 leading-relaxed">
            Transforming spaces with bespoke interior designs that blend style,
            comfort, and functionality. Let us bring your dream spaces to life!
          </p>
        </div>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4"
          title={
            <>
              luxu<b>r</b>y
            </>
          }
          description="Experience the Art of Luxury – Redefining Interiors with Elegance and Precision. Eleven Interiors – Where Dreams Turn Into Spaces."
          isComingSoon
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <>
                bedro<b>o</b>m
              </>
            }
            description="Dream. Relax. Repeat – Crafted Elegance by Eleven Interiors."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
                bedro<b>o</b>m
              </>
            }
            description="Your Personal Sanctuary, Designed with Perfection – Eleven Interiors."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                Mode<b>r</b>n desi<b>g</b>n
              </>
            }
            description="Transform Your Home Into a Modern Masterpiece – Eleven Interiors."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-gray-200 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              Stunning <b>Interior</b> Designs, <b>Coming Soon</b>.
            </h1>
            <TiLocationArrow className="m-5 scale-[5] self-end text-violet-400" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/feature-5.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
