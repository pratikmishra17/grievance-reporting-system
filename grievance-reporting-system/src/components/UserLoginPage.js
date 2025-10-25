import React, { useState } from "react";
// Import your API functions - Corrected Path assuming standard src structure
import { registerUser, loginUser } from "../services/ApiService.js";

function SignInPage() {
  // State to toggle between Login and Register views
  const [isRegistering, setIsRegistering] = useState(false);

  // State for form inputs (combined for both forms)
  const [formData, setFormData] = useState({
    userName: "", // Needed for registration
    userEmail: "", // Used for both
    userPassword: "", // Used for both
  });

  // State for displaying feedback messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // To show loading state on buttons

  // --- Handlers ---

  // Update state when any input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear errors when user starts typing again
    setError("");
    setMessage("");
  };

  // Handle Login form submission
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
      const loginResult = await loginUser(credentials);
      // Handle successful login - Display message, redirect, save token etc.
      setMessage(loginResult.message || "Login successful!"); // Adjust based on API response
      console.log("Login Result:", loginResult);
      // Example: Redirect after successful login (you'll need React Router or similar)
      // history.push('/dashboard');
    } catch (err) {
      console.error("Login Component Error:", err);
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Register form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    // Ensure username is included for registration
    const registrationData = {
      userName: formData.userName,
      userEmail: formData.userEmail,
      userPassword: formData.userPassword,
    };

    try {
      const successMessage = await registerUser(registrationData);
      setMessage(successMessage); // Display success message from backend
      // Optionally switch back to login view after successful registration
      setIsRegistering(false);
      // Clear form (or just password/username if you want email to persist)
      setFormData({ userName: "", userEmail: formData.userEmail, userPassword: "" });
    } catch (err) {
      console.error("Register Component Error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle between Login and Register views
  const toggleForm = (e) => {
    e.preventDefault();
    setIsRegistering(!isRegistering);
    // Clear form data and messages when switching
    setFormData({ userName: "", userEmail: "", userPassword: "" });
    setMessage("");
    setError("");
  };

  // --- Render ---
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 font-[sans-serif]">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-lg p-8 shadow-lg">
          {/* Use onSubmit specific to the current view */}
          <form onSubmit={isRegistering ? handleRegisterSubmit : handleLoginSubmit}>
            <div className="mb-10 text-center">
              <h1 className="text-gray-800 text-3xl font-bold">
                {isRegistering ? "Register" : "Sign in"}
              </h1>
            </div>

            {/* Username Field (only show for registration) */}
            {isRegistering && (
              <div className="mb-6">
                <label className="text-gray-800 text-sm font-medium block mb-2">
                  Username
                </label>
                <div className="relative flex items-center">
                  <input
                    name="userName"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter username"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                  {/* Optional: Add an icon */}
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="mb-6">
              <label className="text-gray-800 text-sm font-medium block mb-2">
                Email
              </label>
              <div className="relative flex items-center">
                <input
                  name="userEmail" 
                  type="email" 
                  required
                  className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
                  placeholder="Enter email"
                  value={formData.userEmail}
                  onChange={handleChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 682.667 682.667"
                >
                  <path
                    fill="none"
                    strokeMiterlimit="10"
                    strokeWidth="40"
                    d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                  ></path>
                   <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"></path>
                </svg>
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="text-gray-800 text-sm font-medium block mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="userPassword" // Changed from "password"
                  type="password"
                  required
                  className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
                  placeholder="Enter password"
                  value={formData.userPassword}
                  onChange={handleChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
                </svg>
              </div>
            </div>

            {/* Remember Me / Forgot Password (only for Login) */}
            {!isRegistering && (
              <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-blue-600 font-semibold text-sm hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 text-sm font-semibold rounded text-white ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none`}
              >
                {isLoading
                  ? "Processing..."
                  : isRegistering
                  ? "Register"
                  : "Sign in"}
              </button>
            </div>

            {/* Display Success or Error Messages */}
             {message && <p className="text-green-500 text-sm mt-4 text-center">{message}</p>}
             {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}


            {/* Toggle Link */}
            <p className="text-sm mt-6 text-center text-gray-600">
              {isRegistering
                ? "Already have an account?"
                : "Don't have an account?"}
              <a
                href="#"
                onClick={toggleForm}
                className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
              >
                {isRegistering ? "Sign in here" : "Register here"}
              </a>
            </p>

            {/* OR Separator */}
            <div className="my-6 flex items-center gap-4">
              <hr className="w-full border-gray-300" />
              <p className="text-sm text-gray-800 text-center">or</p>
              <hr className="w-full border-gray-300" />
            </div>

            {/* Social Logins */}
            <div className="space-x-8 flex justify-center">
               {/* Add onClick handlers for social logins if needed */}
              <button type="button" className="border-none bg-transparent outline-none cursor-pointer" aria-label="Sign in with Google">
                {/* Google SVG */}
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 inline" viewBox="0 0 512 512"><path fill="#fbbd00" d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"></path><path fill="#0f9d58" d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"></path><path fill="#31aa52" d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"></path><path fill="#3c79e6" d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"></path><path fill="#cf2d48" d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"></path><path fill="#eb4132" d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"></path></svg>
              </button>
              {/* Apple SVG */}
               <button type="button" className="border-none bg-transparent outline-none cursor-pointer" aria-label="Sign in with Apple">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 inline" fill="#000" viewBox="0 0 22.773 22.773"><path d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z"></path></svg>
              </button>
              {/* Facebook SVG */}
               <button type="button" className="border-none bg-transparent outline-none cursor-pointer" aria-label="Sign in with Facebook">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 inline" fill="#007bff" viewBox="0 0 167.657 167.657"><path d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"></path></svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
