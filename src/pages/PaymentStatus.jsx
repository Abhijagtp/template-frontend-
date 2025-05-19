// src/pages/PaymentStatus.jsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api'; // Use the configured axios instance
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function PaymentStatus() {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const orderId = query.get('order_id');

    if (orderId) {
      // Fetch payment status from backend
      const checkPaymentStatus = async () => {
        try {
          const response = await api.get(`/api/payments/${orderId}/`);
          setPayment(response.data);
          setLoading(false);
        } catch (err) {
          setError(err.message || 'Failed to fetch payment status.');
          setLoading(false);
        }
      };

      // Poll for status updates (since webhook might take a few seconds)
      checkPaymentStatus();
      const interval = setInterval(checkPaymentStatus, 5000); // Check every 5 seconds
      return () => clearInterval(interval); // Cleanup on unmount
    } else {
      setError('Invalid payment request.');
      setLoading(false);
    }
  }, [location]);

  if (loading) {
    return (
      <div className="min-h-screen bg-lightBlue flex items-center justify-center">
        <div className="bg-white border border-gray-200 shadow-lg p-8 rounded-lg text-center">
          <h1 className="text-2xl font-bold text-navy-900 mb-2">Processing Payment...</h1>
          <p className="text-gray-700">Please wait while we verify your payment.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-lightBlue flex items-center justify-center">
        <div className="bg-white border border-gray-200 shadow-lg p-8 rounded-lg text-center">
          <FaTimesCircle className="text-red-500 text-6xl mb-4" />
          <h1 className="text-2xl font-bold text-navy-900 mb-2">Error</h1>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-brightBlue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brightBlue/90 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightBlue flex items-center justify-center">
      <div className="bg-white border border-gray-200 shadow-lg p-8 rounded-lg text-center">
        {payment.status === 'SUCCESS' ? (
          <>
            <FaCheckCircle className="text-brightBlue text-6xl mb-4" />
            <h1 className="text-2xl font-bold text-navy-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-700 mb-6">
              Thank you for your purchase. A download link for your template has been sent to your email.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-300 text-navy-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Back to Home
            </button>
          </>
        ) : payment.status === 'FAILED' ? (
          <>
            <FaTimesCircle className="text-red-500 text-6xl mb-4" />
            <h1 className="text-2xl font-bold text-navy-900 mb-2">Payment Failed</h1>
            <p className="text-gray-700 mb-6">Something went wrong. Please try again.</p>
            <button
              onClick={() => navigate(`/template/${payment.template?.id || ''}`)}
              className="bg-brightBlue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brightBlue/90 transition-colors"
            >
              Try Again
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-navy-900 mb-2">Payment Pending</h1>
            <p className="text-gray-700 mb-6">We are still verifying your payment. Please wait...</p>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-300 text-navy-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentStatus;