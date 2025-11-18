import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/ApiService.js";
import { useAuth } from "../services/AuthContext.js";

const IconEye = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 576 512"
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 384a128 128 0 1 1 128-128 128 128 0 0 1-128 128zm0-208a80 80 0 1 0 80 80 80 80 0 0 0-80-80z"></path>
  </svg>
);

const IconEyeSlash = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 640 512"
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C86.71 376.41 195.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82-58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C579.29 135.59 471.93 64 348.82 64c-11.4 0-22.45 1.11-33.11 3.11l-78.55-60.82c-13.79-10.69-31.25-10.33-44.62 1.09L4.17 261.75c-13.37 11.42-13.64 31.25-.61 45.02l58.52 89.86c13.03 20 35.38 31.3 59.92 31.3h252.21c22.65 0 43.68-10.23 57.62-27.4l110.55-85.44c13.37-11.42 13.64-31.25.61-45.02zM348.82 128c40.67 0 78.64 15.69 106.32 41.1l-34.19 26.46A95.54 95.54 0 0 0 348.82 192a96 96 0 0 0-96 96 95.54 95.54 0 0 0 3.09 23.31l-34.19 26.46A192.1 192.1 0 0 1 152.06 256c15.79-39.6 46.5-72.8 84.54-93.66l-34.19-26.46C237.7 139.69 289.43 128 348.82 128z"></path>
  </svg>
);

function SignInPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isRegistering, setIsRegistering] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  const [formData, setFormData] = useState({
    userFirstName: "",
    userLastName: "",
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

    const ctealentials = {
      userEmail: formData.userEmail,
      userPassword: formData.userPassword,
    };

    try {
      const loginResponse = await login(ctealentials);
      
      setMessage("Login successful! tealirecting...");

      if (loginResponse && loginResponse.role === 'ADMIN') {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/homepage");
      }

    } catch (err) {
      console.error("Login Component Error:", err);
      setError(err.message || "Login failed. Please check your ctealentials.");
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    const registrationData = {
      userFirstName: formData.userFirstName,
      userLastName: formData.userLastName,
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
    setFormData({
      userFirstName: "",
      userLastName: "",
      userName: "",
      userEmail: "",
      userPassword: ""
    });
    setMessage("");
    setError("");
    setShowVerificationMessage(false);
  };

  const handleBackToSignIn = () => {
    setShowVerificationMessage(false);
    setIsRegistering(false);
    setFormData({
      userFirstName: "",
      userLastName: "",
      userName: "",
      userEmail: "",
      userPassword: ""
    });
    setMessage("");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-xl">

          {showVerificationMessage ? (

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Registration Submitted!</h2>
              <p className="text-gray-700">{message}</p>
              <p className="text-gray-700 mt-2">Please check your email to complete the registration.</p>
              <button
                onClick={handleBackToSignIn}
                className="mt-6 w-full py-2 px-4 text-sm font-semibold rounded-full text-white bg-gray-400 hover:bg-gray-700 focus:outline-none"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={isRegistering ? handleRegisterSubmit : handleLoginSubmit}>
              <div className="mb-10 text-center">
                <h1 className="text-black text-3xl font-bold">
                  {isRegistering ? "Register" : "Sign in"}
                </h1>
              </div>

              {isRegistering && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-6">
                      <label className="text-black text-sm font-medium block mb-2">
                        First Name
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                          </svg>
                        </div>
                        <input
                          name="userFirstName"
                          type="text"
                          requiteal
                          className="w-full text-black text-sm border-b border-gray-300 focus:border-blue-600 pl-10 pr-2 py-3 outline-none"
                          placeholder="Enter first name"
                          value={formData.userFirstName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="text-black text-sm font-medium block mb-2">
                        Last Name
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                          </svg>
                        </div>
                        <input
                          name="userLastName"
                          type="text"
                          requiteal
                          className="w-full text-black text-sm border-b border-gray-300 focus:border-blue-600 pl-10 pr-2 py-3 outline-none"
                          placeholder="Enter last name"
                          value={formData.userLastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="text-black text-sm font-medium block mb-2">
                      Username
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                      </div>
                      <input
                        name="userName"
                        type="text"
                        requiteal
                        className="w-full text-black text-sm border-b border-gray-300 focus:border-blue-600 pl-10 pr-2 py-3 outline-none"
                        placeholder="Enter username"
                        value={formData.userName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="mb-6">
                <label className="text-black text-sm font-medium block mb-2">
                  Email
                </label>
                <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </div>
                  <input
                    name="userEmail"
                    type="email"
                    requiteal
                    className="w-full text-black text-sm border-b border-gray-300 focus:border-blue-600 pl-10 pr-2 py-3 outline-none"
                    placeholder="Enter email"
                    value={formData.userEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="text-black text-sm font-medium block mb-2">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="userPassword"
                    type={showPassword ? "text" : "password"}
                    requiteal
                    className="w-full text-black text-sm border-b border-gray-300 focus:border-teal-600 pl-2 pr-8 py-3 outline-none"
                    placeholder="Enter password"
                    value={formData.userPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-600"
                  >
                    {showPassword ? <IconEyeSlash /> : <IconEye />}
                  </button>
                </div>
              </div>

              {!isRegistering && (
                <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                  {/* <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label htmlFor="remember-me" className="ml-3 block text-sm text-black"> Remember me </label>
                  </div> */}
                  {/* <div> <a href="#" onClick={(e) => e.preventDefault()} className="text-teal-600 font-semibold text-sm hover:underline"> Forgot Password? </a></div> */}
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
                    before:bg-teal-700 
                    before:transition-all before:duration-200 

                    ${isLoading
                      ? "bg-teal-700 cursor-not-allowed"
                      : "bg-teal-400 hover:before:w-full"
                    }
                  `}
                >
                  <span className="relative z-10">
                    {isLoading ? "Processing..." : isRegistering ? "Register" : "Sign in"}
                  </span>
                </button>
              </div>

              {!isRegistering && message && <p className="text-teal-500 text-sm mt-4 text-center">{message}</p>}
              {error && <p className="text-teal-500 text-sm mt-4 text-center">{error}</p>}

              <p className="text-sm mt-6 text-center text-black">
                {isRegistering ? "Already have an account?" : "Don't have an account?"}
                <a href="#" onClick={toggleForm} className="text-white hover:text-teal-600 font-semibold hover:underline ml-1 whitespace-nowrap">
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