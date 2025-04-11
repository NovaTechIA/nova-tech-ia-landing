
import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle scroll to About section
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen relative flex items-center justify-center bg-gradient-to-b from-nova-blue to-nova-lightblue"
    >
      <div 
        ref={sectionRef}
        className="container mx-auto px-4 pt-20 section-reveal"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Impulsamos tu negocio con <span className="text-nova-gold">inteligencia artificial</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
              Potencia tu empresa con soluciones de IA personalizadas que transforman datos en decisiones estratégicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToAbout()} 
                className="btn-hover-effect px-8 py-3 bg-nova-gold text-nova-blue font-semibold rounded-lg shadow-lg hover:bg-nova-lightgold"
              >
                Conoce más
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-hover-effect px-8 py-3 bg-transparent border-2 border-nova-gold text-nova-gold font-semibold rounded-lg hover:bg-nova-gold/10"
              >
                Contáctanos
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full bg-nova-gold/20 animate-pulse"></div>
              <div className="absolute inset-4 rounded-full bg-nova-blue flex items-center justify-center">
                <div className="text-center">
                  <div className="text-9xl text-nova-gold opacity-20">AI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={scrollToAbout}
          className="text-white/70 hover:text-nova-gold transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown size={30} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
