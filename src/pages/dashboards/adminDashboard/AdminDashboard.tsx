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
    <div className="flex min-h-screen bg-ngo-color6 relative">
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
          transition-all duration-300 bg-ngo-color1 text-white flex flex-col py-8 px-2 min-h-screen shadow-lg
          ${sidebarCollapsed ? "w-20" : "w-64 px-4"}
          fixed top-0 left-0 z-50 h-full md:static md:block md:z-auto md:h-auto
          ${sidebarOpen ? "block" : "hidden"} md:block
        `}
        style={{ maxWidth: sidebarCollapsed ? '5rem' : '16rem' }}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end mb-4 px-2">
          <button
            className="bg-ngo-color6 text-ngo-color1 rounded-full p-2"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>
        <div className={`mb-10 flex items-center gap-3 ${sidebarCollapsed ? "justify-center px-0" : "px-2"}`}>
          <img src={logoRemovedBg} alt="NEIEA Logo" className="w-10 h-10 rounded-full bg-white p-1 shadow" />
          {!sidebarCollapsed && (
            <span className="font-extrabold text-2xl tracking-tight text-ngo-color5">NEIEA</span>
          )}
        </div>
        {/* Collapse/Expand Button - only on desktop */}
        <div className="hidden md:flex justify-center mb-6">
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full bg-ngo-color6 text-ngo-color1 hover:bg-ngo-color2 transition"
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.value}>
                <button
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition font-semibold text-base focus:outline-none shadow-sm
                    ${activeTab === item.value
                      ? "bg-ngo-color6 text-ngo-color1 shadow-md"
                      : "bg-ngo-color1 text-white hover:bg-ngo-color2 "}
                    ${sidebarCollapsed ? "justify-center px-0" : ""}
                  `}
                  onClick={() => {
                    setActiveTab(item.value);
                    setSidebarOpen(false); // close sidebar on mobile after selection
                  }}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  {item.icon}
                  {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-8 border-t border-ngo-color5/30 flex flex-col items-center gap-2">
          <button
            className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-ngo-color5 hover:bg-ngo-color2 text-white font-semibold shadow"
            onClick={logout}
          >
            {sidebarCollapsed ? <LogOut/> : "Log out"}
          </button>
        </div>
      </aside>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === "courses" && <CoursesSection />}
        {/* {activeTab === "new" && <NewCourse />}
        {activeTab === "referredBy" && <ReferredBy />}
        {activeTab === "donors" && <DonorsSection />}
        {activeTab === "institutions" && <CourseSectionForInstitution />}
        {activeTab === "admins" && <ManageAdmins />}
        {activeTab === "security" && <SecuritySection />}
        {activeTab === "website-navigation" && <WebsiteNavigationSection />} */}
      </main>
    </div>
  );
};

export default AdminDashboard;
