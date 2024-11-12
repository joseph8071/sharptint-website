import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">SharpTint</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/pricing" className="hover:text-blue-600">Pricing</Link>
          <Link to="/login" className="hover:text-blue-600">Login</Link>
          <Link to="/register" className="hover:text-blue-600">Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 