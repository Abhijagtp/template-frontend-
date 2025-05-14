import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { FaSearch } from 'react-icons/fa';

function SupportTrack() {
  const [formData, setFormData] = useState({ inquiry_id: '', email: '' });
  const [error, setError] = useState(null);
  const [inquiry, setInquiry] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInquiry(null);
    try {
      const response = await axios.post('/api/support/track/', formData);
      setInquiry(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to track inquiry.');
    }
  };

  return (
    <div className="bg-lightBlue min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-navy-900 mb-8 flex items-center">
          <FaSearch className="text-brightBlue mr-2" />
          Track Support Inquiry
        </h2>
        {error && (
          <p className="text-red-600 bg-red-100 p-4 rounded-lg mb-6">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="inquiry_id" className="block text-navy-900 font-medium">
              Inquiry ID
            </label>
            <input
              type="text"
              id="inquiry_id"
              name="inquiry_id"
              value={formData.inquiry_id}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brightBlue"
              placeholder="e.g., SUPP-123456"
            />
          </div>
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
          <button
            type="submit"
            className="bg-brightBlue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brightBlue/90 transition-colors shadow-md"
          >
            Track Inquiry
          </button>
        </form>
        {inquiry && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-navy-900 mb-4">
              Inquiry Details
            </h3>
            <p className="text-gray-700">
              <strong>Inquiry ID:</strong> {inquiry.inquiry_id}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong> {inquiry.status}
            </p>
            <p className="text-gray-700">
              <strong>Type:</strong> {inquiry.inquiry_type}
            </p>
            <p className="text-gray-700">
              <strong>Description:</strong> {inquiry.description}
            </p>
            {inquiry.response && (
              <p className="text-gray-700">
                <strong>Response:</strong> {inquiry.response}
              </p>
            )}
            <p className="text-gray-700">
              <strong>Submitted:</strong>{' '}
              {new Date(inquiry.created_at).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SupportTrack;