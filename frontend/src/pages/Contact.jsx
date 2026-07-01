import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="py-14">
      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-[#E8DCC8]">
          CONTACT <span className="text-[#D4AF37]">US</span>
        </h1>

        <p className="mt-4 max-w-3xl mx-auto text-[#E8DCC8]/80 text-lg">
          Whether you have a question, require assistance, or wish to schedule
          an appointment, our dedicated support team is always ready to help.
        </p>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col lg:flex-row items-center gap-14">
        {/* Left Image */}
        <div className="lg:w-1/2">
          <img
            src={assets.contact_image}
            alt="Contact Aurevia"
            className="w-full rounded-3xl shadow-2xl"
          />
        </div>

        {/* Right Details */}
        <div className="lg:w-1/2 bg-[#2A3655] rounded-3xl p-10 shadow-2xl border border-[#D4AF37]/20">
          <h2 className="text-3xl font-bold text-[#D4AF37] mb-8">
            Get In Touch
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-[#D4AF37] mb-2">
                📍 Office Address
              </h3>

              <p className="text-[#E8DCC8] leading-7">
                Aurevia Healthcare Pvt. Ltd.
                <br />
                Sector V, Salt Lake
                <br />
                Kolkata, West Bengal – 700091
                <br />
                India
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#D4AF37] mb-2">
                📞 Contact Number
              </h3>

              <p className="text-[#E8DCC8]">+91 98765 43210</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#D4AF37] mb-2">
                📧 Email Address
              </h3>

              <p className="text-[#E8DCC8]">support@aureviahealth.com</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#D4AF37] mb-2">
                🕒 Working Hours
              </h3>

              <p className="text-[#E8DCC8] leading-7">
                Monday – Saturday
                <br />
                10:00 AM – 5:00 PM
              </p>
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="mt-10 border-l-4 border-[#D4AF37] pl-5">
            <p className="italic text-[#E8DCC8] leading-8">
              "Your health deserves exceptional care. At Aurevia, every
              appointment begins with trust, compassion, and a commitment to
              excellence."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
