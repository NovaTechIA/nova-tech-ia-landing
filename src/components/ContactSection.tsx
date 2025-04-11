
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      toast({
        title: "Mensaje enviado",
        description: "Nos pondremos en contacto contigo pronto.",
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div 
        ref={sectionRef}
        className="container mx-auto px-4 section-reveal"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-nova-blue mb-4">Contáctanos</h2>
          <div className="w-20 h-1 bg-nova-gold mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            ¿Listo para transformar tu negocio con inteligencia artificial? Contáctanos hoy mismo 
            y descubre cómo podemos ayudarte a alcanzar tus objetivos.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nova-gold/50 focus:border-nova-gold"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nova-gold/50 focus:border-nova-gold"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nova-gold/50 focus:border-nova-gold"
                  placeholder="¿Cómo podemos ayudarte?"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-hover-effect px-6 py-3 bg-nova-blue text-white font-semibold rounded-lg shadow-md hover:bg-nova-lightblue disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
          
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-nova-blue mb-6">Información de Contacto</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail size={24} className="text-nova-gold mr-4 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <a href="mailto:info.novatech.ia@gmail.com" className="text-gray-600 hover:text-nova-blue">
                      info.novatech.ia@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone size={24} className="text-nova-gold mr-4 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">Teléfono</h4>
                    <a href="tel:+59897015182" className="text-gray-600 hover:text-nova-blue">
                      +598 97015182
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar size={24} className="text-nova-gold mr-4 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">Agenda una llamada</h4>
                    <p className="text-gray-600 mb-2">
                      Reserva una consulta gratuita de 30 minutos con nuestros expertos.
                    </p>
                    {/* Placeholder for Calendly */}
                    <div className="mt-4 border-2 border-gray-200 border-dashed rounded-lg p-6 text-center bg-gray-50">
                      <p className="text-gray-500">Aquí iría el iframe de Calendly</p>
                      <button className="mt-2 text-nova-blue hover:text-nova-gold font-medium">
                        Agendar ahora
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
