import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        setError(error.message);
        return;
      }

      const response = await fetch('https://sharp-tint-ca9015f95653.herokuapp.com/create_subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          email: 'customer@example.com', // Get this from form or user context
          password: 'password123', // Get this from form
        }),
      });

      const result = await response.json();
      
      if (result.error) {
        setError(result.error);
      } else {
        // Handle successful payment
        // Redirect to success page or show success message
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="mb-4">
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
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
}

export default CheckoutForm;