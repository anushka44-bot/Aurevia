import React, { useState } from "react";
import { assets } from "../assets/assets";

const Login = () => {
  const [state, setState] = useState("Admin");

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#1F2A44]">
      <form className="w-full max-w-md bg-[#2A3655] border border-[#D4AF37]/20 rounded-3xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={assets.admin_logo} alt="Aurevia Logo" className="w-60" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-[#D4AF37]">
          {state === "Admin" ? "Administrator Portal" : "Doctor Portal"}
        </h2>

        {/* Subtitle */}
        <p className="text-center text-[#E8DCC8] mt-2 mb-8 leading-6">
          {state === "Admin"
            ? "Sign in to manage doctors, appointments and patients."
            : "Sign in to manage your appointments and patient schedule."}
        </p>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-[#E8DCC8] font-medium mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder={
              state === "Admin" ? "admin@aurevia.com" : "doctor@aurevia.com"
            }
            required
            className="w-full bg-[#1F2A44] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-[#E8DCC8] placeholder:text-gray-400 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-[#E8DCC8] font-medium mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            required
            className="w-full bg-[#1F2A44] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-[#E8DCC8] placeholder:text-gray-400 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-[#D4AF37] text-[#1F2A44] py-3 rounded-xl font-semibold text-lg hover:bg-[#e8bf46] hover:scale-[1.02] transition-all duration-300 shadow-lg cursor-pointer"
        >
          Login
        </button>

        {/* Switch Login */}
        <div className="mt-6 text-center">
          {state === "Admin" ? (
            <p className="text-[#E8DCC8]">
              Doctor Login?{" "}
              <span
                onClick={() => setState("Doctor")}
                className="text-[#D4AF37] font-semibold cursor-pointer hover:underline transition"
              >
                Click here
              </span>
            </p>
          ) : (
            <p className="text-[#E8DCC8]">
              Admin Login?{" "}
              <span
                onClick={() => setState("Admin")}
                className="text-[#D4AF37] font-semibold cursor-pointer hover:underline transition"
              >
                Click here
              </span>
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[1px] bg-[#D4AF37]/20"></div>
          <span className="text-[#D4AF37] text-sm">AUREVIA</span>
          <div className="flex-1 h-[1px] bg-[#D4AF37]/20"></div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-[#E8DCC8]/70 leading-6">
          {state === "Admin"
            ? "Secure access for Aurevia administrators only."
            : "Secure access for registered Aurevia doctors only."}
        </p>
      </form>
    </div>
  );
};

export default Login;
//6:30:06
