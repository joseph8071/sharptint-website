import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function StripePricingTable() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Load Stripe Pricing Table script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    
    script.onload = () => {
      setLoading(false);
    };
    
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Complete Your Subscription
          </h2>
        </div>
        <stripe-pricing-table 
          pricing-table-id="prctbl_1QLYNaLUQJ5YJ8zYLO3nnvcD"
          publishable-key="pk_live_51NupCmLUQJ5YJ8zYRGStzYnOGaWgWTWBRgUVGprNSgaY721Zie3WJloqpsPPu7d1ktXxdteTBE7TrTtn5RYDa2b800QKEnMVyL"
          client-reference-id={user?.email}
          customer-email={user?.email}
        >
        </stripe-pricing-table>
      </div>
    </div>
  );
}

export default StripePricingTable; 