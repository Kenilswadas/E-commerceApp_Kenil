import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "../Smallcomponents/NavBar";
import CategoryNavbar from "../Smallcomponents/CategoryNavbar";
import { PurchaseView } from "../Smallcomponents/CardView";
import { useCart } from "react-use-cart";
import { useNavigate } from "react-router-dom";
import { auth } from "../FirebaseConfig/Firebaseconfig";
function Beautypage({
  userName,
  //   totalItems,
  searchInput,
  setSearchInput,
  mycollection,
}) {
  const [mycategory, setMycategory] = useState([]);
  const catagoryData = ["Lakme", "Nivea"];
  const { addItem } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.currentUser?.email === "admin@gmail.com") {
      navigate("/Admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, auth?.currentUser]);
  return (
    <div>
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
                    addItems={addItem}
                    ProductDetail={e}
                  />
                </div>
              );
            })
          ) : mycollection ? (
            mycollection
              .filter((data) =>
                (mycategory.length === 0 ? catagoryData : mycategory).includes(
                  data.BaseCategory
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
                      addItems={addItem}
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

export default Beautypage;
