import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav className={`fixed top-[70px] md:top-[115px] left-0 right-0 z-[100] bg-[rgb(0,122,164)] py-4 shadow-xl ${className}`} aria-label="Breadcrumb">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-blue-500/20"></div>
      <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center justify-start space-x-2">
          {/* Home Item */}
          <li className="flex items-center group">
            <Link
              to="/"
              className="relative w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg border border-white/30 hover:bg-white/30"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
            </Link>
          </li>
          
          {/* Separator */}
          <li className="flex items-center">
            <div className="relative mx-3">
              <div className="w-6 h-6 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transform rotate-45 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-3 h-3 text-white transform -rotate-45"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </li>
          
          {/* Introduction Item */}
          <li className="flex items-center group">
            <div className="relative">
              <span
                className="relative px-4 py-2 rounded-xl font-bold bg-white/30 backdrop-blur-sm text-white shadow-lg border border-white/30"
                aria-current="page"
              >
                Introduction
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              </span>
            </div>
          </li>
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
