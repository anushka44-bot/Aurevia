import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const { aToken, dashData, getDashData } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    <div className="w-full p-5 sm:p-8 bg-[#F6F7F9] min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#1F2A44]">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Overview of your healthcare management system.
        </p>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* TOTAL DOCTORS */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">Total Doctors</p>

          <h2 className="text-3xl font-bold text-[#1F2A44] mt-3">
            {dashData?.totalDoctors ?? 0}
          </h2>
        </div>

        {/* TOTAL APPOINTMENTS */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">Total Appointments</p>

          <h2 className="text-3xl font-bold text-[#1F2A44] mt-3">
            {dashData?.totalAppointments ?? 0}
          </h2>
        </div>

        {/* TOTAL PATIENTS */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">Total Patients</p>

          <h2 className="text-3xl font-bold text-[#1F2A44] mt-3">
            {dashData?.totalUsers ?? 0}
          </h2>
        </div>

        {/* TOTAL EARNINGS */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">Total Earnings</p>

          <h2 className="text-3xl font-bold text-[#1F2A44] mt-3">
            ₹{dashData?.totalRevenue ?? 0}
          </h2>
        </div>
      </div>

      {/* RECENT APPOINTMENTS */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-[#1F2A44]">
          Recent Appointments
        </h2>

        <div className="mt-5">
          {dashData?.latestAppointments?.length > 0 ? (
            <div className="space-y-4">
              {dashData.latestAppointments.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b border-gray-100 pb-4"
                >
                  <div>
                    <p className="font-medium text-[#1F2A44]">
                      {item.userData?.name || "Patient"}
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.slotDate} • {item.slotTime}
                    </p>
                  </div>

                  <div>
                    {item.cancelled ? (
                      <span className="text-red-600 font-medium">
                        Cancelled
                      </span>
                    ) : item.completed ? (
                      <span className="text-green-600 font-medium">
                        Completed
                      </span>
                    ) : item.approved ? (
                      <span className="text-blue-600 font-medium">
                        Scheduled
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-medium">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No appointments available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
