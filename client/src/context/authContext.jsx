import axiosInstance from '../utils/axiosInstance.js';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const login = async (inputs) => {
    const res = await axiosInstance.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axiosInstance.post("/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get('/auth/user');
        setCurrentUser(res.data);
      } catch (err) {
        console.log("Error fetching user: ", err);
      }
    };

    if (!currentUser) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
