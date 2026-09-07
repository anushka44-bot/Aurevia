import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  if (!dashData) {
    return null;
  }

  // Find the highest appointment count for the graph
  const maxCount = Math.max(
    ...(dashData.appointmentOverview?.map((item) => item.count) || [1]),
    1,
  );

  return (
    <div className="p-6 space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Patients */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Patients</p>

              <p className="text-3xl font-semibold text-gray-800 mt-2">
                {dashData.totalUsers}
              </p>

              <p className="text-xs text-gray-400 mt-2">Registered patients</p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <span className="text-xl">♙</span>
            </div>
          </div>
        </div>

        {/* Doctors */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Doctors</p>

              <p className="text-3xl font-semibold text-gray-800 mt-2">
                {dashData.totalDoctors}
              </p>

              <p className="text-xs text-gray-400 mt-2">Active specialists</p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
              <span className="text-xl">♙</span>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Appointments</p>

              <p className="text-3xl font-semibold text-gray-800 mt-2">
                {dashData.totalAppointments}
              </p>

              <p className="text-xs text-gray-400 mt-2">Total bookings</p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <span className="text-xl">▣</span>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Revenue</p>

              <p className="text-3xl font-semibold text-gray-800 mt-2">
                ₹{dashData.totalRevenue || 0}
              </p>

              <p className="text-xs text-gray-400 mt-2">Completed payments</p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
              <span className="text-xl">₹</span>
            </div>
          </div>
        </div>
      </div>

      {/* Graph + Recent Appointments */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Appointment Graph */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-lg font-semibold text-gray-800">
                Appointment Overview
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Recent appointment activity
              </p>
            </div>

            <div className="text-xs text-gray-400">Last 7 days</div>
          </div>

          <div className="h-64 flex items-end gap-4 px-3">
            {dashData.appointmentOverview?.map((item, index) => {
              const height =
                item.count === 0 ? 2 : (item.count / maxCount) * 100;

              return (
                <div
                  key={index}
                  className="flex-1 h-full flex flex-col justify-end items-center gap-3"
                >
                  <div className="flex-1 w-full flex items-end justify-center">
                    <div
                      className="w-full max-w-[42px] bg-gray-800 rounded-t-lg hover:bg-gray-700 transition-all"
                      style={{
                        height: `${height}%`,
                      }}
                      title={`${item.count} appointment${
                        item.count !== 1 ? "s" : ""
                      }`}
                    ></div>
                  </div>

                  <span className="text-xs text-gray-400">{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-lg font-semibold text-gray-800">
                Recent Bookings
              </p>

              <p className="text-sm text-gray-400 mt-1">Latest bookings</p>
            </div>

            <span className="text-xs text-gray-400">5 latest</span>
          </div>

          <div className="space-y-4">
            {dashData.latestAppointments?.slice(0, 5).map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0"
              >
                {/* Patient Image */}
                <img
                  src={item.userData?.image}
                  alt=""
                  className="w-10 h-10 rounded-xl object-cover"
                />

                {/* Appointment Information */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.userData?.name}
                  </p>

                  <p className="text-xs text-gray-400 truncate">
                    {item.docData?.name}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {item.slotDate} · {item.slotTime}
                  </p>

                  {/* Payment Status */}
                  {!item.cancelled && (
                    <div className="mt-2">
                      {item.payment ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Payment Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                          Payment Pending
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Action */}
                <div className="flex flex-col items-end gap-2">
                  {item.cancelled ? (
                    <span className="text-[10px] font-medium text-red-500 bg-red-50 px-2.5 py-1 rounded-full">
                      Cancelled
                    </span>
                  ) : (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
//13:16:00
