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
      console.log(response);
      const data = response.data;
      if (data.status === "success") {
        setUserData(data);

        navigate(`/`);
        setStatus("success");
        setAuthMessage(data.message);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      setStatus("error");
      setAuthMessage(error.response.data.message);
    } finally {
      console.log("done!");
      setIsLoading(false);
    }
  };

  // LOGIN
  const login = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, formData);
      console.log(response);
      console.log(baseUrl);
      const data = await response.data;
      if (data.status == "success") {
        setUserData(data);
        setAuthMessage(data.message);
        navigate("/");
        setStatus("success");
      }
    } catch (error) {
      console.log(error.response.data.message);
      setStatus("error");
      setAuthMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
      console.log("done!");
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
      console.log(response);
      if (data.status == "success") {
        localStorage.clear("user");
        localStorage.clear("token");
        navigate("/");
        window.location.reload();
        setAuthMessage(data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
      setAuthMessage(error.response.data.message);
    } finally {
      setIsLoading(false)
      console.log("done!");
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
