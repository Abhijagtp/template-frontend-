import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { FaShoppingCart, FaEye, FaStar, FaArrowLeft, FaArrowRight, FaCheck, FaHome, FaRedo } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { debounce } from 'lodash';
import TemplateCard from '../components/TemplateCard';
import Header from '../components/Header';
import api from '../api';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sub-component: ImageSlider
const ImageSlider = ({
  images,
  previewMode,
  handlePreviewToggle,
  handleImageError,
  handleImageLoad,
  handleRetryImage,
  imageLoading,
  imageErrors,
  template,
}) => {
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const sliderSettings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    lazyLoad: 'ondemand',
    prevArrow: (
      <div
        className="slick-arrow slick-prev absolute left-6 top-1/2 transform -translate-y-1/2 z-20"
        role="button"
        tabIndex={0}
        aria-label="Previous Slide"
        onKeyDown={(e) => e.key === 'Enter' && e.target.click()}
      >
        <div className="w-14 h-14 flex items-center justify-center bg-gray-800/90 text-white rounded-full hover:bg-gray-900 transition-all duration-300 shadow-lg">
          <FaArrowLeft className="text-2xl" />
        </div>
      </div>
    ),
    nextArrow: (
      <div
        className="slick-arrow slick-next absolute right-6 top-1/2 transform -translate-y-1/2 z-20"
        role="button"
        tabIndex={0}
        aria-label="Next Slide"
        onKeyDown={(e) => e.key === 'Enter' && e.target.click()}
      >
        <div className="w-14 h-14 flex items-center justify-center bg-gray-800/90 text-white rounded-full hover:bg-gray-900 transition-all duration-300 shadow-lg">
          <FaArrowRight className="text-2xl" />
        </div>
      </div>
    ),
    appendDots: (dots) => (
      <div className="absolute bottom-6 left-0 right-0 z-20">
        <ul className="flex justify-center space-x-4">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <button
        className="w-5 h-5 rounded-full bg-gray-400/80 hover:bg-gray-300 transition-all duration-300 shadow-md"
        aria-label={`Go to slide ${i + 1}`}
      />
    ),
  }), []);

  return (
    <div className="relative">
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-6 mb-6">
        {previewMode === 'screenshot' ? (
          <Slider {...sliderSettings}>
            {images.map((img, index) => (
              <div key={index} className="relative">
                {imageLoading[index] && (
                  <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center bg-gray-800 rounded-xl">
                    <div className="animate-pulse h-full w-full bg-gray-700 rounded-xl"></div>
                  </div>
                )}
                {!imageLoading[index] && imageErrors[index] ? (
                  <div className="w-full h-[500px] md:h-[600px] flex flex-col items-center justify-center bg-gray-800 rounded-xl">
                    <p className="text-red-400 mb-3">Failed to load image</p>
                    <button
                      onClick={() => handleRetryImage(index)}
                      className="flex items-center text-blue-400 hover:underline"
                      aria-label="Retry loading image"
                    >
                      <FaRedo className="mr-2" />
                      Retry
                    </button>
                  </div>
                ) : (
                  <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center">
                    <img
                      src={img || 'https://via.placeholder.com/600'}
                      srcSet={`${img}?w=600 600w, ${img}?w=1200 1200w`}
                      sizes="(max-width: 600px) 600px, 1200px"
                      alt={`${template.title} preview ${index + 1}`}
                      className={`max-w-full max-h-full object-contain rounded-xl cursor-pointer ${
                        imageLoading[index] ? 'hidden' : 'block'
                      }`}
                      onError={() => handleImageError(index)}
                      onLoad={() => handleImageLoad(index)}
                      onClick={() => window.open(img, '_blank')}
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            ))}
          </Slider>
        ) : (
          <iframe
            src={
              isValidUrl(template.live_preview_url)
                ? template.live_preview_url
                : 'https://via.placeholder.com/600?text=Live+Preview+Unavailable'
            }
            title="Live Preview"
            className="w-full h-[500px] md:h-[600px] rounded-xl border-0"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600?text=Live+Preview+Unavailable';
            }}
            loading="lazy"
          />
        )}
        <button
          onClick={handlePreviewToggle}
          className="absolute bottom-6 right-6 bg-blue-600 text-white font-medium py-2 px-4 rounded-full hover:bg-blue-700 transition-all duration-300 flex items-center shadow-lg z-20"
          aria-label={previewMode === 'screenshot' ? 'Switch to Live Preview' : 'Switch to Screenshots'}
        >
          <FaEye className="mr-2" />
          {previewMode === 'screenshot' ? 'Live Preview' : 'Screenshots'}
        </button>
      </div>
    </div>
  );
};

