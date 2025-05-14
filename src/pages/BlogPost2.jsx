import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRocket, FaBook, FaExclamationTriangle, FaHome } from 'react-icons/fa';
import Header from '../components/Header'; // Import the Header

function BlogPost2() {
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
            Top 5 Resume Mistakes to Avoid
          </h1>
          <p className="text-gray-500 mb-8">Published on April 24, 2025</p>

          {/* Main Image */}
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
            alt="Resume on desk"
            className="w-full h-96 object-cover rounded-lg mb-8 shadow-lg"
          />

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-navy-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Your resume is often the first impression you make on a recruiter, so it needs to be perfect. However, many students make common mistakes that can cost them opportunities. In this article, we’ll cover the top 5 resume mistakes to avoid and how to fix them.
            </p>
          </section>

          {/* Mistake 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-navy-900 mb-4 flex items-center">
              <FaExclamationTriangle className="text-brightBlue mr-2" />
              Mistake 1: Using a Generic Template
            </h2>
            <p className="text-gray-700 leading-relaxed">
              A generic template makes your resume look like everyone else’s, causing it to blend into the pile. Recruiters see hundreds of resumes—stand out with a unique design that reflects your personality and skills.
            </p>
            <Link
              to="/category/1"
              className="inline-flex items-center text-brightBlue font-semibold hover:underline mt-4"
            >
              Find a Unique Resume Template <FaRocket className="ml-2" />
            </Link>
          </section>

          {/* Mistake 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-navy-900 mb-4 flex items-center">
              <FaExclamationTriangle className="text-brightBlue mr-2" />
              Mistake 2: Including Irrelevant Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Don’t list every job or activity you’ve ever done. Focus on experiences relevant to the role you’re applying for. For example, your high school job at a fast-food restaurant might not be relevant for a tech internship.
            </p>
          </section>

          {/* Mistake 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-navy-900 mb-4 flex items-center">
              <FaExclamationTriangle className="text-brightBlue mr-2" />
              Mistake 3: Poor Formatting
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Inconsistent fonts, messy layouts, and walls of text can make your resume hard to read. Use clean formatting with clear sections, bullet points, and a professional design to ensure readability.
            </p>
          </section>

          {/* Mistake 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-navy-900 mb-4 flex items-center">
              <FaExclamationTriangle className="text-brightBlue mr-2" />
              Mistake 4: Typos and Grammar Errors
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Spelling mistakes or grammatical errors can make you look careless. Always proofread your resume multiple times, and consider asking a friend to review it as well.
            </p>
          </section>

          {/* Mistake 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-navy-900 mb-4 flex items-center">
              <FaExclamationTriangle className="text-brightBlue mr-2" />
              Mistake 5: Not Tailoring to the Job
            </h2>
            <p className="text-gray-700 leading-relaxed">
              A one-size-fits-all resume won’t impress recruiters. Tailor your resume to each job by highlighting the skills and experiences most relevant to the role.
            </p>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-navy-900 mb-4">Conclusion</h2>
            <p className="text-gray-700 leading-relaxed">
              Avoiding these common resume mistakes can significantly improve your chances of landing an interview. Start with a unique template, keep your content relevant and well-formatted, and always tailor your resume to the job. Ready to create a resume that stands out?
            </p>
          </section>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/category/1"
              className="inline-flex items-center bg-brightBlue text-white font-semibold px-8 py-4 rounded-lg hover:bg-brightBlue/90 transition-colors shadow-md text-lg"
            >
              Get Your Unique Resume Template <FaRocket className="ml-2" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default BlogPost2;