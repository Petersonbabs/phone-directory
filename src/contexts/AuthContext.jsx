import axios from "axios";
import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const baseUrl = import.meta.env.VITE_baseUrl;

  const setUserData = (data) => {
    localStorage.setItem("token", JSON.stringify(data.token));
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  // SIGNUP
  const signup = async (formData) => {
    
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/auth/signup`, formData, {headers:{"Content-Type": 'application/json'}});
      
      const data = response.data;
      if (data.status === "success") {
        setUserData(data);

        navigate(`/`);
        setStatus("success");
        setAuthMessage(data.message);
      }
      
    } catch (error) {
      setStatus("error");
      setAuthMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  // LOGIN
  const login = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`https://phone-directory-backend-ckhi.onrender.com/api/v1/auth/login`, formData);
      const data = await response.data;
      if (data.status == "success") {
        setUserData(data);
        setAuthMessage(data.message);
        navigate("/");
        setStatus("success");
      }
    } catch (error) {
      setStatus("error");
      setAuthMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  // LOGOUT
  const logout = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${baseUrl}/auth/logout`,
        { token }
      );
      const data = await response.data;
      
      if (data.status == "success") {
        localStorage.clear("user");
        localStorage.clear("token");
        navigate("/");
        window.location.reload();
        setAuthMessage(data.message);
      }
    } catch (error) {
      
      setAuthMessage(error.response.data.message);
    } finally {
      setIsLoading(false)
    }
  };


  

  const value = {
    login,
    logout,
    signup,
    token,
    user,
    isLoading,
    authMessage,
    status,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
