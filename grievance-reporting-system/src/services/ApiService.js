const API_BASE_URL = 'http://localhost:8085';

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const responseData = await response.text();

    if (!response.ok) {
      console.error('API Error Response (Register):', responseData);
      throw new Error(responseData || `HTTP error! status: ${response.status}`);
    }
    return responseData;

  } catch (error) {
    console.error('API Error (registerUser):', error);
    throw new Error(error.message || 'Registration failed due to network or server error.');
  }
};

export const loginUser = async (credentials) => {
  let responseData;
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    try {
      responseData = await response.json();
    } catch (jsonError) {
      responseData = await response.text();
      console.warn("Login response could not be parsed as JSON:", responseData);
      if (!response.ok) {
         throw new Error(responseData || `HTTP error! status: ${response.status}`);
      }
    
      return responseData;
    }


    if (!response.ok) {
      console.error('API Error Response (Login):', responseData);
      const errorMessage = responseData?.message || (typeof responseData === 'string' ? responseData : `HTTP error! status: ${response.status}`);
      if (response.status === 401 || response.status === 403) {
         throw new Error(errorMessage || 'Invalid credentials.');
      }
      throw new Error(errorMessage || `HTTP error! status: ${response.status}`);
    }

    console.log("Login successful:", responseData);
    
    return responseData;

  } catch (error) {
  
    console.error('API Error (loginUser):', error);
    throw new Error(error.message || 'Login failed due to network or server error.');
  }
};

export const submitForm = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/forms/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const responseData = await response.text();

    if (!response.ok) {
      console.error('API Error Response (Register):', responseData);
      throw new Error(responseData || `HTTP error! status: ${response.status}`);
    }
    return responseData;

  } catch (error) {
    console.error('API Error (registerUser):', error);
    throw new Error(error.message || 'Registration failed due to network or server error.');
  }
};

export const getAllGrievances = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/forms/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch grievances.");
    }
    return await response.json();

  } catch (error) {
    console.error("Error in getAllGrievances:", error);
    throw error;
  }
};

