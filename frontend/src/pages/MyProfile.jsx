import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);

      formData.append(
        "address",
        JSON.stringify({
          line1: userData.address?.line1 || "",
          line2: userData.address?.line2 || "",
        }),
      );

      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          headers: {
            token,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);

        setIsEdit(false);
        setImage(false);

        await loadUserProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return null;
  }

  return (
    userData && (
      <div className="py-10 flex justify-center">
        <div className="w-full max-w-4xl bg-[#2A3655] rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#22304D] px-8 py-8 flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            {isEdit ? (
              <label htmlFor="image" className="relative cursor-pointer group">
                <div className="relative w-32 h-32">
                  <img
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-[#D4AF37] object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <img
                      src={assets.upload_icon}
                      alt="Upload"
                      className="w-8 h-8"
                    />
                  </div>
                </div>

                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setImage(e.target.files[0]);
                    }
                  }}
                />
              </label>
            ) : (
              <img
                src={userData.image}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-[#D4AF37] object-cover"
              />
            )}

            <div className="flex-1 text-center md:text-left">
              {isEdit ? (
                <input
                  className="bg-transparent border-b border-[#D4AF37] text-3xl font-bold text-[#D4AF37] outline-none w-full"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                />
              ) : (
                <h1 className="text-3xl font-bold text-[#D4AF37]">
                  {userData.name}
                </h1>
              )}

              <p className="text-[#E8DCC8] mt-2">{userData.email}</p>

              <span className="inline-block mt-4 px-4 py-1 rounded-full bg-green-600 text-white text-sm">
                ● Active Account
              </span>
            </div>

            <button
              onClick={() => {
                if (isEdit) {
                  updateUserProfileData();
                } else {
                  setIsEdit(true);
                }
              }}
              className="bg-[#D4AF37] text-[#1F2A44] px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              {isEdit ? "Save" : "Edit Profile"}
            </button>
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div>
              <h2 className="text-[#D4AF37] font-semibold mb-4 text-xl">
                Personal Details
              </h2>

              <div className="space-y-5">
                <div>
                  <p className="text-gray-400 text-sm">Phone Number</p>

                  {isEdit ? (
                    <input
                      className="mt-1 w-full bg-[#1F2A44] rounded-lg px-3 py-2 text-[#E8DCC8]"
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-[#E8DCC8]">{userData.phone}</p>
                  )}
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Gender</p>

                  {isEdit ? (
                    <select
                      className="mt-1 w-full bg-[#1F2A44] rounded-lg px-3 py-2 text-[#E8DCC8]"
                      value={userData.gender}
                      onChange={(e) =>
                        setUserData({ ...userData, gender: e.target.value })
                      }
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  ) : (
                    <p className="text-[#E8DCC8]">{userData.gender}</p>
                  )}
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Date of Birth</p>

                  {isEdit ? (
                    <input
                      type="date"
                      className="mt-1 w-full bg-[#1F2A44] rounded-lg px-3 py-2 text-[#E8DCC8]"
                      value={userData.dob}
                      onChange={(e) =>
                        setUserData({ ...userData, dob: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-[#E8DCC8]">{userData.dob}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section */}

            <div>
              <h2 className="text-[#D4AF37] font-semibold mb-4 text-xl">
                Address & Account
              </h2>

              <div className="space-y-5">
                <div>
                  <p className="text-gray-400 text-sm">Address</p>

                  {isEdit ? (
                    <textarea
                      rows="3"
                      className="mt-1 w-full bg-[#1F2A44] rounded-lg px-3 py-2 text-[#E8DCC8]"
                      value={`${userData.address?.line1 || ""}\n${
                        userData.address?.line2 || ""
                      }`}
                      onChange={(e) => {
                        const [line1, ...rest] = e.target.value.split("\n");

                        setUserData({
                          ...userData,
                          address: {
                            line1,
                            line2: rest.join("\n"),
                          },
                        });
                      }}
                    />
                  ) : (
                    <div className="text-[#E8DCC8]">
                      <p>{userData.address?.line1}</p>
                      <p>{userData.address?.line2}</p>
                    </div>
                  )}
                </div>

                <div className="bg-[#1F2A44] rounded-xl p-4">
                  <p className="text-[#D4AF37] font-semibold">
                    Account Information
                  </p>

                  <div className="mt-3 space-y-2 text-[#E8DCC8]">
                    <p>
                      <span className="text-gray-400">Account Type:</span>{" "}
                      Patient
                    </p>

                    <p>
                      <span className="text-gray-400">
                        Emergency Hotline: Emergency? Call emergency services
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
