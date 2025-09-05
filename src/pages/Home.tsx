import React, { useState, useEffect } from 'react';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Images from public/home/ directory (consistent aspect ratio expected)
  const heroImageNames = [
    'slider1_upscale',
    'slider2',
    'slider3',
    'slider4',
    'slider5',
    'slider6'
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImageNames.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImageNames.length, isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImageNames.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImageNames.length) % heroImageNames.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Local component to robustly load images with multiple extension fallbacks
  const SlideImage = ({ name, alt, className = '', position }: { name: string; alt: string; className?: string; position?: string; }): JSX.Element => {
    const candidates: string[] = [
      `/home/${name}@2x.webp`,
      `/home/${name}.webp`,
      `/home/${name}@2x.png`,
      `/home/${name}.png`,
      `/home/${name}@2x.jpg`,
      `/home/${name}.jpg`,
      `/home/${name}@2x.jpeg`,
      `/home/${name}.jpeg`,
    ];
    const [attempt, setAttempt] = useState<number>(0);
    const currentSrc = candidates[Math.min(attempt, candidates.length - 1)];
    return (
      <img
        src={currentSrc}
        alt={alt}
        className={className}
        onError={() => setAttempt((prev) => prev + 1)}
        loading="eager"
        decoding="async"
        style={position ? { objectPosition: position } : undefined}
      />
    );
  };

  // Touch handlers for mobile swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .vision-mission-bg {
            background-size: contain;
          }
          
          /* Gentle Ken Burns effect for slide background */
          @keyframes kenburnsSlow {
            from { transform: scale(1.05); }
            to { transform: scale(1.15); }
          }
          .kenburns-slow {
            animation: kenburnsSlow 10s ease-in-out forwards;
          }

          /* Try to render photos a bit sharper on some browsers */
          .sharp-image {
            image-rendering: -webkit-optimize-contrast;
            backface-visibility: hidden;
            transform: translateZ(0);
          }

          /* Keep a consistent visual aspect for the hero carousel across slides */
          .hero-carousel {
            aspect-ratio: 16 / 9;
          }
          @media (max-width: 640px) {
            .hero-carousel { aspect-ratio: 16 / 9; }
          }
          
          @media (max-width: 640px) {
            .vision-mission-bg {
              background-size: 100% auto;
              background-position: center top;
            }
          }
          
          @media (min-width: 641px) and (max-width: 1024px) {
            .vision-mission-bg {
              background-size: 90% auto;
              background-position: center center;
            }
          }
          
          @media (min-width: 1025px) {
            .vision-mission-bg {
              background-size: 100% 100%;
              background-position: center center;
            }
          }
          
          @media (min-width: 1440px) {
            .vision-mission-bg {
              background-size: cover;
              background-position: center center;
            }
          }
          
          @media (min-width: 1920px) {
            .vision-mission-bg {
              background-size: cover;
              background-position: center center;
            }
          }
          
          .learn-more-button-responsive {
            bottom: 36px;
            left: 8px;
          }
          
          @media (max-width: 640px) {
            .learn-more-button-responsive {
              bottom: 30%;
              left: 50%;
              transform: translateX(-50%);
              width: calc(100% - 32px);
              max-width: 300px;
            }
          }
          
          @media (min-width: 641px) and (max-width: 1024px) {
            .learn-more-button-responsive {
              bottom: 25%;
              left: 50%;
              transform: translateX(-50%);
              width: calc(100% - 48px);
              max-width: 350px;
            }
          }
          
          @media (min-width: 1024px) {
            .lg\\:py-16 {
              padding-top: 0rem;
              padding-bottom: 1rem;
            }
          }
          
          @media (min-width: 1025px) {
            .learn-more-button-responsive {
              bottom: 200px;
              left: 40px;
              transform: none;
            }
            
            .vision-mission-desktop h2 {
              font-size: 34px !important;
              line-height: 1.4 !important;
              font-weight: 800 !important;
              font-family: 'Source Serif 4', serif !important;
            }
            
            .vision-mission-desktop p {
              font-size: 22px !important;
              max-width: 340px !important;
              font-family: 'Source Serif 4', serif !important;
              font-weight: 600 !important;
            }
          }
        `
      }} />
    <div className="min-h-screen bg-[#E5DED4] m-0 p-0">
      {/* Hero Image Slider - Full View */}
      <div 
        className="relative overflow-hidden mt-[40px] xl:mt-[115px] sm:mt-[35px] h-auto hero-carousel max-h-[900px] touch-pan-y sm:[&_*]:!object-center"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {heroImageNames.map((name, index) => {
          const focusPosition = 'center 20%';
          return (
          <div
            key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Full-bleed image: consistent size across slides */}
            <div className="absolute inset-0">
              <SlideImage
                name={name}
              alt={`Slide ${index + 1}`}
                className="w-full h-full object-contain sm:object-cover select-none pointer-events-none sharp-image bg-black"
                position={focusPosition}
            />
          </div>
          </div>
          );
        })}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-3 md:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 z-10 touch-manipulation active:scale-95"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 z-10 touch-manipulation active:scale-95"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2 md:space-x-3 z-10 bg-black bg-opacity-20 px-3 sm:px-4 py-2 sm:py-3 rounded-full backdrop-blur-sm">
          {heroImageNames.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 rounded-full transition-all duration-300 touch-manipulation ${index === currentSlide
                  ? 'bg-white scale-110 shadow-lg' 
                  : 'bg-white bg-opacity-60 hover:bg-opacity-80 active:bg-opacity-90'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Vision and Mission Section */}
      <div className="py-8 sm:py-12 lg:py-16 bg-white relative overflow-hidden">
        {/* Subtle Background Animation Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-10 blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-green-100 to-blue-100 rounded-full opacity-10 blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Mobile/Tablet Layout */}
          <div className="block lg:hidden">
            {/* Our Vision Section */}
            <div className="text-center mb-8 sm:mb-12 animate-fade-in">
              <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl p-8 shadow-xl border border-blue-200/30 backdrop-blur-sm transform hover:scale-105 transition-all duration-500">
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60"></div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60"></div>
                  
                  <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 mb-6 animate-fade-in" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>
                    Our Vision
                  </h2>
                  
                                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto animate-fade-in" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500", fontSize: "22px" }}>
                  To create a society that upholds the sanctity of every human life, rejects all forms of discrimination, and aspires to build a peaceful, compassionate, and sustainable world.
                </p>
                  
                  {/* Bottom decorative line */}
                  <div className="mt-6 flex justify-center">
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Image Section */}
            <div className="mb-8 sm:mb-12 animate-fade-in">
              <div 
                className="w-full h-64 sm:h-80 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: "url('/home/vision2.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
              </div>
            </div>

            {/* Learn More Button */}
            <div className="text-center mb-8 sm:mb-12 animate-fade-in">
              <a
                href="/about-us/introduction"
                className="group inline-flex items-center bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 text-base sm:text-lg uppercase tracking-wide border-2 border-transparent hover:border-purple-300 transform hover:scale-105 hover:shadow-lg"
              >
                <span className="relative z-10">Learn More About Us</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                <div className="absolute inset-0 bg-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>

          {/* Desktop Layout - Original Background Image with Overlaid Text */}
          <div className="hidden lg:block relative w-full vision-mission-bg animate-fade-in" 
            style={{ 
              marginLeft: 'calc(-50vw + 50%)', 
              marginRight: 'calc(-50vw + 50%)', 
              width: '100vw',
              height: '150vh',
              minHeight: '120vh',
              backgroundImage: "url('/home/vision2.jpg')",
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="w-full h-full">
              
              {/* Vision - Top Left */}
              <div className="vision-mission-desktop absolute top-4 sm:top-8 md:top-12 lg:top-16 left-0 sm:left-0 md:left-6 lg:left-8 w-auto max-w-md lg:max-w-lg px-4 sm:px-6 md:px-0 animate-fade-in">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 sm:mb-2 md:mb-3 leading-tight animate-fade-in" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Our Vision
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed animate-fade-in" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>
                  To create a society that upholds the sanctity of every human life, rejects all forms of discrimination, and aspires to build a peaceful, compassionate, and sustainable world.
                </p>
              </div>

              {/* Top Right Image */}
              <div className="absolute top-8 right-8 w-64 h-40 lg:w-80 lg:h-48 animate-fade-in">
                <img
                  src="/home/Screenshot 2025-09-02 134307.png"
                  alt="Vision Illustration"
                  className="w-full h-full object-contain transform hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Mission - Bottom Right */}
              <div className="vision-mission-desktop absolute -bottom-3 sm:-bottom-1 md:bottom-1 lg:bottom-16 right-0 sm:right-0 md:right-0 lg:right-2 xl:right-4 w-auto max-w-md lg:max-w-lg px-4 sm:px-6 md:px-0 animate-fade-in">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 leading-tight animate-fade-in" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Our Mission
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed mt-2 sm:mt-3 md:mt-4 animate-fade-in" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>
                  We are dedicated to ensuring that there is no loss of potential and wastage of a child's life,<br />
                  due to inequities in education. Our mission is to create an inclusive educational system<br />
                  that delivers high-quality learning which is affordable, scalable, and transformative.
                </p>
              </div>

              {/* Learn More Button - Left Side Higher */}
              <div className="absolute learn-more-button-responsive animate-fade-in">
                <a
                  href="/about-us/introduction"
                  className="group inline-flex items-center justify-center bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base uppercase tracking-wide transform hover:scale-105 hover:shadow-lg"
                >
                  Learn More About Us
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <div className="absolute inset-0 bg-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* Custom CSS for animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes fade-in {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            .animate-fade-in {
              animation: fade-in 1s ease-out forwards;
              opacity: 0;
            }
            
            .animate-fade-in:nth-child(1) { animation-delay: 0.1s; }
            .animate-fade-in:nth-child(2) { animation-delay: 0.2s; }
            .animate-fade-in:nth-child(3) { animation-delay: 0.3s; }
            .animate-fade-in:nth-child(4) { animation-delay: 0.4s; }
            .animate-fade-in:nth-child(5) { animation-delay: 0.5s; }
          `
        }} />
      </div>

             

      {/* Leadership Section */}
                                                                                                 <div 
                 className="py-8 sm:py-12 lg:py-16 relative"
                                   style={{
                    backgroundImage: "url('/home/Whisk_81d76d445f.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'right center',
                    backgroundRepeat: 'no-repeat'
                  }}
               >
                               {/* Background Overlay */}
                <div className="absolute inset-0 bg-white bg-opacity-85"></div>
             
             {/* Content */}
             <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                                                                                                                                                                                                                                                                                               <div className="text-center mb-6 sm:mb-8 lg:mb-12">
                                         <div className="relative inline-block">
                                                                                       <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 mb-4 uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Meet Our Leadership
            </h2>
                                           <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-full"></div>
                                         </div>
                                         <div className="mt-8">
                                           <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600", fontSize: "22px" }}>
              Visionary leaders dedicated to transforming education and empowering communities
            </p>
                                         </div>
          </div>

                                                                                                 {/* Leadership Content with Image and Text Side by Side */}
                 <div className="grid lg:grid-cols-2 gap-8 items-start">
                   {/* Left: Leader Image */}
            <div className="order-2 lg:order-1">
                <img
                  src="/home/leader.jpg"
                  alt="Javeed Mirza - Founder and President"
                       className="w-full h-auto object-contain max-h-[700px] lg:max-h-[800px]"
                />
                {/* Mobile-only button after leader image */}
                <div className="block lg:hidden mt-6 text-center">
                  <a
                    href="/about-us/leadership"
                    className="inline-flex items-center justify-center bg-[#007AA4] hover:bg-[#007AA4] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-base uppercase"
                  >
                    <span>MEET OUR FULL LEADERSHIP TEAM</span>
                    <svg className="w-5 h-5 ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
            </div>

                   {/* Right: Leader Information */}
            <div className="order-1 lg:order-2">
                    <div className="mb-4">
                      <div className="inline-block relative">
                        <span className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 mb-2 block">
                Founder & President
                        </span>
                        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-full"></div>
                      </div>
              </div>
              
                                         <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "800" }}>
                Javeed Mirza
              </h3>
              
                                                                                                                                                                   <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600", fontSize: "22px", lineHeight: "1.8" }}>
                Javeed Mirza, Founder and President of NEIEA… A visionary leader with global experience in social and political activism, teaching, business and in research. It was his passionate pursuit for ending inequity and injustice meted out to the marginalized, that made him strive for many decades and build NEIEA…. a low-cost scalable model of education that has the potential to transform global education.
              </p>

               {/* Learn More About Leadership - Desktop Only */}
               <div className="pt-4 hidden lg:block">
                                    <a
                      href="/about-us/leadership"
                   className="btn-blue inline-flex items-center justify-center bg-[#007AA4] hover:bg-[#007AA4] text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors duration-200 text-sm sm:text-base md:text-lg uppercase text-center max-w-full sm:max-w-none"
                    >
                   <span className="whitespace-normal sm:whitespace-nowrap">Meet Our Full Leadership Team</span>
                   <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Innovation Section */}
      <div className="py-8 sm:py-10 lg:py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-orange-200 to-yellow-200 rounded-full opacity-20 blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-15 blur-lg animate-bounce" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
            {/* Left: Innovation Content */}
            <div className="order-1 lg:order-1 animate-fade-in-up">
              
              {/* Enhanced Title with Gradient and Animation */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 mb-4 leading-tight animate-fade-in-up" style={{ fontFamily: "'Poppins', sans-serif", animationDelay: '0.3s' }}>
                Innovation
              </h2>
              
              {/* Enhanced Description with Glass Effect and Animation */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20 mb-6 transform hover:scale-105 transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <p className="text-gray-700" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600", fontSize: "22px", lineHeight: "1.8" }}>
                  NEIEA has developed <span className="font-semibold text-blue-600 animate-pulse">innovative approaches</span> to advance its Vision and Mission. These include: a <span className="font-semibold text-purple-600">Blended Learning Model</span> that integrates online teaching with onsite learning through advanced technology and pedagogy; a <span className="font-semibold text-orange-600">Partnering Model</span> that fosters collective growth; a <span className="font-semibold text-green-600">Flexible Learning System</span> offering live sessions 18 hours a day, 7 days a week; and a <span className="font-semibold text-red-600">Low-Cost and Free Education Model</span> that makes quality education accessible and affordable for all.
                </p>
              </div>

              {/* Enhanced Call to Action with Animation */}
              <div className="pt-2 animate-fade-in-up flex justify-center" style={{ animationDelay: '0.9s' }}>
                <a
                  href="/about-us/working-model"
                    className="group inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base md:text-lg relative overflow-hidden text-center max-w-full sm:max-w-none"
                >
                    <span className="relative z-10 whitespace-normal sm:whitespace-nowrap">Learn About Our Working Model</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-300 relative z-10 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
            </div>

            {/* Right: Innovation Image with Enhanced Animation */}
            <div className="order-2 lg:order-2 animate-fade-in-right">
              <div className="relative group">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl transform group-hover:scale-105 transition-transform duration-500 animate-pulse"></div>
                
                {/* Main image with animation */}
                <img
                  src="/home/innovation.png"
                  alt="Innovation in Education"
                  className="relative w-full h-auto rounded-2xl shadow-2xl object-cover max-h-[400px] sm:max-h-[500px] lg:max-h-none transform group-hover:scale-105 transition-transform duration-500 animate-fade-in-up"
                  style={{ animationDelay: '0.3s' }}
                />
                
                {/* Floating animated elements */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '1s' }}>
                  <svg className="w-8 h-8 text-blue-600 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '1.5s' }}>
                  <svg className="w-6 h-6 text-purple-600 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                {/* Additional floating element */}
                <div className="absolute top-1/2 left-4 w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg animate-ping" style={{ animationDelay: '2s' }}>
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Custom CSS for animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes fade-in-up {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes fade-in-down {
              from {
                opacity: 0;
                transform: translateY(-30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes fade-in-right {
              from {
                opacity: 0;
                transform: translateX(30px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            
            @keyframes spin-slow {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            
            .animate-fade-in-up {
              animation: fade-in-up 0.8s ease-out forwards;
            }
            
            .animate-fade-in-down {
              animation: fade-in-down 0.8s ease-out forwards;
            }
            
            .animate-fade-in-right {
              animation: fade-in-right 0.8s ease-out forwards;
            }
            
            .animate-spin-slow {
              animation: spin-slow 3s linear infinite;
            }
          `
        }} />
      </div>

      {/* Partnerships Section */}
      <div className="py-8 sm:py-10 lg:py-12 relative overflow-hidden" style={{
        backgroundImage: "url('/Whisk_228989cd07.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-green-200 to-teal-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-200 to-green-200 rounded-full opacity-20 blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-to-r from-teal-200 to-blue-200 rounded-full opacity-15 blur-lg animate-bounce" style={{ animationDelay: '2.5s' }}></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
            {/* Left: Partnership Image with Enhanced Animation */}
            <div className="order-2 lg:order-1 animate-fade-in-left">
              <div className="relative group">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-2xl transform group-hover:scale-105 transition-transform duration-500 animate-pulse"></div>
                
                {/* Main image with animation */}
                <img
                  src="/home/partnering.png"
                  alt="Collective Working Through Partnerships"
                  className="relative w-full h-auto rounded-2xl shadow-2xl object-cover transform group-hover:scale-105 transition-transform duration-500 animate-fade-in-up"
                  style={{ animationDelay: '0.4s' }}
                />
                
                {/* Floating animated elements */}
                <div className="absolute top-6 right-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '1.2s' }}>
                  <svg className="w-8 h-8 text-green-600 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <div className="absolute bottom-6 left-6 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '1.8s' }}>
                  <svg className="w-7 h-7 text-teal-600 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                {/* Additional floating element */}
                <div className="absolute top-1/2 right-8 w-12 h-12 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center shadow-lg animate-ping" style={{ animationDelay: '2.2s' }}>
                  <div className="w-7 h-7 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Right: Partnership Content */}
            <div className="order-1 lg:order-2 animate-fade-in-up">
              
              {/* Enhanced Title with Gradient and Animation */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 mb-4 leading-tight animate-fade-in-up" style={{ fontFamily: "'Source Serif 4', serif", fontSize: "30px", animationDelay: '0.3s' }}>
                Collective Working Through Partnerships
              </h2>
              
              {/* Enhanced Description with Glass Effect and Animation */}
              <div className="space-y-4 mb-6">
                                 <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20 transform hover:scale-105 transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                   <p className="text-gray-700" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600", fontSize: "22px", lineHeight: "1.4" }}>
                     NEIEA's partnership model is rooted in <span className="font-semibold text-green-600 animate-pulse">collective effort</span>. Partner institutions provide <span className="font-semibold text-teal-600">infrastructure, student safety, and classroom coordination</span>, while NEIEA delivers <span className="font-semibold text-blue-600">high-quality content, innovative pedagogy, and live teaching</span>. Together, they actively involve parents in the learning process, ensuring stronger student outcomes. NEIEA also enhances the capacity of partner institutions by training their teachers in pedagogy, technology, classroom management, and English proficiency.
                   </p>
                 </div>
                
                                 <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-4 shadow-lg border border-green-200/50 transform hover:scale-105 transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                   <p className="text-gray-700" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600", fontSize: "22px", lineHeight: "1.4" }}>
                     <strong className="text-green-700 text-lg">Open-Source Approach:</strong> NEIEA makes its content materials <span className="font-semibold text-teal-600">freely available</span> to all institutions that wish to adopt and benefit from its model, reinforcing its commitment to <span className="font-semibold text-blue-600">equitable and collaborative education</span>.
                   </p>
                 </div>
              </div>

              {/* Enhanced Call to Action with Animation */}
              <div className="pt-2 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                <a
                  href="/partners"
                    className="group inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base md:text-lg relative overflow-hidden text-center max-w-full sm:max-w-none"
                >
                    <span className="relative z-10 whitespace-normal sm:whitespace-nowrap">Explore Our Partnerships</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-300 relative z-10 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Custom CSS for animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes fade-in-left {
              from {
                opacity: 0;
                transform: translateX(-30px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            
            .animate-fade-in-left {
              animation: fade-in-left 0.8s ease-out forwards;
            }
          `
        }} />
      </div>

      {/* Statistics Section */}
      <div className="py-16 bg-gradient-to-br from-blue-600 via-teal-600 to-blue-800 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg animate-bounce" style={{ animationDelay: '2s' }}></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
                     {/* Enhanced Title */}
           <div className="text-center mb-12 animate-fade-in-up">
             <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>
               Our Impact in Numbers
             </h2>
             <p className="text-xl text-blue-100 max-w-3xl mx-auto" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>
               Transforming education through innovative approaches and meaningful partnerships
             </p>
           </div>
          
          {/* First Row - Enhanced Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="group text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-110 cursor-pointer animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 group-hover:from-yellow-200 group-hover:to-orange-200 transition-all duration-300">
                  16<span className="text-3xl md:text-4xl lg:text-5xl text-yellow-300 animate-pulse">+</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
              </div>
                             <div className="text-lg md:text-xl font-semibold text-blue-100 group-hover:text-white transition-colors duration-300" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>
                 Online Courses
               </div>
            </div>
            
            <div className="group text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-110 cursor-pointer animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="relative">
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-300 group-hover:from-green-200 group-hover:to-teal-200 transition-all duration-300">
                  63<span className="text-3xl md:text-4xl lg:text-5xl text-green-300 animate-pulse">+</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-300 rounded-full animate-ping opacity-75"></div>
              </div>
                             <div className="text-lg md:text-xl font-semibold text-blue-100 group-hover:text-white transition-colors duration-300" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>
                 Live Online Classes
               </div>
            </div>
            
            <div className="group text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-110 cursor-pointer animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="relative">
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                  94<span className="text-3xl md:text-4xl lg:text-5xl text-purple-300 animate-pulse">+</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-300 rounded-full animate-ping opacity-75"></div>
              </div>
                             <div className="text-lg md:text-xl font-semibold text-blue-100 group-hover:text-white transition-colors duration-300" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>
                 Partnerships
               </div>
            </div>
            
            <div className="group text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-110 cursor-pointer animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="relative">
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 group-hover:from-blue-200 group-hover:to-cyan-200 transition-all duration-300">
                  2,000<span className="text-3xl md:text-4xl lg:text-5xl text-blue-300 animate-pulse">+</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-300 rounded-full animate-ping opacity-75"></div>
              </div>
                             <div className="text-lg md:text-xl font-semibold text-blue-100 group-hover:text-white transition-colors duration-300" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>
                 Teachers Trained
               </div>
            </div>
          </div>

          {/* Second Row - Enhanced Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-110 cursor-pointer animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
              <div className="relative">
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-pink-300 group-hover:from-red-200 group-hover:to-pink-200 transition-all duration-300">
                  6,182<span className="text-3xl md:text-4xl lg:text-5xl text-red-300 animate-pulse">+</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-300 rounded-full animate-ping opacity-75"></div>
              </div>
                             <div className="text-lg md:text-xl font-semibold text-blue-100 group-hover:text-white transition-colors duration-300" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>
                 Institutional Enrollments
               </div>
            </div>
            
            <div className="group text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-110 cursor-pointer animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
              <div className="relative">
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300">
                  10,612<span className="text-3xl md:text-4xl lg:text-5xl text-indigo-300 animate-pulse">+</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-300 rounded-full animate-ping opacity-75"></div>
              </div>
                             <div className="text-lg md:text-xl font-semibold text-blue-100 group-hover:text-white transition-colors duration-300" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>
                 Individual Enrollments
               </div>
            </div>
            
            <div className="group text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-110 cursor-pointer animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
              <div className="relative">
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 group-hover:from-yellow-200 group-hover:via-orange-200 group-hover:to-red-200 transition-all duration-300">
                  16,801<span className="text-3xl md:text-4xl lg:text-5xl text-yellow-300 animate-pulse">+</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
              </div>
                             <div className="text-lg md:text-xl font-semibold text-blue-100 group-hover:text-white transition-colors duration-300" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>
                 Total Enrollments
               </div>
            </div>
          </div>

          {/* Enhanced Call to Action */}
          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '1.6s' }}>
            <a
              href="/about-us/reports-financials"
              className="group inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden"
            >
              <span className="relative z-10">View Detailed Reports</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
        
        {/* Custom CSS for animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes fade-in-up {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            .animate-fade-in-up {
              animation: fade-in-up 0.8s ease-out forwards;
            }
          `
        }} />
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-amber-200 to-yellow-200 rounded-full opacity-20 blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full opacity-15 blur-lg animate-bounce" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 animate-fade-in-up">
            
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-600 to-amber-600 mb-6 animate-fade-in-up" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600", animationDelay: '0.3s' }}>
              What People Say About NEIEA
            </h2>
            
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8 animate-fade-in-up" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600", animationDelay: '0.6s' }}>
              Students, parents, educators, management experts, and community leaders recognize NEIEA's work as truly pathbreaking and transformative. Here are some examples:
            </p>
          </div>

          {/* Enhanced Testimonial Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Enhanced Testimonial Card 1 */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-yellow-200/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
              <div className="flex items-center mb-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    S
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-ping">
                    ★
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900 text-lg group-hover:text-yellow-600 transition-colors duration-300" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>
                    Student
                  </h4>
                  <p className="text-sm text-gray-600 group-hover:text-orange-600 transition-colors duration-300" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500" }}>
                    Online Course Participant
                  </p>
                </div>
              </div>
              <div className="text-yellow-400 mb-4 flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20" style={{ animationDelay: `${i * 0.1}s` }}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-sm italic leading-relaxed group-hover:text-gray-800 transition-colors duration-300" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500" }}>
                "NEIEA's innovative approach has transformed my learning experience..."
              </p>
            </div>

            {/* Enhanced Testimonial Card 2 */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-yellow-200/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
              <div className="flex items-center mb-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    P
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-ping" style={{ animationDelay: '0.5s' }}>
                    ★
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900 text-lg group-hover:text-yellow-600 transition-colors duration-300" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>
                    Parent
                  </h4>
                  <p className="text-sm text-gray-600 group-hover:text-orange-600 transition-colors duration-300" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500" }}>
                    Community Member
                  </p>
                </div>
              </div>
              <div className="text-yellow-400 mb-4 flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20" style={{ animationDelay: `${i * 0.1}s` }}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-sm italic leading-relaxed group-hover:text-gray-800 transition-colors duration-300" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500" }}>
                "The partnership model has significantly improved my child's education..."
              </p>
            </div>

            {/* Enhanced Testimonial Card 3 */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-yellow-200/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center mb-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    E
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-ping" style={{ animationDelay: '1s' }}>
                    ★
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900 text-lg group-hover:text-yellow-600 transition-colors duration-300" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>
                    Educator
                  </h4>
                  <p className="text-sm text-gray-600 group-hover:text-orange-600 transition-colors duration-300" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500" }}>
                    Partner Institution
                  </p>
                </div>
              </div>
              <div className="text-yellow-400 mb-4 flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20" style={{ animationDelay: `${i * 0.1}s` }}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-sm italic leading-relaxed group-hover:text-gray-800 transition-colors duration-300" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500" }}>
                "NEIEA's teacher training program has enhanced our teaching capabilities..."
              </p>
            </div>
          </div>

          {/* Enhanced Call to Action */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '1.8s' }}>
            <a
              href="/about-us/testimonials"
                className="group inline-flex items-center justify-center bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base md:text-lg relative overflow-hidden text-center max-w-full sm:max-w-none"
            >
                <span className="relative z-10 whitespace-normal sm:whitespace-nowrap">Testimonials & Featured Stories</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-300 relative z-10 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
        
        {/* Custom CSS for animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes fade-in-up {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes fade-in-down {
              from {
                opacity: 0;
                transform: translateY(-30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            .animate-fade-in-up {
              animation: fade-in-up 0.8s ease-out forwards;
            }
            
            .animate-fade-in-down {
              animation: fade-in-down 0.8s ease-out forwards;
            }
            
            .animate-spin-slow {
              animation: spin 3s linear infinite;
            }
          `
        }} />
      </div>
    </div>
     </>
  );
};

export default Home;