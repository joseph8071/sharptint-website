import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PricingCard from '../components/PricingCard';

function PricingDetails() {
  const plans = [
    {
      title: "Monthly Plan",
      price: 100,
      features: [
        "Tint + PPF Cut Patterns",
        "Continuous Updates",
        "Monthly Billing",
      ]
    },
    {
      title: "Annual Plan",
      price: 999,
      features: [
        "Tint + PPF Cut Patterns",
        "Continuous Updates",
        "Save $201 annually",
        "Annual Billing"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that best fits your needs
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <PricingCard
                title={plan.title}
                price={plan.price}
                features={plan.features}
                onSubscribe={() => {/* Add your subscription logic */}}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PricingDetails; 