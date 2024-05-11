import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "../Smallcomponents/NavBar";
import CategoryNavbar from "../Smallcomponents/CategoryNavbar";
import { PurchaseView } from "../Smallcomponents/CardView";
import { auth } from "../FirebaseConfig/Firebaseconfig";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";

function Mobilepage({ searchInput, setSearchInput, userName, mycollection }) {
  const navigate = useNavigate();
  const { addItem } = useCart();

  useEffect(() => {
    if (auth?.currentUser?.email === "admin@gmail.com") {
      navigate("/Admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, auth?.currentUser]);
  const [mycategory, setMycategory] = useState([]);
  const catagoryData = ["Apple", "Redmi", "Samsung", "OnePlus"];
  return (
    <div className=" bg-[#F7C566]">
      <ToastContainer />
      <NavBar
        btn1name={"Home"}
        page1={"/"}
        btn2name={"Grocery"}
        page2={"/Grocery"}
        btn3name={"Fashion"}
        page3={"/Fashion"}
        btn4name={"Appliances"}
        page4={"/Appliances"}
        btn5name={"Travel"}
        page5={"/Travel"}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        userName={userName}
      />
      <div className="flex">
        <CategoryNavbar
          setMycategory={setMycategory}
          mycategory={mycategory}
          catagoryData={catagoryData}
        />
        <div className="w-full  h-fit grid grid-cols-4">
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

export default Mobilepage;
