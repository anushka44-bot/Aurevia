import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 }),
      );

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } },
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setPassword("");
        setEmail("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setFees("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <div className="bg-[#2A3655] rounded-2xl shadow-xl border border-[#D4AF37]/20 p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-[#D4AF37] mb-8">Add Doctor</h2>

        {/* Upload */}
        <div className="flex items-center gap-6 mb-10">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
              className="w-28 h-28 rounded-full border-2 border-dashed border-[#D4AF37] object-cover hover:scale-105 transition"
            />
          </label>

          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />

          <p className="text-[#E8DCC8] text-lg">
            Upload Doctor <br />
            Profile Picture
          </p>
        </div>

        {/* Form */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left */}
          <div className="space-y-5">
            <div>
              <p className="text-[#E8DCC8] mb-2">Doctor Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter doctor's name"
                required
                className="w-full bg-[#1F2A44] text-white border border-[#D4AF37]/30 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <p className="text-[#E8DCC8] mb-2">Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter email"
                required
                className="w-full bg-[#1F2A44] text-white border border-[#D4AF37]/30 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <p className="text-[#E8DCC8] mb-2">Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter password"
                required
                className="w-full bg-[#1F2A44] text-white border border-[#D4AF37]/30 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <p className="text-[#E8DCC8] mb-2">Experience</p>

              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="w-full bg-[#1F2A44] text-white border border-[#D4AF37]/30 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
              >
                <option>1 Year</option>
                <option>2 Years</option>
                <option>3 Years</option>
                <option>4 Years</option>
                <option>5 Years</option>
                <option>6 Years</option>
                <option>7 Years</option>
                <option>8 Years</option>
                <option>9 Years</option>
                <option>10 Years</option>
              </select>
            </div>

            <div>
              <p className="text-[#E8DCC8] mb-2">Consultation Fees</p>

              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                type="number"
                placeholder="$ Fees"
                required
                className="w-full bg-[#1F2A44] text-white border border-[#D4AF37]/30 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Right */}
          <div className="space-y-5">
            <div>
              <p className="text-[#E8DCC8] mb-2">Speciality</p>

              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="w-full bg-[#1F2A44] text-white border border-[#D4AF37]/30 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
              >
                <option>General Physician</option>
                <option>Gynecologist</option>
                <option>Dermatologist</option>
                <option>Pediatricians</option>
                <option>Neurologist</option>
                <option>Gastroenterologist</option>
              </select>
            </div>

            <div>
              <p className="text-[#E8DCC8] mb-2">Education</p>

              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                type="text"
                placeholder="MBBS, MD..."
                required
                className="w-full bg-[#1F2A44] text-white border border-[#D4AF37]/30 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <p className="text-[#E8DCC8] mb-2">Address</p>

              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                type="text"
                placeholder="Address Line 1"
                required
                className="w-full mb-3 bg-[#1F2A44] text-white border border-[#D4AF37]/30 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
              />

              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                type="text"
                placeholder="Address Line 2"
                required
                className="w-full bg-[#1F2A44] text-white border border-[#D4AF37]/30 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <p className="text-[#E8DCC8] mb-2">About Doctor</p>

              <textarea
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                rows={5}
                placeholder="Write about the doctor..."
                required
                className="w-full bg-[#1F2A44] text-white border border-[#D4AF37]/30 rounded-xl px-4 py-3 outline-none resize-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-10">
          <button
            type="submit"
            className="bg-[#D4AF37] text-[#1F2A44] font-semibold px-10 py-3 rounded-xl hover:bg-[#e6bf45] hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
