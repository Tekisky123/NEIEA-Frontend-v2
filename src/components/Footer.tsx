import React from 'react';
import { Facebook, Instagram, Linkedin, MessageCircleMore, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#994263] text-[#E5DED4]">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Top Section: Logo, Subscription, and Social Links */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-12">
                    {/* Left: Logo and Subscription */}
                    <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                        <div className="flex items-center mb-6">
                            <Link to="/" >

                                <img
                                    src="/neia-logo.svg"
                                    alt="NEIEA"
                                    className="h-[80px] w-auto"
                                />
                            </Link>
                        </div>
                        <div className=" bg-opacity-10 rounded-lg p-1 backdrop-blur-sm max-w-md">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="flex-1 px-4 py-3 rounded-sm bg-white border border-white border-opacity-30 placeholder-[#797979] placeholder-opacity-70 text-[#797979] focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    className="btn-blue"
                                >
                                    GET OUR EMAILS
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Social Media Icons */}
                    <div className="flex justify-end w-full lg:w-1/2">
                        <div className="flex items-center space-x-5">
                            <a
                                href="https://x.com/neiea_india"
                                target="_blank"
                                className="bg-[#E5DED4] text-[#994263]  hover:bg-opacity-30 hover:text-[#994263] p-2 rounded-full transition-all duration-300 hover:scale-110"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-6 w-6 sm:h-8 sm:w-8" />
                            </a>
                            <a
                                href="https://www.facebook.com/people/NEIEA/100093505457474/"
                                target="_blank"
                                className="bg-[#E5DED4] text-[#994263] hover:bg-opacity-30 hover:text-[#994263] p-2 rounded-full transition-all duration-300 hover:scale-110"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-6 w-6 sm:h-8 sm:w-8" />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/the-neiea/"
                                target='_blank'
                                className="bg-[#E5DED4] text-[#994263] hover:bg-opacity-30 hover:text-[#994263] p-2 rounded-full transition-all duration-300 hover:scale-110"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-6 w-6 sm:h-8 sm:w-8" />
                            </a>
                            <a
                                href="https://www.instagram.com/neiea_india/"
                                target='_blank'
                                className="bg-[#E5DED4] text-[#994263] hover:bg-opacity-30 hover:text-[#994263] p-2 rounded-full transition-all duration-300 hover:scale-110"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-6 w-6 sm:h-8 sm:w-8" />
                            </a>
                            <a
                                href="https://www.youtube.com/@neiea_india"
                                target='_blank'
                                className="bg-[#E5DED4] text-[#994263] hover:bg-opacity-30 hover:text-[#994263] p-2 rounded-full transition-all duration-300 hover:scale-110"
                                aria-label="YouTube"
                            >
                                <Youtube className="h-6 w-6 sm:h-8 sm:w-8" />
                            </a>
                            <a
                                href="https://www.whatsapp.com/channel/0029VaA7jjBLo4hapNUZ1s3B"
                                target='_blank'
                                className="bg-[#E5DED4] text-[#994263] hover:bg-opacity-30 hover:text-[#994263] p-2 rounded-full transition-all duration-300 hover:scale-110"
                                aria-label="YouTube"
                            >
                                <MessageCircleMore className="h-6 w-6 sm:h-8 sm:w-8" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6">
                    <div>
                        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-90">LEARN MORE</h4>
                        <ul className="space-y-1.5">
                            <li><a href="/our-works/teachers-training" className="text-[#E5DED4] text-sm hover:underline hover:text-[#E5DED4] opacity-80 hover:opacity-100 transition-opacity">Teachers Training &gt;</a></li>
                            <li><a href="/our-works/education/girls-education" className="text-[#E5DED4] text-sm hover:underline hover:text-[#E5DED4] opacity-80 hover:opacity-100 transition-opacity">Girl's Education &gt;</a></li>
                            <li><a href="/partners/join" className="text-[#E5DED4] text-sm hover:underline hover:text-[#E5DED4] opacity-80 hover:opacity-100 transition-opacity">Partner with Us &gt;</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-90">TAKE ACTION</h4>
                        <ul className="space-y-1.5">
                            <li><a href="/donation/donate" className="text-[#E5DED4] text-sm hover:underline hover:text-[#E5DED4] opacity-80 hover:opacity-100 transition-opacity">Donate &gt;</a></li>
                            <li><a href="/donation/volunteer" className="text-[#E5DED4] text-sm hover:underline hover:text-[#E5DED4] opacity-80 hover:opacity-100 transition-opacity">Volunteer &gt;</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-90">ABOUT US</h4>
                        <ul className="space-y-1.5">
                            <li><a href="/about-us/introduction" className="text-[#E5DED4] text-sm hover:underline hover:text-[#E5DED4] opacity-80 hover:opacity-100 transition-opacity">Introduction &gt;</a></li>
                            <li><a href="/about-us/media-events/gallery" className="text-[#E5DED4] text-sm hover:underline hover:text-[#E5DED4] opacity-80 hover:opacity-100 transition-opacity">Media &gt;</a></li>
                            <li><a href="/about-us/reports-financials" className="text-[#E5DED4] text-sm hover:underline hover:text-[#E5DED4] opacity-80 hover:opacity-100 transition-opacity">Reports & Financials &gt;</a></li>
                            <li><a href="/about-us/contact" className="text-[#E5DED4] text-sm hover:underline hover:text-[#E5DED4] opacity-80 hover:opacity-100 transition-opacity">Contact Us &gt;</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="bg-[#333333] border-t border-white border-opacity-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm opacity-80">
                        <div>
                            © 2012-2024 NEIEA, Inc. All rights reserved.
                        </div>
                        <div className="flex space-x-6">
                            <a href="/privacy-policy" className="text-[#994263] hover:opacity-100 hover:underline transition-opacity">Privacy Policy</a>
                            <a href="/terms" className="text-[#994263] hover:opacity-100 hover:underline transition-opacity">Terms & Conditions</a>
                            <a href="/compliance" className="text-[#994263] hover:opacity-100 hover:underline transition-opacity">Compliance Policies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
