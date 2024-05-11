import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "../Smallcomponents/NavBar";
import CategoryNavbar from "../Smallcomponents/CategoryNavbar";
import { PurchaseView } from "../Smallcomponents/CardView";
import { useCart } from "react-use-cart";
import { useNavigate } from "react-router-dom";
import { auth } from "../FirebaseConfig/Firebaseconfig";
function Kidspage({
  userName,
  //   totalItems,
  searchInput,
  setSearchInput,
  mycollection,
}) {
  const [mycategory, setMycategory] = useState([]);
  const catagoryData = ["Boy's Clothing", "Girl's Clothing"];
  const { addItem } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.currentUser?.email === "admin@gmail.com") {
      navigate("/Admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, auth?.currentUser]);
  return (
    <div className=" bg-[#F7C566]">
      <ToastContainer position="top-center" />
      <NavBar
        btn1name={"Home"}
        page1={"/"}
        btn2name={"Men"}
        page2={"/Fashion/Men"}
        btn3name={"Women"}
        page3={"/Fashion/Women"}
        btn4name={"Kids"}
        page4={"/Fashion/Kids"}
        btn5name={"Beauty"}
        page5={"/Fashion/Beauty"}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        userName={userName}
      />
      <div className="flex">
        <CategoryNavbar
          setMycategory={setMycategory}
          catagoryData={catagoryData}
          mycategory={mycategory}
        />
        <div className="w-full h-fit grid grid-cols-4">
          {/* {console.log(searchInput)} */}
          {searchInput !== null ? (
            searchInput.map((e, index) => {
              return (
                <div>
                  <PurchaseView
                    key={index}
                    image={e.ProductImage}
                    name={e.ProductName}
                    price={e.ProductPrice}
                    discription={e.ProductDescription}
                    ProductDetail={e}
                  />
                </div>
              );
            })
          ) : mycollection ? (
            mycollection
              .filter((data) =>
                (mycategory.length === 0 ? catagoryData : mycategory).includes(
                  data.SubCategory
                )
              )
              .map((e, index) => {
                return (
                  <div>
                    <PurchaseView
                      key={index}
                      image={e.ProductImage}
                      name={e.ProductName}
                      price={e.ProductPrice}
                      discription={e.ProductDescription}
                      ProductDetail={e}
                    />
                  </div>
                );
              })
          ) : (
            <p>loading</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Kidspage;
