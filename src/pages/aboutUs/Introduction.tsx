import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import useBreadcrumb from '../../hooks/useBreadcrumb';

const Introduction: React.FC = () => {
    const breadcrumbItems = useBreadcrumb();
    
    return (
        <>
        <div className="min-h-screen bg-white">
            {/* Breadcrumb Navigation */}
            <Breadcrumb items={breadcrumbItems} />
            
            
            {/* Hero Section with Background Image - Indiaspora Style */}
            <div
                className="relative h-64 sm:h-80 md:h-96 bg-cover bg-center bg-no-repeat flex items-center justify-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/aboutUs/introduction/slider1.png')`
                }}
            >
                
                <div className="text-center text-white px-4 max-w-4xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                        Introduction
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
                        The New Equitable and Innovative Educational Association
                    </p>
                </div>
                
                {/* Decorative overlay elements - Indiaspora style */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">

                {/* Establishment Section */}
                <div className="mb-12 sm:mb-16 lg:mb-20">
                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                                Establishment/Registration
                            </h2>
                            <div className="prose prose-base sm:prose-lg text-gray-600">
                                <p className="text-sm sm:text-base leading-relaxed mb-4">
                                    NEIEA was officially registered on <strong className="text-blue-600">April 18, 2022</strong>,
                                    as a Section 8a non-profit educational organization in India, after two years of active
                                    educational discussions and planning during the Pandemic.
                                </p>
                                <p className="text-sm sm:text-base leading-relaxed">
                                    NEIEA has <strong className="text-blue-600">12a and 80g approvals</strong> from the
                                    Government of India and also <strong className="text-blue-600">Darpan ID</strong>.
                                </p>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <img
                                src="/aboutUs/introduction/slider2.png"
                                alt="NEIEA Establishment"
                                className="w-full rounded-lg sm:rounded-2xl shadow-lg sm:shadow-2xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Vision Section */}
                <div className="mb-12 sm:mb-16 lg:mb-20">
                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                        <div className="relative">
                            <img
                                src="/aboutUs/introduction/vision.png"
                                alt="Our Vision"
                                className="w-full rounded-lg sm:rounded-2xl shadow-lg sm:shadow-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-lg sm:rounded-2xl"></div>
                        </div>
                        <div>
                            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                                Our Vision
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                                Transforming Society Through Education
                            </h2>
                            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                                To envision a society where all youth and citizens are able to obtain good quality
                                education and use this to transform society ensuring human welfare, sustainability,
                                and progress.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="mb-12 sm:mb-16 lg:mb-20">
                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Our Mission
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                                Quality Education for All
                            </h2>
                            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                                To provide good quality and innovative education to all segments of society with
                                high consideration given to providing free education to the poor.
                            </p>
                        </div>
                        <div className="order-1 lg:order-2">
                            <img
                                src="/aboutUs/introduction/slider3.jpg"
                                alt="Our Mission"
                                className="w-full rounded-lg sm:rounded-2xl shadow-lg sm:shadow-2xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Image Gallery Section */}
                {/* <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Journey in Pictures
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover the moments that define our commitment to educational excellence
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <img
                                src="/aboutUs/introduction/slider4.jpg"
                                alt="Educational Activities"
                                className="w-full rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                            />
                        </div>
                        <div className="space-y-8">
                            <img
                                src="/aboutUs/introduction/slider5.png"
                                alt="Community Engagement"
                                className="w-full rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                            />
                        </div>
                    </div>
                </div> */}

                {/* Call to Action */}
                {/* <div className="text-center mt-20">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Join Our Mission
                        </h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Be part of our journey to transform education and create a better future for all
                        </p>
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                            Learn More About Our Work
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
        </>
    );
};

export default Introduction;
