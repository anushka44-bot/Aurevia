import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [relatedDoctors, setRelatedDoctors] = useState([]);

  useEffect(() => {
    if (doctors && doctors.length > 0) {
      const filteredDoctors = doctors.filter(
        (doctor) =>
          doctor._id !== docId &&
          doctor.speciality?.trim().toLowerCase() ===
            speciality?.trim().toLowerCase(),
      );

      setRelatedDoctors(filteredDoctors);
    }
  }, [doctors, docId, speciality]);

  if (relatedDoctors.length === 0) {
    return null;
  }

  return (
    <div className="mt-20">
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#D4AF37]">Related Doctors</h2>

        <p className="text-[#E8DCC8] mt-2">
          Explore other specialists in {speciality}.
        </p>
      </div>

      {/* Doctors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
        {relatedDoctors.map((doctor) => (
          <div
            key={doctor._id}
            onClick={() => navigate(`/appointment/${doctor._id}`)}
            className={`bg-[#F7F2EA] rounded-3xl overflow-hidden shadow-lg transition-all duration-300 ${
              doctor.available
                ? "cursor-pointer hover:shadow-2xl hover:-translate-y-2"
                : "cursor-not-allowed opacity-90"
            }`}
          >
            {/* Doctor Image */}
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-5">
              {/* Availability */}
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    doctor.available ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>

                <p
                  className={`text-sm font-medium ${
                    doctor.available ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {doctor.available ? "Available" : "Not Available"}
                </p>
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-[#1F2A44]">
                {doctor.name}
              </h3>

              {/* Speciality */}
              <p className="text-gray-600 mt-2">{doctor.speciality}</p>

              {/* Button */}
              <button
                disabled={!doctor.available}
                onClick={(e) => {
                  e.stopPropagation();

                  if (doctor.available) {
                    navigate(`/appointment/${doctor._id}`);
                  }
                }}
                className={`mt-5 w-full py-3 rounded-full font-semibold transition ${
                  doctor.available
                    ? "bg-[#D4AF37] text-[#1F2A44] hover:opacity-90 cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {doctor.available ? "Book Appointment" : "Not Available"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
