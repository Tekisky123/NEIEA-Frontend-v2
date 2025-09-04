import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { courses, coursesCategory } from '../lib/courses';
import { BookOpen, Clock, Users, ArrowRight, GraduationCap, IndianRupee } from 'lucide-react';
import Layout from '../components/Layout';

interface Course {
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
    // Individual fields
    fullName?: string;
    email?: string;
    phone?: string;
    age?: number;
    education?: string;
    // Institution fields
    organizationName?: string;
    contactPerson?: string;
    organizationEmail?: string;
    organizationPhone?: string;
    organizationType?: string;
    numberOfStudents?: number;
    // Common fields
    selectedCourses: number[];
    additionalInfo?: string;
}

const Courses: React.FC = () => {
    const { category } = useParams<{ category?: string }>();
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [applicationForm, setApplicationForm] = useState<ApplicationFormData>({
        applicantType: 'individual',
        selectedCourses: [],
        additionalInfo: ''
    });

    // Set active category based on URL parameter
    useEffect(() => {
        if (category) {
            setActiveCategory(category);
        } else {
            setActiveCategory('all');
        }
    }, [category]);

    // Filter courses based on active category
    const filteredCourses = useMemo(() => {
        if (activeCategory === 'all') {
            return courses.filter(course => course.title && course.title.trim() !== '');
        }
        return courses.filter(course =>
            course.category === activeCategory &&
            course.title &&
            course.title.trim() !== ''
        );
    }, [activeCategory]);

    const handleCategoryChange = (categorySlug: string) => {
        setActiveCategory(categorySlug);
    };

    const handleApplyCourse = (course: Course) => {
        setSelectedCourse(course);
        setApplicationForm(prev => ({
            ...prev,
            selectedCourses: [course.id]
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
        // Handle form submission logic here
        console.log('Application submitted:', applicationForm);
        // Close modal and show success message
        setShowApplicationModal(false);
        setApplicationForm({
            applicantType: 'individual',
            selectedCourses: [],
            additionalInfo: ''
        });
    };

    const getCategoryName = (slug: string) => {
        const category = coursesCategory.find(cat => cat.slug === slug);
        return category ? category.name : slug;
    };

    return (
        <Layout>
        {/* <div className="min-h-screen bg-gray-50"> */}
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
                        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <Users className="h-5 w-5" />
                <span>For Individuals & Institutions</span>
              </div>
              <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <GraduationCap className="h-5 w-5" />
                <span>Expert-Led Learning</span>
              </div>
            </div> */}
                    </div>
                </div>
            </div>

            {/* Category Tabs */}
            {/* <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-2 py-4">
                        <button
                            onClick={() => handleCategoryChange('all')}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === 'all'
                                ? 'bg-[#007AA4] text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            All Courses
                        </button>
                        {coursesCategory.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryChange(category.slug)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === category.slug
                                    ? 'bg-[#007AA4] text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div> */}

            {/* Courses Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {filteredCourses.length === 0 ? (
                    <div className="text-center py-16">
                        <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses available</h3>
                        <p className="text-gray-500">Courses for this category are coming soon.</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                {activeCategory === 'all' ? 'All Courses' : getCategoryName(activeCategory)}
                            </h2>
                            <p className="text-gray-600">
                                {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} available
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredCourses.map((course) => (
                                <div key={course.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full">
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

                                        {/* Apply Button */}
                                        <button
                                            onClick={() => handleApplyCourse(course)}
                                            className="w-full bg-[#994263] text-white py-2 px-3 rounded-lg font-medium hover:bg-[#7a3450] transition-colors duration-300 flex items-center justify-center gap-2 group mt-auto text-sm"
                                        >
                                            Apply Now
                                            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Application Modal */}
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
        {/* </div> */}
        </Layout>
    );
};

export default Courses;
