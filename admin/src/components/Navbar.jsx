import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && localStorage.removeItem("aToken");
    aToken && setAToken("");
  };

  return (
    <div className="flex items-center justify-between px-8 py-4 bg-[#2A3655] border-b border-[#D4AF37]/20 shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <img
          onClick={() => navigate("/")}
          src={assets.admin_logo}
          alt="Aurevia Admin"
          className="w-44 object-contain"
        />

        <span className="bg-[#D4AF37] text-[#1F2A44] px-4 py-1 rounded-full text-sm font-semibold">
          {aToken ? "Administrator" : "Doctor"}
        </span>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="bg-[#D4AF37] text-[#1F2A44] px-6 py-2 rounded-full font-semibold hover:bg-[#e7bf45] hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
