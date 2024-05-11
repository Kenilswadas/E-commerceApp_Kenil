import React, { useEffect, useState } from "react";
// import { NavButton } from "../Smallcomponents/NavButton";
// import { Search } from "../Smallcomponents/Searchbar";
// import logo from "../images/logo2.png";
// import { FaUserCircle } from "react-icons/fa";
// import { FaCartShopping } from "react-icons/fa6";
import CategoryNavbar from "../Smallcomponents/CategoryNavbar";
import { PurchaseView } from "../Smallcomponents/CardView";
// import { collection, onSnapshot, query, where } from "@firebase/firestore";
// import { db } from "../FirebaseConfig/Firebaseconfig";
// import { HiOutlineLogout } from "react-icons/hi";
// import { Link } from "react-router-dom";
//useCart
import { useCart } from "react-use-cart";
// import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig/Firebaseconfig";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import NavBar from "../Smallcomponents/NavBar";

function Menpage({ userName, searchInput, setSearchInput, mycollection }) {
  // const [Menscollection, setMenscollection] = useState([]);
  const [mycategory, setMycategory] = useState([]);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { Category } = useParams();
  const catagoryData = [
    "Men's Top Wear",
    "Men's Bottom Wear",
    "Men's Foot Wear",
    "Men's Festive Wear",
  ];
  useEffect(() => {
    if (auth?.currentUser?.email === "admin@gmail.com") {
      navigate("/Admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, auth?.currentUser]);
  useEffect(() => {
    setSearchInput(null);
  }, [Category]);
  // useEffect(() => {
  //   // let categoryField = mycategory ? "BaseCategory" : "SubCategory";
  //   // let categoryValue = mycategory ? mycategory : "Men's Top Wear";
  //   // const alldata = onSnapshot(
  //   //   query(
  //   //     collection(db, "MyProducts"),
  //   //     where(categoryField, "==", categoryValue)
  //   //   ),
  //   //   async (snapshort) => {
  //   //     const data = snapshort.docs.map((doc) => ({
  //   //       id: doc.id,
  //   //       ...doc.data(),
  //   //     }));
  //   //     setMenscollection(data);
  //   //   }
  //   // );
  //   // const alldata = onSnapshot(collection(db, "MyProducts"), (snapshort) => {
  //   //   const data = snapshort.docs.map((doc) => ({
  //   //     id: doc.id,
  //   //     ...doc.data(),
  //   //   }));
  //   //   setMenscollection(data);
  //   // });
  //   // return () => alldata();
  // }, []);
  // console.log(Menscollection);
  //LogOut function
  // const handleLogout = () => {
  //   signOut(auth)
  //     .then(() => {
  //       localStorage.clear();
  //       navigate("/");
  //       toast("Sign-out successful.");
  //     })
  //     .catch((error) => {
  //       toast.error("opps ! error occurs ...");
  //     });
  // };
  return (
    <div className=" bg-[#F7C566]">
      <ToastContainer />
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

export default Menpage;
