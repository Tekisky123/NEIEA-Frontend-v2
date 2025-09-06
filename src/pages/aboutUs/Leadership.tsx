import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface TeamMember {
  name: string;
  title: string;
  description?: string;
  image?: string;
  hasImage: boolean;
}

const Leadership: React.FC = () => {
    const [activeTab, setActiveTab] = useState('directors');
    const [hoveredMember, setHoveredMember] = useState<string | null>(null);

    const directors: TeamMember[] = [
        { name: 'Nasreen Fatima', title: 'Director', hasImage: false },
        { name: 'Tahseen Sakina', title: 'Director', hasImage: false },
        { name: 'Ms A.V AMBIKA', title: 'Director', image: '/aboutUs/leadership/Ms AV AMBIKA.jpg', hasImage: true },
        { name: 'Ms. Niloufer Baig', title: 'Director', hasImage: false },
    ];

    const advisors: TeamMember[] = [
        { 
            name: 'Dr. K. N. Anandan', 
            title: 'Founder', 
            description: 'Visionary leader and founder of NEIEA',
            hasImage: false 
        },
        { 
            name: 'Dr. Peshimam Nazeer Ahmed', 
            title: 'Vice President, OMEIAT', 
            description: 'Vice President, Organization of Muslim Educational Institutions & Associations of Tamil Nadu',
            image: '/aboutUs/leadership/Dr. Peshimam Nazeer Ahmed.jpg',
            hasImage: true 
        },
        { 
            name: 'Prof. Shantha Sinha', 
            title: 'Padma Shri & Ramon Magsaysay Award Winner', 
            description: 'Renowned educator and social activist',
            image: '/aboutUs/leadership/Prof. Shantha Sinha.jpg',
            hasImage: true 
        },
        { 
            name: 'M Chaya Ratan', 
            title: 'Retired IPS', 
            description: 'Former Indian Police Service officer',
            image: '/aboutUs/leadership/Mrs. M. Chaya Ratan.jpg',
            hasImage: true 
        },
        { 
            name: 'Vinod Mubayi', 
            title: 'Scientific Advisor', 
            description: 'Member, American Association for the Advancement of Science; American Nuclear Society; American Solar Energy Society; New York Academy of Science',
            image: '/aboutUs/leadership/Vinod Mubayi.jpg',
            hasImage: true 
        },
        { 
            name: 'Ms. Uzma Nahid', 
            title: 'Social Activist', 
            description: 'Dedicated social worker and community leader',
            image: '/aboutUs/leadership/Ms Uzma Nahid.jpg',
            hasImage: true 
        },
        { name: 'Ms. Rubina Mazhar', title: 'CEO, SAFA Society', hasImage: false },
        { name: 'Dr. Noor Muhammad', title: 'Retired IAS, Electoral Management Expert', hasImage: false },
        { name: 'Dr. Ashraf Shah', title: 'Management Expert', hasImage: false },
        { name: 'Muhammad Husain Zulqarnain', title: 'Educationist', image: '/aboutUs/leadership/Muhammed Husain Zulqarnain .jpg', hasImage: true},
        { name: 'Mahmood Khan', title: 'Management Consultant',  image: '/aboutUs/leadership/Mahmood Khan.jpg', hasImage: true  },
        { name: 'Basir Mchawi', title: 'Chairman, NEIEA', image: '/aboutUs/leadership/Basir Mchawi Director Of NEIEA.png', hasImage: true },
        { name: 'Shahzad Nabi', title: 'Chairman, NEIEA',  image: '/aboutUs/leadership/Shahzad Nabi Director Of NEIEA.png', hasImage: true },
    ];

    const staff: TeamMember[] = [
        { name: 'Dr. Reshma Parveen', title: 'Human Resource Manager', image: '/aboutUs/leadership/Dr. Reshma parveen.jpg', hasImage: true },
        { name: 'Syed Danish Ali', title: 'Supervisor', hasImage: false },
        { name: 'Ms. Taskeen Tarannum', title: 'Deputy Supervisor', image: '/aboutUs/leadership/Taskeen Mam.jpg', hasImage: true  },
        { name: 'Mr. Sajjad Qasmi', title: 'Head of Madarsa Outreach', hasImage: false },
        { name: 'Dr. Saleem Ahmed Qasmi', title: 'Leader of Madarsa Outreach', image: '/aboutUs/leadership/Dr. Saleem Ahmed Qasmi  (Madrasa Outreach leader).jpg', hasImage: true },
        { name: 'Ms. Tasneem Khan', title: 'Head of English', hasImage: false },
        { name: 'Ms. Farha Khan', title: 'Head of Mathematics and IT', hasImage: false },
        { name: 'Ms. Arzoo Siraj', title: 'Head of Social Media and IT Skills training', hasImage: false },
        { name: 'Ms. Saba Manzoor', title: 'Project Manager', hasImage: false },
    ];

    const getCurrentMembers = () => {
        switch (activeTab) {
            case 'directors': return directors;
            case 'advisors': return advisors;
            case 'staff': return staff;
            default: return directors;
        }
    };

    const MemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
        <div 
            className="relative group cursor-pointer h-full"
            onMouseEnter={() => setHoveredMember(member.name)}
            onMouseLeave={() => setHoveredMember(null)}
        >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl h-full flex flex-col transform hover:scale-105 hover:-translate-y-2">
                {member.hasImage && member.image ? (
                    <div className="relative h-80 overflow-hidden flex-shrink-0">
                        <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Hover Overlay - Modern Style */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-amber-600/90 via-yellow-600/90 to-orange-600/90 flex items-center justify-center transition-all duration-500 ${
                            hoveredMember === member.name ? 'opacity-100' : 'opacity-0'
                        }`}>
                            <div className="text-center text-white p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold mb-2">{member.name}</h4>
                                <p className="text-white/90 text-sm mb-4">{member.title}</p>
                                <button className="bg-white text-amber-600 px-6 py-3 rounded-full font-semibold hover:bg-amber-50 transition-all duration-300 transform hover:scale-105">
                                    View Profile →
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-80 bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 via-yellow-200/30 to-orange-200/30"></div>
                        <div className="relative w-24 h-24 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        {/* Floating Elements */}
                        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full opacity-60 animate-pulse"></div>
                        <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>
                )}
                
                {/* Content Area */}
                <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>{member.name}</h3>
                    <p className="text-amber-600 font-semibold mb-3 text-sm">{member.title}</p>
                    {member.description && (
                        <p className="text-gray-600 text-sm leading-relaxed flex-1" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500" }}>
                            {member.description}
                        </p>
                    )}
                    
                    {/* Bottom Accent */}
                    <div className="mt-4 pt-4 border-t border-amber-100">
                        <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            </div>
                            <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
    return (
        <>
            {/* Beautiful Breadcrumb Navigation - Desktop Only */}
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
                            Leadership
                        </span>
                    </nav>
                </div>
            </div>

            <div className="min-h-screen pt-[70px] md:pt-[115px] lg:pt-[163px] overflow-x-hidden" style={{ backgroundColor: '#E5DED4' }}>
            
            {/* Hero Section - Modern Leadership Design */}
            <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-yellow-50/30"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-40 right-32 w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-32 left-32 w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Top Info Badge */}
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-full text-sm font-semibold mb-8 animate-bounce shadow-lg">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Meet Our Leadership Team
                    </div>
                    
                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
                            Leadership Excellence
                        </span>
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500" }}>
                        Our distinguished leaders, hailing from various professions and backgrounds, 
                        are dedicated to making a transformative impact across the educational sector.
                    </p>
                    
                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 mb-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-amber-600 mb-1">13+</div>
                            <div className="text-sm text-gray-600">Advisory Board</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-600 mb-1">4</div>
                            <div className="text-sm text-gray-600">Directors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-600 mb-1">8</div>
                            <div className="text-sm text-gray-600">Staff Members</div>
                        </div>
                    </div>
                </div>
                
                {/* Decorative corner elements */}
                <div className="absolute top-8 right-8 w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute bottom-8 left-8 w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Tab Navigation - Mobile Responsive */}
            <div className="bg-white/80 backdrop-blur-sm shadow-lg">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                    <nav className="flex justify-center space-x-0 overflow-x-auto" aria-label="Tabs">
                        {[
                            { key: 'directors', label: 'Directors', icon: '👥', shortLabel: 'Directors' },
                            { key: 'advisors', label: 'Advisory Board', icon: '🎯', shortLabel: 'Advisory' },
                            { key: 'staff', label: 'Staff Team', icon: '⚡', shortLabel: 'Staff' }
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`py-3 px-2 sm:py-4 sm:px-4 md:py-6 md:px-8 border-b-4 font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 relative group flex-shrink-0 ${
                                    activeTab === tab.key
                                        ? 'text-amber-600 border-amber-600 bg-amber-50/50'
                                        : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50/50'
                                }`}
                            >
                                <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
                                    <span className="text-lg sm:text-xl md:text-2xl">{tab.icon}</span>
                                    <span className="hidden sm:inline">{tab.label}</span>
                                    <span className="sm:hidden">{tab.shortLabel}</span>
                                </div>
                                {activeTab === tab.key && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 rounded-full"></div>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Members Grid */}
            <div className="py-16 sm:py-20 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
                        {getCurrentMembers().map((member, index) => (
                            <MemberCard key={index} member={member} />
                        ))}
                    </div>
                    
                    {getCurrentMembers().length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "600" }}>No members found</h3>
                            <p className="text-gray-600" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: "500" }}>Please check back later for updates.</p>
                        </div>
                    )}
                </div>
            </div>
            </div>
            
            
            {/* Local animations scoped to this page only */}
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes fade-in {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in {
                animation: fade-in 0.6s ease-out forwards;
              }
              .animate-fade-in:nth-child(1) { animation-delay: 0.1s; }
              .animate-fade-in:nth-child(2) { animation-delay: 0.2s; }
              .animate-fade-in:nth-child(3) { animation-delay: 0.3s; }
              .animate-fade-in:nth-child(4) { animation-delay: 0.4s; }
              .animate-fade-in:nth-child(5) { animation-delay: 0.5s; }
            `}} />
        </>
    );
};

export default Leadership;