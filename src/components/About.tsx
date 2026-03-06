import React from 'react';

const About = () => {
  const usps = [
    {
      title: 'Comprehensive Services',
      description: 'Full range of trade show services including design, printing, production, and installation - all under one roof.'
    },
    {
      title: 'End-to-End Management',
      description: 'We oversee all aspects of show logistics from beginning to end, ensuring a smooth and professional presentation.'
    },
    {
      title: 'Creative Excellence',
      description: 'Our experienced team brings creativity and efficiency to each project, delivering innovative solutions that showcase your brand.'
    },
    {
      title: 'Customer-Focused Approach',
      description: 'Dedicated to customer satisfaction with meticulous attention to detail, allowing you to focus on your objectives while we handle the logistics.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-800 via-gray-900 to-slate-900 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-8 pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-green-500/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="select-text">
            <h2 className="text-4xl font-bold text-white mb-6">
              Why Choose Form<span className="text-yellow-400">4</span>Design?
            </h2>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Form 4 Design is a well-known trade show management company with over 30 years of experience
              in the industry. Our main goal is to improve and simplify the trade show experience by
              providing comprehensive services that include design, printing, production, and installation.
            </p>

            <div className="space-y-6">
              {usps.map((usp, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{usp.title}</h3>
                    <p className="text-gray-300">{usp.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="brand-button text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-500/25"
              >
                Let's Work Together
              </button>
            </div>
          </div>

          {/* Images Column */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/0.webp"
                alt="Trade Show Exhibition Setup"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/helios.webp"
                alt="Professional Trade Show Display"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>
          </div>
        </div>
        {/* Value Proposition */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-white mb-6">
              The Form<span className="text-yellow-400">4</span>Design Advantage
            </h3>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6">
              What distinguishes Form 4 Design in the trade show industry is our dedication to customer
              satisfaction and meticulous attention to detail. With our extensive experience and dedicated
              approach, we have established ourselves as leaders in event management.
            </p>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Our experienced team brings creativity and efficiency to each project, reinforcing our
              reputation for reliability and excellence. We allow clients to concentrate on their
              objectives while we handle all logistical challenges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;