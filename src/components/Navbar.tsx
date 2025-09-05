import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close any open dropdowns when opening/closing mobile menu
    setActiveDropdown(null);
    setActiveSubmenu([]);
  };

  const toggleDropdown = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    // Close submenu when switching main dropdowns
    setActiveSubmenu([]);
    
    // Scroll to top of mobile menu when opening dropdown on mobile
    if (window.innerWidth <= 1024 && activeDropdown !== dropdownName) {
      setTimeout(() => {
        const navList = document.querySelector('.nav-list.mobile-menu-open');
        if (navList) {
          navList.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const toggleSubmenu = (submenuName: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveSubmenu(prev => 
      prev.includes(submenuName) 
        ? prev.filter(name => name !== submenuName)
        : [...prev, submenuName]
    );
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setActiveSubmenu([]);
  };

  const handleMouseEnter = (dropdownName: string) => {
    // Only activate on desktop, not mobile
    if (window.innerWidth > 1024) {
      setActiveDropdown(dropdownName);
    }
  };

  const handleMouseLeave = () => {
    // Only deactivate on desktop, not mobile
    if (window.innerWidth > 1024) {
      setActiveDropdown(null);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-brand">
        <Link to="/" title="Go to Home Page">
          <img
            src="/neia-logo.svg"
            alt="NEIA - National Educational Innovation Association"
            className="navbar-logo"
            title="NEIA - Click to go home"
          />
        </Link>
        <Link to="/donate" className="mobile-donate-btn">Donate</Link>
        <div className="mobile-bell-icon">
          <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
        </div>
      </div>



      {/* Hamburger Menu Button */}
      <button
        className={`navbar-toggle ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
      <ul className={`nav-list ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <li 
          className={`nav-item ${activeDropdown === 'aboutus' ? 'active' : ''}`}
          onMouseEnter={() => handleMouseEnter('aboutus')}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="dropdown-toggle"
            role="button"
            tabIndex={0}
            onClick={() => toggleDropdown('aboutus')}
          >
            About Us<i className="icon-angle-down" aria-hidden="true"></i>
          </div>
          <ul className={`dropdown-menu ${activeDropdown === 'aboutus' ? 'show' : ''}`}>
            <li><Link className="dropdown-item" title="Introduction" to="/about-us/introduction" onClick={closeMobileMenu}>Introduction</Link></li>
            <li><Link className="dropdown-item" title="Leadership" to="/about-us/leadership">Leadership</Link>            </li>
            <li className={`dropdown-submenu ${activeSubmenu.includes('working-model') ? 'active' : ''}`}>
              <Link 
                className="dropdown-item" 
                title="Our Working Model" 
                to="/about-us/working-model"
                onClick={(e) => toggleSubmenu('working-model', e)}
              >
                Our Working Model<i className="submenu-arrow"></i>
              </Link>
              <ul className="submenu">
                <li className={`dropdown-submenu ${activeSubmenu.includes('blended-learning') ? 'active' : ''}`}>
                  <Link 
                    className="dropdown-item" 
                    title="Blended Learning Model" 
                    to="/about-us/working-model/blended-learning"
                    onClick={(e) => toggleSubmenu('blended-learning', e)}
                  >
                    Blended Learning Model<i className="submenu-arrow"></i>
                  </Link>
                  <ul className="submenu">
                    <li><Link className="dropdown-item" title="Discourse Oriented Pedagogy" to="/about-us/working-model/blended-learning/discourse-oriented-pedagogy">Discourse Oriented Pedagogy</Link></li>
                    <li><Link className="dropdown-item" title="Application Of Technology" to="/about-us/working-model/blended-learning/application-of-technology">Application Of Technology</Link></li>
                  </ul>
                </li>
                <li><Link className="dropdown-item" title="Partnering with Educational Institutions" to="/about-us/working-model/partnering-institutions">Partnering with Educational Institutions</Link></li>
                <li><Link className="dropdown-item" title="Remote Individual Learning" to="/about-us/working-model/remote-learning">Remote Individual Learning</Link></li>
              </ul>
            </li>
            <li><Link className="dropdown-item" title="Testimonials & Featured stories" to="/about-us/testimonials">Testimonials & Featured stories</Link></li>
            <li className={`dropdown-submenu ${activeSubmenu.includes('media-events') ? 'active' : ''}`}>
              <Link 
                className="dropdown-item" 
                title="Media and Events" 
                to="/about-us/media-events"
                onClick={(e) => toggleSubmenu('media-events', e)}
              >
                Media and Events<i className="submenu-arrow"></i>
              </Link>
              <ul className="submenu">
                <li><Link className="dropdown-item" title="Gallery" to="/about-us/media-events/gallery">Gallery</Link></li>
              </ul>
            </li>
            <li><Link className="dropdown-item" title="Reports and Financials" to="/about-us/reports-financials">Reports and Financials</Link></li>
            <li><Link className="dropdown-item" title="Contact us" to="/about-us/contact">Contact us</Link></li>
          </ul>
        </li>

        <li 
          className={`nav-item ${activeDropdown === 'ourwork' ? 'active' : ''}`}
          onMouseEnter={() => handleMouseEnter('ourwork')}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="dropdown-toggle"
            role="button"
            tabIndex={0}
            onClick={() => toggleDropdown('ourwork')}
          >
            Our Works<i className="icon-angle-down" aria-hidden="true"></i>
          </div>
          <ul className={`dropdown-menu ${activeDropdown === 'ourwork' ? 'show' : ''}`}>
            <li className={`dropdown-submenu ${activeSubmenu.includes('education') ? 'active' : ''}`}>
              <Link 
                className="dropdown-item" 
                title="Education" 
                to="/our-works/education"
                onClick={(e) => toggleSubmenu('education', e)}
              >
                Education
                <i className="submenu-arrow"></i>
              </Link>
              <ul className="submenu">
                <li>
                  <Link className="dropdown-item" title="Elementary & Middle School" to="/our-works/education/elementary-middle-school">Elementary & Middle School</Link>
                </li>
                <li>
                  <Link className="dropdown-item" title="Slum children" to="/our-works/education/slum-children">Slum children</Link>
                </li>
                <li>
                  <Link className="dropdown-item" title="Public(government) school" to="/our-works/education/public-government-school">Public(government) school</Link>
                </li>
                <li>
                  <Link className="dropdown-item" title="Girl's Education" to="/our-works/education/girls-education">Girl's Education</Link>
                </li>
                <li>
                  <Link className="dropdown-item" title="Out of school / School Dropout" to="/our-works/education/out-of-school-dropout">Out of school / School Dropout</Link>
                </li>
                <li>
                  <Link className="dropdown-item" title="Madrasa" to="/our-works/education/madrasa">Madrasa</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="dropdown-item" title="Teachers Training" to="/our-works/teachers-training">Teachers Training</Link>
            </li>
            <li>
              <Link className="dropdown-item" title="Skills training" to="/our-works/skills-training">Skills training</Link>
            </li>
            <li>
              <Link className="dropdown-item" title="Adult education" to="/our-works/adult-education">Adult education</Link>
            </li>
            <li>
              <Link className="dropdown-item" title="Global education" to="/our-works/global-education">Global education</Link>
            </li>
          </ul>
        </li>

        <li 
          className={`nav-item ${activeDropdown === 'takeaction' ? 'active' : ''}`}
          onMouseEnter={() => handleMouseEnter('takeaction')}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="dropdown-toggle"
            role="button"
            tabIndex={0}
            onClick={() => toggleDropdown('takeaction')}
          >
            Courses<i className="icon-angle-down" aria-hidden="true"></i>
          </div>
          <ul className={`dropdown-menu ${activeDropdown === 'takeaction' ? 'show' : ''}`}>
            <li>
              <Link className="dropdown-item" title="English Courses" to="/courses/english">English Courses</Link>
            </li>
            <li>
              <Link className="dropdown-item" title="Math Courses" to="/courses/math">Math Courses</Link>
            </li>
            <li>
              <Link className="dropdown-item" title="Science Courses" to="/courses/science">Science Courses</Link>
            </li>
            <li>
              <Link className="dropdown-item" title="Social Science Courses" to="/courses/social-science">Social Science Courses</Link>
            </li>
            <li>
              <Link className="dropdown-item" title="Technical courses" to="/courses/technical">Technical courses</Link>
            </li>
            <li>
              <Link className="dropdown-item" title="Financial & Literacy courses" to="/courses/financial-literacy">Financial & Literacy courses</Link>
            </li>
            <li>
              <Link className="dropdown-item" title="NIOS courses" to="/courses/nios">NIOS courses</Link>
            </li>
            <li>
              <Link className="dropdown-item" title="CBSE courses" to="/courses/cbse">CBSE courses</Link>
            </li>
          </ul>
        </li>

        {/* Duplicate navigation items */}
        <li 
          className={`nav-item ${activeDropdown === 'ourwork2' ? 'active' : ''}`}
          onMouseEnter={() => handleMouseEnter('ourwork2')}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="dropdown-toggle"
            role="button"
            tabIndex={0}
            onClick={() => toggleDropdown('ourwork2')}
          >
            Partners<i className="icon-angle-down" aria-hidden="true"></i>
          </div>
          <ul className={`dropdown-menu ${activeDropdown === 'ourwork2' ? 'show' : ''}`}>
            <li>
              <Link className="dropdown-item" title="Join NEIEA as a Partner" to="/partners/join">Join NEIEA as a Partner</Link>
            </li>
            <li>
              <Link className="dropdown-item" title="Partnering Institutions" to="/partners/institutions">Partnering Institutions</Link>
            </li>
            <li>
              <Link className="dropdown-item" title="Global Partners" to="/partners/global">Global Partners</Link>
            </li>
          </ul>
        </li>

        <li 
          className={`nav-item ${activeDropdown === 'aboutus2' ? 'active' : ''}`}
          onMouseEnter={() => handleMouseEnter('aboutus2')}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="dropdown-toggle"
            role="button"
            tabIndex={0}
            onClick={() => toggleDropdown('aboutus2')}
          >
            Donation<i className="icon-angle-down" aria-hidden="true"></i>
          </div>
          <ul className={`dropdown-menu ${activeDropdown === 'aboutus2' ? 'show' : ''}`}>
            <li>
              <Link className="dropdown-item" title="Be a Partner" to="/donation/be-partner">Be a Partner</Link>
            </li>
            <li>
              <Link className="dropdown-item" title="Volunteer" to="/donation/volunteer">Volunteer</Link>
            </li>
            <li>
              <Link className="dropdown-item" title="Donate" to="/donate">Donate</Link>
            </li>
          </ul>
        </li>

        <li 
          className={`nav-item ${activeDropdown === 'takeaction2' ? 'active' : ''}`}
          onMouseEnter={() => handleMouseEnter('takeaction2')}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="dropdown-toggle"
            role="button"
            tabIndex={0}
            onClick={() => toggleDropdown('takeaction2')}
          >
            NEI USA<i className="icon-angle-down" aria-hidden="true"></i>
          </div>
          <ul className={`dropdown-menu ${activeDropdown === 'takeaction2' ? 'show' : ''}`}>
            <li>
              <Link className="dropdown-item" title="Introduction" to="/nei-usa/introduction">Introduction</Link>
            </li>
          </ul>
        </li>
      </ul>

      {/* Desktop-only Bell Icon and Donate Button - Outside nav-list */}
      <div className="desktop-right-elements">
        <div className="nav-item bell-icon hidden-xs hidden-sm" aria-label="Notifications" role="button">
          <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="24" height="24" viewBox="0 0 24 24" stroke="black" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
        </div>

        <div className="nav-item">
          <Link
            title="Donate"
            to="/donate"
            className="btn btn-yellow donate-button"
          >
            DONATE
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
