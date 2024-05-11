import React, { useState } from "react";
import { Label } from "./Label";
import { InputField } from "./InputField";
import { Button } from "./Buttons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function AdminKey({ setdisplayadminkeyform }) {
  const [AdminKey, setAdminKey] = useState("");
  const [displayadminpage, setdisplayadminpage] = useState(false);
  const navigate = useNavigate();
  const checkAdminKey = () => {
    if (AdminKey === "kenilsoni") {
      setdisplayadminpage(true);
      navigate("/Admin");
    } else {
      toast.error("invalid AdminKey !");
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="p-2 bg-gray-400 flex  flex-col p-5 ">
        <ToastContainer />
        <Label name={"AdminKey"} />
        {/* <input
          type="text"
          placeholder="AdminKey"
          className="rounded-full p-2"
          onChange={(e) => setAdminKey(e.target.value)}
        /> */}
        <InputField
          placeholder={"Please Enter AdminKey"}
          type={"text"}
          setFunction={setAdminKey}
        />
        <div className="flex flex-grid justify-between">
          <Button btnName={"verify"} clickHandler={checkAdminKey} />
          <Button
            btnName={"Cancel"}
            clickHandler={() => setdisplayadminkeyform(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminKey;
