import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await api.get('/get_subscription');
        if (response.data.success) {
          setSubscription(response.data.subscription);
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back, {user?.email}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Subscription Status */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Subscription Status</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Plan</p>
              <p className="font-semibold">Monthly Subscription</p>
            </div>
            <div>
              <p className="text-gray-600">Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
            <div>
              <p className="text-gray-600">Next Payment</p>
              <p>{subscription?.current_period_end ? 
                new Date(subscription.current_period_end * 1000).toLocaleDateString() : 
                'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Software Access */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Software Access</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Download Software</p>
              <button
                onClick={async () => {
                  setDownloadLoading(true);
                  try {
                    // Add your download logic here
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    // Simulate download start
                    window.location.href = '/download/sharptint.exe';
                  } finally {
                    setDownloadLoading(false);
                  }
                }}
                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                disabled={downloadLoading}
              >
                {downloadLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Preparing Download...
                  </>
                ) : (
                  'Download SharpTint'
                )}
              </button>
            </div>
            <div>
              <p className="text-gray-600">Documentation</p>
              <a 
                href="/docs" 
                className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                View Documentation →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 