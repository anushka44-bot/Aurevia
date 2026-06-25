import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-[#0B1F3A] to-[#16325B] text-white rounded-3xl px-6 md:px-10 lg:px-20 py-12 overflow-hidden">
      {/* ------------ Left Side ----------------- */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 py-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Book Appointments <br />
          With Trusted Doctors
        </h1>

        <div className="flex items-center gap-4">
          <img className="w-24" src={assets.group_profiles} alt="Doctors" />
          <p className="text-sm md:text-base text-gray-200 max-w-md">
            Your trusted path to exceptional healthcare, delivered with ease.
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center gap-2 bg-[#D4AF37] text-[#0B1F3A] px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300"
        >
          Book Appointment
          <img className="w-4" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* ------------ Right Side ----------------- */}
      <div className="md:w-1/2 flex items-center justify-center">
        <img
          className="w-full max-w-lg object-contain"
          src={assets.header_img}
          alt="Healthcare"
        />
      </div>
    </div>
  );
};

export default Header;
