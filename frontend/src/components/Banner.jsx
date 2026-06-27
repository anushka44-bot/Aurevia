import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row bg-[#2A3655] rounded-3xl px-6 md:px-14 lg:px-20 my-20 overflow-hidden items-center">
      {/* Left Side */}
      <div className="flex-1 py-10 md:py-16 lg:py-20">
        <div className="text-[#E8DCC8]">
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Book Appointment
          </p>

          <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mt-2">
            With 100+ Trusted Doctors
          </p>
        </div>

        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="mt-8 bg-[#D4AF37] text-[#1F2A44] px-8 py-4 rounded-full font-semibold text-sm hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          Create Account
        </button>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex justify-center">
        <img
          className="w-full max-w-md md:max-w-lg"
          src={assets.appointment_img}
          alt="Appointment"
        />
      </div>
    </div>
  );
};

export default Banner;
