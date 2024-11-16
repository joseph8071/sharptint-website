import { CheckIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function PricingCard({ title, price, features, onSubscribe, loading }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = () => {
    if (!user) {
      // Redirect to login or registration if not logged in
      navigate('/login');
    } else {
      // Call the onSubscribe function if the user is logged in
      onSubscribe();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105">
      <div className="px-6 py-8 bg-gradient-to-br from-blue-500 to-blue-600 sm:p-10 sm:pb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl leading-6 font-semibold text-white">
            {title}
          </h3>
        </div>
        <div className="mt-4 flex items-baseline text-white">
          <span className="text-5xl font-extrabold tracking-tight">
            ${price}
          </span>
          <span className="ml-1 text-2xl font-medium">/mo</span>
        </div>
      </div>
      <div className="px-6 pt-6 pb-8 bg-white sm:p-10">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon className="flex-shrink-0 h-6 w-6 text-green-500" />
              <p className="ml-3 text-base text-gray-700">{feature}</p>
            </li>
          ))}
        </ul>
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? 'Processing...' : 'Subscribe Now'}
        </button>
      </div>
    </div>
  );
}

export default PricingCard;