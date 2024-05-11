import React from "react";
import { VerticalNavbar } from "../Smallcomponents/VerticalNavbar";
const Admin = ({ userName }) => {
  return (
    <div className="flex h-screen">
      <div>
        <VerticalNavbar
          userName={userName ? userName : localStorage.getItem("userName")}
        />
      </div>
      <div className="bg-[#ebf1f1] flex items-center justify-center w-full">
        <h1 className="text-4xl text-[#217aa9]">
          Wellcome {userName ? userName : localStorage.getItem("userName")}
        </h1>
      </div>
    </div>
  );
};

export default Admin;
