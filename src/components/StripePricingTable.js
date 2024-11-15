import React, { useEffect } from 'react';

function StripePricingTable() {
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

  return (
    <stripe-pricing-table 
      pricing-table-id="prctbl_1QLYNaLUQJ5YJ8zYLO3nnvcD"
      publishable-key="pk_live_51NupCmLUQJ5YJ8zYRGStzYnOGaWgWTWBRgUVGprNSgaY721Zie3WJloqpsPPu7d1ktXxdteTBE7TrTtn5RYDa2b800QKEnMVyL">
    </stripe-pricing-table>
  );
}

export default StripePricingTable; 