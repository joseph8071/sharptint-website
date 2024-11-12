import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Pricing() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const prices = [
    {
      name: 'Monthly Subscription',
      price: 29.99,
      priceId: process.env.REACT_APP_STRIPE_PRICE_ID,
      features: [
        'Full access to SharpTint software',
        'Pattern library',
        'Technical support',
        'Monthly updates'
      ]
    }
  ];

  const handleSubscribe = async (priceId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/create_subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          email: user.email,
          priceId: priceId
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        navigate('/checkout');
      } else {
        console.error('Subscription creation failed:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {prices.map((tier) => (
          <div key={tier.name} className="border rounded-lg p-8">
            <h3 className="text-xl font-semibold">{tier.name}</h3>
            <p className="text-3xl font-bold mt-4">${tier.price}/mo</p>
            <ul className="mt-6 space-y-4">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(tier.priceId)}
              className="w-full mt-8 bg-blue-600 text-white py-2 rounded-md"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pricing;