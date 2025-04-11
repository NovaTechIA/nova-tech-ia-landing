
import React, { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';

const ServicesSection = () => {
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

  const services = [
    {
      title: "Desarrollo de Asistentes Virtuales",
      description: "Creamos asistentes de IA personalizados que interactúan con tus clientes, responden preguntas y automatizan procesos de atención al cliente.",
      features: [
        "Chatbots inteligentes para sitios web",
        "Asistentes de voz personalizados",
        "Integración con plataformas existentes",
        "Aprendizaje continuo y mejora automática"
      ]
    },
    {
      title: "Automatización de Procesos",
      description: "Optimizamos tus flujos de trabajo con n8n y otras herramientas para eliminar tareas repetitivas y aumentar la productividad.",
      features: [
        "Diseño de flujos de trabajo automáticos",
        "Integración entre múltiples plataformas",
        "Procesamiento automatizado de documentos",
        "Monitoreo y optimización continua"
      ]
    },
    {
      title: "Análisis Predictivo",
      description: "Utilizamos modelos de IA para analizar datos y predecir tendencias, comportamientos y resultados futuros.",
      features: [
        "Previsión de ventas y demanda",
        "Análisis de comportamiento del cliente",
        "Detección temprana de problemas",
        "Informes visuales personalizados"
      ]
    },
    {
      title: "Consultoría Estratégica en IA",
      description: "Asesoramos a tu empresa sobre las mejores prácticas y tecnologías de IA para maximizar el retorno de inversión.",
      features: [
        "Evaluación de oportunidades de IA",
        "Planificación de implementación",
        "Formación y capacitación a equipos",
        "Asesoramiento en ética de IA"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div 
        ref={sectionRef}
        className="container mx-auto px-4 section-reveal"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-nova-blue mb-4">Nuestros Servicios</h2>
          <div className="w-20 h-1 bg-nova-gold mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Ofrecemos soluciones integrales de inteligencia artificial diseñadas para impulsar 
            la eficiencia, innovación y crecimiento de tu negocio.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-nova-blue mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle size={20} className="text-nova-gold mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="#contact" 
            className="btn-hover-effect inline-block px-8 py-3 bg-nova-blue text-white font-semibold rounded-lg shadow-lg hover:bg-nova-lightblue"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Solicita una consulta gratuita
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
