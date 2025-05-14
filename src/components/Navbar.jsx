import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="sticky top-0 bg-white shadow-md z-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-brightBlue">TemplateHub</h1>
        <div className="flex space-x-6">
          <Link
            to="/"
            className="text-navy-900 hover:text-brightBlue font-medium transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/category/1"
            className="text-navy-900 hover:text-brightBlue font-medium transition-colors duration-300"
          >
            React
          </Link>
          <Link
            to="/category/2"
            className="text-navy-900 hover:text-brightBlue font-medium transition-colors duration-300"
          >
            HTML
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;