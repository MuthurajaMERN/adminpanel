import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdDashboard,
  MdAddShoppingCart,
  MdViewList,
  MdFeedback,
  MdEventAvailable,
  MdLogout,
} from "react-icons/md";

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <aside
      className={`fixed lg:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] lg:h-auto transform ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-40 p-4`}
    >
      <button className="lg:hidden p-2" onClick={toggleMenu}>
        <MdDashboard size={24} />
      </button>
      <div className="bg-white rounded-xl shadow-lg p-4 space-y-4">
        <SidebarItem icon={MdDashboard} label="Dashboard" to="/home" />
        <SidebarItem icon={MdAddShoppingCart} label="Add Product" to="/home" />
        <SidebarItem icon={MdViewList} label="List Product" to="/home/listproduct" />
        <SidebarItem icon={MdFeedback} label="Testimonials" to="/home/testimonials" />
        <SidebarItem icon={MdFeedback} label="List Testimonials" to="/home/listtestimonials" />
        <SidebarItem icon={MdEventAvailable} label="Available Packages" to="/home/avalibalePackage" />
        <SidebarItem icon={MdLogout} label="Log Out" to="/logout" />
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon: Icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
  >
    <Icon className="mr-2" size={24} />
    {label}
  </Link>
);

export default Sidebar;
