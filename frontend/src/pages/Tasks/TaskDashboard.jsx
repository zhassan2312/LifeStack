import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header";
import TaskContent from "../../components/TaskContent";
import Footer from "../../components/Footer";



const TaskDashboard = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="flex h-screen bg-(--color-black-4)">
      <Sidebar onToggle={setSidebarExpanded} />
      <div
        className="flex flex-col flex-1 transition-all duration-300"
      >
        <Header />
        <main className="flex-1 overflow-auto">
          <TaskContent />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default TaskDashboard;