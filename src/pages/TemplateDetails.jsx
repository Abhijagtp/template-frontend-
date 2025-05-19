import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { FaShoppingCart, FaEye, FaStar, FaArrowLeft, FaArrowRight, FaCheck, FaHome } from 'react-icons/fa';
import TemplateCard from '../components/TemplateCard';
import Header from '../components/Header';
import api from '../api';

function TemplateDetails() {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [relatedTemplates, setRelatedTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewMode, setPreviewMode] = useState('screenshot');
  const [reviewForm, setReviewForm] = useState({ user: '', rating: 0, comment: '' });
  const [reviewError, setReviewError] = useState(null);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentError, setPaymentError] = useState(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/templates/${id}/`);
        setTemplate(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to load template details.');
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedTemplates = async () => {
      try {
        const response = await api.get('/api/templates/', {
          params: { category: template?.category?.id || '' },
        });
        setRelatedTemplates(
          response.data.filter((t) => t.id !== parseInt(id)).slice(0, 3)
        );
      } catch (err) {
        setRelatedTemplates([]);
      }
    };

    fetchTemplate();
    if (template) {
      fetchRelatedTemplates();
    }
  }, [id, template?.category?.id]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: (
      <div className="carousel-arrow -left-10" aria-label="Previous Slide">
        <FaArrowLeft className="text-3xl text-brightBlue" />
      </div>
    ),
    nextArrow: (
      <div className="carousel-arrow -right-10" aria-label="Next Slide">
        <FaArrowRight className="text-3xl text-brightBlue" />
      </div>
    ),
  };

  const handlePreviewToggle = () => {
    setPreviewMode(previewMode === 'screenshot' ? 'live' : 'screenshot');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (reviewForm.rating === 0) {
      setReviewError('Please select a rating.');
      return;
    }
    try {
      setReviewError(null);
      setReviewSuccess(false);
      const response = await api.post('/api/reviews/submit/', {
        template: id,
        user: reviewForm.user,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });
      setReviewSuccess(true);
      setReviewForm({ user: '', rating: 0, comment: '' });
      setHoverRating(0);
      setTemplate(response.data.template);
    } catch (err) {
      setReviewError(err.response?.data?.detail || 'Failed to submit review.');
    }
  };

  const handleReviewChange = (e) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  };

  const handleStarClick = (rating) => {
    setReviewForm({ ...reviewForm, rating });
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarHoverOut = () => {
    setHoverRating(0);
  };

  const handlePayment = async () => {
    if (!email) {
      setPaymentError('Please enter your email address.');
      return;
    }
    setPaymentError(null);

    try {
      const response = await api.post(`/api/templates/${id}/initiate-payment/`, {
        email,
        phone,
      });
      const { payment_session_id, order_id } = response.data;

      if (!payment_session_id) {
        setPaymentError('Payment session ID not received.');
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
          // Payment initiated, user redirected to payment gateway
        })
        .catch((err) => {
          setPaymentError('Failed to initiate payment.');
        });
    } catch (err) {
      setPaymentError(err.message || 'Failed to initiate payment.');
    }
  };

  if (loading) return <p className="text-center text-navy-900 text-lg py-16">Loading template...</p>;
  if (error) return <p className="text-center text-red-500 text-lg py-16">{error}</p>;
  if (!template) return <p className="text-center text-navy-900 text-lg py-16">Template not found.</p>;

  const topReviews = (template.reviews || [])
    .sort((a, b) => b.rating - a.rating || new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="bg-lightBlue min-h-screen">
      <Header />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          {/* Back to Home Link */}
          <Link to="/" className="inline-flex items-center text-brightBlue font-semibold hover:underline mb-6">
            <FaHome className="mr-2" />
            Back to Home
          </Link>

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h1 className="text-4xl font-bold text-navy-900 mb-4 md:mb-0">{template.title}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.round(template.average_rating || 0) ? 'text-brightBlue' : 'text-gray-300'}
                  />
                ))}
                <span className="ml-2 text-gray-700">{(template.average_rating || 0).toFixed(1)}</span>
              </div>
              <button
                onClick={() => setShowEmailModal(true)}
                className="inline-flex items-center bg-brightBlue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brightBlue/90 transition-colors shadow-sm"
              >
                <FaShoppingCart className="mr-2" />
                Buy Now - ₹{parseFloat(template.price || 0).toFixed(2)}
              </button>
            </div>
          </div>

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

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Slider */}
            <div>
              <div className="bg-white border border-gray-200 shadow-lg p-4 mb-4 relative">
                {previewMode === 'screenshot' ? (
                  <Slider {...sliderSettings}>
                    {[template.image, ...(template.additional_images || [])].map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={img || 'https://via.placeholder.com/600'}
                          alt={`${template.title} preview ${index + 1}`}
                          className="w-full h-96 object-cover rounded-lg cursor-pointer"
                          onError={(e) => {
                            console.log('TemplateDetails Image failed to load:', img);
                            e.target.src = 'https://via.placeholder.com/600';
                          }}
                          onClick={() => window.open(img, '_blank')}
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <iframe
                    src={template.live_preview_url || 'https://via.placeholder.com/600?text=Live+Preview'}
                    title="Live Preview"
                    className="w-full h-96 rounded-lg border-0"
                    onError={(e) => {
                      console.log('Live Preview failed to load:', template.live_preview_url);
                      e.target.src = 'https://via.placeholder.com/600?text=Live+Preview+Unavailable';
                    }}
                  />
                )}
              </div>
              <button
                onClick={handlePreviewToggle}
                className="w-full bg-white border border-brightBlue text-brightBlue font-medium py-2 rounded-lg hover:bg-brightBlue hover:text-white transition-colors flex items-center justify-center"
              >
                <FaEye className="mr-2" />
                {previewMode === 'screenshot' ? 'Switch to Live Preview' : 'Switch to Screenshots'}
              </button>
            </div>

            {/* Details Section */}
            <div className="bg-white border border-gray-200 shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-navy-900 mb-4">Template Details</h2>
              <p className="text-gray-700 text-base leading-relaxed mb-6">{template.description || 'No description available.'}</p>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-navy-900 mb-2">Category</h3>
                <span className="bg-lightBlue text-brightBlue text-sm font-medium px-3 py-1 rounded-lg">
                  {template.category?.name || 'Uncategorized'}
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-navy-900 mb-2">Features</h3>
                <ul className="space-y-2">
                  {(template.features || ['Responsive Design', 'SEO Optimized']).map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <FaCheck className="text-brightBlue mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-navy-900 mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {(template.tech_stack || ['React', 'Tailwind CSS']).map((tech, index) => (
                    <span
                      key={index}
                      className="bg-lightBlue text-brightBlue text-sm font-medium px-3 py-1 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="sticky top-20">
                <button
                  onClick={() => setShowEmailModal(true)}
                  className="w-full inline-flex items-center justify-center bg-brightBlue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brightBlue/90 transition-colors shadow-sm"
                >
                  <FaShoppingCart className="mr-2" />
                  Buy Now - ₹{parseFloat(template.price || 0).toFixed(2)}
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">Customer Reviews</h2>
            {topReviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {topReviews.map((review, index) => (
                  <div key={index} className="bg-white border border-gray-200 shadow-lg p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < (review.rating || 0) ? 'text-brightBlue' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-4">"{review.comment || 'No comment provided.'}"</p>
                    <p className="text-navy-900 font-medium">{review.user || 'Anonymous'}</p>
                    <p className="text-gray-500 text-sm">
                      {review.date ? new Date(review.date).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-8">No reviews yet. Be the first to share your experience!</p>
            )}

            {/* Review Form */}
            <div className="bg-white border border-gray-200 shadow-lg p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-navy-900 mb-4">Write a Review</h3>
              {reviewSuccess && (
                <p className="text-brightBlue mb-4">Review submitted successfully!</p>
              )}
              {reviewError && <p className="text-red-500 mb-4">{reviewError}</p>}
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-1">Your Name</label>
                  <input
                    type="text"
                    name="user"
                    value={reviewForm.user}
                    onChange={handleReviewChange}
                    required
                    className="w-full bg-lightBlue border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brightBlue"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-1">Rating</label>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => {
                      const ratingValue = i + 1;
                      return (
                        <FaStar
                          key={i}
                          className={
                            ratingValue <= (hoverRating || reviewForm.rating)
                              ? 'text-brightBlue cursor-pointer'
                              : 'text-gray-300 cursor-pointer'
                          }
                          onClick={() => handleStarClick(ratingValue)}
                          onMouseEnter={() => handleStarHover(ratingValue)}
                          onMouseLeave={handleStarHoverOut}
                          size={24}
                        />
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-1">Comment</label>
                  <textarea
                    name="comment"
                    value={reviewForm.comment}
                    onChange={handleReviewChange}
                    required
                    className="w-full bg-lightBlue border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brightBlue"
                    rows="4"
                    placeholder="Share your experience"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-brightBlue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brightBlue/90 transition-colors shadow-sm"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>

          {/* Related Templates */}
          {relatedTemplates.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Explore Similar Templates</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}

export default TemplateDetails;