import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRocket, FaBook, FaLightbulb, FaPen, FaGlobe, FaHome } from 'react-icons/fa';
import Header from '../components/Header'; // Import the Header

function BlogPost1() {
  return (
    <div className="bg-lightBlue min-h-screen">
      {/* Add the Header */}
      <Header />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Back to Home Link */}
          <Link to="/" className="inline-flex items-center text-brightBlue font-semibold hover:underline mb-6">
            <FaHome className="mr-2" />
            Back to Home
          </Link>

          {/* Header */}
          <h1 className="text-4xl font-bold text-navy-900 mb-6 flex items-center">
            <FaBook className="text-brightBlue mr-2" />
            How to Build a Standout Portfolio
          </h1>
          <p className="text-gray-500 mb-8">Published on April 24, 2025</p>

          {/* Main Image */}
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
            alt="Student building portfolio"
            className="w-full h-96 object-cover rounded-lg mb-8 shadow-lg"
          />

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-navy-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              As a student or recent graduate, your portfolio is your ticket to standing out in a competitive job market. But with so many generic templates out there, how do you ensure yours catches a recruiter’s eye? In this guide, we’ll walk you through the steps to build a standout portfolio that showcases your skills, projects, and personality.
            </p>
          </section>

          {/* Step 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-navy-900 mb-4 flex items-center">
              <FaLightbulb className="text-brightBlue mr-2" />
              Step 1: Define Your Purpose
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Before you start building, ask yourself: What’s the goal of your portfolio? Are you applying for internships, showcasing class projects, or building a personal brand? Defining your purpose will help you choose the right template and content. For example, a computer science student might focus on coding projects, while a graphic design student might prioritize visuals.
            </p>
          </section>

          {/* Step 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-navy-900 mb-4 flex items-center">
              <FaPen className="text-brightBlue mr-2" />
              Step 2: Choose a Unique Template
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Avoid generic templates that make your portfolio look like everyone else’s. Opt for a unique, student-focused design that reflects your personality. Our templates are crafted specifically for students, ensuring your portfolio stands out while being easy to edit.
            </p>
            <Link
              to="/category/1"
              className="inline-flex items-center text-brightBlue font-semibold hover:underline mt-4"
            >
              Explore Our Unique Templates <FaRocket className="ml-2" />
            </Link>
          </section>

          {/* Step 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-navy-900 mb-4 flex items-center">
              <FaGlobe className="text-brightBlue mr-2" />
              Step 3: Showcase Your Best Work
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Quality over quantity. Include 3-5 of your best projects with detailed descriptions, visuals, and outcomes. Highlight what you learned and how it applies to the roles you’re targeting. For example, if you built a web app, include screenshots, the tech stack, and the problem it solves.
            </p>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-navy-900 mb-4">Conclusion</h2>
            <p className="text-gray-700 leading-relaxed">
              A standout portfolio is more than just a collection of projects—it’s a reflection of who you are. By defining your purpose, choosing a unique template, and showcasing your best work, you’ll create a portfolio that leaves a lasting impression. Ready to get started?
            </p>
          </section>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/category/1"
              className="inline-flex items-center bg-brightBlue text-white font-semibold px-8 py-4 rounded-lg hover:bg-brightBlue/90 transition-colors shadow-md text-lg"
            >
              Get Your Unique Template Now <FaRocket className="ml-2" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default BlogPost1;   