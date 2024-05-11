import React from "react";
import { useNavigate } from "react-router";
const NavButton = ({ buttonName, FaIons, page, clickHandler, totalItems }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="flex items-center bg-transparent text-[#96002e]  rounded-full p-2 w-fit m-1 pl-6 pr-6 hover:underline underline-offset-2  "
      onClick={() => (page ? navigate(`${page}`) : clickHandler())}
    >
      <span>
        <span className="absolute top-3 right-16 rounded-full p-px size-2">
          {totalItems === 0 ? "" : totalItems}
        </span>
        {FaIons}
      </span>
      {buttonName}
    </button>
  );
};

export { NavButton };