// Sub-component: ReviewForm
const ReviewForm = ({ onSubmit, reviewError, reviewSuccess, templateId }) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    defaultValues: { user: '', rating: 0, comment: '' },
  });
  const [hoverRating, setHoverRating] = useState(0);
  const rating = watch('rating');

  const handleStarClick = (ratingValue) => setValue('rating', ratingValue);
  const handleStarHover = (ratingValue) => setHoverRating(ratingValue);
  const handleStarHoverOut = () => setHoverRating(0);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
    setHoverRating(0);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Write a Review</h3>
      {reviewSuccess && <p className="text-blue-600 mb-4">Review submitted successfully!</p>}
      {reviewError && <p className="text-red-500 mb-4">{reviewError}</p>}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="review-user">
            Your Name
          </label>
          <input
            {...register('user', { required: 'Name is required' })}
            id="review-user"
            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Enter your name"
            aria-required="true"
          />
          {errors.user && <p className="text-red-500 mt-1">{errors.user.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Rating</label>
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1;
              return (
                <button
                  type="button"
                  key={i}
                  onClick={() => handleStarClick(ratingValue)}
                  onMouseEnter={() => handleStarHover(ratingValue)}
                  onMouseLeave={handleStarHoverOut}
                  aria-label={`Rate ${ratingValue} stars`}
                >
                  <FaStar
                    className={
                      ratingValue <= (hoverRating || rating)
                        ? 'text-blue-600 cursor-pointer'
                        : 'text-gray-300 cursor-pointer'
                    }
                    size={28}
                  />
                </button>
              );
            })}
          </div>
          {rating === 0 && errors.rating && <p className="text-red-500 mt-1">Please select a rating.</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="review-comment">
            Comment
          </label>
          <textarea
            {...register('comment', { required: 'Comment is required' })}
            id="review-comment"
            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            rows="4"
            placeholder="Share your experience"
            aria-required="true"
          />
          {errors.comment && <p className="text-red-500 mt-1">{errors.comment.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm"
          aria-label="Submit Review"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

// Sub-component: PaymentModal
const PaymentModal = ({ showEmailModal, setShowEmailModal, email, setEmail, phone, setPhone, handlePayment, paymentError }) => (
  <>
    {showEmailModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Enter Your Details</h2>
          {paymentError && <p className="text-red-500 mb-4">{paymentError}</p>}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="email-input">
                Email
              </label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter your email"
                required
                aria-required="true"
              />
              <p className="text-sm text-gray-600 mt-1">
                Please ensure this email is correct, as it will be used to send your template file.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="phone-input">
                Phone (Optional)
              </label>
              <input
                id="phone-input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setShowEmailModal(false)}
              className="bg-gray-200 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-300"
              aria-label="Cancel"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
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

// Main Component: TemplateDetails
function TemplateDetails() {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [relatedTemplates, setRelatedTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewMode, setPreviewMode] = useState('screenshot');
  const [reviewError, setReviewError] = useState(null);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentError, setPaymentError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [imageLoading, setImageLoading] = useState({});

  // Fetch template details
  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/templates/${id}/`);
        const data = response.data;
        setTemplate(data);

        const images = [data.image, ...(data.additional_images || [])];
        const initialLoading = {};
        const initialErrors = {};
        images.forEach((_, index) => {
          initialLoading[index] = true;
          initialErrors[index] = false;
        });
        setImageLoading(initialLoading);
        setImageErrors(initialErrors);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to load template details.');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id]);

  // Fetch related templates with debounce
  const fetchRelatedTemplates = useCallback(
    debounce(async (categoryId) => {
      if (!categoryId) return;
      try {
        const response = await api.get('/api/templates/', {
          params: { category: categoryId },
        });
        setRelatedTemplates(response.data.filter((t) => t.id !== parseInt(id)).slice(0, 3));
      } catch (err) {
        setRelatedTemplates([]);
      }
    }, 300),
    [id]
  );

  useEffect(() => {
    fetchRelatedTemplates(template?.category?.id);
  }, [template?.category?.id, fetchRelatedTemplates]);

  // Preload main image with cleanup
  useEffect(() => {
    if (template?.image) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = template.image;
      document.head.appendChild(link);
      return () => document.head.removeChild(link);
    }
  }, [template?.image]);

  const handlePreviewToggle = useCallback(() => {
    setPreviewMode((prev) => (prev === 'screenshot' ? 'live' : 'screenshot'));
  }, []);

  const handleReviewSubmit = useCallback(async (data) => {
    if (data.rating === 0) {
      setReviewError('Please select a rating.');
      return;
    }
    try {
      setReviewError(null);
      setReviewSuccess(false);
      const response = await api.post('/api/reviews/submit/', {
        template: id,
        ...data,
      });
      setReviewSuccess(true);
      setTemplate(response.data.template);
    } catch (err) {
      setReviewError(err.response?.data?.detail || 'Failed to submit review.');
    }
  }, [id]);

  const handlePayment = useCallback(async () => {
    if (!email) {
      setPaymentError('Please enter your email address.');
      return;
    }
    setPaymentError(null);

    if (!window.Cashfree) {
      setPaymentError('Payment gateway not loaded. Retrying...');
      const script = document.createElement('script');
      script.src = 'https://path-to-cashfree-sdk.js'; // Replace with actual Cashfree SDK URL
      script.onload = () => handlePayment();
      document.head.appendChild(script);
      return;
    }

    try {
      const response = await api.post(`/api/templates/${id}/initiate-payment/`, { email, phone });
      const { payment_session_id, order_id } = response.data;
      if (!payment_session_id) {
        setPaymentError('Payment session ID not received.');
        return;
      }

      const cashfree = new window.Cashfree({
        mode: import.meta.env.VITE_CASHFREE_MODE || 'sandbox',
      });

      cashfree
        .checkout({
          paymentSessionId: payment_session_id,
          returnUrl: `${
            import.meta.env.VITE_APP_URL || 'https://your-production-url.com'
          }/payment-status?order_id=${order_id}`,
        })
        .catch(() => setPaymentError('Failed to initiate payment.'));
    } catch (err) {
      setPaymentError(err.message || 'Failed to initiate payment.');
    }
  }, [id, email, phone]);

  const handleImageError = useCallback((index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
    setImageLoading((prev) => ({ ...prev, [index]: false }));
  }, []);

  const handleImageLoad = useCallback((index) => {
    setImageLoading((prev) => ({ ...prev, [index]: false }));
  }, []);

  const handleRetryImage = useCallback((index) => {
    setImageErrors((prev) => ({ ...prev, [index]: false }));
    setImageLoading((prev) => ({ ...prev, [index]: true }));
  }, []);

  const topReviews = useMemo(() => (template?.reviews || [])
    .sort((a, b) => b.rating - a.rating || new Date(b.date) - new Date(a.date))
    .slice(0, 5), [template]);

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-12 w-1/2 bg-gray-300 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-[600px] bg-gray-300 rounded-2xl"></div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="h-8 w-1/3 bg-gray-300 rounded mb-4"></div>
                <div className="h-5 w-full bg-gray-300 rounded mb-2"></div>
                <div className="h-5 w-3/4 bg-gray-300 rounded mb-4"></div>
                <div className="h-8 w-1/4 bg-gray-300 rounded mb-2"></div>
                <div className="h-5 w-1/2 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
          aria-label="Retry"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!template) return <p className="text-center text-gray-900 text-lg py-16">Template not found.</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          {/* Back to Home Link */}
          <Link to="/" className="inline-flex items-center text-blue-600 font-semibold hover:underline mb-8">
            <FaHome className="mr-2" />
            Back to Home
          </Link>

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-0">{template.title || 'Untitled'}</h1>
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.round(template.average_rating || 0) ? 'text-blue-600' : 'text-gray-300'}
                    aria-label={`Rating ${i + 1}`}
                  />
                ))}
                <span className="ml-2 text-gray-700 font-medium">{(template.average_rating || 0).toFixed(1)}</span>
              </div>
              <button
                onClick={() => setShowEmailModal(true)}
                className="inline-flex items-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm"
                aria-label="Buy Now"
              >
                <FaShoppingCart className="mr-2" />
                Buy Now - ₹{parseFloat(template.price || 0).toFixed(2)}
              </button>
            </div>
          </div>

          {/* Payment Modal */}
          <PaymentModal
            showEmailModal={showEmailModal}
            setShowEmailModal={setShowEmailModal}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            handlePayment={handlePayment}
            paymentError={paymentError}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Slider */}
            <ImageSlider
              images={[template.image, ...(template.additional_images || [])]}
              previewMode={previewMode}
              handlePreviewToggle={handlePreviewToggle}
              handleImageError={handleImageError}
              handleImageLoad={handleImageLoad}
              handleRetryImage={handleRetryImage}
              imageLoading={imageLoading}
              imageErrors={imageErrors}
              template={template}
            />

            {/* Details Section */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Template Details</h2>
              <p className="text-gray-700 text-base leading-relaxed mb-6">{template.description || 'No description available.'}</p>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Category</h3>
                <span className="bg-gray-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-lg">
                  {template.category?.name || 'Uncategorized'}
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Features</h3>
                <ul className="space-y-2">
                  {(template.features || ['Responsive Design', 'SEO Optimized']).map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <FaCheck className="text-blue-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {(template.tech_stack || ['React', 'Tailwind CSS']).map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="sticky top-20">
                <button
                  onClick={() => setShowEmailModal(true)}
                  className="w-full inline-flex items-center justify-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm"
                  aria-label="Buy Now"
                >
                  <FaShoppingCart className="mr-2" />
                  Buy Now - ₹{parseFloat(template.price || 0).toFixed(2)}
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
            {topReviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {topReviews.map((review, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < (review.rating || 0) ? 'text-blue-600' : 'text-gray-300'}
                          aria-label={`Review rating ${i + 1}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-4">"{review.comment || 'No comment provided.'}"</p>
                    <p className="text-gray-900 font-medium">{review.user || 'Anonymous'}</p>
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
            <ReviewForm
              onSubmit={handleReviewSubmit}
              reviewError={reviewError}
              reviewSuccess={reviewSuccess}
              templateId={id}
            />
          </div>

          {/* Related Templates */}
          {relatedTemplates.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Explore Similar Templates</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* Custom CSS for Slick Carousel */}
      <style jsx global>{`
        /* Hide default arrows */
        .slick-prev, .slick-next {
          display: none !important;
        }

        /* Hide default dots */
        .slick-dots {
          display: none !important;
        }

        /* Ensure custom dots are visible */
        .slick-dots li.slick-active button {
          background-color: #2563eb !important; /* blue-600 */
          width: 28px !important;
          border-radius: 14px !important;
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default TemplateDetails;