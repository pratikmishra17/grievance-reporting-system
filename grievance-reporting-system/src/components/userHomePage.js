import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.js';
import { useAuth } from "../services/AuthContext.js";

function UserHomePage() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const username = user ? user.userFirstName : '';

    return (
        <div className="flex flex-col min-h-screen font-mono">
            <Navbar className="h-20" />

            {/*
              - Added 'items-center' to center content horizontally
              - Added 'text-center' to center all the text
            */}
            <div className="flex-1 flex flex-col justify-center items-center p-12 md:px-24 text-center">
                
                {/* - Wrapped content in a max-w-3xl for better control
                  on large screens, similar to the reference image.
                */}
                <div className="w-full max-w-3xl">
                    <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-6">
                        Welcome{username ? ` ${username}!` : '!'}
                    </h1>
                    
                    {/* - Added 'mx-auto' to center the paragraphs */}
                    <p className="text-lg text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed">
                        See a problem? Be the solution. Report local issues, track their progress, and help make your community better.
                    </p>
                    <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Ready to make a difference? Get started by raising a complaint, just click the button below to fill out the Grievance form or click view to track already raised complaints.
                    </p>

                    {/* - Added 'justify-center' to center the buttons */}
                    <div className="flex flex-wrap gap-4 justify-center"> 
                        <Link
                            to="/user/form"
                            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-black rounded-xl bg-teal-500 hover:bg-white hover:text-black focus:ring-4 focus:ring-red-100 shadow-xl"
                        >
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
                        </Link>
                        
                        <Link
                            to="/user/status"
                            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-black rounded-xl bg-teal-500 hover:bg-white hover:text-black focus:ring-4 focus:ring-red-100 shadow-xl"
                        >
                            View Raised Grievances
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserHomePage;