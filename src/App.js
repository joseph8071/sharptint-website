import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AuthProvider } from './context/AuthContext';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Elements stripe={stripePromise}>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
            <Footer />
          </div>
        </Elements>
      </Router>
    </AuthProvider>
  );
}

export default App;