import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
function DisplayProduct({ productId, setShowProduct, items }) {
  const [data, setData] = useState([]);
  // const { items } = useCart();
  useEffect(() => {
    items
      .filter((data) => data?.Order?.Id === productId)
      .map((e) => {
        return setData(e);
      });
  }, [items, productId]);
  console.log(data);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-cover bg-black bg-opacity-50 z-50  mt-10">
      <div className="flex p-4 w-fit h-fit  bg-[#ebf1f1] mt-4">
        <div className="  flex items-center justify-center">
          <img src={data?.Order?.Image} alt="" className="opacity-100 h-48  " />
        </div>
        <div className="bg-[#ffffff] p-10 w-full">
          <h1 className="text-4xl text-left m-2 mb-4 border-b-4 pb-4">
            {data.ProductName}
          </h1>
          <p className="text-xl text-left m-2">{data?.Order?.Description}</p>
          <div className="flex justify-between">
            <div>
              <p className="text-xl text-left m-2">{data?.Order?.Category}</p>
              <p className="text-xl text-left m-2">
                {data?.Order?.SubCategory}
              </p>
              <p className="text-xl text-left m-2">
                {"Brand : " + data?.Order?.BaseCategory}
              </p>
            </div>
            <div>
              <p className="text-2xl text-left m-2">
                {"Quantity : " + data?.Order?.Quantity}
              </p>
            </div>
          </div>

          <div className="flex items-center mt-5">
            <p className="text-2xl text-left m-2">
              <span>{"Total Price : "}</span>
              {"Rs. " + parseInt(data?.Order?.Price) * 1}
            </p>
          </div>
          <div className="flex items-center justify-end p-2 w-full ">
            <button
              className="bg-[#217aa9] text-[#ebf1f1] pl-5 pr-5 text-2xl p-1 rounded-full"
              onClick={() => {
                setShowProduct(false);
              }}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayProduct;
