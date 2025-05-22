"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import api from "../api"
import TemplateCard from "../components/TemplateCard"
import Header from "../components/Header"
import {
  FaRocket,
  FaLightbulb,
  FaStar,
  FaUserGraduate,
  FaDollarSign,
  FaEdit,
  FaQuoteLeft,
  FaCheck,
  FaTimes,
  FaQuestionCircle,
  FaBook,
  FaGlobe,
} from "react-icons/fa"

function Home() {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    api
      .get("/api/templates/")
      .then((response) => {
        console.log("API Base URL:", api.defaults.baseURL)
        console.log("Templates Response:", response.data)
        setTemplates(response.data.slice(0, 3))
        setLoading(false)
      })
      .catch((error) => {
        console.error("Templates Error:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url,
          code: error.code,
        })
        setError("Failed to load templates. Please try again.")
        setLoading(false)
      })
  }, [])

  const testimonials = [
    {
      name: "Aisha K.",
      role: "Computer Science Student",
      quote: "This template helped me land my first internship!",
      rating: 5,
    },
    {
      name: "Liam M.",
      role: "Graphic Design Major",
      quote: "Finally, a template that doesn't look like everyone else's.",
      rating: 4,
    },
  ]

  const blogPosts = [
    {
      title: "How to Build a Standout Portfolio",
      excerpt: "Learn the best tips to create a portfolio that gets noticed.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
      url: "/blog/how-to-build-a-standout-portfolio",
    },
    {
      title: "Top 5 Resume Mistakes to Avoid",
      excerpt: "Avoid these common pitfalls to make your resume shine.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
      url: "/blog/top-5-resume-mistakes-to-avoid",
    },
  ]

  const faqs = [
    { question: "Can I edit the templates?", answer: "Yes! Our templates are designed to be easily editable." },
    { question: "Are these templates affordable?", answer: "Absolutely. We offer student-friendly pricing." },
    { question: "Will my portfolio stand out?", answer: "Unlike generic templates, ours are crafted for students." },
  ]

  const [openFaq, setOpenFaq] = useState(null)
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              <FaRocket className="inline-block text-teal-600 mr-2" />
              Stand Out with Unique Student Portfolios
            </h1>
            <p className="text-lg md:text-xl text-slate-700 mb-8 leading-relaxed">
              Tired of generic templates that everyone uses? Our{" "}
              <span className="text-teal-600 font-medium">student-focused designs</span> help you create a portfolio
              that recruiters notice—without breaking the bank.
            </p>
            <Link
              to="/category/1"
              className="inline-flex items-center bg-teal-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-teal-700 transition-colors shadow-md text-lg"
            >
              Explore Unique Templates <FaLightbulb className="ml-2" />
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
              alt="Student with laptop"
              className="w-full h-96 object-cover rounded-xl shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <p className="text-slate-700 italic">
                "Make your portfolio <span className="text-teal-600 font-medium">unique</span>!"
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Why Buy From Us */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Why Buy From Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 bg-slate-50 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <FaUserGraduate className="text-teal-600 text-5xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Student-Focused Designs</h3>
              <p className="text-slate-700">
                Unlike generic templates, ours are crafted to highlight your skills and personality.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 bg-slate-50 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <FaDollarSign className="text-teal-600 text-5xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Affordable for Students</h3>
              <p className="text-slate-700">High-quality templates at student-friendly prices.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-8 bg-slate-50 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <FaEdit className="text-teal-600 text-5xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Easy to Edit</h3>
              <p className="text-slate-700">Quickly tweak templates to fit your style—no coding skills needed.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="p-8 bg-white rounded-xl shadow-md border border-slate-100 h-full">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                <div className="bg-teal-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 mt-4 text-center">Choose a Template</h3>
              <p className="text-slate-700 text-center">
                Browse our unique, student-focused templates and pick the one that suits you.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="p-8 bg-white rounded-xl shadow-md border border-slate-100 h-full">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                <div className="bg-teal-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 mt-4 text-center">Download & Edit</h3>
              <p className="text-slate-700 text-center">
                Download your template and easily edit it to add your personal touch.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="p-8 bg-white rounded-xl shadow-md border border-slate-100 h-full">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                <div className="bg-teal-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 mt-4 text-center">Launch Your Portfolio</h3>
              <p className="text-slate-700 text-center">
                Publish your standout portfolio and impress recruiters or professors.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Featured Templates</h2>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
          ) : error ? (
            <div className="text-center p-8 bg-red-50 rounded-lg">
              <p className="text-red-500">{error}</p>
            </div>
          ) : templates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <TemplateCard template={template} />
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500">No templates available at the moment.</p>
          )}
          <div className="text-center mt-12">
            <Link
              to="/category/all"
              className="inline-flex items-center text-teal-600 font-semibold hover:underline text-lg"
            >
              View All Templates <FaLightbulb className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Us vs. Generic Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 bg-slate-100 rounded-xl"
          >
            <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">Generic Templates</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="bg-white p-2 rounded-full mr-4">
                  <FaTimes className="text-red-500" />
                </div>
                <span className="text-slate-700">Overused designs that blend in</span>
              </li>
              <li className="flex items-center">
                <div className="bg-white p-2 rounded-full mr-4">
                  <FaTimes className="text-red-500" />
                </div>
                <span className="text-slate-700">Not tailored for students</span>
              </li>
              <li className="flex items-center">
                <div className="bg-white p-2 rounded-full mr-4">
                  <FaTimes className="text-red-500" />
                </div>
                <span className="text-slate-700">Expensive for what you get</span>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 bg-teal-600 rounded-xl text-white"
          >
            <h3 className="text-xl font-semibold mb-6 text-center">Our Templates</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="bg-white p-2 rounded-full mr-4">
                  <FaCheck className="text-teal-600" />
                </div>
                <span>Unique, student-focused designs</span>
              </li>
              <li className="flex items-center">
                <div className="bg-white p-2 rounded-full mr-4">
                  <FaCheck className="text-teal-600" />
                </div>
                <span>Affordable for students</span>
              </li>
              <li className="flex items-center">
                <div className="bg-white p-2 rounded-full mr-4">
                  <FaCheck className="text-teal-600" />
                </div>
                <span>Easy to edit and use</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Trusted by Students Worldwide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 bg-slate-50 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="inline-flex items-center justify-center p-3 bg-teal-100 text-teal-600 rounded-full mb-4">
                <FaUserGraduate className="text-4xl" />
              </div>
              <p className="text-4xl font-bold text-slate-900 mb-2">500+</p>
              <p className="text-slate-700">Students Helped</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 bg-slate-50 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="inline-flex items-center justify-center p-3 bg-teal-100 text-teal-600 rounded-full mb-4">
                <FaRocket className="text-4xl" />
              </div>
              <p className="text-4xl font-bold text-slate-900 mb-2">50+</p>
              <p className="text-slate-700">Unique Templates</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-8 bg-slate-50 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="inline-flex items-center justify-center p-3 bg-teal-100 text-teal-600 rounded-full mb-4">
                <FaGlobe className="text-4xl" />
              </div>
              <p className="text-4xl font-bold text-slate-900 mb-2">10K+</p>
              <p className="text-slate-700">Downloads</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">What Students Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 shadow-lg p-8 rounded-xl relative"
            >
              <FaQuoteLeft className="text-teal-100 text-4xl absolute top-4 left-4" />
              <p className="text-slate-700 italic mb-6 mt-8 text-lg">"{testimonial.quote}"</p>
              <div className="flex items-center justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <div className="text-center">
                <p className="text-slate-900 font-medium">{testimonial.name}</p>
                <p className="text-slate-500 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Blog Posts */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Helpful Resources for Students</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white border border-slate-200 shadow-md rounded-xl overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{post.title}</h3>
                    <p className="text-slate-700 mb-4">{post.excerpt}</p>
                    <Link to={post.url} className="text-teal-600 font-medium hover:underline flex items-center">
                      Read More <FaBook className="ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center text-left text-slate-900 font-medium text-lg p-4 hover:bg-slate-50"
              >
                <span>{faq.question}</span>
                <FaQuestionCircle
                  className={`text-teal-600 transform transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 pt-0 text-slate-700 border-t border-slate-100"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Don't Blend In—Stand Out!</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Stop using the same old templates as everyone else. Get a unique, student-friendly portfolio template
              today and kickstart your career.
            </p>
            <Link
              to="/category/1"
              className="inline-flex items-center bg-white text-teal-600 font-semibold px-8 py-4 rounded-lg hover:bg-white/90 transition-colors shadow-md text-lg"
            >
              Get Started Now <FaRocket className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
