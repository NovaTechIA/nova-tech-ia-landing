
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-nova-blue text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold">Nova<span className="text-nova-gold">Tech</span> IA</span>
            <p className="text-white/70 mt-2">Soluciones de inteligencia artificial para el futuro</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-white/70">&copy; {currentYear} Nova Tech IA. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
