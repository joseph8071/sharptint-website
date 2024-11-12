import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckIcon } from '@heroicons/react/24/solid';

function Pricing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const plans = [
    {
      name: 'Monthly Subscription',
      price: 99.99,
      priceId: process.env.REACT_APP_STRIPE_PRICE_ID,
      interval: 'month',
      features: [
        'Full access to SharpTint software',
        'Pattern library',
        'Technical support',
        'Monthly updates'
      ]
    }
  ];

  const handleSubscribe = (plan) => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Validate price ID
    if (!plan.priceId) {
      console.error('Price ID is missing:', plan);
      setError('Invalid plan configuration');
      return;
    }

    // Store complete plan data
    const planData = {
      name: plan.name,
      price: plan.price,
      priceId: plan.priceId,
      interval: plan.interval
    };

    console.log('Storing plan data:', planData);
    sessionStorage.setItem('selectedPlan', JSON.stringify(planData));
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
      {error && (
        <div className="text-red-600 text-center mb-6 p-4 bg-red-50 rounded-md">
          {error}
        </div>
      )}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className="border rounded-lg p-8 shadow-lg">
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="text-3xl font-bold mt-4">${plan.price}/mo</p>
            <ul className="mt-6 space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan)}
              className="w-full mt-8 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pricing;