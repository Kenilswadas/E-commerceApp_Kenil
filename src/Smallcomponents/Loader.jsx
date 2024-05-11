import React from "react";
import { ColorRing } from "react-loader-spinner";
function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <ColorRing
        visible={true}
        height="100px"
        width="100px"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
      ;
    </div>
  );
}

export default Loader;
