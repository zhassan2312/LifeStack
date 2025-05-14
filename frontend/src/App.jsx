import { BrowserRouter as Router,Routes, Route } from "react-router-dom"
import React, { useEffect } from 'react'
import Overview from "./pages/Overview"
import Login from "./pages/Login"
import Signup from './pages/Signup.jsx';
import TaskDashboard from "./pages/Tasks/TaskDashboard"
import { useAuthStore } from './store/useAuthStore.js';
import { Loader } from "lucide-react";
import { Toaster } from 'react-hot-toast';
import { Navigate } from "react-router-dom";

const App = () => {
const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
      checkAuth();
    }, [checkAuth]);
  
    if (isCheckingAuth && !authUser) {
      return (
        <div className='flex justify-center items-center h-screen'>
          <Loader className="size-10 animate-spin" />
        </div>
      );
    }
  
  return (
      <main className="App">
        <Toaster />
        <Routes>
          <Route path="/" element={authUser ? <Overview /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
          <Route path="/overview" element={authUser ?<Overview />:<Navigate to="/login" />} />
          <Route path="/login" element={authUser ?<Login />:<Navigate to="/login" />} />
          <Route path="/tasks" element={authUser ?<TaskDashboard />:<Navigate to="/login" />} />
        </Routes>
      </main>
  )
}

export default App