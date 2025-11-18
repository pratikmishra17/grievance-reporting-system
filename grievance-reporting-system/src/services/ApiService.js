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
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    // First, check if the response is successful (status 200-299)
    if (response.ok) {
      // If successful, we expect a JSON object (the user)
      const responseData = await response.json();
      
      if (responseData && responseData.userName) {
          localStorage.setItem('loggedInUser', JSON.stringify(responseData));
      }
      return responseData; // This goes to AuthContext

    } else {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }

  } catch (error) {
    console.error('API Error (loginUser):', error);
    throw new Error(error.message || 'Login failed due to network or server error.');
  }
};

export const getMyGrievances = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required to fetch grievances.");
  }
  try {
    const response = await fetch(`${API_BASE_URL}/forms/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
       const errorData = await response.text();
       throw new Error(errorData || "Failed to fetch user grievances.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getMyGrievances:", error);
    throw error;
  }
};

export const getGrievanceImageUrl = (filename) => {
  if (!filename) return null;
  return `${API_BASE_URL}/forms/files/${filename}`;
};

export const submitForm = async (grievanceData, file) => {
  const formData = new FormData();
  
  const grievanceBlob = new Blob([JSON.stringify(grievanceData)], {
    type: 'application/json'
  });
  
  formData.append('grievance', grievanceBlob);
  
  if (file) {
    formData.append('file', file, file.name);
  }
  try {
    const response = await fetch(`${API_BASE_URL}/forms/submit`, {
      method: 'POST',
      body: formData,
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

export const updateGrievanceStatus = async (id, newStatus) => {
  try {
    const payload = { status: newStatus };

    // Note the URL: It includes the /${id}/status part
    const response = await fetch(`${API_BASE_URL}/forms/${id}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // We expect the updated ticket back as JSON
    const responseData = await response.json();

    if (!response.ok) {
      console.error('API Error Response (updateStatus):', responseData);
      throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }
    return responseData;

  } catch (error) {
    console.error('API Error (updateGrievanceStatus):', error);
    throw new Error(error.message || 'Status update failed due to network or server error.');
  }
};

// --- NEW COMMENT FUNCTIONS ---

export const getComments = async (formId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/forms/${formId}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
       const errorData = await response.text();
       throw new Error(errorData || "Failed to fetch comments.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getComments:", error);
    throw error;
  }
};

export const saveComment = async (formId, commentData) => {
  // commentData should be: { text: "...", authorRole: "User" }
  try {
    const response = await fetch(`${API_BASE_URL}/forms/${formId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('API Error Response (saveComment):', responseData);
      throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }
    return responseData;

  } catch (error) {
    console.error('API Error (saveComment):', error);
    throw new Error(error.message || 'Saving comment failed.');
  }
};