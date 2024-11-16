import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import StripePricingTable from '../components/StripePricingTable';
import { useEffect } from 'react';

function Pricing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that best fits your needs
          </p>
        </div>
        <div className="mt-12">
          <StripePricingTable />
        </div>
      </div>
    </div>
  );
}

export default Pricing;