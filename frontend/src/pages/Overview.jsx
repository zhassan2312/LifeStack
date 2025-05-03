import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header";
import OverviewContent from "../components/OverviewContent";
import Footer from "../components/Footer";



const Overview = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="flex h-screen bg-(--color-black-4)">
      <Sidebar onToggle={setSidebarExpanded} />
      <div
        className="flex flex-col flex-1 transition-all duration-300"
      >
        <Header />
        <main className="flex-1 overflow-auto">
          <OverviewContent />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Overview;