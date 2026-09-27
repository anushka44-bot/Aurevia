import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";

const AppointmentManagement = () => {
  const { dToken, appointments, getAppointments, completeAppointment } =
    useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const scheduledAppointments = appointments.filter(
    (item) =>
      item.approved === true &&
      item.cancelled !== true &&
      item.completed !== true,
  );

  const completedAppointments = appointments.filter(
    (item) => item.completed === true && item.cancelled !== true,
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">
      {/* Scheduled Appointments */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b bg-[#F8F9FB]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#1F2A44]">
                Scheduled Appointments
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Mark an appointment as completed after the consultation.
              </p>
            </div>

            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
              {scheduledAppointments.length}
            </span>
          </div>
        </div>

        {scheduledAppointments.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-500">No scheduled appointments.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {scheduledAppointments.map((item) => (
              <div
                key={item._id}
                className="px-5 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F1F3F7] flex items-center justify-center overflow-hidden">
                    <img
                      src={item.userData?.image}
                      alt="Patient"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#1F2A44]">
                      {item.userData?.name || "Patient"}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.slotDate} • {item.slotTime}
                    </p>

                    <span className="inline-block mt-2 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                      Scheduled
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => completeAppointment(item._id)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1F2A44] text-white hover:bg-[#2A3655] transition"
                >
                  <img
                    src={assets.tick_icon}
                    alt="Complete"
                    className="w-4 h-4 brightness-0 invert"
                  />

                  <span>Mark Completed</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Appointments */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mt-6">
        <div className="px-5 py-4 border-b bg-[#F8F9FB]">
          <h2 className="text-lg font-semibold text-[#1F2A44]">
            Completed Appointments
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Appointments that have already been completed.
          </p>
        </div>

        {completedAppointments.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">No completed appointments yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {completedAppointments.map((item) => (
              <div
                key={item._id}
                className="px-5 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-semibold text-[#1F2A44]">
                    {item.userData?.name || "Patient"}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.slotDate} • {item.slotTime}
                  </p>
                </div>

                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 text-green-600 text-sm font-medium">
                  <img src={assets.tick_icon} alt="" className="w-4 h-4" />
                  Completed
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentManagement;
