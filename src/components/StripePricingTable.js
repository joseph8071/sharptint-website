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
      pricing-table-id="prctbl_1QKUypQ6LVdCqG9SB3w9yOWV"
      publishable-key="pk_test_51QKUhuQ6LVdCqG9Siu440hMKhDoTGfaNoVTsc5Vsn77i5pGHIoD4vxQ6GupDHhHttwQw3GnuFOi7Q6qfsVuETbO200mw9HlMM6">
    </stripe-pricing-table>
  );
}

export default StripePricingTable; 