import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaScissors, FaClock, FaArrowsRotate } from 'react-icons/fa6';
import { FiScissors, FiClock, FiRefreshCw } from 'react-icons/fi';

function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Professional Window Tinting</span>
              <span className="block text-blue-600">Made Simple</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Choose your vehicle's year, make, and model, and get perfect cuts for tint and PPF with our subscription service.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              {!user && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/register"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                  >
                    Get Started
                  </Link>
                </motion.div>
              )}
              <Link
                to="/pricing"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 border-blue-600"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Product Screenshot Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">
                See SharpTint in Action
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Intuitive interface designed for professional window tinters
              </p>
            </div>
            <div className="rounded-lg shadow-xl overflow-hidden">
              <img
                src="sharpTintDemo.png"
                alt="SharpTint Application Interface"
                className="w-1/2 object-cover mx-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why Choose SharpTint?
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-md transition-shadow hover:shadow-xl"
            >
              <div className="text-blue-600 mb-4 text-4xl">
                <FaScissors />
              </div>
              <h3 className="text-xl font-semibold mb-2">Precise Patterns</h3>
              <p className="text-gray-600">
                Get exact cutting patterns for any vehicle make and model
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-md transition-shadow hover:shadow-xl"
            >
              <div className="text-blue-600 mb-4 text-4xl">
                <FaClock />
              </div>
              <h3 className="text-xl font-semibold mb-2">Time Saving</h3>
              <p className="text-gray-600">
                Reduce installation time with pre-measured patterns
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-md transition-shadow hover:shadow-xl"
            >
              <div className="text-blue-600 mb-4 text-4xl">
                <FaArrowsRotate />
              </div>
              <h3 className="text-xl font-semibold mb-2">Continuous Updates</h3>
              <p className="text-gray-600">
                Stay up-to-date with the latest vehicle models and patterns
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        className="bg-blue-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Ready to streamline your tinting business?
            </h2>
            <p className="mt-4 text-xl text-blue-100">
              Join professional tinters who trust SharpTint
            </p>
            <div className="mt-8">
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Get Started Today!
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;