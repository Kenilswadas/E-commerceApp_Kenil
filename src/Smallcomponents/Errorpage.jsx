import React from "react";
import errorpage from "../images/ErrorPage.jpg";
function Errorpage() {
  return (
    <div className="flex items-center justify-center ">
      <img src={errorpage} alt="errorpage" className="h-screen" />
    </div>
  );
}

export default Errorpage;
