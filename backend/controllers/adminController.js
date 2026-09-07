import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    console.log(req.file);

    // Check for missing fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    let imageUpload;

    try {
      imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      console.log(imageUpload);
    } catch (err) {
      console.log("Cloudinary Error:", err);

      return res.json({
        success: false,
        message: err.message,
      });
    }

    const imageUrl = imageUpload.secure_url;

    // Doctor data
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);

    await newDoctor.save();

    res.json({
      success: true,
      message: "Doctor Added Successfully",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

//api for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");

    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to get all appointments list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.json({
        success: false,
        message: "Appointment ID is required",
      });
    }

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointment.cancelled) {
      return res.json({
        success: false,
        message: "Appointment is already cancelled",
      });
    }

    // Mark appointment as cancelled
    appointment.cancelled = true;

    await appointment.save();

    // Free doctor's booked slot
    const doctor = await doctorModel.findById(appointment.docId);

    if (doctor) {
      const slots_booked = doctor.slots_booked || {};

      if (slots_booked[appointment.slotDate]) {
        slots_booked[appointment.slotDate] = slots_booked[
          appointment.slotDate
        ].filter((time) => time !== appointment.slotTime);

        if (slots_booked[appointment.slotDate].length === 0) {
          delete slots_booked[appointment.slotDate];
        }
      }

      await doctorModel.findByIdAndUpdate(appointment.docId, {
        slots_booked,
      });
    }

    res.json({
      success: true,
      message: "Appointment Cancelled Successfully",
    });
  } catch (error) {
    console.log("ADMIN CANCEL APPOINTMENT ERROR:", error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get dashboard data for admin panel

const adminDashboard = async (req, res) => {
  try {
    const users = await userModel.find({});
    const doctors = await doctorModel.find({});
    const appointments = await appointmentModel.find({});

    // Total revenue from completed payments
    const totalRevenue = appointments
      .filter((appointment) => appointment.payment === true)
      .reduce(
        (total, appointment) => total + Number(appointment.amount || 0),
        0,
      );

    // Last 7 days appointment overview
    const appointmentOverview = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - i);

      const day = date.toLocaleDateString("en-US", {
        weekday: "short",
      });

      const dateString = [
        String(date.getDate()).padStart(2, "0"),
        String(date.getMonth() + 1).padStart(2, "0"),
        date.getFullYear(),
      ].join("_");

      const count = appointments.filter(
        (appointment) => appointment.slotDate === dateString,
      ).length;

      appointmentOverview.push({
        day,
        count,
      });
    }

    // Latest 5 bookings
    const latestAppointments = appointments
      .sort((a, b) => b.date - a.date)
      .slice(0, 5);

    res.json({
      success: true,

      dashboardData: {
        totalUsers: users.length,
        totalDoctors: doctors.length,
        totalAppointments: appointments.length,
        totalRevenue,

        latestAppointments,

        appointmentOverview,
      },
    });
  } catch (error) {
    console.log("ADMIN DASHBOARD ERROR:", error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  cancelAppointment,
  adminDashboard,
};
