import React, { useEffect } from "react";

// Declare wisepops function for TypeScript
declare global {
  interface Window {
    wisepops: any;
  }
}

const HeaderNav: React.FC = () => {
  useEffect(() => {
    // Wisepops integration script
    (function (w: string, i: string, s: HTMLScriptElement, e: HTMLScriptElement) {
      window[w as any] = window[w as any] || function () {
        (window[w as any].q = window[w as any].q || []).push(arguments);
      };
      window[w as any].l = Date.now();
      s = document.createElement("script");
      e = document.getElementsByTagName("script")[0];
      s.defer = 1;
      s.src = i;
      e.parentNode!.insertBefore(s, e);
    })("wisepops", "https://wisepops.net/loader.js?v=2&h=gtf6cxZFkB");
  }, []);

  return (
    <header className="header-nav">
      <div className="container">
        <div className="header-menu">
          <h2>Room to Read Header Navigation</h2>
          <nav>
            <ul className="nav-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
