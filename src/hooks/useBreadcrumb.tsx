import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

// Route mapping for better breadcrumb labels
const routeLabels: Record<string, string> = {
  '': 'Home',
  'about-us': 'About',
  'introduction': 'Introduction',
  'leadership': 'Leadership',
  'contact': 'Contact',
  'testimonials': 'Testimonials',
  'reports-financials': 'Reports & Financials',
  'our-works': 'Our Works',
  'courses': 'Courses',
  'partners': 'Partners',
  'donation': 'Donation',
  'media-events': 'Media & Events',
  'working-model': 'Our Working Model',
  'blended-learning': 'Blended Learning Model',
  'discourse-oriented-pedagogy': 'Discourse Oriented Pedagogy',
  'application-of-technology': 'Application Of Technology',
  'partnering-institutions': 'Partnering with Educational Institutions',
  'remote-learning': 'Remote Individual Learning',
  'gallery': 'Gallery',
  'education': 'Education',
  'elementary-middle-school': 'Elementary & Middle School',
  'slum-children': 'Slum Children',
  'public-government-school': 'Public(government) School',
  'girls-education': 'Girls\' Education',
  'out-of-school-dropout': 'Out of School / School Dropout',
  'madrasa': 'Madrasa',
  'teachers-training': 'Teachers Training',
  'skills-training': 'Skills Training',
  'adult-education': 'Adult Education',
  'global-education': 'Global Education'
};

export const useBreadcrumb = (): BreadcrumbItem[] => {
  const location = useLocation();
  
  return useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    
    // Always start with Home
    const breadcrumbs: BreadcrumbItem[] = [
      {
        label: 'Home',
        href: '/',
        isActive: pathSegments.length === 0
      }
    ];

    // Build breadcrumbs from path segments
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      breadcrumbs.push({
        label: routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: isLast ? undefined : currentPath,
        isActive: isLast
      });
    });

    return breadcrumbs;
  }, [location.pathname]);
};

export default useBreadcrumb;
