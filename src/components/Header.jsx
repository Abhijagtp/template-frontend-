// src/components/Header.jsx
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaList, FaBook, FaQuestionCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Animation variants for mobile menu
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Site Name */}
        <Link
          to="/"
          className="text-2xl font-bold text-navy-900 font-montserrat flex items-center"
          onClick={() => setIsMenuOpen(false)} // Close menu on logo click
        >
          <FaHome className="text-brightBlue mr-2" />
          StudentPortfolios
        </Link>

        {/* Hamburger Icon for Small Devices */}
        <button
          className="sm:hidden text-navy-900 focus:outline-none"
          onClick={toggleMenu}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleMenu()}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navigation Links - Desktop */}
        <nav className="hidden sm:flex space-x-6">
          <Link
            to="/"
            className="text-navy-900 hover:text-brightBlue font-medium flex items-center"
          >
            <FaHome className="mr-1" />
            Home
          </Link>
          <Link
            to="/category/1"
            className="text-navy-900 hover:text-brightBlue font-medium flex items-center"
          >
            <FaList className="mr-1" />
            Categories
          </Link>
          <Link
            to="/blog/how-to-build-a-standout-portfolio"
            className="text-navy-900 hover:text-brightBlue font-medium flex items-center"
          >
            <FaBook className="mr-1" />
            Blog
          </Link>
          <Link
            to="/support"
            className="text-navy-900 hover:text-brightBlue font-medium flex items-center"
          >
            <FaQuestionCircle className="mr-1" />
            Support
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="sm:hidden bg-white shadow-md mt-4 rounded-lg overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="flex flex-col space-y-4 p-4">
              <Link
                to="/"
                className="text-navy-900 hover:text-brightBlue font-medium flex items-center"
                onClick={toggleMenu}
              >
                <FaHome className="mr-2" />
                Home
              </Link>
              <Link
                to="/category/1"
                className="text-navy-900 hover:text-brightBlue font-medium flex items-center"
                onClick={toggleMenu}
              >
                <FaList className="mr-2" />
                Categories
              </Link>
              <Link
                to="/blog/how-to-build-a-standout-portfolio"
                className="text-navy-900 hover:text-brightBlue font-medium flex items-center"
                onClick={toggleMenu}
              >
                <FaBook className="mr-2" />
                Blog
              </Link>
              <Link
                to="/support"
                className="text-navy-900 hover:text-brightBlue font-medium flex items-center"
                onClick={toggleMenu}
              >
                <FaQuestionCircle className="mr-2" />
                Support
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;