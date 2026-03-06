import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import QuoteForm from './QuoteForm';

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '213.444.FORM (3676)',
      href: 'tel:2134443676',
      iconColor: 'bg-teal-600'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@form4design.com',
      href: 'mailto:info@form4design.com',
      iconColor: 'bg-blue-600'
    },
    {
      icon: MapPin,
      label: 'Service Area',
      value: 'Nationwide Coverage',
      href: null,
      iconColor: 'bg-purple-600'
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: 'Responds in 1 hour',
      href: null,
      iconColor: 'bg-orange-600'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-8 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Let's Discuss Your Project
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to make your next trade show a success? Get in touch for a free consultation 
            and custom quote tailored to your specific needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Get In Touch</h3>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8 relative z-0">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                const content = (
                  <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 transition-all duration-300 group hover:transform hover:scale-105 hover:shadow-xl hover:border-blue-500/30">
                    <div className={`w-12 h-12 rounded-lg ${info.iconColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-sm text-gray-400 mb-1">{info.label}</div>
                    <div className="text-white font-semibold">{info.value}</div>
                  </div>
                );

                return info.href ? (
                  <a key={index} href={info.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={index}>
                    {content}
                  </div>
                );
              })}
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 relative z-10 select-text">
              <h4 className="text-lg font-semibold text-white mb-4 select-text">Why Choose Form4Design?</h4>
              <ul className="space-y-3 text-gray-300 select-text">
                <li className="flex items-center select-text">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mr-3 pointer-events-none"></div>
                  Free Design and Consultation with approved budget
                </li>
                <li className="flex items-center select-text">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mr-3 pointer-events-none"></div>
                  Competitive pricing through strategic planning
                </li>
                <li className="flex items-center select-text">
                  <div className="w-2 h-2 rounded-full bg-teal-400 mr-3 pointer-events-none"></div>
                  30 years of industry experience and expertise
                </li>
                <li className="flex items-center select-text">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mr-3 pointer-events-none"></div>
                  Nationwide network of trusted partners
                </li>
              </ul>
            </div>
          </div>

          {/* Quote Form */}
          <div id="quote-form">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;