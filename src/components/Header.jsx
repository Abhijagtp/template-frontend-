import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaList, FaBook, FaQuestionCircle } from 'react-icons/fa';

function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Site Name */}
        <Link to="/" className="text-2xl font-bold text-navy-900 font-montserrat flex items-center">
          <FaHome className="text-brightBlue mr-2" />
          StudentPortfolios
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link to="/" className="text-navy-900 hover:text-brightBlue font-medium flex items-center">
            <FaHome className="mr-1" />
            Home
          </Link>
          <Link to="/category/1" className="text-navy-900 hover:text-brightBlue font-medium flex items-center">
            <FaList className="mr-1" />
            Categories
          </Link>
          <Link to="/blog/how-to-build-a-standout-portfolio" className="text-navy-900 hover:text-brightBlue font-medium flex items-center">
            <FaBook className="mr-1" />
            Blog
          </Link>
          <Link to="/support" className="text-navy-900 hover:text-brightBlue font-medium flex items-center">
            <FaQuestionCircle className="mr-1" />
            Support
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}

export default Header;