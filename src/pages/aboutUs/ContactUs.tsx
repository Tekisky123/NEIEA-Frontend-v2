import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import useBreadcrumb from '../../hooks/useBreadcrumb';
import Layout from '../../components/Layout';
const ContactUs: React.FC = () => {
    const breadcrumbItems = useBreadcrumb();
    
    return (
        <Layout>
        {/* <div className="min-h-screen bg-white"> */}
            {/* Breadcrumb Navigation */}
            <Breadcrumb items={breadcrumbItems} />
            
            {/* Hero Section - Indiaspora Style */}
            <div className="relative h-[400px] bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        Contact Us
                    </h1>
                    <p className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                        Get in touch with us to learn more about our educational initiatives
                    </p>
                </div>
                
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10"></div>
            </div>
            
            {/* Main Content */}
            <div className="bg-gray-50 min-h-screen">
                <main className="flex flex-col items-center justify-center py-20">
                    <div className="text-center max-w-4xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            We'd Love to Hear From You
                        </h2>
                        <p className="text-lg text-gray-600 mb-12">
                            Whether you're interested in our programs, want to partner with us, 
                            or have questions about our mission, we're here to help.
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">Email Us</h3>
                                <p className="text-gray-600 text-sm">Contact information coming soon</p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">Call Us</h3>
                                <p className="text-gray-600 text-sm">Phone number coming soon</p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">Visit Us</h3>
                                <p className="text-gray-600 text-sm">Office address coming soon</p>
                            </div>
                        </div>
                        
                        <div className="mt-12">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Form</h3>
                            <p className="text-gray-600">A comprehensive contact form will be available soon for your inquiries.</p>
                        </div>
                    </div>
                </main>
            </div>
        {/* </div> */}
        </Layout>
    );
};

export default ContactUs;