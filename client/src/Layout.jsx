import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MobileSidebar from "./components/MobileSidebar";

function Layout() {
  const user = localStorage.getItem("userInfo");
  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row bg-[#f3f4f6] relative">
      {/* Desktop Sidebar */}
      <div className="w-full md:w-1/5 h-auto md:h-screen bg-white border-r hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Navbar */}
        <div className="h-[64px] bg-white shadow-sm flex items-center px-6">
          <Navbar />
        </div>

        {/* Page Content (scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 2xl:p-10">
          <Outlet />
        </div>
      </div>

      {/*Mobile Sidebar Overlay (slides in when open) */}
      <MobileSidebar />
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default Layout;
