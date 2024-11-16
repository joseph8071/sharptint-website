import { Link } from 'react-router-dom';

function PricingDetails() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that best fits your needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105">
            <h3 className="text-2xl font-semibold">SharpTint Monthly Subscription</h3>
            <p className="mt-2 text-gray-600">Monthly Software Subscription</p>
            <p className="mt-4 text-5xl font-bold text-blue-600">US$100</p>
            <p className="text-gray-600">per month</p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="mr-2">✔</span>Tint + PPF Cut Patterns
              </li>
              <li className="flex items-center">
                <span className="mr-2">✔</span>Continuous Updates
              </li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 border-2 border-blue-600">
            <h3 className="text-2xl font-semibold text-blue-600">Best Deal</h3>
            <h3 className="text-2xl font-semibold">SharpTint Yearly Subscription</h3>
            <p className="mt-2 text-gray-600">Yearly Software Subscription</p>
            <p className="mt-4 text-5xl font-bold text-blue-600">US$999</p>
            <p className="text-gray-600">per year</p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="mr-2">✔</span>Tint + PPF Cut Patterns
              </li>
              <li className="flex items-center">
                <span className="mr-2">✔</span>Continuous Updates
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/subscribe"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            Subscribe Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PricingDetails; 