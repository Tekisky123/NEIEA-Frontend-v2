import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Users, ArrowRight, GraduationCap, IndianRupee, Search, X, Check } from 'lucide-react';
import Layout from '../components/Layout';
import axiosInstance from "@/lib/axiosInstance";

interface Course {
    _id: string;
    id: number;
    title: string;
    duration: string;
    level: string;
    description: string;
    targetAudience: string[];
    imageUrl: string;
    fees: number;
    whatsappLink: string;
    timeSlots: string[];
    isNew?: boolean;
    category: string;
}

interface ApplicationFormData {
    applicantType: 'individual' | 'institution';
    fullName?: string;
    email?: string;
    phone?: string;
    age?: number;
    education?: string;
    organizationName?: string;
    contactPerson?: string;
    organizationEmail?: string;
    organizationPhone?: string;
    organizationType?: string;
    numberOfStudents?: number;
    selectedCourses: string[];
    additionalInfo?: string;
}

const Courses: React.FC = () => {
    const { category: urlCategory } = useParams<{ category?: string }>();
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [userType, setUserType] = useState<'individual' | 'institution'>('individual');
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [showApplyNowModal, setShowApplyNowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [applicationForm, setApplicationForm] = useState<ApplicationFormData>({
        applicantType: 'individual',
        selectedCourses: [],
        additionalInfo: ''
    });
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch courses from API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setIsLoading(true);
                const response = await axiosInstance.get("/course/getAllCourses");
                const coursesWithDummyImages = response.data.map((course: Course) => ({
                    ...course,
                    imageUrl: course.imageUrl || "https://img.freepik.com/free-photo/learning-education-ideas-insight-intelligence-study-concept_53876-120116.jpg?semt=ais_hybrid&w=740",
                    level: course.level || "Beginner",
                    targetAudience: course.targetAudience || ["General"],
                    fees: course.fees || 0,
                    category: course.category || "general",
                }));
                setCourses(coursesWithDummyImages);
            } catch (error) {
                console.error("Failed to fetch courses", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCourses();
    }, []);

    // Set active category based on URL parameter
    useEffect(() => {
        if (urlCategory) {
            setActiveCategory(urlCategory);
        } else {
            setActiveCategory('all');
        }
    }, [urlCategory]);

    // Filter courses based on active category and search query
    const filteredCourses = useMemo(() => {
        let filtered = courses.filter(course => course.title && course.title.trim() !== '');
        
        // First filter by category
        if (activeCategory !== 'all') {
            filtered = filtered.filter(course => course.category === activeCategory);
        }
        
        // Then filter by search query within the current category
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(course => 
                course.title.toLowerCase().includes(query) ||
                course.description.toLowerCase().includes(query) ||
                course.level.toLowerCase().includes(query) ||
                course.targetAudience.some(audience => 
                    audience.toLowerCase().includes(query)
                )
            );
        }
        
        return filtered;
    }, [activeCategory, courses, searchQuery]);

    const handleCategoryChange = (categorySlug: string) => {
        setActiveCategory(categorySlug);
        // Clear search when changing category
        setSearchQuery('');
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    const handleUserTypeChange = (type: 'individual' | 'institution') => {
        setUserType(type);
        // Clear selected courses when switching user type
        setSelectedCourses([]);
    };

    const handleCourseSelection = (courseId: string) => {
        if (userType === 'individual') {
            // For individual, redirect directly to apply page
            navigate(`/apply-course/${courseId}`);
        } else {
            // For institution, toggle course selection
            setSelectedCourses(prev => {
                if (prev.includes(courseId)) {
                    return prev.filter(id => id !== courseId);
                } else {
                    return [...prev, courseId];
                }
            });
        }
    };

    const handleApplyNow = () => {
        if (selectedCourses.length === 0) {
            alert('Please select at least one course');
            return;
        }
        setShowApplyNowModal(true);
    };

    const handleProceedToApplication = () => {
        setShowApplyNowModal(false);
        // Navigate to institution application page with selected courses
        navigate('/apply-course-institution', { 
            state: { 
                selectedCourses: selectedCourses,
                category: activeCategory 
            } 
        });
    };

    const handleClearAllCourses = () => {
        if (confirm(`Are you sure you want to clear all ${selectedCourses.length} selected courses?`)) {
            setSelectedCourses([]);
        }
    };

    const handleApplyCourse = (course: Course) => {
        setSelectedCourse(course);
        setApplicationForm(prev => ({
            ...prev,
            selectedCourses: [course._id]
        }));
        setShowApplicationModal(true);
    };

    const handleFormChange = (field: keyof ApplicationFormData, value: any) => {
        setApplicationForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmitApplication = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Application submitted:', applicationForm);
        setShowApplicationModal(false);
        setApplicationForm({
            applicantType: 'individual',
            selectedCourses: [],
            additionalInfo: ''
        });
    };

    const getCategoryName = (slug: string) => {
        // Replace with your actual category mapping logic
        const categoryMap: Record<string, string> = {
            "general": "General",
            "technical": "Technical",
            "vocational": "Vocational",
            // Add more categories as needed
        };
        return categoryMap[slug] || slug;
    };

    return (
        <Layout>
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#994263] to-[#7a3450] text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mt-36">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            Available Courses for Enrollments
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                            Explore all educational courses as well as skill-based, vocational, and technical courses currently open for enrollment.
                        </p>
                    </div>
                </div>
            </div>

            {/* User Type Selection and Search Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* User Type Selection */}
                <div className="mb-8">
                    <div className="flex justify-center">
                        <div className="bg-white rounded-lg p-1 shadow-lg border border-gray-200">
                            <button
                                onClick={() => handleUserTypeChange('individual')}
                                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                                    userType === 'individual'
                                        ? 'bg-teal-500 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                Individual Learner
                            </button>
                            <button
                                onClick={() => handleUserTypeChange('institution')}
                                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                                    userType === 'institution'
                                        ? 'bg-teal-500 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                Institution
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                {/* <div className="mb-8">
                    <div className="relative max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent text-gray-900 placeholder-gray-500"
                            />
                            {searchQuery && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                        {searchQuery && (
                            <div className="mt-2 text-sm text-gray-600 text-center">
                                Searching for "{searchQuery}" in {activeCategory === 'all' ? 'all courses' : getCategoryName(activeCategory)}
                            </div>
                        )}
                    </div>
                </div> */}

                {/* Institution Instructions */}
                {userType === 'institution' && (
                    <div className="mb-8">
                        <div className="text-center">
                            <p className="text-sm text-gray-600 mb-4">
                                Click on any course card to select multiple courses from the {activeCategory === 'all' ? 'available' : getCategoryName(activeCategory)} category below
                            </p>
                        </div>
                    </div>
                )}

                {/* Sticky Apply Now Button for Institution */}
                {userType === 'institution' && selectedCourses.length > 0 && (
                    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300">
                        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 mx-4">
                            <div className="flex items-center gap-4">
                                <div className="text-sm text-gray-600">
                                    {selectedCourses.length} course{selectedCourses.length !== 1 ? 's' : ''} selected
                                </div>
                                <button
                                    onClick={handleClearAllCourses}
                                    className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-2 rounded-md hover:bg-red-50 transition-colors duration-200"
                                >
                                    Clear All
                                </button>
                                <button
                                    onClick={handleApplyNow}
                                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                                >
                                    Apply Now
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Courses Grid */}
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ${userType === 'institution' && selectedCourses.length > 0 ? 'pb-24' : ''}`}>
                {isLoading ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500">Loading courses...</p>
                    </div>
                ) : filteredCourses.length === 0 ? (
                    <div className="text-center py-16">
                        <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            {searchQuery ? 'No courses found' : 'No courses available'}
                        </h3>
                        <p className="text-gray-500">
                            {searchQuery 
                                ? `No courses match "${searchQuery}" in ${activeCategory === 'all' ? 'all courses' : getCategoryName(activeCategory)}.`
                                : 'Courses for this category are coming soon.'
                            }
                        </p>
                        {searchQuery && (
                            <button
                                onClick={clearSearch}
                                className="mt-4 px-4 py-2 bg-[#994263] text-white rounded-lg hover:bg-[#7a3450] transition-colors"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {/* <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                {activeCategory === 'all' ? 'All Courses' : getCategoryName(activeCategory)}
                            </h2>
                            <p className="text-gray-600">
                                {searchQuery 
                                    ? `${filteredCourses.length} course${filteredCourses.length !== 1 ? 's' : ''} found for "${searchQuery}"`
                                    : `${filteredCourses.length} course${filteredCourses.length !== 1 ? 's' : ''} available`
                                }
                            </p>
                        </div> */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredCourses.map((course) => (
                                <div 
                                    key={course._id} 
                                    className={`bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full ${
                                        userType === 'institution' && selectedCourses.includes(course._id) 
                                            ? 'ring-2 ring-green-500 ring-opacity-50' 
                                            : ''
                                    } ${userType === 'institution' ? 'cursor-pointer hover:ring-2 hover:ring-green-300 hover:ring-opacity-30' : ''}`}
                                    onClick={() => userType === 'institution' && handleCourseSelection(course._id)}
                                >
                                    {/* Course Image */}
                                    <div className="relative h-32 bg-gradient-to-br from-[#994263] to-[#7a3450] overflow-hidden">
                                        {course.imageUrl ? (
                                            <img
                                                src={course.imageUrl}
                                                alt={course.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <BookOpen className="h-16 w-16 text-white opacity-80" />
                                            </div>
                                        )}
                                        {course.isNew && (
                                            <div className="absolute top-0 left-0">
                                                <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                                    • NEW COURSE
                                                </span>
                                            </div>
                                        )}
                                        {course.fees === 0 && (
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                    Free
                                                </span>
                                            </div>
                                        )}
                                        {userType === 'institution' && selectedCourses.includes(course._id) && (
                                            <div className="absolute top-0 right-0">
                                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                                    <Check className="h-3 w-3" />
                                                    Selected
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    {/* Course Content */}
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-600 text-xs mb-3 line-clamp-2 flex-grow">
                                            {course.description}
                                        </p>
                                        {/* Course Details - Structured Layout */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-1 text-xs text-gray-600">
                                                <Clock className="h-3 w-3 text-[#994263]" />
                                                <span className="font-medium">Duration:</span>
                                                <span>{course.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-gray-600">
                                                <GraduationCap className="h-3 w-3 text-[#994263]" />
                                                <span className="font-medium">Level:</span>
                                                <span className="capitalize">{course.level}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-gray-600">
                                                <Users className="h-3 w-3 text-[#994263]" />
                                                <span className="font-medium">Target:</span>
                                                <span className="line-clamp-1">{course.targetAudience[0] || 'All learners'}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-gray-600">
                                                <IndianRupee className="h-3 w-3 text-[#994263]" />
                                                <span className="font-medium">Fees:</span>
                                                <span>₹{course.fees}</span>
                                            </div>
                                        </div>
                                        {/* Action Button */}
                                        {userType === 'individual' ? (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCourseSelection(course._id);
                                                }}
                                                className="w-full bg-[#994263] text-white py-2 px-3 rounded-lg font-medium hover:bg-[#7a3450] transition-colors duration-300 flex items-center justify-center gap-2 group mt-auto text-sm"
                                            >
                                                Apply Now
                                                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        ) : (
                                            <div
                                                className={`w-full py-2 px-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2 group mt-auto text-sm ${
                                                    selectedCourses.includes(course._id)
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-gray-100 text-gray-600'
                                                }`}
                                            >
                                                {selectedCourses.includes(course._id) ? (
                                                    <>
                                                        <Check className="h-3 w-3" />
                                                        Selected
                                                    </>
                                                ) : (
                                                    'Click to Select'
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Apply Now Modal for Institution */}
            {showApplyNowModal && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]" 
                    style={{ top: 0, left: 0, right: 0, bottom: 0, position: 'fixed' }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setShowApplyNowModal(false);
                        }
                    }}
                >
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900">Selected Courses ({selectedCourses.length})</h2>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleClearAllCourses}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                                    >
                                        Clear All
                                    </button>
                                    <button
                                        onClick={() => setShowApplyNowModal(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <div className="space-y-3">
                                    {selectedCourses.map(courseId => {
                                        const course = courses.find(c => c._id === courseId);
                                        return course ? (
                                            <div key={courseId} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
                                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                            <span className="flex items-center gap-1">
                                                                <Clock className="h-4 w-4" />
                                                                {course.duration}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <IndianRupee className="h-4 w-4" />
                                                                ₹{course.fees}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <GraduationCap className="h-4 w-4" />
                                                                {course.level}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => setSelectedCourses(prev => prev.filter(id => id !== courseId))}
                                                        className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setShowApplyNowModal(false)}
                                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleProceedToApplication}
                                    className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                    Proceed to Application
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Application Modal (unchanged) */}
            {showApplicationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Apply for Course</h2>
                                <button
                                    onClick={() => setShowApplicationModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            {selectedCourse && (
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <h3 className="font-semibold text-gray-900 mb-2">{selectedCourse.title}</h3>
                                    <div className="flex gap-4 text-sm text-gray-600">
                                        <span>Duration: {selectedCourse.duration}</span>
                                        <span>Fee: ₹{selectedCourse.fees}</span>
                                    </div>
                                </div>
                            )}
                            <form onSubmit={handleSubmitApplication} className="space-y-6">
                                {/* Applicant Type Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        I am applying as:
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => handleFormChange('applicantType', 'individual')}
                                            className={`p-4 rounded-lg border-2 transition-all ${applicationForm.applicantType === 'individual'
                                                ? 'border-[#994263] bg-[#994263] bg-opacity-10'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <Users className="h-8 w-8 mx-auto mb-2 text-[#994263]" />
                                            <div className="font-medium">Individual</div>
                                            <div className="text-sm text-gray-600">Student, learner, or individual</div>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleFormChange('applicantType', 'institution')}
                                            className={`p-4 rounded-lg border-2 transition-all ${applicationForm.applicantType === 'institution'
                                                ? 'border-[#994263] bg-[#994263] bg-opacity-10'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <GraduationCap className="h-8 w-8 mx-auto mb-2 text-[#994263]" />
                                            <div className="font-medium">Institution</div>
                                            <div className="text-sm text-gray-600">School, NGO, or organization</div>
                                        </button>
                                    </div>
                                </div>
                                {/* Individual Form Fields */}
                                {applicationForm.applicantType === 'individual' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={applicationForm.fullName || ''}
                                                onChange={(e) => handleFormChange('fullName', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={applicationForm.email || ''}
                                                onChange={(e) => handleFormChange('email', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={applicationForm.phone || ''}
                                                onChange={(e) => handleFormChange('phone', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Age
                                            </label>
                                            <input
                                                type="number"
                                                value={applicationForm.age || ''}
                                                onChange={(e) => handleFormChange('age', parseInt(e.target.value))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Education Level
                                            </label>
                                            <select
                                                value={applicationForm.education || ''}
                                                onChange={(e) => handleFormChange('education', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            >
                                                <option value="">Select education level</option>
                                                <option value="primary">Primary (1-5)</option>
                                                <option value="middle">Middle (6-8)</option>
                                                <option value="secondary">Secondary (9-10)</option>
                                                <option value="higher-secondary">Higher Secondary (11-12)</option>
                                                <option value="graduate">Graduate</option>
                                                <option value="post-graduate">Post Graduate</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                                {/* Institution Form Fields */}
                                {applicationForm.applicantType === 'institution' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Organization Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={applicationForm.organizationName || ''}
                                                onChange={(e) => handleFormChange('organizationName', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Contact Person *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={applicationForm.contactPerson || ''}
                                                onChange={(e) => handleFormChange('contactPerson', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Organization Email *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={applicationForm.organizationEmail || ''}
                                                onChange={(e) => handleFormChange('organizationEmail', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Organization Phone *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={applicationForm.organizationPhone || ''}
                                                onChange={(e) => handleFormChange('organizationPhone', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Organization Type *
                                            </label>
                                            <select
                                                required
                                                value={applicationForm.organizationType || ''}
                                                onChange={(e) => handleFormChange('organizationType', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            >
                                                <option value="">Select organization type</option>
                                                <option value="school">School</option>
                                                <option value="ngo">NGO</option>
                                                <option value="madrasa">Madrasa</option>
                                                <option value="community-center">Community Learning Center</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Number of Students
                                            </label>
                                            <input
                                                type="number"
                                                value={applicationForm.numberOfStudents || ''}
                                                onChange={(e) => handleFormChange('numberOfStudents', parseInt(e.target.value))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                )}
                                {/* Additional Information */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Additional Information
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={applicationForm.additionalInfo || ''}
                                        onChange={(e) => handleFormChange('additionalInfo', e.target.value)}
                                        placeholder="Any additional information you'd like to share..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                    />
                                </div>
                                {/* Submit Button */}
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowApplicationModal(false)}
                                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-[#994263] text-white rounded-lg hover:bg-[#7a3450] transition-colors"
                                    >
                                        Submit Application
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Courses;
