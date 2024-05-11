import React from "react";
const BgImage = ({backgroundImage}) => {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center blur-xl"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    ></div>
  );
};
export { BgImage };
