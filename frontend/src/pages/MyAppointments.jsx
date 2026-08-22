import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  // Get user's appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: {
          token,
        },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="py-10">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-[#D4AF37] mb-8">
        My Appointments
      </h1>

      {/* No appointments */}
      {appointments.length === 0 ? (
        <div className="bg-[#2A3655] rounded-3xl p-10 text-center">
          <p className="text-[#E8DCC8] text-lg">
            You don't have any appointments yet.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {appointments.map((item, index) => {
            const doctor = item.docData;

            return (
              <div
                key={item._id || index}
                className="bg-[#2A3655] rounded-3xl shadow-xl border border-[#D4AF37]/20 overflow-hidden flex flex-col lg:flex-row"
              >
                {/* Doctor Image */}
                <div className="lg:w-60 bg-[#1F2A44] flex items-center justify-center">
                  <img
                    src={doctor?.image}
                    alt={doctor?.name}
                    className="w-full h-64 object-cover"
                  />
                </div>

                {/* Doctor Details */}
                <div className="flex-1 p-8">
                  <h2 className="text-2xl font-bold text-[#D4AF37]">
                    {doctor?.name}
                  </h2>

                  <p className="text-[#E8DCC8] mt-2">
                    {doctor?.degree} • {doctor?.speciality}
                  </p>

                  <p className="text-[#E8DCC8] mt-4">
                    <span className="font-semibold text-[#D4AF37]">
                      Experience:
                    </span>{" "}
                    {doctor?.experience}
                  </p>

                  <p className="text-[#E8DCC8] mt-2">
                    <span className="font-semibold text-[#D4AF37]">
                      Consultation Fee:
                    </span>{" "}
                    ₹{item.amount}
                  </p>

                  <p className="text-[#E8DCC8] mt-2">
                    <span className="font-semibold text-[#D4AF37]">
                      Clinic Address:
                    </span>{" "}
                    {doctor?.address?.line1}
                  </p>

                  <p className="text-[#E8DCC8]">{doctor?.address?.line2}</p>

                  {/* Appointment Date */}
                  <p className="mt-5 text-[#E8DCC8]">
                    <span className="font-semibold text-[#D4AF37]">
                      Appointment Date:
                    </span>{" "}
                    {item.slotDate}
                  </p>

                  {/* Appointment Time */}
                  <p className="mt-2 text-[#E8DCC8]">
                    <span className="font-semibold text-[#D4AF37]">
                      Appointment Time:
                    </span>{" "}
                    {item.slotTime}
                  </p>

                  {/* Status */}
                  <div className="mt-5 flex flex-wrap gap-3">
                    {item.cancelled ? (
                      <span className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 text-sm">
                        Appointment Cancelled
                      </span>
                    ) : item.payment ? (
                      <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm">
                        Payment Completed
                      </span>
                    ) : (
                      <span className="px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">
                        Payment Pending
                      </span>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="lg:w-72 flex flex-col justify-center gap-4 p-8 bg-[#22304D]">
                  {/* Pay Online */}
                  {!item.payment && !item.cancelled && (
                    <button className="w-full bg-[#D4AF37] text-[#1F2A44] py-3 rounded-full font-semibold hover:scale-105 transition duration-300">
                      Pay Online
                    </button>
                  )}

                  {/* Cancel Appointment */}
                  {!item.cancelled && (
                    <button className="w-full border border-red-500 text-red-400 py-3 rounded-full font-semibold hover:bg-red-500 hover:text-white transition">
                      Cancel Appointment
                    </button>
                  )}

                  {/* Cancelled message */}
                  {item.cancelled && (
                    <p className="text-center text-red-400">
                      This appointment has been cancelled.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
