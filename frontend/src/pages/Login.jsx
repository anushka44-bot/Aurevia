import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    console.log({
      name,
      email,
      password,
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-[#2A3655] rounded-3xl shadow-2xl border border-[#D4AF37]/20 p-8"
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-[#D4AF37]">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h1>

        <p className="text-center text-[#E8DCC8] mt-3 mb-8">
          Please {state === "Sign Up" ? "sign up" : "log in"} to book your
          appointment.
        </p>

        {/* Name */}
        {state === "Sign Up" && (
          <div className="mb-5">
            <label className="block mb-2 text-[#E8DCC8] font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#1F2A44] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-[#E8DCC8] placeholder-gray-400 focus:border-[#D4AF37] outline-none"
            />
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <label className="block mb-2 text-[#E8DCC8] font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#1F2A44] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-[#E8DCC8] placeholder-gray-400 focus:border-[#D4AF37] outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-2 text-[#E8DCC8] font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#1F2A44] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-[#E8DCC8] placeholder-gray-400 focus:border-[#D4AF37] outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#D4AF37] text-[#1F2A44] py-3 rounded-full font-semibold hover:scale-105 transition duration-300"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Toggle */}
        <div className="mt-6 text-center text-[#E8DCC8]">
          {state === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-[#D4AF37] cursor-pointer font-semibold hover:underline"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create a new account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-[#D4AF37] cursor-pointer font-semibold hover:underline"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
