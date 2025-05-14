// src/components/SupportForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { FaQuestionCircle } from 'react-icons/fa';

function SupportForm() {
  const [formData, setFormData] = useState({
    email: '',
    inquiry_type: 'GENERAL',
    description: '',
    order_id: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // Added for user feedback

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const response = await axios.post('/api/support/', formData);
      setSuccess(
        <>
          Inquiry submitted! ID: {response.data.inquiry_id}.{' '}
          <Link to="/support/track" className="text-brightBlue underline">
            Track your inquiry
          </Link>
        </>
      );
      setFormData({ email: '', inquiry_type: 'GENERAL', description: '', order_id: '' });
    } catch (err) {
      setError(err.response?.data?.errors || 'Failed to submit inquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-lightBlue min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-navy-900 mb-8 flex items-center">
          <FaQuestionCircle className="text-brightBlue mr-2" />
          Contact Support
        </h2>
        {error && (
          <p className="text-red-600 bg-red-100 p-4 rounded-lg mb-6">{error}</p>
        )}
        {success && (
          <p className="text-green-600 bg-green-100 p-4 rounded-lg mb-6">{success}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-navy-900 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brightBlue"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label htmlFor="inquiry_type" className="block text-navy-900 font-medium">
              Inquiry Type
            </label>
            <select
              id="inquiry_type"
              name="inquiry_type"
              value={formData.inquiry_type}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brightBlue"
            >
              <option value="PAYMENT_FAILURE">Payment Failure</option>
              <option value="PAYMENT_STATUS">Payment Status</option>
              <option value="TEMPLATE_DOWNLOAD">Template Download Issue</option>
              <option value="GENERAL">General</option>
            </select>
          </div>
          <div>
            <label htmlFor="order_id" className="block text-navy-900 font-medium">
              Order ID (Optional)
            </label>
            <input
              type="text"
              id="order_id"
              name="order_id"
              value={formData.order_id}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brightBlue"
              placeholder="e.g., order_1_1746426398"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-navy-900 font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brightBlue"
              rows="5"
              placeholder="Describe your issue or question..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`bg-brightBlue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brightBlue/90 transition-colors shadow-md ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Inquiry'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SupportForm;