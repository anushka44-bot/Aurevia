import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, backendUrl } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        {
          appointmentId,
        },
        {
          headers: {
            aToken,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);

        // Refresh appointments after cancellation
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("CANCEL APPOINTMENT ERROR:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[50px_1.6fr_0.7fr_1.5fr_1.6fr_0.8fr_0.8fr] gap-4 px-6 py-4 bg-[#fafafa] border-b border-gray-100 text-[12px] uppercase tracking-wider text-gray-400 font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointments */}
        {appointments && appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={item._id}
              className="grid grid-cols-[50px_1.6fr_0.7fr_1.5fr_1.6fr_0.8fr_0.8fr] gap-4 px-6 py-5 items-center border-b border-gray-50 last:border-b-0 hover:bg-[#fcfcfc] transition-all duration-200"
            >
              {/* Number */}
              <p className="text-sm text-gray-400 font-medium">
                {String(index + 1).padStart(2, "0")}
              </p>

              {/* Patient */}
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.userData?.image}
                  alt=""
                  className="w-11 h-11 rounded-xl object-cover border border-gray-100"
                />

                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.userData?.name}
                  </p>

                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {item.userData?.email}
                  </p>
                </div>
              </div>

              {/* Age */}
              <p className="text-sm text-gray-600">
                {item.userData?.dob
                  ? new Date().getFullYear() -
                    new Date(item.userData.dob).getFullYear()
                  : "—"}
              </p>

              {/* Date & Time */}
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {item.slotDate}
                </p>

                <p className="text-xs text-gray-400 mt-1">{item.slotTime}</p>
              </div>

              {/* Doctor */}
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.docData?.image}
                  alt=""
                  className="w-11 h-11 rounded-xl object-cover border border-gray-100"
                />

                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.docData?.name}
                  </p>

                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {item.docData?.speciality}
                  </p>
                </div>
              </div>

              {/* Fees */}
              <p className="text-sm font-semibold text-gray-800">
                ₹{item.amount}
              </p>

              {/* Action */}
              <div className="flex flex-col items-start gap-2">
                {item.cancelled ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 bg-red-50 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    Cancelled
                  </span>
                ) : (
                  <>
                    {item.payment ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Payment Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                        Payment Pending
                      </span>
                    )}

                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="text-xs font-medium text-gray-500 hover:text-red-500 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-400">No appointments found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
