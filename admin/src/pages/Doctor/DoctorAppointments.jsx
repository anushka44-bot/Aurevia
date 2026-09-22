import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    approveAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[0.4fr_2fr_1fr_1.5fr_1.2fr_1fr] gap-4 px-6 py-4 bg-[#F8F9FB] border-b text-sm font-semibold text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Date of birth</p>
          <p>Date & Time</p>
          <p>Payment</p>
          <p>Action</p>
        </div>

        {/* Appointments */}
        {appointments && appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={item._id}
              className="border-b last:border-b-0 px-5 md:px-6 py-5 hover:bg-gray-50 transition"
            >
              {/* Desktop */}
              <div className="hidden md:grid grid-cols-[0.4fr_2fr_1fr_1.5fr_1.2fr_1fr] gap-4 items-center">
                {/* Number */}
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

                {/* Date of Birth */}
                <p className="text-sm text-gray-600">
                  {item.userData?.dob || "N/A"}
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

                {/* Action */}
                <div className="flex items-center gap-3">
                  {item.cancelled ? (
                    <span className="text-sm text-red-600 font-medium">
                      Cancelled
                    </span>
                  ) : item.approved ? (
                    <span className="text-sm text-green-600 font-medium">
                      Scheduled
                    </span>
                  ) : (
                    <>
                      {/* Approve */}
                      <button
                        onClick={() => approveAppointment(item._id)}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-green-100 transition"
                        title="Approve Appointment"
                      >
                        <img
                          src={assets.tick_icon}
                          alt="Approve"
                          className="w-5 h-5"
                        />
                      </button>

                      {/* Cancel */}
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-red-100 transition"
                        title="Cancel Appointment"
                      >
                        <img
                          src={assets.cancel_icon}
                          alt="Cancel"
                          className="w-5 h-5"
                        />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile */}
              <div className="md:hidden">
                {/* Patient */}
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
                  {/* Appointment */}
                  <div>
                    <p className="text-xs text-gray-400">Appointment</p>

                    <p className="font-medium text-gray-700 mt-1">
                      {item.slotDate || "N/A"}
                    </p>

                    <p className="text-xs text-gray-500">
                      {item.slotTime || "N/A"}
                    </p>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <p className="text-xs text-gray-400">Date of Birth</p>

                    <p className="font-medium text-gray-700 mt-1">
                      {item.userData?.dob || "N/A"}
                    </p>
                  </div>

                  {/* Payment */}
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

                  {/* Action */}
                  <div>
                    <p className="text-xs text-gray-400">Action</p>

                    <div className="flex items-center gap-3 mt-2">
                      {item.cancelled ? (
                        <span className="text-xs text-red-600 font-medium">
                          Cancelled
                        </span>
                      ) : item.approved ? (
                        <span className="text-xs text-green-600 font-medium">
                          Scheduled
                        </span>
                      ) : (
                        <>
                          {/* Approve */}
                          <button
                            onClick={() => approveAppointment(item._id)}
                            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-green-100 transition"
                            title="Approve Appointment"
                          >
                            <img
                              src={assets.tick_icon}
                              alt="Approve"
                              className="w-5 h-5"
                            />
                          </button>

                          {/* Cancel */}
                          <button
                            onClick={() => cancelAppointment(item._id)}
                            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-red-100 transition"
                            title="Cancel Appointment"
                          >
                            <img
                              src={assets.cancel_icon}
                              alt="Cancel"
                              className="w-5 h-5"
                            />
                          </button>
                        </>
                      )}
                    </div>
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
