import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);

  useEffect(() => {
    if (speciality) {
      const filtered = doctors.filter(
        (doc) =>
          doc.speciality.trim().toLowerCase() ===
          speciality.trim().toLowerCase(),
      );

      setFilterDoc(filtered);
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div className="py-12">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#D4AF37]">Our Doctors</h1>

        <p className="mt-3 text-[#E8DCC8] text-lg">
          Browse through our trusted specialists and choose the doctor best
          suited to your healthcare needs.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Filter */}
        {/* Left Filter */}
        <div className="w-full lg:w-64">
          <div className="bg-[#2A3655] rounded-2xl p-5 shadow-lg">
            <h2 className="text-[#D4AF37] text-xl font-semibold mb-5">
              Specialities
            </h2>

            <div className="flex flex-col gap-3">
              <p
                onClick={() =>
                  speciality === "General physician"
                    ? navigate("/doctors")
                    : navigate("/doctors/General physician")
                }
                className={`cursor-pointer px-4 py-3 rounded-lg border transition-all duration-300 ${
                  speciality === "General physician"
                    ? "bg-[#D4AF37] text-[#1F2A44] border-[#D4AF37]"
                    : "border-[#D4AF37] text-[#E8DCC8] hover:bg-[#D4AF37] hover:text-[#1F2A44]"
                }`}
              >
                General physician
              </p>

              <p
                onClick={() =>
                  speciality === "Gynecologist"
                    ? navigate("/doctors")
                    : navigate("/doctors/Gynecologist")
                }
                className={`cursor-pointer px-4 py-3 rounded-lg border transition-all duration-300 ${
                  speciality === "Gynecologist"
                    ? "bg-[#D4AF37] text-[#1F2A44] border-[#D4AF37]"
                    : "border-[#D4AF37] text-[#E8DCC8] hover:bg-[#D4AF37] hover:text-[#1F2A44]"
                }`}
              >
                Gynecologist
              </p>

              <p
                onClick={() =>
                  speciality === "Dermatologist"
                    ? navigate("/doctors")
                    : navigate("/doctors/Dermatologist")
                }
                className={`cursor-pointer px-4 py-3 rounded-lg border transition-all duration-300 ${
                  speciality === "Dermatologist"
                    ? "bg-[#D4AF37] text-[#1F2A44] border-[#D4AF37]"
                    : "border-[#D4AF37] text-[#E8DCC8] hover:bg-[#D4AF37] hover:text-[#1F2A44]"
                }`}
              >
                Dermatologist
              </p>

              <p
                onClick={() =>
                  speciality === "Pediatricians"
                    ? navigate("/doctors")
                    : navigate("/doctors/Pediatricians")
                }
                className={`cursor-pointer px-4 py-3 rounded-lg border transition-all duration-300 ${
                  speciality === "Pediatricians"
                    ? "bg-[#D4AF37] text-[#1F2A44] border-[#D4AF37]"
                    : "border-[#D4AF37] text-[#E8DCC8] hover:bg-[#D4AF37] hover:text-[#1F2A44]"
                }`}
              >
                Pediatricians
              </p>

              <p
                onClick={() =>
                  speciality === "Neurologist"
                    ? navigate("/doctors")
                    : navigate("/doctors/Neurologist")
                }
                className={`cursor-pointer px-4 py-3 rounded-lg border transition-all duration-300 ${
                  speciality === "Neurologist"
                    ? "bg-[#D4AF37] text-[#1F2A44] border-[#D4AF37]"
                    : "border-[#D4AF37] text-[#E8DCC8] hover:bg-[#D4AF37] hover:text-[#1F2A44]"
                }`}
              >
                Neurologist
              </p>

              <p
                onClick={() =>
                  speciality === "Gastroenterologist"
                    ? navigate("/doctors")
                    : navigate("/doctors/Gastroenterologist")
                }
                className={`cursor-pointer px-4 py-3 rounded-lg border transition-all duration-300 ${
                  speciality === "Gastroenterologist"
                    ? "bg-[#D4AF37] text-[#1F2A44] border-[#D4AF37]"
                    : "border-[#D4AF37] text-[#E8DCC8] hover:bg-[#D4AF37] hover:text-[#1F2A44]"
                }`}
              >
                Gastroenterologist
              </p>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filterDoc.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="bg-[#F7F2EA] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-72 object-cover"
                />

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <p className="text-green-600 text-sm font-medium">
                      Available
                    </p>
                  </div>

                  <h3 className="text-xl font-bold text-[#1F2A44]">
                    {item.name}
                  </h3>

                  <p className="text-gray-600 mt-2">{item.speciality}</p>

                  <button className="mt-5 w-full bg-[#D4AF37] text-[#1F2A44] py-3 rounded-full font-semibold hover:opacity-90 transition">
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filterDoc.length === 0 && (
            <div className="text-center mt-20 text-[#E8DCC8] text-xl">
              No doctors found for this speciality.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
