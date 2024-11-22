import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu } from '@headlessui/react';
import './navbar.css';

function Navbar() {
  const { user, logout } = useAuth();

  const getInitial = (email) => {
    return email ? email[0].toUpperCase() : '?';
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/sharpTintLogov3.png" 
                alt="SharpTint Logo" 
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">
                SharpTint
              </span>
            </Link>
          </div>

          {/* Right side - Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link to="/pricing" className="nav-link">
              Pricing
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>

            {!user ? (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Register
                </Link>
              </div>
            ) : (
              <Menu as="div" className="relative ml-3">
                <Menu.Button className="user-menu-button">
                  {getInitial(user.email)}
                </Menu.Button>
                <Menu.Items className="dropdown-menu">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/dashboard"
                        className={`dropdown-item ${active ? 'bg-gray-100' : ''}`}
                      >
                        Dashboard
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`dropdown-item ${active ? 'bg-gray-100' : ''}`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 