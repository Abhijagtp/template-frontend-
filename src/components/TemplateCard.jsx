import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEye, FaShoppingCart, FaCode, FaPaintBrush, FaFileAlt, FaRedo } from 'react-icons/fa';
import { useState, useEffect, useCallback } from 'react';
import api from '../api';

function TemplateCard({ template }) {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentError, setPaymentError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Preload image
  useEffect(() => {
    if (template?.image) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = template.image;
      document.head.appendChild(link);
    }
  }, [template?.image]);

  const tags = [
    { name: template.category?.name || 'Template', icon: <FaCode className="mr-1" /> },
    { name: template.description?.includes('Creative') ? 'Creative' : 'Minimal', icon: <FaPaintBrush className="mr-1" /> },
    { name: 'Resume-ready', icon: <FaFileAlt className="mr-1" /> },
  ];

  const handlePayment = useCallback(async () => {
    if (!email) {
      setPaymentError('Please enter your email address.');
      return;
    }
    setPaymentError(null);

    try {
      const response = await api.post(`/api/templates/${template.id}/initiate-payment/`, {
        email,
        phone,
      });
      const { payment_session_id, order_id } = response.data;

      if (!payment_session_id) {
        setPaymentError('Payment session ID not received. Please try again.');
        return;
      }

      if (!window.Cashfree) {
        setPaymentError('Payment gateway not loaded. Please try again.');
        return;
      }

      const cashfree = new window.Cashfree({
        mode: import.meta.env.VITE_CASHFREE_MODE || 'sandbox',
      });

      cashfree
        .checkout({
          paymentSessionId: payment_session_id,
          returnUrl: `${
            import.meta.env.VITE_APP_URL || 'http://localhost:5173'
          }/payment-status?order_id=${order_id}`,
        })
        .then(() => {
          console.log('Payment initiated successfully');
        })
        .catch((error) => {
          console.error('Payment initiation failed:', error);
          setPaymentError('Failed to initiate payment. Please try again.');
        });
    } catch (error) {
      console.error('Payment Initiation Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        code: error.code,
      });
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.cashfree_error ||
        'Failed to initiate payment. Please try again later.';
      setPaymentError(errorMessage);
    }
  }, [email, phone, template.id]);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoading(false);
    console.log('TemplateCard Image failed to load:', template.image);
  }, [template.image]);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  const handleRetryImage = useCallback(() => {
    setImageError(false);
    setImageLoading(true);
  }, []);

  return (
    <>
      <motion.div
        whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
        className="bg-white border border-gray-200 shadow-lg p-6 rounded-lg"
      >
        {/* Main Image */}
        <div className="relative overflow-hidden rounded-lg mb-4">
          {imageLoading && (
            <div className="w-full h-48 flex items-center justify-center bg-gray-100">
              <div className="animate-pulse h-48 w-full bg-gray-300 rounded-lg"></div>
            </div>
          )}
          {!imageLoading && imageError ? (
            <div className="w-full h-48 flex flex-col items-center justify-center bg-gray-100">
              <p className="text-red-500 mb-2">Failed to load image</p>
              <button
                onClick={handleRetryImage}
                className="flex items-center text-brightBlue hover:underline"
                aria-label="Retry loading image"
              >
                <FaRedo className="mr-1" />
                Retry
              </button>
            </div>
          ) : (
            <img
              src={template.image || 'https://via.placeholder.com/300'}
              alt={template.title || 'Template Image'}
              className={`w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300 ${imageLoading ? 'hidden' : 'block'}`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
          )}
          {/* Overlay for hover effect */}
          {!imageError && (
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
                Quick View
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <h3 className="text-lg font-semibold text-navy-900 mb-2 truncate">{template.title || 'Untitled'}</h3>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{template.description || 'No description available.'}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag.name}
              className="bg-lightBlue text-brightBlue text-xs font-medium px-2 py-1 rounded-lg flex items-center"
            >
              {tag.icon}
              {tag.name}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <Link
            to={`/template/${template.id}`}
            className="text-brightBlue font-medium hover:underline flex items-center"
            aria-label="View Template Details"
          >
            <FaEye className="mr-2" />
            View Details
          </Link>
          <button
            onClick={() => setShowEmailModal(true)}
            className="bg-brightBlue text-white font-semibold px-4 py-2 rounded-lg hover:bg-brightBlue/90 transition-colors flex items-center shadow-sm"
            aria-label="Buy Now"
          >
            <FaShoppingCart className="mr-2" />
            Buy Now
          </button>
        </div>
      </motion.div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">Enter Your Details</h2>
            {paymentError && <p className="text-red-500 mb-4">{paymentError}</p>}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-1" htmlFor="card-email-input">
                  Email
                </label>
                <input
                  id="card-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-lightBlue border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brightBlue"
                  placeholder="Enter your email"
                  required
                  aria-required="true"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Please ensure this email is correct, as it will be used to send your template file.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-1" htmlFor="card-phone-input">
                  Phone (Optional)
                </label>
                <input
                  id="card-phone-input"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-lightBlue border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brightBlue"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowEmailModal(false)}
                className="bg-gray-300 text-navy-900 font-semibold px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                aria-label="Cancel"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="bg-brightBlue text-white font-semibold px-4 py-2 rounded-lg hover:bg-brightBlue/90 transition-colors"
                aria-label="Proceed to Pay"
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TemplateCard;