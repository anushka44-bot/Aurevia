import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (dToken) {
        setLoading(true);
        await getProfileData();
        setLoading(false);
      }
    };

    loadProfile();
  }, [dToken]);

  const handleSave = async () => {
    try {
      const response = await fetch(backendUrl + "/api/doctor/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          dtoken: dToken,
        },
        body: JSON.stringify({
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          address: profileData.address,
          fees: profileData.fees,
          about: profileData.about,
          experience: profileData.experience,
          available: profileData.available,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Profile updated successfully");
        setIsEdit(false);
        await getProfileData();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return <div className="w-full max-w-5xl mx-auto p-6">Loading...</div>;
  }

  if (!profileData) {
    return (
      <div className="w-full max-w-5xl mx-auto p-6">
        <p className="text-red-500">Unable to load doctor profile.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-[#F8F9FB] px-6 py-5 border-b">
          <h2 className="text-xl font-semibold text-[#1F2A44]">
            Doctor Profile
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage your professional profile information
          </p>
        </div>

        <div className="p-6">
          {/* Profile Image */}
          <div className="flex flex-col sm:flex-row items-center gap-5 mb-8">
            <img
              src={profileData.image}
              alt="Doctor"
              className="w-28 h-28 rounded-xl object-cover border"
            />

            <div>
              <h3 className="text-xl font-semibold text-[#1F2A44]">
                {profileData.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {profileData.speciality}
              </p>

              <p className="text-sm text-gray-500">{profileData.degree}</p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="mb-8">
            <h3 className="text-base font-semibold text-[#1F2A44] mb-4">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="text-sm text-gray-500">Name</label>

                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.name || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        name: e.target.value,
                      })
                    }
                    className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#1F2A44]"
                  />
                ) : (
                  <p className="mt-1 text-gray-700">{profileData.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-500">Email</label>

                {isEdit ? (
                  <input
                    type="email"
                    value={profileData.email || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        email: e.target.value,
                      })
                    }
                    className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#1F2A44]"
                  />
                ) : (
                  <p className="mt-1 text-gray-700">{profileData.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-gray-500">Phone</label>

                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.phone || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#1F2A44]"
                  />
                ) : (
                  <p className="mt-1 text-gray-700">
                    {profileData.phone || "N/A"}
                  </p>
                )}
              </div>

              {/* Fees */}
              <div>
                <label className="text-sm text-gray-500">
                  Consultation Fee
                </label>

                {isEdit ? (
                  <input
                    type="number"
                    value={profileData.fees || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        fees: e.target.value,
                      })
                    }
                    className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#1F2A44]"
                  />
                ) : (
                  <p className="mt-1 text-gray-700">₹{profileData.fees}</p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="mb-8">
            <h3 className="text-base font-semibold text-[#1F2A44] mb-4">
              Professional Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Speciality */}
              <div>
                <label className="text-sm text-gray-500">Speciality</label>

                <p className="mt-1 text-gray-700">
                  {profileData.speciality || "N/A"}
                </p>
              </div>

              {/* Degree */}
              <div>
                <label className="text-sm text-gray-500">Degree</label>

                <p className="mt-1 text-gray-700">
                  {profileData.degree || "N/A"}
                </p>
              </div>

              {/* Experience */}
              <div>
                <label className="text-sm text-gray-500">Experience</label>

                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.experience || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        experience: e.target.value,
                      })
                    }
                    className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#1F2A44]"
                  />
                ) : (
                  <p className="mt-1 text-gray-700">
                    {profileData.experience || "N/A"}
                  </p>
                )}
              </div>

              {/* Availability */}
              <div>
                <label className="text-sm text-gray-500">Availability</label>

                {isEdit ? (
                  <label className="flex items-center gap-3 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.available || false}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          available: e.target.checked,
                        })
                      }
                      className="w-4 h-4"
                    />

                    <span className="text-gray-700">
                      Available for appointments
                    </span>
                  </label>
                ) : (
                  <p
                    className={`mt-1 font-medium ${
                      profileData.available ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {profileData.available ? "Available" : "Not Available"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mb-8">
            <h3 className="text-base font-semibold text-[#1F2A44] mb-4">
              Address
            </h3>

            {isEdit ? (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Address Line 1"
                  value={profileData.address?.line1 || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      address: {
                        ...profileData.address,
                        line1: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#1F2A44]"
                />

                <input
                  type="text"
                  placeholder="Address Line 2"
                  value={profileData.address?.line2 || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      address: {
                        ...profileData.address,
                        line2: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-[#1F2A44]"
                />
              </div>
            ) : (
              <p className="text-gray-700">
                {profileData.address?.line1 || ""}
                {profileData.address?.line2
                  ? `, ${profileData.address.line2}`
                  : ""}
              </p>
            )}
          </div>

          {/* About */}
          <div className="mb-8">
            <h3 className="text-base font-semibold text-[#1F2A44] mb-4">
              About
            </h3>

            {isEdit ? (
              <textarea
                value={profileData.about || ""}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    about: e.target.value,
                  })
                }
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#1F2A44]"
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">
                {profileData.about || "N/A"}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            {isEdit ? (
              <>
                <button
                  onClick={() => {
                    setIsEdit(false);
                    getProfileData();
                  }}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-[#1F2A44] text-white rounded-lg hover:bg-[#2A3655] transition"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-5 py-2.5 bg-[#1F2A44] text-white rounded-lg hover:bg-[#2A3655] transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
