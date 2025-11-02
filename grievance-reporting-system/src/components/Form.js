import React, { useState, useEffect } from 'react';
import { submitForm } from '../services/ApiService';
import { Link, useNavigate } from "react-router-dom";

function Form() {

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
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneValid = phone.trim().length >= 7; // basic check

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

    setIsSubmitting(true);

    const payload = {
      firstName,
      lastName,
      phone,
      email,
      category,
      locationInput,
      description,
      fileName: file?.name ?? null,
    };

    try {
    
      const result = await submitForm(payload);
      console.log('Submission successful:', result);

    
      navigate('/user/status');

    } catch (error) {
    
      console.error('Submission failed:', error);
      setSubmitError(error.message || 'An unknown error occurred. Please try again.');
      setIsSubmitting(false); 
    }
  };


  return (

    <div className="w-full bg-white/30 backdrop-blur-sm ">
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <p className="text-4xl font-extrabold text-black text-center mb-6">
          Grievance Form
        </p>

        {/* Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="relative">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="block w-full px-0 pb-2 pt-4 text-sm bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600"
            />
            <span className="text-xs text-gray-500">First name *</span>
          </label>

          <label className="relative">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="block w-full px-0 pb-2 pt-4 text-sm bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600"
            />
            <span className="text-xs text-gray-500">Last name *</span>
          </label>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="relative">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="123-456-7890"
              className="block w-full px-0 pb-2 pt-4 text-sm bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600"
            />
            <span className="text-xs text-gray-500">Phone *</span>
          </label>

          <label className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="block w-full px-0 pb-2 pt-4 text-sm bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600"
            />
            <span className="text-xs text-gray-500">Email *</span>
          </label>
        </div>


        <div>
          <label className="relative">

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full px-0 pb-2 pt-4 text-sm bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600"
            >
              <option value="" disabled>Select category</option>
              <option value="road">Road / Infrastructure</option>
              <option value="sanitation">Sanitation</option>
              <option value="water">Water Supply</option>
              <option value="power">Power / Electricity</option>
              <option value="other">Other</option>
            </select>
            <span className="absolute left-0 -top-3.5 text-xs text-gray-500">Category *</span>
          </label>
        </div>


        <div>
          <label className="relative">
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="e.g., Main Street & 2nd Ave"
              className="block w-full px-0 pb-2 pt-4 text-sm bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600"
            />
            <span className="text-xs text-gray-500">Location *</span>
          </label>
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload image (Optional)
          </label>
          <input
            type="file"
            accept="image/png,image/jpeg,image/gif, image/svg+xml"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2 bg-white"
          />
          {file && (
            <p className="mt-1 text-xs text-gray-600">
              Selected: {file.name}
            </p>
          )}
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe the issue (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Tell us what happened..."
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
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
              disabled={!isFormValid}
              aria-describedby={!isFormValid ? "submit-tooltip" : undefined}
              className={`w-full py-3 px-5 text-base font-medium text-center rounded-xl transition-all duration-200 ${isFormValid
                ? "bg-red-400 hover:bg-red-500 text-black"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Submit
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
      </form >
    </div >
  );
}

export default Form;