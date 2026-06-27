import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between py-4 mb-5 border-b border-gray-300">
      {/* Logo */}
      <img
        src={assets.logo}
        onClick={() => navigate("/")}
        alt="Aurevia Logo"
        className="w-40 sm:w-48 md:w-56 cursor-pointer"
      />

      {/* Desktop Navigation */}
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

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="relative">
            <div
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                className="w-8 rounded-full"
                src={assets.profile_pic}
                alt=""
              />

              <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            </div>

            <div
              className={`absolute right-0 top-12 z-20 ${
                showProfileMenu ? "block" : "hidden"
              }`}
            >
              <div className="min-w-48 bg-white rounded-lg shadow-lg flex flex-col gap-3 p-4 text-gray-700">
                <p
                  onClick={() => {
                    navigate("/my-profile");
                    setShowProfileMenu(false);
                  }}
                  className="cursor-pointer hover:text-black"
                >
                  My Profile
                </p>

                <p
                  onClick={() => {
                    navigate("/my-appointments");
                    setShowProfileMenu(false);
                  }}
                  className="cursor-pointer hover:text-black"
                >
                  My Appointments
                </p>

                <p
                  onClick={() => {
                    setToken(false);
                    setShowProfileMenu(false);
                  }}
                  className="cursor-pointer hover:text-red-500"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block bg-[#D4AF37] text-[#1F2A44] px-6 py-3 rounded-full font-medium cursor-pointer"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt=""
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-30 overflow-hidden bg-[#1F2A44] transition-all duration-300 ${
          showMenu ? "w-full" : "w-0"
        }`}
      >
        <div className="flex items-center justify-between p-6">
          <img src={assets.logo} className="w-32" alt="" />

          <img
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            className="w-5 cursor-pointer"
            alt=""
          />
        </div>

        <ul className="flex flex-col items-center gap-6 mt-10 text-lg">
          <NavLink to="/" onClick={() => setShowMenu(false)}>
            <li>Home</li>
          </NavLink>

          <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
            <li>Our Doctors</li>
          </NavLink>

          <NavLink to="/about" onClick={() => setShowMenu(false)}>
            <li>About</li>
          </NavLink>

          <NavLink to="/contact" onClick={() => setShowMenu(false)}>
            <li>Contact</li>
          </NavLink>

          {!token && (
            <button
              onClick={() => {
                navigate("/login");
                setShowMenu(false);
              }}
              className="bg-[#D4AF37] text-[#1F2A44] px-6 py-3 rounded-full font-medium mt-4"
            >
              Create Account
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
