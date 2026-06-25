import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300">
      <img
        src={assets.logo}
        onClick={() => {
          navigate("/");
        }}
        alt="Aurevia Logo"
        className="w-56 cursor-pointer"
      />

      <ul className="hidden md:flex items-center gap-8 font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `pb-1 border-b-2 ${
              isActive ? "border-[#D4AF37]" : "border-transparent"
            }`
          }
        >
          <li>Home</li>
        </NavLink>

        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            `pb-1 border-b-2 ${
              isActive ? "border-[#D4AF37]" : "border-transparent"
            }`
          }
        >
          <li>Our Doctors</li>
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `pb-1 border-b-2 ${
              isActive ? "border-[#D4AF37]" : "border-transparent"
            }`
          }
        >
          <li>About</li>
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `pb-1 border-b-2 ${
              isActive ? "border-[#D4AF37]" : "border-transparent"
            }`
          }
        >
          <li>Contact</li>
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => {
                    navigate("/my-profile");
                  }}
                  className="hover:text-black cursor-pointer "
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/my-appointments");
                  }}
                  className="hover:text-black cursor-pointer "
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    setToken(false);
                  }}
                  className="hover:text-black cursor-pointer "
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#D4AF37] text-[#1F2A44] px-6 py-3 rounded-full font-medium cursor-pointer"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
//47:02
