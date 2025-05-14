import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

function ThankYou() {
  const location = useLocation();
  const name = new URLSearchParams(location.search).get('name') || 'Student';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-16 h-16 bg-pastel-green rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-navy-900 mb-4">
          Thanks for your purchase, {name}!
        </h1>
        <p className="text-gray-600 mb-8">
          We’ve emailed your template download link. Start building your portfolio now!
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/"
            className="bg-pastel-blue text-white px-6 py-3 rounded-full hover:bg-pastel-blue/80 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            to="/category/1"
            className="bg-pastel-pink text-white px-6 py-3 rounded-full hover:bg-pastel-pink/80 transition-colors"
          >
            Explore More
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ThankYou;