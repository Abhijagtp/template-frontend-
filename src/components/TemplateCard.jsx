import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEye, FaShoppingCart, FaCode, FaPaintBrush, FaFileAlt } from 'react-icons/fa';
import { useState } from 'react';
import api from '../api'; // Import the configured axios instance

function TemplateCard({ template }) {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentError, setPaymentError] = useState(null);

  const tags = [
    { name: template.category?.name || 'Template', icon: <FaCode className="mr-1" /> },
    { name: template.description?.includes('Creative') ? 'Creative' : 'Minimal', icon: <FaPaintBrush className="mr-1" /> },
    { name: 'Resume-ready', icon: <FaFileAlt className="mr-1" /> },
  ];

  const handlePayment = async () => {
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
      console.log('API Base URL:', api.defaults.baseURL);
      console.log('Payment Initiation Response:', response.data);
      const { payment_session_id, order_id } = response.data;

      if (!payment_session_id) {
        setPaymentError('Payment session ID not received. Please try again.');
        return;
      }

      const cashfree = new window.Cashfree({
        mode: 'production', // Use 'production' for live environment
      });

      cashfree.checkout({
        paymentSessionId: payment_session_id,
        returnUrl: `${
          process.env.REACT_APP_FRONTEND_URL || 'http://localhost:5173'
        }/payment-status?order_id=${order_id}`,
      }).then(() => {
        console.log('Payment initiated successfully');
      }).catch((error) => {
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
      if (error.response) {
        setPaymentError(
          error.response.data.cashfree_error
            ? `Failed to initiate payment: ${error.response.data.cashfree_error}`
            : 'Failed to initiate payment. Please try again.'
        );
      } else if (error.request) {
        setPaymentError('No response received from server. Please try again.');
      } else {
        setPaymentError('Failed to initiate payment. Please try again.');
      }
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
        className="bg-white border border-gray-200 shadow-lg p-6"
      >
        <img
          src={template.image || 'https://via.placeholder.com/300'}
          alt={template.title}
          className="w-full h-48 object-cover rounded-lg mb-4 transform hover:scale-105 transition-transform duration-300"
        />
        <h3 className="text-lg font-semibold text-navy-900 mb-2">{template.title}</h3>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{template.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <span
              key={tag.name}
              className="bg-lightBlue text-brightBlue text-xs font-medium px-2 py-1 rounded-lg flex items-center"
            >
              {tag.icon}
              {tag.name}
            </span>
          ))}
        </div>
        <div className="flex justify-between">
          <Link
            to={`/template/${template.id}`}
            className="text-brightBlue font-medium hover:underline flex items-center"
          >
            <FaEye className="mr-2" />
            View Details
          </Link>
          <button
            onClick={() => setShowEmailModal(true)}
            className="bg-brightBlue text-white font-semibold px-4 py-2 rounded-lg hover:bg-brightBlue/90 transition-colors flex items-center shadow-sm"
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
                <label className="block text-sm font-medium text-navy-900 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-lightBlue border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brightBlue"
                  placeholder="Enter your email"
                  required
                />
                <p className="text-sm text-gray-600 mt-1">
                  Please ensure this email is correct, as it will be used to send your template file.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-1">Phone (Optional)</label>
                <input
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
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="bg-brightBlue text-white font-semibold px-4 py-2 rounded-lg hover:bg-brightBlue/90 transition-colors"
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