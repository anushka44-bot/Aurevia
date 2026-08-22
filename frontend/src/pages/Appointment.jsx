import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();

  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Fetch doctor
  // Generate available slots (Monday - Saturday only)
  const getAvailableSlots = () => {
    let slots = [];
    let currentDay = new Date();

    while (slots.length < 7) {
      let currentDate = new Date(currentDay);

      // Skip Sunday
      if (currentDate.getDay() !== 0) {
        let startTime = new Date(currentDate);
        startTime.setHours(10, 0, 0, 0);

        let endTime = new Date(currentDate);
        endTime.setHours(17, 0, 0, 0);

        const today = new Date();

        // If today, start from next available 30-minute slot
        if (
          currentDate.toDateString() === today.toDateString() &&
          today > startTime
        ) {
          startTime = new Date(today);

          if (startTime.getMinutes() === 0) {
            // keep current hour
          } else if (startTime.getMinutes() <= 30) {
            startTime.setMinutes(30);
          } else {
            startTime.setHours(startTime.getHours() + 1);
            startTime.setMinutes(0);
          }

          startTime.setSeconds(0);
          startTime.setMilliseconds(0);
        }

        let timeSlots = [];

        while (startTime <= endTime) {
          const day = String(currentDate.getDate()).padStart(2, "0");
          const month = String(currentDate.getMonth() + 1).padStart(2, "0");
          const year = currentDate.getFullYear();

          const slotDate = `${day}_${month}_${year}`;

          const formattedTime = startTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          // Check if this slot is already booked
          const isSlotAvailable = docInfo.slots_booked?.[slotDate]?.includes(
            formattedTime,
          )
            ? false
            : true;

          if (isSlotAvailable) {
            timeSlots.push({
              datetime: new Date(startTime),
              time: formattedTime,
            });
          }

          startTime.setMinutes(startTime.getMinutes() + 30);
        }

        slots.push(timeSlots);
      }

      // Move to next day
      currentDay.setDate(currentDay.getDate() + 1);
    }

    setDocSlots(slots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    if (!slotTime) {
      toast.warn("Please select a time slot");
      return;
    }

    try {
      const selectedDate = docSlots[slotIndex][0].datetime;

      const day = String(selectedDate.getDate()).padStart(2, "0");
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const year = selectedDate.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        {
          docId,
          slotDate,
          slotTime,
        },
        {
          headers: {
            token,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctor);
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return (
    docInfo && (
      <div className="py-12">
        {/* Doctor Details */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Doctor Image */}
          <div className="lg:w-1/3">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-full rounded-3xl bg-[#2A3655] shadow-xl"
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-1 bg-[#2A3655] rounded-3xl p-8 border border-[#D4AF37]/20 shadow-xl">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-[#D4AF37]">
                {docInfo.name}
              </h1>

              <img src={assets.verified_icon} alt="" className="w-6 h-6" />
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <p className="text-[#E8DCC8] text-lg">
                {docInfo.degree} • {docInfo.speciality}
              </p>

              <span className="bg-[#D4AF37] text-[#1F2A44] px-4 py-1 rounded-full text-sm font-semibold">
                {docInfo.experience}
              </span>
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-xl font-semibold text-[#D4AF37]">About</h2>

                <img src={assets.info_icon} alt="" className="w-5" />
              </div>

              <p className="text-[#E8DCC8] leading-8">{docInfo.about}</p>
            </div>

            <div className="mt-8">
              <p className="text-xl text-[#E8DCC8]">
                Consultation Fee :
                <span className="text-[#D4AF37] font-bold ml-2">
                  {currencySymbol}
                  {docInfo.fees}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-[#D4AF37] mb-6">
            Available Booking Slots
          </h2>

          {/* Days */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            {docSlots.map((daySlots, index) => (
              <button
                key={index}
                onClick={() => {
                  setSlotIndex(index);
                  setSlotTime("");
                }}
                className={`min-w-[80px] py-5 rounded-xl border transition ${
                  slotIndex === index
                    ? "bg-[#D4AF37] text-[#1F2A44]"
                    : "border-[#D4AF37] text-[#E8DCC8]"
                }`}
              >
                <p className="font-semibold">
                  {daySlots.length > 0
                    ? daySlots[0].datetime.toLocaleDateString("en-US", {
                        weekday: "short",
                      })
                    : new Date(
                        new Date().setDate(new Date().getDate() + index),
                      ).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                </p>

                <p>
                  {daySlots.length > 0
                    ? daySlots[0].datetime.getDate()
                    : new Date(
                        new Date().setDate(new Date().getDate() + index),
                      ).getDate()}
                </p>
              </button>
            ))}
          </div>

          {/* Time Slots */}
          <div className="flex gap-3 overflow-x-auto pb-4 mt-8">
            {docSlots[slotIndex]?.length > 0 ? (
              docSlots[slotIndex].map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSlotTime(slot.time)}
                  className={`px-6 py-3 rounded-full whitespace-nowrap border transition ${
                    slotTime === slot.time
                      ? "bg-[#D4AF37] text-[#1F2A44]"
                      : "border-[#D4AF37] text-[#E8DCC8]"
                  }`}
                >
                  {slot.time}
                </button>
              ))
            ) : (
              <p className="text-[#E8DCC8]">No slots available for this day.</p>
            )}
          </div>

          <button
            onClick={bookAppointment}
            className="mt-10 bg-[#D4AF37] text-[#1F2A44] px-10 py-4 rounded-full font-semibold hover:scale-105 transition duration-300"
          >
            Book Appointment
          </button>
        </div>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
