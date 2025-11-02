// --- 1. Import useState ---
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";
import { useAuth } from "../services/AuthContext.js";
import Form from "../components/Form.js"

function UserHomePage() {
    const { user, isLoading } = useAuth();

    // --- 2. Add state to track if form is expanded ---
    const [isFormExpanded, setIsFormExpanded] = useState(false);

    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    const username = user ? user.userName : '';

    return (
        <div className="flex flex-col min-h-screen bg-[url(/public/bg_image.jpg)] bg-cover bg-center font-mono">
            {/* Added h-20 (80px) to Navbar for consistent height calculation */}
            <Navbar className="h-20" />

            {/* --- 3. Main content area ---
                - Uses 'transition-all' to animate width changes.
                - 'overflow-hidden' stops horizontal scrollbars during animation.
            */}
            <div className="flex flex-col md:flex-row w-full h-[calc(100vh-80px)] overflow-hidden">
  
  {/* --- 4. Left: Text section ---
      - Conditionally sets width: 'md:w-1/2' (default) or 'md:w-1/4' (shrunk)
      - Added 'transition-all' to animate the resize.
  */}
  <div 
    className={`
      flex flex-col justify-start items-start px-12 py-12 
      transition-all duration-500 ease-in-out
      ${isFormExpanded ? 'md:w-1/4' : 'md:w-1/2'}
    `}
  >
    <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-700 mb-6">
      Welcome{username ? `, ${username}!` : '!'}
    </h1>
    <p className="text-lg text-gray-600 mb-10 max-w-md leading-relaxed">
      Help make your locality better. Report any issue you want fixed by submitting a grievance report form.
    </p>

    <div className="flex flex-wrap gap-4"> 
    
      {!isFormExpanded && (
        <button
          onClick={() => setIsFormExpanded(true)}
          className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-black rounded-xl bg-gray-400 hover:bg-white hover:text-black focus:ring-4 focus:ring-red-100 shadow-xl">
          Raise a Grievance
          <svg
            className="ml-2 -mr-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      )}

      
      <Link
        to="/user/status"
        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-black rounded-xl bg-gray-400 hover:bg-white hover:text-black focus:ring-4 focus:ring-red-100 shadow-xl"
      >
        View Raised Grievances
      </Link>
    </div>
  </div>

  <div 
    className={`
      relative bg-white shadow-2xl rounded-xl
      transition-all duration-500 ease-in-out
      overflow-y-auto
      ${isFormExpanded ? 'md:w-3/4' : 'md:w-1/2'}
    `}
  >
 
    {isFormExpanded && (
      <button
        onClick={() => setIsFormExpanded(false)}
        className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 z-10 p-2 rounded-xl hover:bg-gray-100"
        aria-label="Close form"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    )}

    <div className="p-12 bg-white/30 backdrop-blur-sm ">
      <Form />
    </div>
  </div>
</div>
        </div>
    );
}

export default UserHomePage;