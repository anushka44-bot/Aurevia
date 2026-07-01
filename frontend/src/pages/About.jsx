import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="py-14">
      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-[#E8DCC8]">
          ABOUT <span className="text-[#D4AF37]">US</span>
        </h1>
        <p className="mt-4 text-[#E8DCC8]/80 max-w-3xl mx-auto text-lg">
          Delivering exceptional healthcare experiences by connecting patients
          with trusted medical professionals through a secure, modern, and
          patient-first digital platform.
        </p>
      </div>

      {/* About Section */}
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Left Image */}
        <div className="lg:w-1/2">
          <img
            src={assets.about_image}
            alt="About Aurevia"
            className="rounded-3xl shadow-2xl w-full"
          />
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2 space-y-6">
          <p className="text-[#E8DCC8] leading-8 text-lg">
            At <span className="text-[#D4AF37] font-semibold">Aurevia</span>, we
            believe that quality healthcare should be simple, accessible, and
            stress-free. Our platform is designed to bridge the gap between
            patients and highly qualified medical professionals, making it
            easier than ever to schedule appointments with confidence.
          </p>

          <p className="text-[#E8DCC8] leading-8 text-lg">
            From discovering experienced specialists to selecting convenient
            appointment slots, Aurevia ensures every step of your healthcare
            journey is seamless, secure, and transparent. Whether you're seeking
            routine consultations or specialized medical care, we are committed
            to helping you make informed healthcare decisions.
          </p>

          <div className="border-l-4 border-[#D4AF37] pl-5">
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-2">
              Our Vision
            </h2>

            <p className="text-[#E8DCC8] leading-8">
              To redefine digital healthcare by creating a trusted ecosystem
              where patients can effortlessly connect with skilled doctors,
              ensuring timely medical attention and exceptional care across
              every stage of life.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-24 text-center">
        <h2 className="text-4xl font-bold text-[#D4AF37]">
          Why Choose Aurevia
        </h2>

        <p className="mt-4 text-[#E8DCC8]/80 max-w-2xl mx-auto">
          Experience healthcare designed around your comfort, convenience, and
          confidence.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="bg-[#2A3655] rounded-3xl p-8 shadow-xl border border-[#D4AF37]/20 hover:scale-105 transition duration-300">
          <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">
            Trusted Expertise
          </h3>

          <p className="text-[#E8DCC8] leading-7">
            Connect with experienced and verified healthcare professionals who
            are committed to delivering exceptional medical care with compassion
            and professionalism.
          </p>
        </div>

        <div className="bg-[#2A3655] rounded-3xl p-8 shadow-xl border border-[#D4AF37]/20 hover:scale-105 transition duration-300">
          <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">
            Seamless Experience
          </h3>

          <p className="text-[#E8DCC8] leading-7">
            Easily browse doctors, compare specialties, select preferred time
            slots, and manage appointments through a beautifully designed,
            intuitive interface.
          </p>
        </div>

        <div className="bg-[#2A3655] rounded-3xl p-8 shadow-xl border border-[#D4AF37]/20 hover:scale-105 transition duration-300">
          <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">
            Patient-Centered Care
          </h3>

          <p className="text-[#E8DCC8] leading-7">
            Every feature is thoughtfully designed to prioritize your comfort,
            privacy, and peace of mind, ensuring a reliable healthcare journey
            from consultation to follow-up.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
