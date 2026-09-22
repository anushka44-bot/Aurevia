import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const { dToken, dashboardData, getDashboardData } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDashboardData();
    }
  }, [dToken]);

  const {
    totalEarnings,
    totalAppointments,
    totalPatients,
    latestAppointments,
  } = dashboardData;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Earnings */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#F8F9FB] flex items-center justify-center">
            <img src={assets.earning_icon} alt="Earnings" className="w-8 h-8" />
          </div>

          <div>
            <p className="text-sm text-gray-500">Earnings</p>

            <h2 className="text-2xl font-semibold text-[#1F2A44] mt-1">
              ₹{totalEarnings.toLocaleString("en-IN")}
            </h2>
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#F8F9FB] flex items-center justify-center">
            <img
              src={assets.appointment_icon}
              alt="Appointments"
              className="w-8 h-8"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500">Appointments</p>

            <h2 className="text-2xl font-semibold text-[#1F2A44] mt-1">
              {totalAppointments}
            </h2>
          </div>
        </div>

        {/* Patients */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#F8F9FB] flex items-center justify-center">
            <img
              src={assets.patients_icon}
              alt="Patients"
              className="w-8 h-8"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500">Patients</p>

            <h2 className="text-2xl font-semibold text-[#1F2A44] mt-1">
              {totalPatients}
            </h2>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="mt-8 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b">
          <div className="flex items-center gap-3">
            <img
              src={assets.appointments_icon}
              alt="Appointments"
              className="w-6 h-6"
            />

            <h2 className="text-lg font-semibold text-[#1F2A44]">
              Latest Appointments
            </h2>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            Your latest patient appointments
          </p>
        </div>

        {latestAppointments.length > 0 ? (
          <div>
            {latestAppointments.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between gap-4 px-6 py-5 border-b last:border-b-0 hover:bg-gray-50 transition"
              >
                {/* Patient */}
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.userData?.image || "/default-profile.png"}
                    alt=""
                    className="w-11 h-11 rounded-full object-cover border"
                  />

                  <div className="min-w-0">
                    <p className="font-medium text-[#1F2A44] truncate">
                      {item.userData?.name || "Unknown Patient"}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {item.slotDate || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div>
                  {item.cancelled ? (
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
                      Cancelled
                    </span>
                  ) : item.approved ? (
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Scheduled
                    </span>
                  ) : (
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <img
              src={assets.booking_icon}
              alt="No appointments"
              className="w-12 h-12 mx-auto mb-3 opacity-60"
            />

            <p className="text-sm text-gray-500">No appointments yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
