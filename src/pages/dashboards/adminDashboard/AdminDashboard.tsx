import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  BookOpen,
  Users,
  PlusCircle,
  UserPlus,
  Key,
  Building2,
  LogOut,
  Layers,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import CoursesSection from "./CoursesSection";
import DonorsSection from "./DonorsSection";
import NewCourse from "./NewCourse";
import SecuritySection from "./SecuritySection";
import ManageAdmins from "./ManageAdmins";
import CourseSectionForInstitution from "./CourseSectionForInstitution";
import WebsiteNavigationSection from "./WebsiteNavigationSection";
import logoRemovedBg from "../../../../public/neia-logo.svg";
import ReferredBy from "./ReferredBy";
import ManageLandingPages from "./ManageLandingPages";

const sidebarItems = [
  { label: "Dashboard", value: "dashboard", icon: <Menu className="w-5 h-5" /> },
  { label: "Courses", value: "courses", icon: <BookOpen className="w-5 h-5" /> },
  { label: "New Course", value: "new", icon: <PlusCircle className="w-5 h-5" /> },
  { label: "ReferredBy", value: "referredBy", icon: <PlusCircle className="w-5 h-5" /> },
  { label: "Donors", value: "donors", icon: <Users className="w-5 h-5" /> },
  { label: "Institutions", value: "institutions", icon: <Building2 className="w-5 h-5" /> },
  { label: "Manage Admins", value: "admins", icon: <UserPlus className="w-5 h-5" /> },
  { label: "Security", value: "security", icon: <Key className="w-5 h-5" /> },
  { label: "Website Navigation", value: "website-navigation", icon: <Layers className="w-5 h-5" /> },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("courses");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // for mobile

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white relative">
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-ngo-color1 text-white p-2 rounded-full shadow-lg"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>
      
      {/* Sidebar */}
      <aside
        className={`
          transition-all duration-300 bg-ngo-color1 text-white flex flex-col py-6 px-4 min-h-screen shadow-xl
          ${sidebarCollapsed ? "w-20" : "w-64"}
          fixed top-0 left-0 z-50 h-full md:static md:block md:z-auto md:h-auto
          ${sidebarOpen ? "block" : "hidden"} md:block
        `}
        style={{ maxWidth: sidebarCollapsed ? '5rem' : '16rem' }}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end mb-6">
          <button
            className="bg-ngo-color2 text-white rounded-full p-2 hover:bg-ngo-color6 transition-colors"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Logo Section */}
        <div className={`mb-8 flex items-center gap-3 ${sidebarCollapsed ? "justify-center" : ""}`}>
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
            <img src={logoRemovedBg} alt="NEIEA Logo" className="w-8 h-8" />
          </div>
          {!sidebarCollapsed && (
            <span className="font-bold text-xl text-white">NEIEA</span>
          )}
        </div>
        
        {/* Collapse/Expand Button - only on desktop */}
        <div className="hidden md:flex justify-center mb-8">
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full bg-ngo-color2 text-white hover:bg-ngo-color6 transition-colors"
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.value}>
                <button
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm focus:outline-none
                    ${activeTab === item.value
                      ? "bg-ngo-color2 text-white shadow-md"
                      : "text-white hover:bg-ngo-color2/80"}
                    ${sidebarCollapsed ? "justify-center px-2" : ""}
                  `}
                  onClick={() => {
                    setActiveTab(item.value);
                    setSidebarOpen(false);
                  }}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Logout Button */}
        <div className="mt-auto pt-6 border-t border-white/20">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-ngo-color5 hover:bg-ngo-color2 text-white font-medium transition-colors"
            onClick={logout}
          >
            <LogOut size={18} />
            {!sidebarCollapsed && "Log out"}
          </button>
        </div>
      </aside>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white">
        {activeTab === "courses" && <CoursesSection />}
        {activeTab === "new" && <NewCourse />}
        {activeTab === "referredBy" && <ReferredBy />}
        {activeTab === "donors" && <DonorsSection />}
        {activeTab === "institutions" && <CourseSectionForInstitution />}
        {/* {activeTab === "admins" && <ManageAdmins />} */}
        {/* {activeTab === "security" && <SecuritySection />} */}
        {/* {activeTab === "website-navigation" && <WebsiteNavigationSection />} */}
        {activeTab === "website-navigation" && <ManageLandingPages />}
      </main>
    </div>
  );
};

export default AdminDashboard;
