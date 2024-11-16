import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import StripePricingTable from '../components/StripePricingTable';
import { useEffect } from 'react';

function Subscribe() {
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
        <StripePricingTable />
      </div>
    </div>
  );
}

export default Subscribe; 