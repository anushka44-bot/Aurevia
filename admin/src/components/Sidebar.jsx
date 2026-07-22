import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  const navStyle = ({ isActive }) =>
    `flex items-center gap-4 px-5 py-4 rounded-l-2xl transition-all duration-300
     ${
       isActive
         ? "bg-[#D4AF37] text-[#1F2A44] shadow-lg font-semibold"
         : "text-[#E8DCC8] hover:bg-[#2A3655] hover:text-[#D4AF37]"
     }`;

  return (
    <>
      {aToken && (
        <div className="w-64 min-h-screen bg-[#1F2A44] border-r border-[#D4AF37]/20 shadow-2xl">
          <div className="py-8 px-6">
            <h2 className="text-[#D4AF37] text-lg font-bold tracking-widest uppercase">
              Navigation
            </h2>

            <div className="w-14 h-1 bg-[#D4AF37] rounded-full mt-2"></div>
          </div>

          <ul className="flex flex-col gap-3 px-4">
            <NavLink to="/admin-dashboard" className={navStyle}>
              <img
                src={assets.home_icon}
                alt=""
                className="w-6 h-6 brightness-0 invert"
              />
              <p>Dashboard</p>
            </NavLink>

            <NavLink to="/all-appointments" className={navStyle}>
              <img
                src={assets.appointment_icon}
                alt=""
                className="w-6 h-6 brightness-0 invert"
              />
              <p>Appointments</p>
            </NavLink>

            <NavLink to="/add-doctor" className={navStyle}>
              <img
                src={assets.add_icon}
                alt=""
                className="w-6 h-6 brightness-0 invert"
              />
              <p>Add Doctor</p>
            </NavLink>

            <NavLink to="/doctor-list" className={navStyle}>
              <img
                src={assets.people_icon}
                alt=""
                className="w-6 h-6 brightness-0 invert"
              />
              <p>Doctors List</p>
            </NavLink>
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;
