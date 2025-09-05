import React from 'react';
import { Link } from 'react-router-dom';

const Introduction: React.FC = () => {
    return (
        <>
            {/* Breadcrumb Navigation - Desktop Only */}
            <div className="hidden lg:block fixed top-[115px] left-0 right-0 z-[100] bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 py-3 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-3" aria-label="Breadcrumb">
                        <Link 
                            to="/" 
                            className="flex items-center text-white/90 hover:text-white transition-colors duration-200 group"
                        >
                            <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            <span className="font-medium">Home</span>
                        </Link>
                        
                        <div className="flex items-center">
                            <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        
                        <span className="text-white font-semibold flex items-center">
                            <svg className="w-5 h-5 mr-2 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Introduction
                        </span>
                    </nav>
                </div>
            </div>

            <div className="min-h-screen pt-[70px] md:pt-[115px] lg:pt-[163px] overflow-x-hidden" style={{ backgroundColor: '#E5DED4' }}>
            
            {/* Hero Section - Full Screen Image with Overlay Text */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Full Screen Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/home/image3.png"
                        alt="NEIEA Introduction"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50"></div>
                </div>
                
                {/* Floating Elements - Mobile Responsive */}
                <div className="absolute top-10 left-4 md:top-20 md:left-20 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-20 right-4 md:top-40 md:right-32 w-10 h-10 md:w-16 md:h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-20 left-4 md:bottom-32 md:left-32 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '2s' }}></div>
                
                {/* Content Overlay */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Top Info Bar - Mobile Responsive */}
                    <div className="relative mb-6 md:mb-8">
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
                            <div className="relative">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
                                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 bg-amber-500 rounded-full animate-ping"></div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-white mb-1">2022</div>
                                <div className="text-xs md:text-sm text-white/80 font-medium">Year Founded</div>
                            </div>
                            <div className="hidden sm:block w-8 md:w-12 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500"></div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-white mb-1">NEIEA</div>
                                <div className="text-xs md:text-sm text-white/80 font-medium">Non-Profit</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Main Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight px-4">
                        <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
                        Introduction
                        </span>
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-6 md:mb-8 leading-relaxed max-w-4xl mx-auto px-4" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500" }}>
                        The New Equitable and Innovative Educational Association (NEIEA)
                    </p>
                    
                    {/* Badges */}
                    <div className="flex flex-wrap gap-3 md:gap-6 justify-center px-4">
                        <div className="flex items-center text-xs md:text-sm text-white/90 bg-white/10 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full">
                            <svg className="w-4 h-4 md:w-5 md:h-5 text-amber-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Section 8 Non-Profit
                        </div>
                        <div className="flex items-center text-xs md:text-sm text-white/90 bg-white/10 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full">
                            <svg className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            12A & 80G Approved
                        </div>
                    </div>
                </div>
                
                {/* Decorative corner elements - Mobile Responsive */}
                <div className="absolute top-4 right-4 md:top-8 md:right-8 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-6 h-6 md:w-10 md:h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="text-center group">
                        <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full animate-ping"></div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>Section 8</h3>
                        <p className="text-gray-600" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500" }}>Non-Profit Organization</p>
                    </div>
                    <div className="text-center group">
                        <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>12A & 80G</h3>
                        <p className="text-gray-600" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500" }}>Government Approved</p>
                    </div>
                    <div className="text-center group">
                        <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>Innovation</h3>
                        <p className="text-gray-600" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500" }}>Blended Learning Model</p>
                    </div>
                </div>

                {/* Establishment Section */}
                <div className="mb-12 sm:mb-16 lg:mb-20">
                    <div className="relative">
                        {/* Background decorative elements */}
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-yellow-200 to-amber-200 rounded-full opacity-20 blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                        
                        <div className="relative z-10 bg-gradient-to-br from-white via-amber-50/30 to-yellow-50/30 rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/50 backdrop-blur-sm">
                            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <div className="order-2 lg:order-1">
                                    {/* Animated badge */}
                                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-full text-sm font-semibold mb-6 animate-bounce">
                                        <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Official Registration
                                    </div>
                                    
                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 mb-6 animate-fade-in">
                                        Establishment & Registration
                            </h2>
                                    
                                    {/* Timeline-style content */}
                                    <div className="space-y-6">
                                        <div className="relative pl-8 border-l-4 border-amber-500 animate-fade-in">
                                            <div className="absolute -left-2 top-0 w-4 h-4 bg-amber-500 rounded-full animate-ping"></div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">April 18, 2022</h3>
                                            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500" }}>
                                                NEIEA was officially registered as a <span className="font-semibold text-amber-600">Section 8a non-profit educational organization</span> in India, marking the culmination of two years of active educational discussions and planning during the Pandemic.
                                            </p>
                                        </div>
                                        
                                        <div className="relative pl-8 border-l-4 border-yellow-500 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                                            <div className="absolute -left-2 top-0 w-4 h-4 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">Government Approvals</h3>
                                            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500" }}>
                                                NEIEA has secured <span className="font-semibold text-yellow-600">12A and 80G approvals</span> from the Government of India, along with a <span className="font-semibold text-amber-600">Darpan ID</span>, ensuring full compliance and recognition.
                                </p>
                            </div>
                        </div>
                                    
                                    {/* Animated stats */}
                                    <div className="grid grid-cols-3 gap-4 mt-8">
                                        <div className="text-center group">
                                            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <span className="text-white font-bold text-lg">8</span>
                                            </div>
                                            <p className="text-sm text-gray-600" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500" }}>Section</p>
                                        </div>
                                        <div className="text-center group">
                                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <span className="text-white font-bold text-lg">12A</span>
                                            </div>
                                            <p className="text-sm text-gray-600" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500" }}>Approval</p>
                                        </div>
                                        <div className="text-center group">
                                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <span className="text-white font-bold text-lg">80G</span>
                                            </div>
                                            <p className="text-sm text-gray-600" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500" }}>Approval</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="order-1 lg:order-2 relative">
                                    <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                            <img
                                src="/aboutUs/introduction/slider2.png"
                                alt="NEIEA Establishment"
                                            className="w-full h-[500px] object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                                        
                                        {/* Floating elements */}
                                        <div className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce shadow-lg border-2 border-amber-200">
                                            <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce shadow-lg border-2 border-yellow-200" style={{ animationDelay: '1s' }}>
                                            <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    {/* Decorative corner elements */}
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full animate-pulse shadow-lg"></div>
                                    <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1s' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vision Section */}
                <div className="mb-12 sm:mb-16 lg:mb-20 animate-fade-in">
                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                        <div className="relative">
                            <img
                                src="/home/vision2.jpg"
                                alt="Our Vision"
                                className="w-full rounded-2xl shadow-2xl object-contain bg-white transform hover:scale-105 transition-transform duration-500 animate-fade-in"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-amber-600/20 to-transparent rounded-2xl"></div>
                        </div>
                        <div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 mb-4 sm:mb-6 animate-fade-in" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>
                                Transforming Society Through Education
                            </h2>
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 transform hover:scale-105 transition-all duration-500 animate-fade-in">
                                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600", fontSize: "22px", lineHeight: "1.8" }}>
                                To envision a society where all youth and citizens are able to obtain good quality
                                education and use this to transform society ensuring human welfare, sustainability,
                                and progress.
                            </p>
                                <div className="mt-6 flex justify-center">
                                    <div className="w-32 h-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-600 rounded-full shadow-lg animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="mb-12 sm:mb-16 lg:mb-20 animate-fade-in">
                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 mb-4 sm:mb-6 animate-fade-in" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>
                                Quality Education for All
                            </h2>
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 transform hover:scale-105 transition-all duration-500 animate-fade-in">
                                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600", fontSize: "22px", lineHeight: "1.8" }}>
                                To provide good quality and innovative education to all segments of society with
                                high consideration given to providing free education to the poor.
                            </p>
                                <div className="mt-6 flex justify-center">
                                    <div className="w-32 h-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-600 rounded-full shadow-lg animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <img
                                src="/aboutUs/introduction/slider3.jpg"
                                alt="Our Mission"
                                className="w-full rounded-2xl shadow-2xl object-cover transform hover:scale-105 transition-transform duration-500 animate-fade-in"
                            />
                        </div>
                    </div>
                </div>

                {/* Core Values */}
                <div className="mb-12 sm:mb-16 lg:mb-20 animate-fade-in">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 mb-4 animate-fade-in" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>Our Core Values</h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-600 rounded-full mx-auto shadow-lg animate-pulse"></div>
                    </div>

                    <div className="relative">
                        {/* Background decorative elements */}
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-yellow-200 to-amber-200 rounded-full opacity-20 blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                        
                        <div className="relative z-10 bg-gradient-to-br from-white via-amber-50/30 to-yellow-50/30 rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-500">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                                {[
                                    { name: 'Equity', icon: '⚖️', color: 'from-amber-500 to-yellow-600' },
                                    { name: 'Innovation', icon: '💡', color: 'from-yellow-500 to-amber-600' },
                                    { name: 'Compassion', icon: '❤️', color: 'from-orange-500 to-amber-600' },
                                    { name: 'Collaboration', icon: '🤝', color: 'from-amber-600 to-yellow-500' },
                                    { name: 'Transparency', icon: '🔍', color: 'from-yellow-600 to-orange-500' },
                                    { name: 'Excellence', icon: '⭐', color: 'from-orange-600 to-amber-500' }
                                ].map((value, index) => (
                                    <div key={value.name} className="group relative">
                                        <div className={`w-full h-24 bg-gradient-to-br ${value.color} rounded-2xl flex flex-col items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 animate-fade-in relative overflow-hidden`} style={{ animationDelay: `${index * 0.1}s` }}>
                                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                                            <div className="text-2xl mb-2 relative z-10">{value.icon}</div>
                                            <div className="text-white font-bold text-sm sm:text-base relative z-10" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>{value.name}</div>
                                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/30 rounded-full animate-ping"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        </div>
                    </div>

                {/* CTA Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8 sm:p-12 animate-fade-in">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl sm:text-3xl font-bold mb-4 animate-fade-in" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>Explore Our Working Model</h3>
                        <p className="text-sm sm:text-base text-white/90 mb-6 max-w-2xl animate-fade-in" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500" }}>See how NEIEA blends technology, pedagogy, and partnerships to scale quality education.</p>
                        <a href="/about-us/working-model" className="group inline-flex items-center bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-fade-in">
                            Learn More
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                        </a>
                    </div>
                    </div>
            </div>
        </div>
        {/* Local animations scoped to this page only */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes fade-in { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }
          .animate-fade-in { animation: fade-in 0.8s ease-out forwards; opacity: 0; }
          .animate-fade-in:nth-child(1) { animation-delay: 0.1s; }
          .animate-fade-in:nth-child(2) { animation-delay: 0.2s; }
          .animate-fade-in:nth-child(3) { animation-delay: 0.3s; }
          .animate-fade-in:nth-child(4) { animation-delay: 0.4s; }
          .animate-fade-in:nth-child(5) { animation-delay: 0.5s; }
        `}} />
        </>
    );
};

export default Introduction;
