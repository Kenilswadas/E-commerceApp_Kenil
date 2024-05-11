import { React, useEffect, useState } from "react";
import NavBar from "../Smallcomponents/NavBar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo2.png";
import { Search } from "../Smallcomponents/Searchbar";
import { NavButton } from "../Smallcomponents/NavButton";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Carouselimage01 from "../images/Carouselimages/Carouselimage01.jpg";
import Carouselimage02 from "../images/Carouselimages/Carouselimage02.webp";
import Carouselimage03 from "../images/Carouselimages/Carouselimage03.webp";
import Carouselimage04 from "../images/Carouselimages/Carouselimage04.webp";
import Carouselimage05 from "../images/Carouselimages/Carouselimage05.webp";
import Carouselimage06 from "../images/Carouselimages/Carouselimage08.jpg";
import Carouselimage07 from "../images/Carouselimages/Carouselimage09.webp";

import { auth, db } from "../FirebaseConfig/Firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { HiOutlineLogout } from "react-icons/hi";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  BrandsToBag,
  MobileView,
  TrendingInAppliances,
  TrendingInGrocery,
} from "../Smallcomponents/CardView";

import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../FirebaseConfig/Firebaseconfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
//Travel image
import TravelImage from "../images/TravelSectionImage.png";
import { PurchaseView } from "../Smallcomponents/CardView";
import { useCart } from "react-use-cart";
function Home({
  userName,
  // totalItems,
  mycollection,
  setSearchInput,
  searchInput,
}) {
  const [Menscollection, setMenscollection] = useState([]);
  const [Womenscollection, setWomenscollection] = useState([]);
  const [GroceryCollection, setGroceryCollection] = useState([]);
  const [BoysCollection, setBoysCollection] = useState([]);
  const [GirlsCollection, setGirlsCollection] = useState([]);
  const [AppleCollection, setAppleCollection] = useState([]);
  const [RedmiCollection, setRedmiCollection] = useState([]);
  const [OneplusCollection, setOneplusCollection] = useState([]);
  const [SamsungCollection, setSamsungCollection] = useState([]);
  const [FruitsCollection, setFruitesCollection] = useState([]);
  const [VegetablesCollection, setVegetablesCollection] = useState([]);
  const [DairyCollection, setDairyCollection] = useState([]);
  const [RefrigeratorsCollection, setRefrigeratorsCollection] = useState([]);
  const [AcCollection, setAcCollection] = useState([]);
  const [WashingmachineCollection, setWasingMachineCollection] = useState([]);
  const [url, setUrl] = useState([]);
  const { addItem } = useCart();
  const items = [
    <img src={Carouselimage01} alt="" className="w-full h-96  " />,
    <img src={Carouselimage02} alt="" className="w-full h-96  " />,
    <img src={Carouselimage07} alt="" className="w-full h-96  " />,
    <img src={Carouselimage03} alt="" className="w-full h-96  " />,
    <img src={Carouselimage04} alt="" className="w-full h-96  " />,
    <img src={Carouselimage05} alt="" className="w-full h-96  " />,
    <img src={Carouselimage06} alt="" className="w-full h-96  " />,
  ];

  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.currentUser?.email === "admin@gmail.com") {
      navigate("/Admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, auth?.currentUser]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // console.log(user);
        navigate("/");
      }
    });
    //Men Top Wear
    const Mensdata = mycollection.filter(
      (data) => data.SubCategory === "Men's Top Wear"
    );
    setMenscollection(Mensdata);
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

    //Women Top Wear
    const Womensdata = mycollection.filter(
      (data) => data.SubCategory === "Women's Top Wear"
    );
    setWomenscollection(Womensdata);
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
    //Kids Top Wear
    const Boysdata = mycollection.filter(
      (data) => data.SubCategory === "Boy's Clothing"
    );
    setBoysCollection(Boysdata);
    const Girlsdata = mycollection.filter(
      (data) => data.SubCategory === "Girl's Clothing"
    );
    console.log(Girlsdata);
    setGirlsCollection(Girlsdata);

    //Mobiles
    const Appledata = mycollection.filter(
      (data) => data.SubCategory === "Apple"
    );
    setAppleCollection(Appledata);
    const Redmidata = mycollection.filter(
      (data) => data.SubCategory === "Redmi"
    );
    setRedmiCollection(Redmidata);
    const oneplusdata = mycollection.filter(
      (data) => data.SubCategory === "OnePlus"
    );
    setOneplusCollection(oneplusdata);
    const samsungdata = mycollection.filter(
      (data) => data.SubCategory === "Samsung"
    );
    setSamsungCollection(samsungdata);

    //Grocery collection
    const Fruitsdata = mycollection.filter(
      (data) => data.SubCategory === "Fruits"
    );
    setFruitesCollection(Fruitsdata);
    const Vegetablesdata = mycollection.filter(
      (data) => data.SubCategory === "Vegetables"
    );
    setVegetablesCollection(Vegetablesdata);
    const Dairydata = mycollection.filter(
      (data) => data.SubCategory === "Dairy Product"
    );
    setDairyCollection(Dairydata);

    //Appliances
    const Refrigerators = mycollection.filter(
      (data) => data.SubCategory === "Refrigerators"
    );
    setRefrigeratorsCollection(Refrigerators);
    const Ac = mycollection.filter(
      (data) => data.SubCategory === "Air Conditioners"
    );
    setAcCollection(Ac);
    const Washingmachine = mycollection.filter(
      (data) => data.SubCategory === "Washing Machines"
    );
    setWasingMachineCollection(Washingmachine);

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
    //     setKidsCollection(data);
    //   }
    // );
    //Grocery collection
    // onSnapshot(
    //   query(collection(db, "MyProducts"), where("Category", "==", "Grocery")),
    //   async (snapshot) => {
    //     const data = snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     setGroceryCollection(data);
    //   }
    // );
  }, [mycollection, navigate]);

  return (
    <div className=" bg-[#F7C566] m-0 h-full">
      <ToastContainer position="top-center" />
      <NavBar
        btn1name={"Grocery"}
        page1={"/Grocery"}
        btn2name={"Appliances"}
        page2={"/Appliances"}
        btn3name={"Fashion"}
        page3={"/Fashion"}
        btn4name={"Mobile"}
        page4={"/Mobile"}
        btn5name={"Travel"}
        page5={"/Travel"}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        userName={userName}
      />
      {console.log(searchInput)}
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
                ProductDetail={e}
              />
            );
          })}
        </div>
      ) : (
        <div className="">
          {/* image Carousel */}
          <div className="m-5">
            <AliceCarousel
              items={items}
              keyboardNavigation={true}
              autoPlay={AliceCarousel}
              autoPlayInterval={2000}
            />
          </div>
          {/* BMEDEL WORTHY BRANDS TO BAG */}
          <div className=" h-full m-16 ">
            <p className="flex justify-center item-center bg-[#ebf1f1] pt-4 text-[#217aa9] opacity-100 mb-2 p-4 ">
              TREANDING IN FASHION{" "}
            </p>

            <div className="flex m-16 mt-0 items-center justify-between w-fit bg-[#F7C566]">
              {Womenscollection.length > 0 ? (
                <BrandsToBag
                  image1={Womenscollection[0].ProductImage}
                  image2={Womenscollection[1].ProductImage}
                  image3={Womenscollection[2].ProductImage}
                  image4={Womenscollection[3].ProductImage}
                  page={"/Fashion/Women"}
                />
              ) : null}
              {Menscollection.length > 0 ? (
                <BrandsToBag
                  image1={Menscollection[0].ProductImage}
                  image2={Menscollection[1].ProductImage}
                  image3={Menscollection[2].ProductImage}
                  image4={Menscollection[3].ProductImage}
                  page={"/Fashion/Men"}
                />
              ) : null}
              {BoysCollection.length > 0 ? (
                <BrandsToBag
                  image1={BoysCollection[0].ProductImage}
                  image2={BoysCollection[1].ProductImage}
                  image3={BoysCollection[2].ProductImage}
                  image4={BoysCollection[3].ProductImage}
                  page={"/Fashion/Kids"}
                />
              ) : null}
              {GirlsCollection.length > 0 ? (
                <BrandsToBag
                  image1={GirlsCollection[0].ProductImage}
                  image2={GirlsCollection[1].ProductImage}
                  image3={GirlsCollection[2].ProductImage}
                  image4={GirlsCollection[3].ProductImage}
                  page={"/Fashion/Kids"}
                />
              ) : null}
            </div>
          </div>
          {/* TREANDING IN FASHION WOMEN'S COLLECTION  */}
          <div className=" m-16">
            <p className="flex justify-center item-center bg-[#ebf1f1] pt-4 text-[#217aa9] opacity-100 mb-2 p-4">
              MOBILE'S COLLECTION
            </p>
            <div className="flex m-6 mt-0 items-center justify-between">
              {AppleCollection.length > 0 ? (
                <MobileView
                  image1={AppleCollection[0].ProductImage}
                  image2={AppleCollection[1].ProductImage}
                  page={"/Mobile"}
                />
              ) : null}
              {RedmiCollection.length > 0 ? (
                <MobileView
                  image1={RedmiCollection[0].ProductImage}
                  image2={RedmiCollection[1].ProductImage}
                  page={"/Mobile"}
                />
              ) : null}
              {OneplusCollection.length > 0 ? (
                <MobileView
                  image1={OneplusCollection[0].ProductImage}
                  image2={OneplusCollection[1].ProductImage}
                  page={"/Mobile"}
                />
              ) : null}
              {SamsungCollection.length > 0 ? (
                <MobileView
                  image1={SamsungCollection[0].ProductImage}
                  image2={SamsungCollection[1].ProductImage}
                  page={"/Mobile"}
                />
              ) : null}
            </div>
          </div>{" "}
          <div className=" m-16">
            <p className="flex justify-center item-center bg-[#ebf1f1] pt-4 text-[#217aa9] opacity-100 mb-2 p-4">
              GROCERY COLLECTION
            </p>
            <div className="flex m-6 mt-0 items-center justify-between">
              {FruitsCollection.length > 0 ? (
                <TrendingInGrocery
                  image1={FruitsCollection[0].ProductImage}
                  image2={FruitsCollection[1].ProductImage}
                  page={"/Grocery"}
                />
              ) : null}
              {VegetablesCollection.length > 0 ? (
                <TrendingInGrocery
                  image1={VegetablesCollection[0].ProductImage}
                  image2={VegetablesCollection[1].ProductImage}
                  page={"/Grocery"}
                />
              ) : null}
              {DairyCollection.length > 0 ? (
                <TrendingInGrocery
                  image1={DairyCollection[0].ProductImage}
                  image2={DairyCollection[1].ProductImage}
                  page={"/Grocery"}
                />
              ) : null}
            </div>
          </div>
          {/* TRENDING IN GROCERY */}
          <div className=" h-full m-16">
            <p className="flex justify-center item-center bg-[#ebf1f1] pt-4 text-[#217aa9] opacity-100 mb-2 p-4  ">
              {"APPLIANCES"}
            </p>
            <div className="flex mr-6 ml-6 mt-0 items-center justify-between">
              {RefrigeratorsCollection.length > 0 ? (
                <TrendingInAppliances
                  image1={RefrigeratorsCollection[0].ProductImage}
                  image2={RefrigeratorsCollection[1].ProductImage}
                  page={"/Appliances"}
                />
              ) : null}
              {WashingmachineCollection.length > 0 ? (
                <TrendingInAppliances
                  image1={WashingmachineCollection[0].ProductImage}
                  image2={WashingmachineCollection[1].ProductImage}
                  page={"/Appliances"}
                />
              ) : null}
              {AcCollection.length > 0 ? (
                <TrendingInAppliances
                  image1={AcCollection[0].ProductImage}
                  image2={AcCollection[1].ProductImage}
                  page={"/Appliances"}
                />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
