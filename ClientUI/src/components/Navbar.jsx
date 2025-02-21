import React, { useState } from "react";
import teamsynclogo from "../assets/teamsyncLogo.png";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-50 px-6 py-3 md:px-12 flex justify-between items-center sticky top-0 z-50 shadow-md">
      <div className="w-15">
        <img src={teamsynclogo} alt="TeamSync Logo" className="w-full" />
      </div>
      <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
        <li><a href="/" className="hover:text-blue-600 hover:border-b-2 cursor-pointer transition-all">Home</a></li>
        <li><a href="/#featuresSection" className="hover:text-blue-600 hover:border-b-2 cursor-pointer transition-all">Features</a></li>
        <li><a href="/#pricing" className="hover:text-blue-600 hover:border-b-2 cursor-pointer transition-all">Pricing</a></li>
        <li><a href="/#blog" className="hover:text-blue-600 hover:border-b-2 cursor-pointer transition-all">Blog</a></li>
        <li><a href="/#help" className="hover:text-blue-600 hover:border-b-2 cursor-pointer transition-all">Help Center</a></li>
      </ul>



      <div className="hidden md:flex gap-4  bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl p-1">
        <Link to="/UserAuth/login">
          <button className="px-2 py-1  text-white  rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </Link>


        <Link to="/UserAuth/signup">
          <button className="px-2 py-1 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition">
            SignUP
          </button>
        </Link>

      </div>


      <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md p-5 md:hidden flex flex-col items-center gap-4">
          <ul className="flex flex-col gap-4 text-gray-700 text-lg">
            <li>
              <a href="#home" className="hover:text-blue-600 hover:border-b-2 cursor-pointer transition-all">
                Home
              </a>
            </li>
            <li>
              <a href="#featuresSection" className="hover:text-blue-600 hover:border-b-2 cursor-pointer transition-all">
                Features
              </a>
            </li>
            <li>
              {/* <a href="#pricing" className="hover:text-blue-600 hover:border-b-2 cursor-pointer transition-all">
                Pricing
              </a> */}
            </li>
            <li>
              <a href="#blog" className="hover:text-blue-600 hover:border-b-2 cursor-pointer transition-all">
                Blog
              </a>
            </li>
            <li>
              <a href="#help" className="hover:text-blue-600 hover:border-b-2 cursor-pointer transition-all">
                Help Center
              </a>
            </li>
          </ul>

          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
          <button className="px-3 py-2 text-gray-700 hover:text-blue-600 transition">
            🌙
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
