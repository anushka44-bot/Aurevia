import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="py-10">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-[#D4AF37] mb-8">
        My Appointments
      </h1>

      <div className="space-y-8">
        {doctors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="bg-[#2A3655] rounded-3xl shadow-xl border border-[#D4AF37]/20 overflow-hidden flex flex-col lg:flex-row"
          >
            {/* Doctor Image */}
            <div className="lg:w-60 bg-[#1F2A44] flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Doctor Details */}
            <div className="flex-1 p-8">
              <h2 className="text-2xl font-bold text-[#D4AF37]">{item.name}</h2>

              <p className="text-[#E8DCC8] mt-2">
                {item.degree} • {item.speciality}
              </p>

              <p className="text-[#E8DCC8] mt-4">
                <span className="font-semibold text-[#D4AF37]">
                  Experience:
                </span>{" "}
                {item.experience}
              </p>

              <p className="text-[#E8DCC8] mt-2">
                <span className="font-semibold text-[#D4AF37]">
                  Consultation Fee:
                </span>{" "}
                ₹{item.fees}
              </p>

              <p className="text-[#E8DCC8] mt-2">
                <span className="font-semibold text-[#D4AF37]">
                  Clinic Address:
                </span>{" "}
                {item.address.line1}
              </p>

              <p className="text-[#E8DCC8]">{item.address.line2}</p>

              <p className="mt-5 text-[#E8DCC8]">
                <span className="font-semibold text-[#D4AF37]">
                  Appointment:
                </span>{" "}
                25 July 2026 | 8:30 PM
              </p>
            </div>

            {/* Buttons */}
            <div className="lg:w-72 flex flex-col justify-center gap-4 p-8 bg-[#22304D]">
              <button className="w-full bg-[#D4AF37] text-[#1F2A44] py-3 rounded-full font-semibold hover:scale-105 transition duration-300">
                Pay Online
              </button>

              <button className="w-full border border-red-500 text-red-400 py-3 rounded-full font-semibold hover:bg-red-500 hover:text-white transition duration-300">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
