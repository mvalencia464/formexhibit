import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Form 4 Design portfolio images
  const galleryImages = [
    {
      id: 1,
      src: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe21614bd04ceb29f1e.webp',
      thumbnail: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe21614bd04ceb29f1e.webp',
      title: 'Professional Trade Show Display',
      description: 'Elegant booth design with modern branding elements'
    },
    {
      id: 2,
      src: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe23a9e2911afb28d01.webp',
      thumbnail: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe23a9e2911afb28d01.webp',
      title: 'Interactive Exhibition Space',
      description: 'Engaging customer experience with multimedia integration'
    },
    {
      id: 3,
      src: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe29c19c07979f1b00c.webp',
      thumbnail: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe29c19c07979f1b00c.webp',
      title: 'Strategic Brand Positioning',
      description: 'Thoughtfully designed space maximizing brand impact'
    },
    {
      id: 4,
      src: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe23a9e29847fb28d11.webp',
      thumbnail: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe23a9e29847fb28d11.webp',
      title: 'Corporate Brand Showcase',
      description: 'Sophisticated presentation with premium materials'
    },
    {
      id: 5,
      src: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe254a6266c49c87744.webp',
      thumbnail: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe254a6266c49c87744.webp',
      title: 'Contemporary Exhibition Stand',
      description: 'Modern design with striking visual elements'
    },
    {
      id: 6,
      src: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe254a62612acc87743.webp',
      thumbnail: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe254a62612acc87743.webp',
      title: 'Dynamic Product Display',
      description: 'Eye-catching booth with strategic product placement'
    },
    {
      id: 7,
      src: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe2f2837e350be871a4.webp',
      thumbnail: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe2f2837e350be871a4.webp',
      title: 'Modern Exhibition Design',
      description: 'Contemporary booth with clean lines and bold graphics'
    },
    {
      id: 8,
      src: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe25f2e6e38069baa10.webp',
      thumbnail: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe25f2e6e38069baa10.webp',
      title: 'Large Scale Installation',
      description: 'Impressive exhibition setup with commanding presence'
    },
    {
      id: 9,
      src: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe25f2e6e9bb39baa1b.webp',
      thumbnail: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe25f2e6e9bb39baa1b.webp',
      title: 'Creative Brand Experience',
      description: 'Innovative design with immersive customer journey'
    },
    {
      id: 10,
      src: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe25f2e6eca709baa11.webp',
      thumbnail: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe25f2e6eca709baa11.webp',
      title: 'Premium Trade Show Booth',
      description: 'High-end materials and sophisticated lighting design'
    },
    {
      id: 11,
      src: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe27dc6b0918f8588db.webp',
      thumbnail: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe27dc6b0918f8588db.webp',
      title: 'Technology Integration Display',
      description: 'Cutting-edge booth with digital interactive elements'
    },
    {
      id: 12,
      src: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe29c19c00757f1b00d.webp',
      thumbnail: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe29c19c00757f1b00d.webp',
      title: 'Engaging Customer Space',
      description: 'Welcoming environment designed for meaningful connections'
    },
    {
      id: 13,
      src: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe2b199f3495af4b7aa.webp',
      thumbnail: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe2b199f3495af4b7aa.webp',
      title: 'Multi-Level Exhibition',
      description: 'Complex installation with multiple engagement zones'
    },
    {
      id: 14,
      src: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe2cfc34e6f27546a64.webp',
      thumbnail: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe2cfc34e6f27546a64.webp',
      title: 'Immersive Brand Environment',
      description: 'Complete brand experience with atmospheric design'
    },
    {
      id: 15,
      src: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe2f2837e251fe871a8.webp',
      thumbnail: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe2f2837e251fe871a8.webp',
      title: 'Elegant Product Showcase',
      description: 'Refined presentation highlighting key products'
    },
    {
      id: 16,
      src: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe2f2837ea528e871a3.webp',
      thumbnail: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe2f2837ea528e871a3.webp',
      title: 'Professional Meeting Space',
      description: 'Dedicated area for client consultations and presentations'
    },
    {
      id: 17,
      src: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe2f2837ec2bee871a2.webp',
      thumbnail: 'https://storage.googleapis.com/msgsndr/rlPIrRx253CZBZYwMMFj/media/68a8bbe2f2837ec2bee871a2.webp',
      title: 'Award-Winning Design',
      description: 'Exceptional booth design recognized for innovation'
    },
    {
      id: 18,
      src: '/zenith-booth.webp',
      thumbnail: '/zenith-booth.webp',
      title: 'Zenith Digital Transformation Booth',
      description: 'Modern exhibition design featuring digital transformation and business potential themes'
    }
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextImage();
          break;
        case 'Escape':
          event.preventDefault();
          closeLightbox();
          break;
      }
    };

    if (selectedImage !== null) {
      document.addEventListener('keydown', handleKeyPress);
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-8 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Work in Action
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our portfolio of successful trade show projects. From intimate booths 
            to large-scale exhibitions, we bring brands to life.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative bg-gradient-to-br from-slate-800/40 to-gray-900/40 backdrop-blur-sm border border-slate-700/30 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:border-blue-500/30"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-w-16 aspect-h-12 relative">
                <img
                  src={image.thumbnail}
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold mb-1">{image.title}</h3>
                  <p className="text-gray-300 text-sm">{image.description}</p>
                </div>

                {/* View Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Create Your Next Success Story?
            </h3>
            <p className="text-gray-300 mb-6">
              Let's discuss how we can bring your vision to life with our comprehensive trade show solutions.
            </p>
            <button 
              onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="brand-button text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-500/25"
            >
              Start Your Project Today
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="brand-card rounded-xl overflow-hidden">
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              {/* Image Info */}
              <div className="p-6 bg-black/80 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-2">
                  {galleryImages[selectedImage].title}
                </h3>
                <p className="text-gray-300">
                  {galleryImages[selectedImage].description}
                </p>
              </div>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;