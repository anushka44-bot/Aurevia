import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      {/* Appointment Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[0.4fr_2fr_1fr_1.5fr_1.2fr_1.2fr] gap-4 px-6 py-4 bg-[#F8F9FB] border-b text-sm font-semibold text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Payment</p>
          <p>Status</p>
        </div>

        {/* Appointments */}
        {appointments && appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={item._id}
              className="border-b last:border-b-0 px-5 md:px-6 py-5 hover:bg-gray-50 transition"
            >
              {/* Desktop */}
              <div className="hidden md:grid grid-cols-[0.4fr_2fr_1fr_1.5fr_1.2fr_1.2fr] gap-4 items-center">
                <p className="text-sm text-gray-500">{index + 1}</p>

                {/* Patient */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.userData?.image || "/default-profile.png"}
                    alt=""
                    className="w-11 h-11 rounded-full object-cover border"
                  />

                  <div>
                    <p className="font-medium text-[#1F2A44]">
                      {item.userData?.name || "Unknown Patient"}
                    </p>

                    <p className="text-xs text-gray-500">
                      {item.userData?.email || "No email"}
                    </p>
                  </div>
                </div>

                {/* Age */}
                <p className="text-sm text-gray-600">
                  {item.userData?.dob
                    ? new Date().getFullYear() -
                      new Date(item.userData.dob).getFullYear()
                    : "N/A"}{" "}
                  {item.userData?.dob && "years"}
                </p>

                {/* Date & Time */}
                <div>
                  <p className="text-sm font-medium text-[#1F2A44]">
                    {item.slotDate || "N/A"}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {item.slotTime || "N/A"}
                  </p>
                </div>

                {/* Payment */}
                <div>
                  {item.payment ? (
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Paid
                    </span>
                  ) : (
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                      Pending
                    </span>
                  )}
                </div>

                {/* Status */}
                <div>
                  {item.cancelled ? (
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
                      Cancelled
                    </span>
                  ) : (
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      Scheduled
                    </span>
                  )}
                </div>
              </div>

              {/* Mobile */}
              <div className="md:hidden">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={item.userData?.image || "/default-profile.png"}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover border"
                  />

                  <div>
                    <h3 className="font-semibold text-[#1F2A44]">
                      {item.userData?.name || "Unknown Patient"}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {item.userData?.email || "No email"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-400">Appointment</p>
                    <p className="font-medium text-gray-700 mt-1">
                      {item.slotDate}
                    </p>
                    <p className="text-xs text-gray-500">{item.slotTime}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Age</p>
                    <p className="font-medium text-gray-700 mt-1">
                      {item.userData?.dob
                        ? new Date().getFullYear() -
                          new Date(item.userData.dob).getFullYear()
                        : "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Payment</p>

                    {item.payment ? (
                      <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                        Paid
                      </span>
                    ) : (
                      <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                        Pending
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Status</p>

                    {item.cancelled ? (
                      <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs bg-red-100 text-red-600">
                        Cancelled
                      </span>
                    ) : (
                      <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                        Scheduled
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="py-16 text-center">
            <div className="text-5xl mb-4">📅</div>

            <h3 className="text-lg font-semibold text-[#1F2A44]">
              No Appointments
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              You don't have any appointments scheduled yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
