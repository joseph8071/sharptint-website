import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { checkout } from '../utils/api';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Environment variables:', {
      priceId: process.env.REACT_APP_STRIPE_PRICE_ID,
      publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
    });
    
    const plan = sessionStorage.getItem('selectedPlan');
    if (!plan || !user) {
      navigate('/pricing');
      return;
    }
    const parsedPlan = JSON.parse(plan);
    console.log('Selected plan from session:', parsedPlan);
    setSelectedPlan(parsedPlan);
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !selectedPlan) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Starting checkout with plan:', selectedPlan);

      // Create payment method
      const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          email: user.email,
        },
      });

      if (cardError) {
        throw new Error(cardError.message);
      }

      // Send to backend
      const checkoutData = {
        priceId: selectedPlan.priceId,
        paymentMethodId: paymentMethod.id,
        email: user.email,
        planDetails: {
          name: selectedPlan.name,
          price: selectedPlan.price,
          interval: selectedPlan.interval
        }
      };

      console.log('Sending checkout data:', checkoutData);

      const response = await checkout(checkoutData);

      if (response.data.requiresAction) {
        const { error: confirmError } = await stripe.confirmCardPayment(
          response.data.clientSecret
        );

        if (confirmError) {
          throw new Error(confirmError.message);
        }
      }

      // Success
      sessionStorage.removeItem('selectedPlan');
      navigate('/dashboard');
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'An error occurred during checkout');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedPlan) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">{selectedPlan.name}</span>
          <span className="font-medium">${selectedPlan.price}/month</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total</span>
            <span className="font-bold">${selectedPlan.price}/month</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Card Information
        </label>
        <div className="p-4 border rounded-md">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          `Pay $${selectedPlan.price}`
        )}
      </button>
    </form>
  );
}

export default CheckoutForm;