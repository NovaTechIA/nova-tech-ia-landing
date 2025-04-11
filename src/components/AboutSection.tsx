
import React, { useEffect, useRef } from 'react';
import { Bot, Workflow, Lightbulb } from 'lucide-react';

const AboutSection = () => {
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

  const features = [
    {
      icon: <Bot size={48} className="mb-4 text-nova-gold" />,
      title: "Agentes Inteligentes",
      description: "Creamos asistentes de IA personalizados que automatizan tareas complejas y mejoran la experiencia de tus clientes."
    },
    {
      icon: <Workflow size={48} className="mb-4 text-nova-gold" />,
      title: "Automatización con n8n",
      description: "Optimizamos tus flujos de trabajo con automatizaciones que conectan tus herramientas y sistemas existentes."
    },
    {
      icon: <Lightbulb size={48} className="mb-4 text-nova-gold" />,
      title: "Consultoría en IA",
      description: "Te asesoramos sobre las mejores estrategias y herramientas de IA para maximizar el potencial de tu empresa."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 z-0"
        style={{ backgroundImage: "url('/lovable-uploads/1d9e991c-0a4f-4c33-a28c-9448d1fb13a0.png')" }}
      ></div>
      
      <div 
        ref={sectionRef}
        className="container mx-auto px-4 section-reveal relative z-10"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-nova-blue mb-4">Sobre Nosotros</h2>
          <div className="w-20 h-1 bg-nova-gold mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Somos una agencia especializada en transformar negocios a través de la inteligencia artificial. 
            Nuestro enfoque combina innovación tecnológica con un profundo entendimiento de tus necesidades empresariales.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center backdrop-blur-sm bg-white/70"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-nova-blue mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-nova-blue to-nova-lightblue rounded-xl p-8 md:p-12 shadow-lg backdrop-blur-sm">
          <div className="md:flex items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Transformamos datos en decisiones inteligentes
              </h3>
              <p className="text-white/80">
                En Nova Tech IA, nos apasiona ayudar a las empresas a prosperar en la era digital. 
                Nuestro equipo de expertos trabaja incansablemente para desarrollar soluciones de IA 
                que se adapten perfectamente a tus objetivos comerciales, proporcionándote una ventaja competitiva en tu industria.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-40 h-40 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-5xl text-nova-gold">IA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
