import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';
import TemplateCard from '../components/TemplateCard';
import Header from '../components/Header';
import { FaRocket, FaLightbulb, FaStar, FaUserGraduate, FaDollarSign, FaEdit, FaQuoteLeft, FaCheck, FaTimes, FaQuestionCircle, FaBook, FaDownload, FaPen, FaGlobe } from 'react-icons/fa';

function Home() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get('/api/templates/')
      .then(response => {
        console.log('API Base URL:', api.defaults.baseURL);
        console.log('Templates Response:', response.data);
        setTemplates(response.data.slice(0, 3));
        setLoading(false);
      })
      .catch(error => {
        console.error('Templates Error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url,
          code: error.code,
        });
        setError('Failed to load templates. Please try again.');
        setLoading(false);
      });
  }, []);

  const testimonials = [
    { name: 'Aisha K.', role: 'Computer Science Student', quote: 'This template helped me land my first internship!', rating: 5 },
    { name: 'Liam M.', role: 'Graphic Design Major', quote: 'Finally, a template that doesn’t look like everyone else’s.', rating: 4 },
  ];

  const blogPosts = [
    { title: 'How to Build a Standout Portfolio', excerpt: 'Learn the best tips to create a portfolio that gets noticed.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop', url: '/blog/how-to-build-a-standout-portfolio' },
    { title: 'Top 5 Resume Mistakes to Avoid', excerpt: 'Avoid these common pitfalls to make your resume shine.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop', url: '/blog/top-5-resume-mistakes-to-avoid' },
  ];

  const faqs = [
    { question: 'Can I edit the templates?', answer: 'Yes! Our templates are designed to be easily editable.' },
    { question: 'Are these templates affordable?', answer: 'Absolutely. We offer student-friendly pricing.' },
    { question: 'Will my portfolio stand out?', answer: 'Unlike generic templates, ours are crafted for students.' },
  ];

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-lightBlue min-h-screen">
      <Header />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center md:text-left">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6 leading-tight">
              <FaRocket className="inline-block text-brightBlue mr-2" />
              Stand Out with Unique Student Portfolios
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Tired of generic templates that everyone uses? Our <span className="text-brightBlue font-medium">student-focused designs</span> help you create a portfolio that recruiters notice—without breaking the bank.
            </p>
            <Link to="/category/1" className="inline-flex items-center bg-brightBlue text-white font-semibold px-8 py-4 rounded-lg hover:bg-brightBlue/90 transition-colors shadow-md text-lg">
              Explore Unique Templates <FaLightbulb className="ml-2" />
            </Link>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" alt="Student with laptop" className="w-full h-96 object-cover rounded-lg shadow-lg" />
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-gray-700 italic">"Make your portfolio <span className="text-brightBlue font-medium">unique</span>!"</p>
            </div>
          </div>
        </motion.div>
      </section>
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-12">Why Buy From Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="p-6">
              <FaUserGraduate className="text-brightBlue text-5xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-navy-900 mb-2">Student-Focused Designs</h3>
              <p className="text-gray-700">Unlike generic templates, ours are crafted to highlight your skills and personality.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="p-6">
              <FaDollarSign className="text-brightBlue text-5xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-navy-900 mb-2">Affordable for Students</h3>
              <p className="text-gray-700">High-quality templates at student-friendly prices.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="p-6">
              <FaEdit className="text-brightBlue text-5xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-navy-900 mb-2">Easy to Edit</h3>
              <p className="text-gray-700">Quickly tweak templates to fit your style—no coding skills needed.</p>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-navy-900 mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="p-6">
            <div className="bg-brightBlue text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
            <h3 className="text-xl font-semibold text-navy-900 mb-2">Choose a Template</h3>
            <p className="text-gray-700">Browse our unique, student-focused templates and pick the one that suits you.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="p-6">
            <div className="bg-brightBlue text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
            <h3 className="text-xl font-semibold text-navy-900 mb-2">Download & Edit</h3>
            <p className="text-gray-700">Download your template and easily edit it to add your personal touch.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="p-6">
            <div className="bg-brightBlue text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
            <h3 className="text-xl font-semibold text-navy-900 mb-2">Launch Your Portfolio</h3>
            <p className="text-gray-700">Publish your standout portfolio and impress recruiters or professors.</p>
          </motion.div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Featured Templates</h2>
        {loading ? (
          <p className="text-center text-navy-900 text-lg">Loading templates...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : templates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No templates available at the moment.</p>
        )}
        <div className="text-center mt-12">
          <Link to="/category/all" className="inline-flex items-center text-brightBlue font-semibold hover:underline text-lg">
            View All Templates <FaLightbulb className="ml-2" />
          </Link>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-12">Us vs. Generic Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="p-6 bg-lightBlue rounded-lg">
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Generic Templates</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center"><FaTimes className="text-red-500 mr-2" /> Overused designs that blend in</li>
                <li className="flex items-center"><FaTimes className="text-red-500 mr-2" /> Not tailored for students</li>
                <li className="flex items-center"><FaTimes className="text-red-500 mr-2" /> Expensive for what you get</li>
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="p-6 bg-brightBlue text-white rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Our Templates</h3>
              <ul className="space-y-3">
                <li className="flex items-center"><FaCheck className="text-white mr-2" /> Unique, student-focused designs</li>
                <li className="flex items-center"><FaCheck className="text-white mr-2" /> Affordable for students</li>
                <li className="flex items-center"><FaCheck className="text-white mr-2" /> Easy to edit and use</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-navy-900 mb-12">Trusted by Students Worldwide</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="p-6">
            <FaUserGraduate className="text-brightBlue text-5xl mb-4 mx-auto" />
            <p className="text-4xl font-bold text-navy-900 mb-2">500+</p>
            <p className="text-gray-700">Students Helped</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="p-6">
            <FaRocket className="text-brightBlue text-5xl mb-4 mx-auto" />
            <p className="text-4xl font-bold text-navy-900 mb-2">50+</p>
            <p className="text-gray-700">Unique Templates</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="p-6">
            <FaGlobe className="text-brightBlue text-5xl mb-4 mx-auto" />
            <p className="text-4xl font-bold text-navy-900 mb-2">10K+</p>
            <p className="text-gray-700">Downloads</p>
          </motion.div>
        </div>
      </section>
      <section className="bg-lightBlue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-12">What Students Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }} className="bg-white border border-gray-200 shadow-lg p-6 relative">
                <FaQuoteLeft className="text-brightBlue text-3xl absolute top-4 left-4 opacity-30" />
                <p className="text-gray-700 italic mb-4 mt-8">"{testimonial.quote}"</p>
                <div className="flex items-center justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-brightBlue" />
                  ))}
                </div>
                <p className="text-navy-900 font-medium">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-navy-900 mb-12 text-center">Helpful Resources for Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }} className="bg-white border border-gray-200 shadow-lg p-6 flex items-center">
              <img src={post.image} alt={post.title} className="w-24 h-24 object-cover rounded-lg mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">{post.title}</h3>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <Link to={post.url} className="text-brightBlue font-medium hover:underline flex items-center">
                  Read More <FaBook className="ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="bg-lightBlue rounded-lg p-4">
                <button onClick={() => toggleFaq(index)} className="w-full flex justify-between items-center text-left text-navy-900 font-semibold text-lg">
                  <span>{faq.question}</span>
                  <FaQuestionCircle className={`text-brightBlue transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.3 }} className="mt-2 text-gray-700">
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-brightBlue py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">Don’t Blend In—Stand Out!</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Stop using the same old templates as everyone else. Get a unique, student-friendly portfolio template today and kickstart your career.
          </p>
          <Link to="/category/1" className="inline-flex items-center bg-white text-brightBlue font-semibold px-8 py-4 rounded-lg hover:bg-white/90 transition-colors shadow-md text-lg">
            Get Started Now <FaRocket className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;