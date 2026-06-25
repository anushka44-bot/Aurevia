import React from "react";
import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets";

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="flex flex-col items-center gap-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-white">
        Find by Speciality
      </h1>

      <p className="text-center max-w-2xl text-[#E8DCC8]">
        Access exceptional healthcare by connecting with leading specialists in
        every field.
      </p>

      <div className="flex sm:justify-center gap-6 pt-8 w-full overflow-x-auto scrollbar-hide">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            key={index}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col items-center text-sm cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-300"
          >
            <img
              className="w-20 sm:w-24 mb-3"
              src={item.image}
              alt={item.speciality}
            />

            <p className="font-medium text-[#E8DCC8]">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
