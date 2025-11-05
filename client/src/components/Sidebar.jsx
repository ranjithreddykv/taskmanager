/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  Users,
  Trash2,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {IoMdSettings} from "react-icons/io"
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
const Sidebar = () => {

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { name: "Tasks", path: "/tasks", icon: <ListTodo size={18} /> },
    {
      name: "In Progress",
      path: "/in-progress/in-progress",
      icon: <Clock size={18} />,
    },
    {
      name: "Completed",
      path: "/completed/completed",
      icon: <CheckCircle2 size={18} />,
    },
    {
      name: "To Do",
      path: "/todo/todo",
      icon: <ListTodo size={18} />,
    },
    { name: "Team", path: "/team", icon: <Users size={18} /> },
    { name: "Trash", path: "/trashed", icon: <Trash2 size={18} /> },
  ];

  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const dispatch=useDispatch();
  const sidebarLinks=user?.isAdmin ? links :links.slice(0,5);

  const closeSidebar=()=>{
    dispatch(setOpenSidebar(false));
  }

  return (
    <div className="h-full flex flex-col bg-white border-r shadow-sm">
      {/* Logo / Title section */}
      <div className="p-6  flex items-center justify-center">
        <h1 className="text-xl font-bold text-gray-800 tracking-wide">
          <span ><img src={logo} width={30} height={30} alt="" className="inline mr-2 cursor-pointer" /></span>Task Manager
        </h1>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 flex flex-col mt-4 space-y-2 px-4">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={closeSidebar}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              location.pathname.startsWith(link.path)
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>

      <div>
        <button className="w-full flex gap-2 p-2 items-center text-lg text-gray-800">
            <IoMdSettings />
            <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
