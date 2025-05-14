import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5000/api" 
  : "https://LifeStac.onrender.com/";
  
const handleError = (error, defaultMessage) => {
  toast.error(error.response?.data?.message || defaultMessage);
};

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/check`, { 
        withCredentials: true 
      });
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
        const res = await axios.post(`${BASE_URL}/auth/signup`, data, { withCredentials: true });
        set({ authUser: res.data });
        toast.success("Signup successful!");
    } catch (error) {
        console.error("Error in signup:", error.response?.data || error.message); // Log the error
        handleError(error, "Signup failed");
    } finally {
        set({ isSigningUp: false });
    }
    },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, data, { withCredentials: true });
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      handleError(error, "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axios.get(`${BASE_URL}/auth/logout`, { withCredentials: true });
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      handleError(error, "Logout failed");
    }
  },
}));