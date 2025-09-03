import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import useBreadcrumb from '../../hooks/useBreadcrumb';
import Layout from '../../components/Layout';

interface TeamMember {
  name: string;
  title: string;
  description?: string;
  image?: string;
  hasImage: boolean;
}

const Leadership: React.FC = () => {
    const breadcrumbItems = useBreadcrumb();
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
        { name: 'Muhammad Zulqarnain', title: 'Educationist', hasImage: false },
        { name: 'Mahmood Khan', title: 'Management Consultant', hasImage: false },
        { name: 'Basir Mchawi', title: 'Chairman, NEI', hasImage: false },
        { name: 'Shahzad Nabi', title: 'Chairman, NEI', hasImage: false },
    ];

    const staff: TeamMember[] = [
        { name: 'Ms. Reshma Parveen', title: 'Human Resource Manager', hasImage: false },
        { name: 'Syed Danish Ali', title: 'Supervisor', hasImage: false },
        { name: 'Ms. Taskeen Tarannum', title: 'Deputy Supervisor', hasImage: false },
        { name: 'Mr. Sajjad Qasmi', title: 'Head of Madarsa Outreach', hasImage: false },
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
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                {member.hasImage && member.image ? (
                    <div className="relative h-64 overflow-hidden flex-shrink-0">
                        <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Hover Overlay - Indiaspora Style */}
                        <div className={`absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-300 ${
                            hoveredMember === member.name ? 'opacity-100' : 'opacity-0'
                        }`}>
                            <div className="text-center text-white p-4">
                                <button className="bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200">
                                    View Bio →
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                        <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                )}
                
                {/* Fixed height content area with ellipsis */}
                <div className="p-6 flex-1 flex flex-col min-h-[140px]">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-2 text-sm line-clamp-2">{member.title}</p>
                    {member.description && (
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
                            {member.description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
    
    return (
        <Layout>
        {/* <div className="min-h-screen bg-white"> */}
            {/* Breadcrumb Navigation */}
            <Breadcrumb items={breadcrumbItems} />
            
            {/* Hero Section - Indiaspora Style */}
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-20">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 right-20 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
                    <div className="absolute top-40 right-40 w-20 h-20 bg-white bg-opacity-20 rounded-full"></div>
                    <div className="absolute bottom-20 right-60 w-24 h-24 bg-white bg-opacity-15 rounded-full"></div>
                    <div className="absolute top-32 right-80 w-16 h-16 bg-white bg-opacity-25 rounded-full"></div>
                </div>
                
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-left text-white max-w-2xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Meet Our Leadership
                        </h1>
                        <p className="text-lg md:text-xl font-light leading-relaxed">
                            Our members, hailing from various professions and backgrounds, 
                            are always making an impact across the educational sector.
                        </p>
                    </div>
                </div>
            </div>

            {/* Tab Navigation - Exact Indiaspora Style */}
            <div className="bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex justify-center space-x-0" aria-label="Tabs">
                        {[
                            { key: 'directors', label: 'Directors' },
                            { key: 'advisors', label: 'Advisors' },
                            { key: 'staff', label: 'Staff' }
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`py-4 px-8 border-b-3 font-semibold text-base transition-all duration-200 relative ${
                                    activeTab === tab.key
                                        ? 'text-blue-600 border-blue-600'
                                        : 'text-gray-400 border-transparent hover:text-gray-600'
                                }`}
                                style={{
                                    borderBottomWidth: activeTab === tab.key ? '3px' : '3px',
                                    borderBottomColor: activeTab === tab.key ? '#2563eb' : 'transparent'
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                    <div className="border-b border-gray-200 -mt-px"></div>
                </div>
            </div>

            {/* Members Grid */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
                        {getCurrentMembers().map((member, index) => (
                            <MemberCard key={index} member={member} />
                        ))}
                    </div>
                    
                    {getCurrentMembers().length === 0 && (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">No members found</h3>
                            <p className="text-gray-600">Please check back later for updates.</p>
                        </div>
                    )}
                </div>
            </div>
        {/* </div> */}
        </Layout>
    );
};

export default Leadership;