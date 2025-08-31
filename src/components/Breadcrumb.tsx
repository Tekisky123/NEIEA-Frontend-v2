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
    <nav className={`bg-white border-b border-gray-200 py-4 shadow-sm mt-[60px] md:lg:mt-[140px] ${className}`} aria-label="Breadcrumb">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          {/* Home Icon for first item */}
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index === 0 && (
                <svg
                  className="w-4 h-4 text-gray-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              )}
              
              {index > 0 && (
                <svg
                  className="w-4 h-4 text-gray-400 mx-3"
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
              )}
              
              {item.href && !item.isActive ? (
                <Link
                  to={item.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`${
                    item.isActive
                      ? 'text-blue-700 font-semibold'
                      : 'text-gray-500'
                  }`}
                  aria-current={item.isActive ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
