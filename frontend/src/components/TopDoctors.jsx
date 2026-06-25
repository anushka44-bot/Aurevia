import React from "react";
import { doctors } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const TopDoctors = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 my-20 px-4">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-white">
        Top Doctors to Book
      </h1>

      {/* Description */}
      <p className="text-center max-w-2xl text-[#E8DCC8]">
        Discover exceptional medical expertise from our handpicked network of
        trusted specialists.
      </p>

      {/* Doctors Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10">
        {doctors.slice(0, 8).map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="bg-[#F7F2EA] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-[#E8DCC8]/40"
          >
            {/* Doctor Image */}
            <img
              className="w-full h-64 object-cover"
              src={item.image}
              alt={item.name}
            />

            {/* Doctor Details */}
            <div className="p-5">
              {/* Availability */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <p className="text-sm text-green-600 font-medium">Available</p>
              </div>

              {/* Doctor Name */}
              <h3 className="text-lg font-bold text-[#0B1F3A]">{item.name}</h3>

              {/* Speciality */}
              <p className="text-[#6B7280] mt-1">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Doctors Button */}
      <button
        onClick={() => navigate("/doctors")}
        className="mt-12 bg-[#D4AF37] text-[#0B1F3A] px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        View All Doctors
      </button>
    </div>
  );
};

export default TopDoctors;
