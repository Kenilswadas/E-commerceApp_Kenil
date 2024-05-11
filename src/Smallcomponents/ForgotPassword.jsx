import React, { useState } from "react";
import PasswordResetForm from "./PasswordResetForm";
const ForgotPassword = ({ setDisplayPasswordResetForm }) => {
  function handlePasswordReset() {
    return setDisplayPasswordResetForm(true);
  }
  return (
    <>
      <button
        className=" flex items-center justify-center  text-[#3C3454] rounded-full mt-4 p-0.5 w-60 "
        onClick={() => {
          handlePasswordReset();
        }}
      >
        &nbsp;&nbsp;{"Forgot Password ?"}
      </button>
    </>
  );
};

export { ForgotPassword };
