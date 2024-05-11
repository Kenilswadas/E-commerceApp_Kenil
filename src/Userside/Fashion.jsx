import React, { useState, useEffect } from "react";
import NavBar from "../Smallcomponents/NavBar";
import logo from "../images/logo2.png";
import simpleimage1 from "../images/Fashion page/simpleimage1.webp";
import { NavButton } from "../Smallcomponents/NavButton";
import { Search } from "../Smallcomponents/Searchbar";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../FirebaseConfig/Firebaseconfig";
import {
  TrendingInFashion,
  TrendingInGrocery,
} from "../Smallcomponents/CardView";
import { HiOutlineLogout } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig/Firebaseconfig";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PurchaseView } from "../Smallcomponents/CardView";
import { useCart } from "react-use-cart";

function Fashion({
  userName,
  totalItems,
  setSearchInput,
  searchInput,
  mycollection,
}) {
  const [Menscollection, setMenscollection] = useState([]);
  const [Womenscollection, setWomenscollection] = useState([]);
  const [Kidscollection, setKidscollection] = useState([]);
  const [beautycollection, setbeautycollection] = useState([]);
  const navigate = useNavigate();
  const [skeleton, setSkeleton] = useState(true);
  const { addItem } = useCart();
  useEffect(() => {
    if (auth?.currentUser?.email === "admin@gmail.com") {
      navigate("/Admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, auth?.currentUser]);
  useEffect(() => {
    setTimeout(() => {
      setSkeleton(false);
    }, 3000);
  }, []);
  console.log(skeleton);
  useEffect(() => {
    // fetch Womenscollection
    const Womendata = mycollection.filter(
      (data) => data.SubCategory === "Women's Top Wear"
    );
    setWomenscollection(Womendata);

    //fetch Menscollection
    const Mendata = mycollection.filter(
      (data) => data.SubCategory === "Men's Top Wear"
    );
    setMenscollection(Mendata);

    //fetch Menscollection
    const Boydata = mycollection.filter(
      (data) => data.SubCategory === "Boy's Clothing"
    );
    setKidscollection(Boydata);
  }, [mycollection]);

  console.log(Womenscollection);
  // onSnapshot(
  //   query(
  //     collection(db, "MyProducts"),
  //     where("SubCategory", "==", "Women's Top Wear")
  //   ),
  //   async (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setWomenscollection(data);
  //   }
  // );
  //fetch Menscollection
  // onSnapshot(
  //   query(
  //     collection(db, "MyProducts"),
  //     where("SubCategory", "==", "Men's Top Wear")
  //   ),
  //   async (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setMenscollection(data);
  //   }
  // );
  //fetch Kidscollection
  // onSnapshot(
  //   query(
  //     collection(db, "MyProducts"),
  //     where("SubCategory", "==", "Boy's Clothing")
  //   ),
  //   async (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setKidscollection(data);
  //   }
  // );
  //fetch beautycollection
  // onSnapshot(
  //   query(
  //     collection(db, "MyProducts"),
  //     where("SubCategory", "==", "Beauty Product")
  //   ),
  //   async (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setbeautycollection(data);
  //   }
  // );
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
    <div className="bg-[#F7C566]">
      {/* <nav className="bg-[#ebf1f1] p-px sticky top-0 shadow-2xl z-50">
        <ul className="flex items-center justify-around">
          <li className="flex">
            <img src={logo} alt="" className="w-auto h-20 p-2" />
          </li>
          <li className="flex items-center w-2/4 ml-8">
            <NavButton buttonName={"Home"} page={"/"} />
            <NavButton buttonName={"Men"} page={"/Fashion/Men"} />
            <NavButton buttonName={"Women"} page={"/Fashion/Women"} />
            <NavButton buttonName={"Kids"} />
            <NavButton buttonName={"Beauty"} />
          </li>
          <Search setSearchInput={setSearchInput} searchInput={searchInput} />
          {auth.currentUser ? (
            <NavButton
              page={"/Home/UsersProfilePage"}
              buttonName={
                userName ? userName : localStorage.getItem("userName")
              }
              FaIons={<FaUserCircle className="mr-1" />}
            />
          ) : (
            <Link
              className="text-[#96200e] flex items-center"
              to={"/SignInPage"}
            >
              <FaUserCircle className="mr-1" />
              Login
            </Link>
          )}
          <NavButton
            buttonName={"LogOut"}
            clickHandler={handleLogout}
            FaIons={<HiOutlineLogout />}
          />
          <NavButton
            page={"/Home/Fashion/Men/Cartpage"}
            buttonName={"Cart"}
            totalItems={totalItems}
            FaIons={<FaCartShopping className="mr-1" />}
          />
        </ul>
      </nav> */}
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
      {/* fashion main div */}
      {searchInput ? (
        <div className="grid grid-cols-4">
          {searchInput.map((e, index) => {
            return (
              <PurchaseView
                key={index}
                image={e.ProductImage}
                name={e.ProductName}
                price={e.ProductPrice}
                discription={e.ProductDescription}
                addItems={addItem}
                e={e}
              />
            );
          })}
        </div>
      ) : (
        <div>
          <div>
            <img src={simpleimage1} alt="" />
          </div>
          {/* Womenscollection */}
          <div className="flex flex-col m-16">
            <p className="flex justify-center item-center bg-[#ebf1f1] pt-4 text-[#217aa9] opacity-100 mb-2 p-4">
              WOMEN'S COLLECTION
            </p>
            <Link className="flex" to={"/Fashion/Women"}>
              {Womenscollection.slice(0, 5).map((item, index) => {
                return (
                  <TrendingInFashion
                    key={index}
                    image={item.ProductImage}
                    name={item.ProductName}
                  />
                );
              })}
            </Link>
          </div>
          {/* Menscollection */}
          <div className="flex flex-col m-16">
            <p className="flex justify-center item-center bg-[#ebf1f1] pt-4 text-[#217aa9] opacity-100 mb-2 p-4">
              MEN'S COLLECTION
            </p>
            <Link className="flex" to={"/Fashion/Men"}>
              {Menscollection.slice(0, 5).map((item, index) => {
                return (
                  <TrendingInFashion
                    key={index}
                    image={item.ProductImage}
                    name={item.ProductName}
                    page={"/Fashion/Men"}
                  />
                );
              })}
            </Link>
          </div>
          {/* Kidscollection */}
          <div className="flex flex-col m-16">
            <p className="flex justify-center item-center bg-[#ebf1f1] pt-4 text-[#217aa9] opacity-100 mb-2 p-4">
              KID'S COLLECTION
            </p>
            <Link className="flex" to={"/Fashion/Kids"}>
              {Kidscollection.map((item, index) => {
                return (
                  <TrendingInFashion
                    key={index}
                    image={item.ProductImage}
                    name={item.ProductName}
                  />
                );
              })}
            </Link>
          </div>
          {/* Beautycollection */}
          <div className="flex flex-col m-16">
            <p className="flex justify-center item-center bg-[#ebf1f1] pt-4 text-[#217aa9] opacity-100 mb-2 p-4">
              KID'S COLLECTION
            </p>
            <Link className="flex">
              {beautycollection.map((item) => {
                return <TrendingInGrocery image={item.ProductImage} />;
              })}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Fashion;
