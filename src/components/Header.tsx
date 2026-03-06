import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/689a4538af6a32db41f465eb.webp"
              alt="Form4Design Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-300 hover:text-yellow-400 transition-colors relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#gallery" className="text-gray-300 hover:text-orange-400 transition-colors relative group">
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#about" className="text-gray-300 hover:text-teal-400 transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <a href="tel:2134443676" className="flex items-center hover:text-yellow-400 transition-colors">
                <Phone className="w-4 h-4 mr-1" />
                213.444.FORM
              </a>
              <a href="mailto:info@form4design.com" className="flex items-center hover:text-orange-400 transition-colors">
                <Mail className="w-4 h-4 mr-1" />
                info@form4design.com
              </a>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700/30">
            <div className="flex flex-col space-y-4">
              <a
                href="#services"
                className="text-gray-300 hover:text-yellow-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#gallery"
                className="text-gray-300 hover:text-orange-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-teal-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="pt-4 border-t border-slate-700/30">
                <a href="tel:2134443676" className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors mb-2">
                  <Phone className="w-4 h-4 mr-2" />
                  213.444.FORM
                </a>
                <a href="mailto:info@form4design.com" className="flex items-center text-gray-400 hover:text-orange-400 transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  info@form4design.com
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;