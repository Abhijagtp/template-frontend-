import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import TemplateCard from '../components/TemplateCard';
import { FaArrowRight, FaFilter, FaSearch, FaTimes } from 'react-icons/fa';

function CategoryPage() {
  const { id } = useParams(); // Get category ID from URL
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(id || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories
  useEffect(() => {
    axios
      .get('/api/categories/')
      .then(response => {
        console.log('Categories:', response.data);
        setCategories([{ id: 'all', name: 'All Categories' }, ...response.data]);
      })
      .catch(error => {
        console.error('Categories Error:', error);
      });
  }, []);

  // Fetch templates based on category and search
  useEffect(() => {
    setLoading(true);
    let url = '/api/templates/';
    let params = {};
    if (selectedCategory !== 'all') {
      params.category = selectedCategory;
    }
    if (searchQuery) {
      params.search = searchQuery;
    }
    axios
      .get(url, { params })
      .then(response => {
        console.log('Templates:', response.data);
        setTemplates(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Templates Error:', error);
        setError('Failed to load templates.');
        setLoading(false);
      });
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="bg-lightBlue min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header and Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-navy-900 flex items-center">
              <FaFilter className="icon text-brightBlue mr-2" />
              {selectedCategory === 'all' 
                ? 'All Templates' 
                : categories.find(cat => cat.id === selectedCategory)?.name || 'Templates'}
            </h1>
            <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="bg-white text-navy-900 border border-brightBlue rounded-full px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-brightBlue appearance-none"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brightBlue" />
              </div>
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search templates..."
                  className="bg-white text-navy-900 border border-brightBlue rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-brightBlue w-full md:w-64"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brightBlue" />
                {searchQuery && (
                  <FaTimes
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brightBlue cursor-pointer"
                    onClick={clearSearch}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          {loading && <p className="text-center text-gray-500">Loading templates...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && templates.length === 0 && !error && (
            <p className="text-center text-gray-500">
              No templates found. Try adjusting your search or category.
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link
              to="/"
              className="text-brightBlue font-semibold hover:text-brightBlue/80 transition-colors flex items-center justify-center"
            >
              Back to Home <FaArrowRight className="icon ml-2" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default CategoryPage;