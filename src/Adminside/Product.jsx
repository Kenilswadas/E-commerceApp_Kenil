import React, { useEffect } from "react";
//table from material ui
import CustomizedTables from "../Smallcomponents/CustomizedTables";
import { VerticalNavbar } from "../Smallcomponents/VerticalNavbar";
import { Button } from "../Smallcomponents/Buttons";
import Addproductform from "../Smallcomponents/Addproductform";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Loader from "../Smallcomponents/Loader";
function Product({ userName, setIsLoading, isLoading }) {
  const [displayform, setDisplayform] = useState(false);
  const [isupdate, setisupdate] = useState(false);
  const [DocId, setDocId] = useState(null);
  const [MyProduct, setMyProduct] = useState(null);

  //addProducts function
  const addProducts = () => {
    if (displayform) {
      setDisplayform(false);
    } else setDisplayform(true);
  };

  return (
    <div className="flex">
      <ToastContainer />
      <VerticalNavbar userName={userName} />
      <div className="flex flex-col items-center justify-center h-auto bg-slate-400 w-full">
        <div className="flex items-center justify-center mb-5">
          <Button
            btnName="Add Product"
            clickHandler={() => {
              addProducts();
            }}
          />
        </div>
        <CustomizedTables
          setDisplayform={setDisplayform}
          displayform={displayform}
          isupdate={isupdate}
          setisupdate={setisupdate}
          setDocId={setDocId}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          setMyProduct={setMyProduct}
        />
      </div>
      {displayform ? (
        <Addproductform
          displayform={displayform}
          setDisplayform={setDisplayform}
          isupdate={isupdate}
          setisupdate={setisupdate}
          DocId={DocId}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          MyProduct={MyProduct}
          setDocId={setDocId}
        />
      ) : null}
    </div>
  );
}

export default Product;
