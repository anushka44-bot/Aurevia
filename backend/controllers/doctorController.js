import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availablity Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.doctorId;

    const appointments = await appointmentModel.find({ docId });

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

// API to approve doctor appointment
const approveAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

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
        message: "Cancelled appointment cannot be approved",
      });
    }

    appointment.approved = true;
    await appointment.save();

    res.json({
      success: true,
      message: "Appointment Approved",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to cancel doctor appointment
const cancelAppointmentDoctor = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.json({
        success: false,
        message: "Appointment not found",
      });
    }

    appointment.cancelled = true;
    appointment.approved = false;

    await appointment.save();

    res.json({
      success: true,
      message: "Appointment Cancelled",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
// API to get doctor dashboard data
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.doctorId;

    const appointments = await appointmentModel
      .find({ docId })
      .sort({ date: -1 });

    // Total appointments
    const totalAppointments = appointments.length;

    // Total unique patients
    const patientIds = new Set(
      appointments.map((appointment) => appointment.userId?.toString()),
    );

    const totalPatients = patientIds.size;

    // Total earnings from paid appointments
    const totalEarnings = appointments
      .filter((appointment) => appointment.payment === true)
      .reduce(
        (total, appointment) => total + Number(appointment.amount || 0),
        0,
      );

    // Latest 3 appointments
    const latestAppointments = appointments.slice(0, 3);

    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        totalAppointments,
        totalPatients,
        latestAppointments,
      },
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
// API to get doctor profile for doctor panel
const doctorProfile = async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.doctorId).select("-password");

    if (!doctor) {
      return res.json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.json({
      success: true,
      doctor,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to update doctor profile data from doctor panel
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.doctorId;

    const { name, email, phone, address, fees, about, experience, available } =
      req.body;

    const doctor = await doctorModel.findByIdAndUpdate(
      docId,
      {
        name,
        email,
        phone,
        address,
        fees,
        about,
        experience,
        available,
      },
      { new: true },
    );

    if (!doctor) {
      return res.json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      doctor,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
// API to mark appointment as completed
const completeAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

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
        message: "Cancelled appointment cannot be completed",
      });
    }

    if (!appointment.approved) {
      return res.json({
        success: false,
        message: "Only scheduled appointments can be completed",
      });
    }

    appointment.completed = true;

    await appointment.save();

    res.json({
      success: true,
      message: "Appointment marked as completed",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  approveAppointment,
  cancelAppointmentDoctor,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
  completeAppointment,
};
