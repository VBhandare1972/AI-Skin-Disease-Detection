import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Predict', path: '/predict' },
    { name: 'Hospitals', path: '/hospitals' },
    { name: 'Feedback', path: '/feedback' },
  ];

  // Get user's first name
  const getFirstName = () => {
    if (!user || !user.name) return 'User';
    return user.name.split(' ')[0];
  };

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled 
        ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20' 
        : 'bg-transparent'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#088395] to-[#37B7C3] rounded-lg rotate-3 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-[#09637E] to-[#088395] bg-clip-text text-transparent">
              SkinCare AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  relative px-3 py-2 text-sm font-medium transition-colors duration-300
                  ${location.pathname === link.path
                    ? 'text-[#088395]'
                    : 'text-gray-700 hover:text-[#088395]'
                  }
                  group
                `}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#088395] to-[#37B7C3] rounded-full" />
                )}
              </Link>
            ))}

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/30 backdrop-blur-sm border border-white/50 hover:bg-[#088395] hover:text-white transition-all duration-300 group"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-[#088395] to-[#37B7C3] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm font-medium">{getFirstName()}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border-2 border-[#088395] text-[#088395] hover:bg-[#088395] hover:text-white transition-all duration-300 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#088395] to-[#37B7C3] text-white hover:shadow-lg hover:shadow-[#088395]/30 transition-all duration-300 text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-white/30 backdrop-blur-sm border border-white/50"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    px-4 py-2 rounded-lg transition-colors
                    ${location.pathname === link.path
                      ? 'bg-[#088395]/10 text-[#088395]'
                      : 'text-gray-700 hover:bg-white/30'
                    }
                  `}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-white/20">
                {user ? (
                  <>
                    <div className="px-4 py-2 mb-2 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#088395] to-[#37B7C3] rounded-full flex items-center justify-center text-white font-bold">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <span className="font-medium text-gray-700">{user.name}</span>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-2 mb-2 bg-[#088395]/10 text-[#088395] rounded-lg text-center"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="block w-full px-4 py-2 bg-red-500 text-white rounded-lg text-center"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-2 text-center border-2 border-[#088395] text-[#088395] rounded-lg"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-2 text-center bg-gradient-to-r from-[#088395] to-[#37B7C3] text-white rounded-lg"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;