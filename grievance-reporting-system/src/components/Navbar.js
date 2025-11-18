import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useAuth } from "../services/AuthContext.js";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    logout();
    setIsModalOpen(false);
    navigate('/'); // Navigate to the main sign-in page
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="bg-transparent">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 relative">

            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <Link to="/user/homepage">
                <img src="/favicon.ico" alt="Logo" className="h-8 w-auto" />
              </Link>
            </div>

            {/* Center: Links */}
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:flex space-x-6">
              <Link
                to="/user/homepage"
                className="rounded-md px-3 py-2 text-md font-mono text-white hover:text-black hover:bg-white/30"
              >
                Home
              </Link>
              <Link
                to="/user/status"
                className="rounded-md px-3 py-2 text-md font-mono text-white hover:text-black hover:bg-white/30"
              >
                Status
              </Link>
              
              {/* Replaced "Account" Link with "Sign Out" button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-md px-3 py-2 text-md font-mono text-white hover:text-black hover:bg-white/30"
              >
                Sign Out
              </button>
            </div>

            {/* Right: Notification */}
            <div className="ml-auto flex items-center space-x-4">
              
            </div>
          </div>
        </div>
      </nav>

      {/* --- Confirmation Modal --- */}
      <LogoutConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </>
  );
}

// --- Modal Component ---
function LogoutConfirmationModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    // Full-screen overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Modal container */}
      <div className="relative w-full max-w-md p-6 bg-white rounded-xl shadow-2xl m-4">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Log Out</h2>
        
        {/* Message */}
        <p className="text-gray-700">
          Are you sure you want to log out?
        </p>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-md hover:bg-teal-700"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;