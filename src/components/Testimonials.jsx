import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TestimonialCard = ({ name, role, content, rating, image }) => (
  <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 group">
    <div className="flex items-center mb-6">
      <img 
        src={image} 
        alt={name}
        className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-violet-400"
      />
      <div>
        <h4 className="text-white font-semibold text-lg">{name}</h4>
        <p className="text-violet-300 text-sm">{role}</p>
      </div>
    </div>
    
    <div className="flex mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    
    <p className="text-gray-300 leading-relaxed italic">"{content}"</p>
  </div>
);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    // Animate title
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content: "Eleven Interior transformed our living space beyond our expectations. Their attention to detail and creative vision made our house feel like a luxury home. Highly recommended!",
      rating: 5,
      image: "/img/gallery-1.webp"
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      content: "The team at Eleven Interior understood our vision perfectly. They delivered a modern, functional office space that impresses our clients every day. Professional and innovative!",
      rating: 5,
      image: "/img/gallery-2.webp"
    },
    {
      name: "Emily Rodriguez",
      role: "Interior Designer",
      content: "Working with Eleven Interior was a dream collaboration. Their expertise in luxury design and commitment to quality is unmatched. They truly elevate every project they touch.",
      rating: 5,
      image: "/img/gallery-3.webp"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-violet-100 via-purple-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <p className="font-general text-sm uppercase text-violet-600 mb-4 tracking-wider">
            What Our Clients Say
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-6">
            Client <span className="text-violet-600">Testimonials</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-700 text-lg leading-relaxed">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience with Eleven Interior.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: "500+", label: "Projects Completed" },
            { number: "15+", label: "Years Experience" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "50+", label: "Awards Won" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-violet-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-700 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;