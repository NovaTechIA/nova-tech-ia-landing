
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-nova-blue/95 shadow-md backdrop-blur-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#home" className="flex items-center">
            <span className="text-2xl font-bold text-white">Nova<span className="text-nova-gold">Tech</span> IA</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {['home', 'about', 'services', 'contact'].map((section) => (
            <button 
              key={section}
              onClick={() => scrollToSection(section)}
              className="text-white/90 hover:text-nova-gold font-medium transition-colors capitalize"
            >
              {section === 'home' ? 'Inicio' : 
               section === 'about' ? 'Sobre Nosotros' : 
               section === 'services' ? 'Servicios' : 'Contacto'}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-nova-blue/95 backdrop-blur-sm">
          <div className="px-4 py-4 space-y-4">
            {['home', 'about', 'services', 'contact'].map((section) => (
              <button 
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left py-2 text-white/90 hover:text-nova-gold font-medium transition-colors capitalize"
              >
                {section === 'home' ? 'Inicio' : 
                 section === 'about' ? 'Sobre Nosotros' : 
                 section === 'services' ? 'Servicios' : 'Contacto'}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
