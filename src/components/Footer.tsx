import React from 'react';
import { Phone, Mail, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 border-t border-slate-700/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/689a4538af6a32db41f465eb.webp"
                alt="Form4Design Logo"
                className="h-8 w-auto mr-3"
              />
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Professional trade show management services with over 30 years of experience.
              Your success is our mission.
            </p>
            <div className="flex space-x-4">
              <a
                href="tel:2134443676"
                className="w-10 h-10 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-lg flex items-center justify-center text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@form4design.com"
                className="w-10 h-10 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-lg flex items-center justify-center text-gray-300 hover:text-orange-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://form4design.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-lg flex items-center justify-center text-gray-300 hover:text-teal-400 transition-colors"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#services" className="hover:text-yellow-400 transition-colors">Exhibit Design & Build</a></li>
              <li><a href="#services" className="hover:text-orange-400 transition-colors">Graphics Solutions</a></li>
              <li><a href="#gallery" className="hover:text-teal-400 transition-colors">Project Gallery</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">I&D Services</a></li>
              <li><a href="#services" className="hover:text-purple-400 transition-colors">Freight Logistics</a></li>
              <li><a href="#services" className="hover:text-pink-400 transition-colors">Storage Solutions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-yellow-400" />
                <a href="tel:2134443676" className="hover:text-yellow-400 transition-colors">
                  213.444.FORM
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-orange-400" />
                <a href="mailto:info@form4design.com" className="hover:text-orange-400 transition-colors">
                  info@form4design.com
                </a>
              </div>
              <div className="flex items-center">
                <Globe className="w-5 h-5 mr-3 text-teal-400" />
                <a href="https://form4design.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">
                  form4design.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Form4Design. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy-policy.html" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service.html" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;