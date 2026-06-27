import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="mt-20 text-[#E8DCC8]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-10">
        {/* Left Section */}
        <div>
          <img className="w-48 mb-4" src={assets.logo} alt="Aurevia Logo" />

          <p className="text-sm leading-7 text-gray-300">
            Elevating healthcare through trusted expertise, compassionate care,
            and seamless appointment experiences—because your well-being
            deserves nothing less than excellence.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <p className="text-lg font-semibold text-[#D4AF37] mb-4">COMPANY</p>

          <ul className="flex flex-col gap-3 text-gray-300">
            <li
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-[#D4AF37]"
            >
              Home
            </li>

            <li
              onClick={() => navigate("/about")}
              className="cursor-pointer hover:text-[#D4AF37]"
            >
              About Us
            </li>

            <li
              onClick={() => navigate("/contact")}
              className="cursor-pointer hover:text-[#D4AF37]"
            >
              Contact Us
            </li>

            <li
              onClick={() => navigate("/privacy-policy")}
              className="cursor-pointer hover:text-[#D4AF37]"
            >
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-lg font-semibold text-[#D4AF37] mb-4">
            GET IN TOUCH
          </p>

          <ul className="flex flex-col gap-3 text-gray-300">
            <li>+91 98765 43210</li>
            <li>support@aurevia.in</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div>
        <hr className="border-gray-600" />

        <p className="py-5 text-sm text-center text-gray-400">
          Copyright © 2026 Aurevia. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
