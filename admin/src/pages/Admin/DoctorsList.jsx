import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, getAllDoctors, aToken, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="w-full px-8 py-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-[#D4AF37]">All Doctors</h1>

      <p className="text-[#E8DCC8] mb-8">
        Manage all registered doctors and their availability.
      </p>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg border border-[#D4AF37]/20 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Doctor Image */}
            <div className="bg-[#1F2A44] flex justify-center items-center p-5">
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-[#D4AF37]"
              />
            </div>

            {/* Doctor Details */}
            <div className="p-5">
              <h2 className="text-xl font-bold text-[#1F2A44]">{item.name}</h2>

              <p className="text-[#D4AF37] font-medium mt-1">
                {item.speciality}
              </p>

              <div className="flex items-center gap-2 mt-5">
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                  readOnly
                  className="accent-[#D4AF37] w-4 h-4 cursor-pointer"
                />

                <span
                  className={`font-medium ${
                    item.available ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {item.available ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
