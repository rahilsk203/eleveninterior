import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
  const statsRef = useRef(null);

  const stats = [
    {
      number: "500+",
      label: "Projects Completed",
      description: "Successfully delivered interior design projects"
    },
    {
      number: "15+",
      label: "Years Experience",
      description: "Professional interior design expertise"
    },
    {
      number: "98%",
      label: "Client Satisfaction",
      description: "Happy clients who recommend our services"
    },
    {
      number: "50+",
      label: "Awards Won",
      description: "Recognition for outstanding design excellence"
    }
  ];

  useGSAP(() => {
    gsap.fromTo(statsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate numbers
    stats.forEach((_, index) => {
      gsap.fromTo(`.stat-number-${index}`,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={statsRef} className="text-center mb-16">
          <p className="font-general text-sm uppercase text-violet-400 mb-4 tracking-wider">
            Our Achievements
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Numbers That <span className="text-violet-400">Speak</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Our track record speaks for itself. Here are some impressive numbers that showcase our commitment to excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-violet-400/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className={`stat-number-${index} text-4xl md:text-5xl font-bold text-violet-400 mb-4`}>
                  {stat.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-400 text-sm">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
