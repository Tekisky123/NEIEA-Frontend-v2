import React, { useState } from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // const toggleDropdown = (dropdownName: string) => {
  //   setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  // };

  const handleMouseEnter = (dropdownName: string) => {
    setActiveDropdown(dropdownName);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/" title="Go to Home Page">
          <img
            src="/neia-logo.svg"
            alt="NEIA - National Educational Innovation Association"
            className="navbar-logo"
            title="NEIA - Click to go home"
          />
        </a>
        <a href="/donation/donate" className="mobile-donate-btn">Donate</a>
        <div className="mobile-bell-icon">
          <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
        </div>
      </div>



      {/* Hamburger Menu Button */}
      <button
        className="navbar-toggle"
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
          >
            About Us<i className="icon-angle-down" aria-hidden="true"></i>
          </div>
          <ul className={`dropdown-menu ${activeDropdown === 'aboutus' ? 'show' : ''}`}>
            <li><a className="dropdown-item" title="Introduction" href="/about-us/introduction">Introduction</a></li>
            <li><a className="dropdown-item" title="Leadership" href="/about-us/leadership">Leadership</a>            </li>
            <li className="dropdown-submenu"><a className="dropdown-item" title="Our Working Model" href="/about-us/working-model">Our Working Model<i className="submenu-arrow"></i></a>
              <ul className="submenu">
                <li className="dropdown-submenu"><a className="dropdown-item" title="Blended Learning Model" href="/about-us/working-model/blended-learning">Blended Learning Model<i className="submenu-arrow"></i></a>
                  <ul className="submenu">
                    <li><a className="dropdown-item" title="Discourse Oriented Pedagogy" href="/about-us/working-model/blended-learning/discourse-oriented-pedagogy">Discourse Oriented Pedagogy</a></li>
                    <li><a className="dropdown-item" title="Application Of Technology" href="/about-us/working-model/blended-learning/application-of-technology">Application Of Technology</a></li>
                  </ul>
                </li>
                <li><a className="dropdown-item" title="Partnering with Educational Institutions" href="/about-us/working-model/partnering-institutions">Partnering with Educational Institutions</a></li>
                <li><a className="dropdown-item" title="Remote Individual Learning" href="/about-us/working-model/remote-learning">Remote Individual Learning</a></li>
              </ul>
            </li>
            <li><a className="dropdown-item" title="Testimonials & Featured stories" href="/about-us/testimonials">Testimonials & Featured stories</a></li>
            <li className="dropdown-submenu"><a className="dropdown-item" title="Media and Events" href="/about-us/media-events">Media and Events<i className="submenu-arrow"></i></a>
              <ul className="submenu">
                <li><a className="dropdown-item" title="Gallery" href="/about-us/media-events/gallery">Gallery</a></li>
              </ul>
            </li>
            <li><a className="dropdown-item" title="Reports and Financials" href="/about-us/reports-financials">Reports and Financials</a></li>
            <li><a className="dropdown-item" title="Contact us" href="/about-us/contact">Contact us</a></li>
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
          >
            Our Works<i className="icon-angle-down" aria-hidden="true"></i>
          </div>
          <ul className={`dropdown-menu ${activeDropdown === 'ourwork' ? 'show' : ''}`}>
            <li className="dropdown-submenu">
              <a className="dropdown-item" title="Education" href="/our-works/education">
                Education
                <i className="submenu-arrow"></i>
              </a>
              <ul className="submenu">
                <li>
                  <a className="dropdown-item" title="Elementary & Middle School" href="/our-works/education/elementary-middle-school">Elementary & Middle School</a>
                </li>
                <li>
                  <a className="dropdown-item" title="Slum children" href="/our-works/education/slum-children">Slum children</a>
                </li>
                <li>
                  <a className="dropdown-item" title="Public(government) school" href="/our-works/education/public-government-school">Public(government) school</a>
                </li>
                <li>
                  <a className="dropdown-item" title="Girl's Education" href="/our-works/education/girls-education">Girl's Education</a>
                </li>
                <li>
                  <a className="dropdown-item" title="Out of school / School Dropout" href="/our-works/education/out-of-school-dropout">Out of school / School Dropout</a>
                </li>
                <li>
                  <a className="dropdown-item" title="Madrasa" href="/our-works/education/madrasa">Madrasa</a>
                </li>
              </ul>
            </li>
            <li>
              <a className="dropdown-item" title="Teachers Training" href="/our-works/teachers-training">Teachers Training</a>
            </li>
            <li>
              <a className="dropdown-item" title="Skills training" href="/our-works/skills-training">Skills training</a>
            </li>
            <li>
              <a className="dropdown-item" title="Adult education" href="/our-works/adult-education">Adult education</a>
            </li>
            <li>
              <a className="dropdown-item" title="Global education" href="/our-works/global-education">Global education</a>
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
          >
            Courses<i className="icon-angle-down" aria-hidden="true"></i>
          </div>
          <ul className={`dropdown-menu ${activeDropdown === 'takeaction' ? 'show' : ''}`}>
            <li>
              <a className="dropdown-item" title="English Courses" href="/courses/english">English Courses</a>
            </li>
            <li>
              <a className="dropdown-item" title="Math Courses" href="/courses/math">Math Courses</a>
            </li>
            <li>
              <a className="dropdown-item" title="Science Courses" href="/courses/science">Science Courses</a>
            </li>
            <li>
              <a className="dropdown-item" title="Social Science Courses" href="/courses/social-science">Social Science Courses</a>
            </li>
            <li>
              <a className="dropdown-item" title="Technical courses" href="/courses/technical">Technical courses</a>
            </li>
            <li>
              <a className="dropdown-item" title="Financial & Literacy courses" href="/courses/financial-literacy">Financial & Literacy courses</a>
            </li>
            <li>
              <a className="dropdown-item" title="NIOS courses" href="/courses/nios">NIOS courses</a>
            </li>
            <li>
              <a className="dropdown-item" title="CBSE courses" href="/courses/cbse">CBSE courses</a>
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
          >
            Partners<i className="icon-angle-down" aria-hidden="true"></i>
          </div>
          <ul className={`dropdown-menu ${activeDropdown === 'ourwork2' ? 'show' : ''}`}>
            <li>
              <a className="dropdown-item" title="Partnering Institutions" href="/partners/institutions">Partnering Institutions</a>
            </li>
            <li>
              <a className="dropdown-item" title="Join NEIEA as a Partner" href="/partners/join">Join NEIEA as a Partner</a>
            </li>
            <li className="dropdown-submenu">
              <a className="dropdown-item" title="Global Partners" href="/partners/global">
                Global Partners
              </a>
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
          >
            Donation<i className="icon-angle-down" aria-hidden="true"></i>
          </div>
          <ul className={`dropdown-menu ${activeDropdown === 'aboutus2' ? 'show' : ''}`}>
            <li>
              <a className="dropdown-item" title="Be a Partner" href="/donation/be-partner">Be a Partner</a>
            </li>
            <li>
              <a className="dropdown-item" title="Volunteer" href="/donation/volunteer">Volunteer</a>
            </li>
            <li>
              <a className="dropdown-item" title="Donate" href="/donation/donate">Donate</a>
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
          >
            NEI USA<i className="icon-angle-down" aria-hidden="true"></i>
          </div>
          <ul className={`dropdown-menu ${activeDropdown === 'takeaction2' ? 'show' : ''}`}>
            <li>
              <a className="dropdown-item" title="Introduction" href="/nei-usa/introduction">Introduction</a>
            </li>
          </ul>
        </li>

        <li className="nav-item bell-icon hidden-xs hidden-sm" aria-label="Notifications" role="button">
          <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="24" height="24" viewBox="0 0 24 24" stroke="black" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
        </li>

        <li className="nav-item">
          <a
            title="Donate"
            href="/donation/donate"
            className="btn btn-yellow donate-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            DONATE
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
