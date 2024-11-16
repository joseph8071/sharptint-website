import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function StripePricingTable() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Load Stripe Pricing Table script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubscribe = (event) => {
    // Prevent default behavior if needed
    event.preventDefault();

    if (!user) {
      // Redirect to login if not logged in
      navigate('/login');
    } else {
      // Proceed with subscription logic
      console.log('Proceeding with subscription...');
      // You can add additional logic here to handle the subscription
    }
  };

  return (
    <div>
      <stripe-pricing-table 
        pricing-table-id="prctbl_1QLYNaLUQJ5YJ8zYLO3nnvcD"
        publishable-key="pk_live_51NupCmLUQJ5YJ8zYRGStzYnOGaWgWTWBRgUVGprNSgaY721Zie3WJloqpsPPu7d1ktXxdteTBE7TrTtn5RYDa2b800QKEnMVyL"
        onClick={handleSubscribe}
      >
      </stripe-pricing-table>
    </div>
  );
}

export default StripePricingTable; 