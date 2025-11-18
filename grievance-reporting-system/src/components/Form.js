import React, { useState, useEffect } from 'react';
import { submitForm } from '../services/ApiService';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../services/AuthContext.js';
import Navbar from './Navbar.js'; // <-- 1. Import Navbar

function Form() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [description, setDescription] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.userFirstName || '');
      setLastName(user.userLastName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  useEffect(() => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneValid = phone.trim().length >= 7;

    const allFilled =
      firstName.trim() &&
      lastName.trim() &&
      phoneValid &&
      emailValid &&
      category.trim() &&
      locationInput.trim();

    setIsFormValid(Boolean(allFilled));
  }, [firstName, lastName, phone, email, category, locationInput]);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!isFormValid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    if (!user) {
        setSubmitError('You must be logged in to submit a form.');
        setIsSubmitting(false);
        return;
    }

    setIsSubmitting(true);

    const grievanceData = {
      firstName,
      lastName,
      phone,
      email,
      category,
      locationInput,
      description,
      userId: user.userId
    };

    try {
      const result = await submitForm(grievanceData, file);
      console.log('Submission successful:', result);
      navigate('/user/status');
    } catch (error)
 {
      console.error('Submission failed:', error);
      setSubmitError(error.message || 'An unknown error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    // 2. Add the full page wrapper
    <div className="flex flex-col min-h-screen font-mono">
      <Navbar /> 
      
      {/* 3. Add the flex-box to center the content */}
      <div className="flex-1 flex items-center justify-center p-4">
        
        {/* 4. This is your "glass box" container */}
        <div className="w-full max-w-3xl bg-white/15 backdrop-blur-xl shadow-xl rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            
            {/* 5. Title color updated for dark background */}
            <p className="text-4xl font-extrabold text-white text-center mb-6">
              Grievance Form
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="relative">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  // 6. Text and border colors updated
                  className="block w-full px-0 pb-2 pt-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-400 focus:outline-none focus:border-teal-500"
                />
                <span className="text-xs text-white">First Name *</span>
              </label>
              <label className="relative">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="block w-full px-0 pb-2 pt-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-400 focus:outline-none focus:border-teal-500"
                />
                <span className="text-xs text-white">Last Name *</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="123-456-7890"
                  className="block w-full px-0 pb-2 pt-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-400 focus:outline-none focus:border-teal-500"
                />
                <span className="text-xs text-white">Phone *</span>
              </label>
              <label className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="block w-full px-0 pb-2 pt-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-400 focus:outline-none focus:border-teal-500"
                />
                <span className="text-xs text-white">Email *</span>
              </label>
            </div>

            <div>
              <label className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  // 7. Select styling
                  className="block w-full px-0 pb-2 pt-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-400 focus:outline-none focus:border-teal-500"
                >
                  <option value="" disabled className="text-black">Select category</option>
                  <option value="road" className="text-black">Road / Infrastructure</option>
                  <option value="sanitation" className="text-black">Sanitation</option>
                  <option value="water" className="text-black">Water Supply</option>
                  <option value="power" className="text-black">Power / Electricity</option>
                  <option value="other" className="text-black">Other</option>
                </select>
                <span className="absolute left-0 -top-3.5 text-xs text-white">Category *</span>
              </label>
            </div>

            <div>
              <label className="relative">
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="e.g., Main Street & 2nd Ave"
                  className="block w-full px-0 pb-2 pt-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-400 focus:outline-none focus:border-teal-500"
                />
                <span className="text-xs text-white">Location *</span>
              </label>
            </div>

            <div>
              {/* 8. File input styling */}
              <label className="block text-sm font-medium text-white mb-2">
                Upload image (Optional)
              </label>
              <input
                type="file"
                accept="image/png,image/jpeg,image/gif, image/svg+xml"
                onChange={handleFileChange}
                className="block w-full text-sm text-white border border-gray-400 rounded-md p-2 bg-white/20"
              />
              {file && (
                <p className="mt-1 text-xs text-white">
                  Selected: {file.name}
                </p>
              )}
            </div>

            <div>
              {/* 9. Textarea styling */}
              <label className="block text-sm font-medium text-white mb-2">
                Describe the issue (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Tell us what happened..."
                className="w-full px-3 py-2 text-sm text-white border border-gray-400 rounded-md bg-white/20 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="w-full flex justify-center mt-6">
              <div
                className="relative w-full max-w-lg"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
              >
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  aria-describedby={!isFormValid ? "submit-tooltip" : undefined}
                  // 10. Button styling
                  className={`w-full py-3 px-5 text-base font-medium text-center rounded-xl transition-all duration-200 ${
                    isFormValid && !isSubmitting
                      ? "bg-teal-500 hover:bg-white text-black"
                      : "bg-gray-500 text-white cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>

                {(!isFormValid && showTooltip) && (
                  <div
                    id="submit-tooltip"
                    role="tooltip"
                    className="absolute left-1/2 transform -translate-x-1/2 -top-14 z-20 w-72 text-sm text-gray-700 bg-white border border-gray-200 rounded-md shadow-md p-3"
                  >
                    <div className="font-semibold text-gray-900 mb-1">Complete required fields</div>
                    <div className="text-xs text-gray-600">
                      Please fill First name, Last name, Phone, Email, Category and Location before submitting.
                    </div>
                  </div>
                )}
              </div>
            </div>
            {submitError && <p className="text-sm text-red-400 text-center">{submitError}</p>}
          </form >
        </div>
      </div>
    </div>
  );
}

export default Form;