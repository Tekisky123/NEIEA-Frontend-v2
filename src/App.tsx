import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import NotFound from './pages/NotFound.tsx';
import Courses from './pages/Courses.tsx';
import './App.css';
import Introduction from './pages/aboutUs/Introduction.tsx';
import Leadership from './pages/aboutUs/Leadership.tsx';
import ReportsAndFinancials from './pages/aboutUs/ReportsAndFinancials.tsx';
import TestimonialsFeaturedStories from './pages/aboutUs/TestimonialsFeaturedStories.tsx';
import ContactUs from './pages/aboutUs/ContactUs.tsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us/introduction" element={<Introduction />} />
          <Route path="/about-us/leadership" element={<Leadership />} />
          <Route path="/about-us/reports-financials" element={<ReportsAndFinancials />} />
          <Route path="/about-us/testimonials" element={<TestimonialsFeaturedStories />} />
          <Route path="/about-us/contact" element={<ContactUs />} />
          <Route path="/about-us/our-working-model/blended-learning/discourse-oriented-pedagogy" element={<><h1>Discourse-oriented-pedagogy</h1></>} />

          <Route path="/our-works/*" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Our Works - Coming Soon</h1></div>} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:category" element={<Courses />} />
          <Route path="/partners/*" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Partners - Coming Soon</h1></div>} />
          <Route path="/donation/*" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Donation - Coming Soon</h1></div>} />
          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
