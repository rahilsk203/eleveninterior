import { useState, useEffect } from "react";
   import { FaArrowUp } from "react-icons/fa";

   const ScrollToTop = () => {
     const [isVisible, setIsVisible] = useState(false);

     const toggleVisibility = () => {
       if (window.pageYOffset > 300) {
         setIsVisible(true);
       } else {
         setIsVisible(false);
       }
     };

     const scrollToTop = () => {
       window.scrollTo({
         top: 0,
         behavior: "smooth",
       });
     };

     useEffect(() => {
       window.addEventListener("scroll", toggleVisibility);
       return () => window.removeEventListener("scroll", toggleVisibility);
     }, []);

     return (
       <div className="fixed bottom-8 right-8 z-50">
         {isVisible && (
           <button
             onClick={scrollToTop}
             className="p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors"
           >
             <FaArrowUp className="text-xl" />
           </button>
         )}
       </div>
     );
   };

   export default ScrollToTop;