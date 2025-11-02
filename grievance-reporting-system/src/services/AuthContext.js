import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from './ApiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('user'); 
        }
        setIsLoading(false); 
    }, []);

    const login = async (credentials) => {
        try {
            
            const loginResponse = await loginUser(credentials); 
            
            
            const userData = {
                userId: loginResponse.userId,
                userName: loginResponse.userName,
                email: loginResponse.userEmail, 
                role: loginResponse.role 
            };
            
            setUser(userData); 
            localStorage.setItem("user", JSON.stringify(userData));
        
        } catch (error) {
            throw error; 
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const value = {
        user,
        isLoading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
