# Aurevia — Doctor Appointment & Healthcare Management Platform

Aurevia is a full-stack **MERN healthcare management platform** that connects patients with doctors and provides separate dashboards for patients, doctors, and administrators.

The platform allows patients to discover doctors, check availability, book appointments, make online payments, and manage their appointments. Doctors can manage their schedules and appointments, while administrators can manage doctors, appointments, and overall healthcare operations.

## ✨ Features

### 👤 Patient

- User registration and login
- Browse doctors by speciality
- View doctor profiles and consultation fees
- Check doctor availability
- View available appointment slots
- Book appointments
- Online payment integration
- Cancel appointments
- View appointment status
- Manage personal profile

### 👨‍⚕️ Doctor

- Secure doctor login
- Doctor dashboard
- Manage professional profile
- Toggle availability
- View appointments
- Approve or cancel pending appointments
- Manage scheduled appointments
- Mark appointments as completed
- View patient information

### 🛠️ Admin

- Secure administrator login
- Admin dashboard
- Add and manage doctors
- View all doctors
- Change doctor availability
- View and manage appointments
- Cancel appointments
- Monitor users, doctors, appointments, and revenue
- Separate admin and doctor portals

## 📌 Appointment Status

Aurevia provides a clear appointment workflow:

```text
Pending
   ↓
Scheduled
   ↓
Completed
```

Appointments can also be:

```text
Pending / Scheduled
        ↓
    Cancelled
```

## 🧑‍💻 Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Cookie Parser

### Services & Integrations

- Cloudinary — Image and profile management
- Razorpay — Online payments

## 📁 Project Structure

```text
Aurevia/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.jsx
│   └── package.json
│
├── admin/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── Admin/
│   │   │   └── Doctor/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/anushka44-bot/Aurevia.git
cd Aurevia
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Admin Dependencies

```bash
cd ../admin
npm install
```

### 4. Install Backend Dependencies

```bash
cd ../backend
npm install
```

## 🔐 Environment Variables

### Frontend

Create:

```text
frontend/.env
```

Add:

```env
VITE_BACKEND_URL=http://localhost:4000
```

### Admin

Create:

```text
admin/.env
```

Add:

```env
VITE_BACKEND_URL=http://localhost:4000
```

### Backend

Create:

```text
backend/.env
```

Configure your MongoDB, JWT, Cloudinary, Razorpay, and other required credentials.

Example:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
CURRENCY=INR
```

> Never commit `.env` files or API credentials to GitHub.

## ▶️ Running the Project

### Start Backend

```bash
cd backend
npm run server
```

Backend runs on:

```text
http://localhost:4000
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

### Start Admin Panel

Open another terminal:

```bash
cd admin
npm run dev
```

## 🔄 Application Flow

```text
                    Aurevia
                       │
        ┌──────────────┼──────────────┐
        │              │              │
     Patient         Doctor         Admin
        │              │              │
        ↓              ↓              ↓
 Browse Doctors   Manage Profile   Manage Doctors
        │              │              │
 Check Availability   Manage        Manage
        │           Appointments    Appointments
        ↓              │              │
 Book Appointment      ↓              ↓
        │          Complete       Dashboard
        ↓          Appointment
 Online Payment
        │
        ↓
 Appointment Tracking
```

## 🎨 Design

Aurevia uses a premium healthcare-inspired visual theme built around:

- Navy — `#1F2A44`
- Dark Navy — `#2A3655`
- Gold — `#D4AF37`
- Cream — `#E8DCC8`

The interface is designed to provide a clean, professional, and consistent experience across the patient, doctor, and admin panels.

## 🔒 Authentication & Security

- JWT-based authentication
- Separate authentication for users, doctors, and administrators
- Password hashing with bcrypt
- Protected backend routes
- Role-specific dashboards
- Environment variables for sensitive credentials

## 🚀 Deployment

The frontend and admin applications can be deployed using **Vercel**, while the backend can be deployed using a Node.js-compatible hosting platform.

For Vercel deployments, make sure the correct project root is selected:

```text
Frontend → frontend
Admin    → admin
```

## 📱 Future Improvements

- Doctor search and advanced filtering
- Appointment reminders
- Email notifications
- Prescription management
- Medical records
- Doctor reviews and ratings
- Video consultations
- Analytics and reporting
- Improved mobile responsiveness

## 🚀 Live Demo

### Aurevia — Patient Website

**Live Website:**
https://aurevia-tan.vercel.app/

### Aurevia — Admin Panel

**Admin Panel:**
https://aurevia-adminpanel.vercel.app/

---

## 👩‍💻 Author

**Anushka Bag**
