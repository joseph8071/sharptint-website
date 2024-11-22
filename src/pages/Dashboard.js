import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { FiDownload, FiClock, FiAlertCircle } from 'react-icons/fi';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const subResponse = await api.get(`/get_subscription_status?email=${user.email}`);
        if (subResponse.data.success) {
          setSubscriptionData(subResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setToast({
          message: 'Failed to load subscription data',
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleDownload = async () => {
    setDownloadLoading(true);
    try {
      const response = await api.get('/download_software');
      if (response.data.success) {
        window.location.href = response.data.downloadUrl;
        setToast({
          message: 'Download started successfully',
          type: 'success'
        });
      }
    } catch (error) {
      setToast({
        message: 'Failed to start download',
        type: 'error'
      });
    } finally {
      setDownloadLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Subscription Status */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiClock className="mr-2" />
              Subscription Status
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${
                  subscriptionData?.status === 'active' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {subscriptionData?.status?.charAt(0).toUpperCase() + subscriptionData?.status?.slice(1)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Renewal Date:</span>
                <span className="font-medium">
                  {subscriptionData?.current_period_end ? formatDate(subscriptionData.current_period_end) : 'N/A'}
                </span>
              </div>
              {subscriptionData?.cancel_at_period_end && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-md flex items-start">
                  <FiAlertCircle className="text-yellow-400 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-yellow-800">
                    Your subscription will end on {formatDate(subscriptionData.current_period_end)}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Download Software */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiDownload className="mr-2" />
              Software Download
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Download the latest version of SharpTint software to get started.
              </p>
              <button
                onClick={handleDownload}
                disabled={downloadLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
              >
                {downloadLoading ? (
                  <>
                    <LoadingSpinner />
                    <span className="ml-2">Preparing Download...</span>
                  </>
                ) : (
                  <>
                    <FiDownload className="mr-2" />
                    Download Software
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </motion.div>
  );
}

export default Dashboard; 