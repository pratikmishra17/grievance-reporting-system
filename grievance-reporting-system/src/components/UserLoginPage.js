import React, { useState } from "react";
// --- 1. IMPORT useAuth ---
import { useAuth } from "../services/AuthContext.js";
import { useNavigate } from "react-router-dom"; 
import { registerUser, loginUser } from "../services/ApiService.js";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function SignInPage() {
  const navigate = useNavigate();
  // --- 2. GET the login function from the context ---
  const { login } = useAuth(); 

  const [isRegistering, setIsRegistering] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError("");
    setMessage("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    const credentials = {
      userEmail: formData.userEmail,
      userPassword: formData.userPassword,
    };

    try {
      // This will now work because you imported 'login' from useAuth
      await login(credentials); 
      
      setMessage("Login successful! Redirecting...");

      const loggedInUser = JSON.parse(localStorage.getItem('user'));

      if (loggedInUser && loggedInUser.role === 'ADMIN') {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/homepage");
      }

    } catch (err) {
      console.error("Login Component Error:", err);
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 3. REMOVED duplicate handleRegisterSubmit function ---
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    const registrationData = {
      userName: formData.userName,
      userEmail: formData.userEmail,
      userPassword: formData.userPassword,
    };

    try {
      const successMessage = await registerUser(registrationData);
      setMessage(successMessage);
      setShowVerificationMessage(true);

    } catch (err) {
      console.error("Register Component Error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = (e) => {
    e.preventDefault();
    setIsRegistering(!isRegistering);
    setFormData({ userName: "", userEmail: "", userPassword: "" });
    setMessage("");
    setError("");
    setShowVerificationMessage(false); 
  };

  const handleBackToSignIn = () => {
    setShowVerificationMessage(false);
    setIsRegistering(false);
    setFormData({ userName: "", userEmail: "", userPassword: "" }); 
    setMessage("");
    setError("");
  };

  
  return (
    
    <div className="min-h-screen flex items-center justify-center p-4 bg-[url(/public/bg_image.jpg)] bg-cover bg-center font-mono">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white/30 backdrop-blur-sm rounded-xl p-8 shadow-xl">
        
          {showVerificationMessage ? (
  
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Registration Submitted!</h2>
              <p className="text-gray-700">{message}</p>
              <p className="text-gray-700 mt-2">Please check your email to complete the registration.</p>
              <button
                onClick={handleBackToSignIn} 
                className="mt-6 w-full py-2 px-4 text-sm font-semibold rounded-full text-white bg-red-400 hover:bg-red-700 focus:outline-none"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={isRegistering ? handleRegisterSubmit : handleLoginSubmit}>
              <div className="mb-10 text-center">
                <h1 className="text-gray-800 text-3xl font-bold">
                  {isRegistering ? "Register" : "Sign in"}
                </h1>
              </div>

              {isRegistering && (
                <div className="mb-6">
                  <label className="text-gray-800 text-sm font-medium block mb-2">
                    Username
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                    </div>
                    <input
                      name="userName" type="text" required
                      className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-10 pr-2 py-3 outline-none"
                      placeholder="Enter username"
                      value={formData.userName} onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="text-gray-800 text-sm font-medium block mb-2">
                  Email
                </label>
                <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </div>
                  <input
                    name="userEmail" type="email" required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-10 pr-2 py-3 outline-none"
                    placeholder="Enter email"
                    value={formData.userEmail} onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="text-gray-800 text-sm font-medium block mb-2">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="userPassword"
                    type={showPassword ? "text" : "password"} 
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-red-600 pl-2 pr-8 py-3 outline-none"
                    placeholder="Enter password"
                    value={formData.userPassword} onChange={handleChange}
                  />
                  <button
                    type="button" 
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-5 h-5" />
                    ) : (
                      <FaEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {!isRegistering && (
                <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                  <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800"> Remember me </label>
                  </div>
                  <div> <a href="#" onClick={(e) => e.preventDefault()} className="text-red-600 font-semibold text-sm hover:underline"> Forgot Password? </a></div>
                </div>
              )}

              <div className="mt-8">
               <button
                  type="submit"
                  disabled={isLoading}
                  className={`
                    w-full py-3 px-4 text-sm font-semibold rounded-xl text-white 
                    focus:outline-none 
                    
                    relative overflow-hidden transition-all duration-100 

                    before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 
                    before:bg-gray-400 
                    before:transition-all before:duration-500 

                    ${isLoading
                      ? "bg-red-700 cursor-not-allowed"
                      : "bg-gray-400 hover:before:w-full"
                    }
                  `}
                >
                  <span className="relative z-10">
                    {isLoading ? "Processing..." : isRegistering ? "Register" : "Sign in"}
                  </span>
                </button>
              </div>

              {!isRegistering && message && <p className="text-green-500 text-sm mt-4 text-center">{message}</p>}
              {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

              <p className="text-sm mt-6 text-center text-gray-600">
                {isRegistering ? "Already have an account?" : "Don't have an account?"}
                <a href="#" onClick={toggleForm} className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                  {isRegistering ? "Sign in here" : "Register here"}
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
