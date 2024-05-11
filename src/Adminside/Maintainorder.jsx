import React, { useEffect, useState } from "react";
import { VerticalNavbar } from "../Smallcomponents/VerticalNavbar";
// import axios from "axios";
import { useCart } from "react-use-cart";
function Maintainorder({ userName }) {
  // const [items, setItems] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("https://nodejs-products-api.onrender.com/api/products")
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const { items } = useCart();

  return (
    <div className="flex bg-gray-200">
      <div>
        <VerticalNavbar userName={userName} />
      </div>
      <div className="flex items-center justify-center bg-red-200 h-screen w-full">
        <div className=" flex bg-gray-200 w-1/2 h-3/4">
          <div className="bg-red-100 w-1/2 h-3/4">
            <img src={items[0].ProductImage} alt="" className="h-full" />
          </div>
          <div className="bg-green-100 w-1/2 h-full">
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maintainorder;
