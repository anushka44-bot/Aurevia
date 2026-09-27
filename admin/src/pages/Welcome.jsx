import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Welcome = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const isDoctor = !!dToken;

  return (
    <div className="flex-1 min-h-[calc(100vh-64px)] bg-[#F6F7F9] p-5 sm:p-8">
      {/* Main Welcome Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#1F2A44] min-h-[420px] flex items-center">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full border border-white/10" />
        <div className="absolute -bottom-32 -right-10 w-96 h-96 rounded-full border border-white/10" />
        <div className="absolute top-10 right-20 w-4 h-4 rounded-full bg-[#D4AF37]/70" />
        <div className="absolute bottom-20 right-36 w-2 h-2 rounded-full bg-[#D4AF37]/50" />

        {/* Content */}
        <div className="relative z-10 px-7 sm:px-12 py-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span className="text-xs sm:text-sm text-white/80">
              {isDoctor ? "Doctor Portal" : "Administration Portal"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-white leading-tight">
            Welcome to
            <span className="block text-[#D4AF37] mt-1">Aurevia</span>
          </h1>

          <p className="mt-5 text-white/70 text-sm sm:text-base leading-7 max-w-xl">
            {isDoctor
              ? "Manage your appointments, patients, professional profile, and availability from your dedicated doctor dashboard."
              : "Manage your doctors, appointments, patients, and healthcare operations from one secure platform."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="px-5 py-3 rounded-xl bg-white/10 border border-white/10">
              <p className="text-xs text-white/50">Portal</p>
              <p className="text-sm text-white font-medium mt-1">
                {isDoctor ? "Doctor Panel" : "Admin Panel"}
              </p>
            </div>

            <div className="px-5 py-3 rounded-xl bg-white/10 border border-white/10">
              <p className="text-xs text-white/50">Status</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <p className="text-sm text-white font-medium">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Aurevia A Logo */}
        <div className="hidden md:flex absolute right-16 lg:right-24 items-center justify-center">
          <div className="relative w-56 h-56 rounded-full border border-white/10 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border border-[#D4AF37]/30 flex items-center justify-center">
              <div className="w-28 h-28 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <span className="text-7xl font-serif text-[#D4AF37]">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            Platform
          </p>
          <h3 className="text-lg font-semibold text-[#1F2A44] mt-2">
            Healthcare Management
          </h3>
          <p className="text-sm text-gray-500 mt-2 leading-6">
            A centralized space for managing your healthcare operations.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            Quick Access
          </p>
          <h3 className="text-lg font-semibold text-[#1F2A44] mt-2">
            Use the Sidebar
          </h3>
          <p className="text-sm text-gray-500 mt-2 leading-6">
            Navigate through the available sections using the sidebar.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            Aurevia
          </p>
          <h3 className="text-lg font-semibold text-[#1F2A44] mt-2">
            Care. Connect. Simplify.
          </h3>
          <p className="text-sm text-gray-500 mt-2 leading-6">
            Everything you need, organized in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
