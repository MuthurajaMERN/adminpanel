import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaSearch, FaBell, FaTachometerAlt, FaSlidersH, FaCopy, FaUser, FaCog, FaPowerOff } from "react-icons/fa";

function Dashboard() {
  return (
    <div className="bg-orange-100 min-h-screen w-screen">
      {/* Header */}
      <div className="fixed bg-white text-blue-800 px-10 py-2 z-10 w-full ">
        <div className="flex items-center justify-between ">
          <div className="font-bold text-blue-900 text-xl">
            Admin<span className="text-orange-600 ">Panel</span>
          </div>
          <div className="flex items-center text-gray-500">
            <FaSearch className="p-2 text-4xl" />
            <FaBell className="p-2 text-4xl" />
            <div
              className="bg-center bg-cover bg-no-repeat rounded-full inline-block h-12 w-12 ml-2"
              style={{
                backgroundImage:
                  'url(https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg)',
              }}
            ></div>
          </div>


          
        </div>



        
      </div>


   




     

      {/* Main content */}
      <div className="flex flex-row pt-24 px-10 pb-4 sm:pb-2">
        {/* Sidebar */}
        <div className="w-2/12 mr-6">
          <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">
            <Link to="/home/dashboard" className="flex items-center text-gray-600 hover:text-black my-4">
              <FaTachometerAlt className="mr-2" />
              <span className="hidden md:inline">Home</span>
            </Link>
            <Link to="/home/addproduct" className="flex items-center text-gray-600 hover:text-black my-4">
              <FaSlidersH className="mr-2" />
              <span className="hidden md:inline">Packages</span>
            </Link>
            <Link to="/home/testimonials" className="flex items-center text-gray-600 hover:text-black my-4">
              <FaCopy className="mr-2" />
              <span className="hidden md:inline">Testimonials</span>
            </Link>
            <Link to="/home/listtestimonials" className="flex items-center text-gray-600 hover:text-black my-4">
              <FaCopy className="mr-2" />
              <span className="hidden md:inline">List Testimonials</span>
            </Link>
            <Link to="/home/cardapp" className="flex items-center text-gray-600 hover:text-black my-4">
              <FaCopy className="mr-2" />
              <span className="hidden md:inline">Card App</span>
            </Link>
            <Link to="/home/cardlist" className="flex items-center text-gray-600 hover:text-black my-4">
              <FaCopy className="mr-2" />
              <span className="hidden md:inline">Card List</span>
            </Link>
            <Link to="/home/addcountry" className="flex items-center text-gray-600 hover:text-black my-4">
              <FaCopy className="mr-2" />
              <span className="hidden md:inline">Add country</span>
            </Link>
            <Link to="/home/listcountry" className="flex items-center text-gray-600 hover:text-black my-4">
              <FaCopy className="mr-2" />
              <span className="hidden md:inline">County List</span>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">
            <Link to="/profile" className="flex items-center text-gray-600 hover:text-black my-4">
              <FaUser className="mr-2" />
              <span className="hidden md:inline">Profile</span>
            </Link>
            <Link to="/settings" className="flex items-center text-gray-600 hover:text-black my-4">
              <FaCog className="mr-2" />
              <span className="hidden md:inline">Settings</span>
            </Link>
            <Link to="/logout" className="flex items-center text-gray-600 hover:text-black my-4">
              <FaPowerOff className="mr-2" />
              <span className="hidden md:inline">Log out</span>
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-8/12">
          <Outlet /> {/* This renders the child route content */}
        </div>
      </div>
 
    </div>    
  );
}

export default Dashboard;
