import axios from "axios";
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const signup = async () => {
    setIsLoading(true)
    try {
        const response = await axios.post('https://phone-directory-backend-yw1z.onrender.com/api/v1/auth/signup')
        console.log(response);
        
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
