import React from 'react';
import Navbar from './Navbar'; // Assuming you have a standard Navbar
import { useAuth } from '../services/AuthContext';
import { useNavigate } from 'react-router-dom';

function AccountPage() {
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/sign-in'); 
  };

  
  if (!user) {
  
    return <div className="min-h-screen bg-[url('/public/bg_image.jpg')] bg-cover bg-center"></div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-[url('/public/bg_image.jpg')] bg-cover bg-center font-mono">
        
  
        <div className="w-full max-w-md bg-white/30 backdrop-blur-sm rounded-xl p-8 shadow-xl text-gray-900">
          
          <h1 className="text-3xl font-bold text-center mb-6">Account Details</h1>

  
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Username</label>
              <div className="w-full p-3 bg-white/50 rounded-md shadow-sm">
                {user.userName}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="w-full p-3 bg-white/50 rounded-md shadow-sm">
                {user.email} 
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Role</label>
              <div className="w-full p-3 bg-white/50 rounded-md shadow-sm font-semibold">
                {user.role === 'ROLE_ADMIN' ? 'Administrator' : 'User'}
              </div>
            </div>
          </div>

  
          <button
            onClick={handleLogout}
            className={`
              w-full py-3 px-4 mt-8 text-sm font-semibold rounded-full text-white 
              focus:outline-none 
              relative overflow-hidden transition-all duration-300 
              before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 
              before:bg-red-700 
              before:transition-all before:duration-500 
              bg-red-400 hover:before:w-full
            `}
          >
            <span className="relative z-10">Log Out</span>
          </button>

        </div>
      </div>
    </>
  );
}

export default AccountPage;
  