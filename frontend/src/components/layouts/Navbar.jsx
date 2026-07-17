import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Briefcase, Monitor, Wrench, Calculator, Utensils, HeartPulse, Cpu, Leaf, Menu, X, LogIn } from 'lucide-react';

const courses = [
  { name: 'Management', path: '/management', icon: Briefcase },
  { name: 'Computer', path: '/computer', icon: Monitor },
  { name: 'Technical', path: '/technical', icon: Wrench },
  { name: 'Accounting', path: '/accounting', icon: Calculator },
  { name: 'Hotel & Hospitality', path: '/hotel-hospitality', icon: Utensils },
  { name: 'Health & Care', path: '/health-care', icon: HeartPulse },
  { name: 'Engineering & Technology', path: '/engineering-technology', icon: Cpu },
  { name: 'Agriculture', path: '/agriculture', icon: Leaf },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  
  const isSolidNavbar = !isHomePage || scrolled;

  const textColor = isSolidNavbar ? 'text-[#031B33]' : 'text-white';
  const hoverColor = 'hover:text-[#BE9A4A]';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolidNavbar ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center max-w-7xl">
        
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-white rounded-full p-1 shadow-sm">
            <img 
              src="/Logo.jpeg" 
              alt="Logo" 
              className="h-10 w-10 object-contain rounded-full"
            />
          </div>
          <span className={`font-bold text-lg md:text-xl tracking-wide transition-colors ${textColor} group-hover:text-[#BE9A4A]`}>
            Brightcore Global Academy
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={`font-medium transition-colors ${textColor} ${hoverColor}`}>
            Home
          </Link>
          
          <div 
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className={`flex items-center gap-1 font-medium transition-colors ${dropdownOpen ? 'text-[#BE9A4A]' : `${textColor} ${hoverColor}`}`}>
              Courses <ChevronDown size={18} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[500px] bg-white rounded-xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100"
                >
                  <div className="absolute -top-6 left-0 w-full h-6 bg-transparent"></div>
                  
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {courses.map((course) => (
                      <Link
                        key={course.path}
                        to={course.path}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-all group"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <course.icon size={24} className="text-[#BE9A4A] flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <div className="w-[2px] h-8 bg-[#031B33] opacity-20"></div>
                        <span className="font-semibold text-[#031B33] text-sm group-hover:text-[#BE9A4A] transition-colors">
                          {course.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/certificate-tracking" className={`font-medium transition-colors ${textColor} ${hoverColor}`}>
            Certificate Tracking
          </Link>

          <Link to="/about" className={`font-medium transition-colors ${textColor} ${hoverColor}`}>
            About
          </Link>

          <Link to="/contact" className={`font-medium transition-colors ${textColor} ${hoverColor}`}>
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/admin/login" 
            className={`flex items-center gap-2 font-medium transition-colors ${textColor} ${hoverColor}`}
          >
            <LogIn size={18} />
            Login
          </Link>
          <Link 
            to="/apply" 
            className={`px-7 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-md ${
              isSolidNavbar 
                ? 'bg-[#031B33] text-white hover:bg-[#BE9A4A]' 
                : 'bg-white text-[#031B33] hover:bg-[#BE9A4A] hover:text-white'
            }`}
          >
            Apply Now
          </Link>
        </div>

        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} className={textColor} /> : <Menu size={28} className={textColor} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl absolute w-full top-full"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-[#031B33] font-medium py-2 border-b border-gray-100">Home</Link>
              
              <div className="py-2 border-b border-gray-100">
                <span className="text-gray-400 text-xs mb-3 block uppercase tracking-wider font-bold">Courses</span>
                <div className="grid grid-cols-1 gap-3 pl-2">
                  {courses.map(course => (
                    <Link key={course.path} to={course.path} onClick={() => setMobileMenuOpen(false)} className="text-[#031B33] flex items-center gap-3 py-1 hover:text-[#BE9A4A] font-medium text-sm">
                      <course.icon size={16} className="text-[#BE9A4A]" /> 
                      {course.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link to="/certificate-tracking" onClick={() => setMobileMenuOpen(false)} className="text-[#031B33] font-medium py-2 border-b border-gray-100">Certificate Tracking</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-[#031B33] font-medium py-2 border-b border-gray-100">About</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-[#031B33] font-medium py-2 border-b border-gray-100">Contact</Link>
              <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)} className="text-[#031B33] font-medium py-2 border-b border-gray-100 flex items-center gap-2">
                <LogIn size={18} className="text-[#BE9A4A]" /> Login
              </Link>
              
              <Link to="/apply" onClick={() => setMobileMenuOpen(false)} className="bg-[#031B33] text-white text-center font-semibold py-3 rounded-lg mt-4 shadow-md hover:bg-[#BE9A4A] transition-colors">
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;