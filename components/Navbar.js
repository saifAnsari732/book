import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import BookCard from './BookCard';
import { Router, useRouter } from 'next/router';

const Navbar = () => {

  const { user, isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

    const router = useRouter();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-btn')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800;900&display=swap');

        .navbar-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Poppins', sans-serif;
          backdrop-filter: blur(20px);
          background: ${scrolled 
            ? 'rgba(255, 255, 255, 0.98)' 
            : 'rgba(255, 255, 255, 0.95)'};
          border-bottom: ${scrolled 
            ? '1px solid rgba(102, 126, 234, 0.15)' 
            : '1px solid rgba(102, 126, 234, 0.1)'};
          box-shadow: ${scrolled 
            ? '0 10px 30px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.3)' 
            : '0 4px 20px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.2)'};
        }

        .logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 900;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.3s ease;
          text-decoration: none;
        }

        .logo:hover {
          transform: scale(1.05);
        }

        .logo-icon {
          font-size: 1.8rem;
          animation: bounce 3s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        .nav-link {
          color: #475569;
          font-weight: 500;
          font-size: 0.9rem;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }

        .nav-link:hover {
          color: #667eea;
          background: rgba(102, 126, 234, 0.08);
          transform: translateY(-2px);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .nav-link:hover::after {
          transform: translateX(0);
        }

        .add-book-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.85rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
          position: relative;
          overflow: hidden;
          text-decoration: none;
          border: none;
          cursor: pointer;
        }

        .add-book-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
        }

        .add-book-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .add-book-btn:hover::before {
          left: 100%;
        }

        .user-welcome {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.6rem 1rem;
          background: rgba(102, 126, 234, 0.05);
          border-radius: 50px;
          border: 1px solid rgba(102, 126, 234, 0.1);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.85rem;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-weight: 600;
          color: #1e293b;
          font-size: 0.85rem;
        }

        .user-role {
          font-size: 0.7rem;
          color: #667eea;
          font-weight: 500;
          background: rgba(102, 126, 234, 0.1);
          padding: 1px 6px;
          border-radius: 15px;
          margin-top: 2px;
        }

        .logout-btn {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 0.6rem 1.2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.85rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(239, 68, 68, 0.2);
          cursor: pointer;
        }

        .logout-btn:hover {
          background: #ef4444;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
        }

        .auth-buttons {
          display: flex;
          gap: 0.8rem;
          align-items: center;
        }

        .login-btn {
          color: #667eea;
          font-weight: 500;
          padding: 0.6rem 1.2rem;
          border-radius: 50px;
          transition: all 0.3s ease;
          border: 1px solid rgba(102, 126, 234, 0.3);
          text-decoration: none;
          display: inline-block;
        }

        .login-btn:hover {
          background: rgba(102, 126, 234, 0.08);
          border-color: #667eea;
          transform: translateY(-2px);
        }

        .register-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
          text-decoration: none;
          display: inline-block;
        }

        .register-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: flex;
          flex-direction: column;
          gap: 4px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
          z-index: 1001;
        }

        .mobile-menu-btn:hover {
          background: rgba(102, 126, 234, 0.1);
        }

        .mobile-menu-btn span {
          width: 22px;
          height: 2px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .mobile-menu-btn.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-btn.open span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-btn.open span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          padding: 1.5rem;
          border-top: 1px solid rgba(102, 126, 234, 0.1);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          animation: slideDown 0.3s ease-out;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 999;
          max-height: calc(100vh - 70px);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .separator {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.3), transparent);
          margin: 0.5rem 0;
        }

        /* Desktop Styles - Hide mobile button and show desktop menu */
        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none;
          }
          
          .mobile-menu {
            display: none !important;
          }
        }

        /* Mobile Styles - Hide desktop elements */
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          
          .desktop-auth {
            display: none;
          }
          
          .desktop-user {
            display: none;
          }
          
          .logo {
            font-size: 1.4rem;
          }
          
          .logo-icon {
            font-size: 1.6rem;
          }
        }

        /* Small Mobile Styles */
        @media (max-width: 480px) {
          .logo {
            font-size: 1.2rem;
          }
          
          .logo-icon {
            font-size: 1.4rem;
          }
          
          .mobile-menu {
            padding: 1rem;
            gap: 0.8rem;
          }
          
          .nav-link {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
          }
          
          .add-book-btn, .login-btn, .register-btn, .logout-btn {
            padding: 0.7rem 1rem;
            font-size: 0.85rem;
          }
        }

        /* Prevent body scroll when menu is open */
        body.menu-open {
          overflow: hidden;
        }

        /* Touch-friendly tap targets */
        .nav-link, .add-book-btn, .login-btn, .register-btn, .logout-btn {
          -webkit-tap-highlight-color: transparent;
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <nav className="navbar-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="logo text-red-40 font-semibold text-2xl">
              <span className="logo-icon text-2xl!">📚</span>
              LibraryHub
            </Link>

            {/* Desktop Navigation Links */}

            {/* Desktop Right Section */}
            <div className="desktop-auth hidden md:flex items-center space-x-3">
              {isAdmin && (
                <Link href="/admin/books/new" className="add-book-btn lg:bg-primary-600 p-2 rounded-3xl">
                  <span>+</span> Add Book
                </Link>
              )}

              {user ? (
                <div className="desktop-user flex items-center space-x-3">
                  <div className="user-welcome">
                    <div className="user-avatar">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      {isAdmin && <span className="user-role">Admin</span>}
                    </div>
                  </div>
                  <button onClick={logout} className="logout-btn">
                    <span>🚪</span> Logout
                  </button>
                </div>
              ) : (
                <div className="auth-buttons ml-6">
                  <Link href="/login" className="login-btn bg-cyan-700 text-white  border-2 border-cyan-300 rounded-3xl py-2 px-5 ">
                    Login
                  </Link>
                  <Link href="/register" className="register-btn mr-9 bg-cyan-700 text-white  border-2 border-cyan-300 rounded-3xl py-2 px-5">
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className={`mobile-menu-btn md:hidden ${isOpen ? 'open' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu md:hidden">
          <div className="flex flex-col space-y-10">
           
        
            
            {isAdmin && (
              <>
  

                <Link 
                  href="/admin/books/new" 
                  className="add-book-btn justify-center bg-slate-200 p-4 rounded-3xl"
                  onClick={() => setIsOpen(false)}
                >
                  <span>+</span> Add Book
                </Link>
              </>
            )}
      

            <div className="separator"></div>

            {user ? (
              <div className="space-y-3">
                <div className="user-welcome">
                  <div className="user-avatar">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    {isAdmin && <span className="user-role">Admin</span>}
                  </div>
                </div>
                <button 
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }} 
                  className="logout-btn w-full justify-center"
                >
                  <span>🚪</span> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link 
                  href="/login" 
                  className="login-btn text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="register-btn text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;