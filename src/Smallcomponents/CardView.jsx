import { Link } from "react-router-dom";
// import { Button } from "../Smallcomponents/Buttons";
import { toast } from "react-toastify";
import paymentLogo from "../images/check-mark.png";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../FirebaseConfig/Firebaseconfig";
import { useEffect, useState } from "react";
//BRANDS TO BAG
const BrandsToBag = ({ image1, image2, image3, image4, page }) => {
  return (
    <div className="bg-[#ebf1f1] text-[#96002e] w-3/4 m-1 p-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="grid grid-cols-2 gap-2">
        <img src={image1} alt="" className="object-cover w-full h-full  " />
        <img src={image2} alt="" className="object-cover w-full h-full  " />
        <img src={image3} alt="" className="object-cover w-full h-full  " />
        <img src={image4} alt="" className="object-cover w-full h-full  " />
      </div>
      <div className="p-4">
        <Link
          to={page}
          className="block bg-[#96002e] text-white py-2 px-4 rounded-md text-center hover:bg-opacity-80 transition-all duration-300"
        >
          Explore More
        </Link>
      </div>
    </div>
  );
};
//TREANDING IN FASHION
const MobileView = ({ image1, image2, image3, image4, page }) => {
  return (
    <div className="bg-[#ffffff] w-3/4  text-[#96002e] shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 m-2">
      <div className="flex p-4">
        <img
          src={image1}
          alt=""
          className="object-cover flex items-center justify-center h-auto"
        />
        {/* <img src={image2} alt="" className="object-cover w-1/2 h-fit" /> */}
      </div>
      <div className="p-4">
        <Link
          to={page}
          className="block bg-[#96002e] text-white py-2 px-4 rounded-md text-center hover:bg-opacity-80 transition-all duration-300"
        >
          Explore More
        </Link>
      </div>
    </div>
  );
};
const TrendingInFashion = ({ image, name, page }) => {
  return (
    <div className=" w-5/6 m-1 p-1 bg-[#96002e]  mb-8 hover:shadow-xl hover:-translate-y-2">
      <p className="flex w-fit items-center justify-center">
        <img src={image} alt="" className="w-full " />
      </p>
      <p className="flex flex-col items-center bg-[#ebf1f1] border-0 border-[#ebf1f1] mt-0 h-20 justify-center ">
        {name}
        <Link className="underline text-[#96002e]" to={page}>
          {"Explore More"}
        </Link>
      </p>
      <p className="ml-1 text-[#ebf1f1]"></p>
    </div>
  );
};
const TrendingInGrocery = ({ image1, image2, image3, image4, page }) => {
  return (
    <div className="bg-[#ffffff] text-[#96002e] w-3/4 m-1 p-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="grid grid-cols-2 gap-2">
        <img src={image1} alt="" className="object-cover w-full h-full  " />
        <img src={image2} alt="" className="object-cover w-full h-full  " />
        {/* <img src={image3} alt="" className="object-cover w-full h-full  " />
        <img src={image4} alt="" className="object-cover w-full h-full  " /> */}
      </div>
      <div className="p-4">
        <Link
          to={page}
          className="block bg-[#96002e] text-white py-2 px-4 rounded-md text-center hover:bg-opacity-80 transition-all duration-300"
        >
          Explore More
        </Link>
      </div>
    </div>
  );
};
const TrendingInAppliances = ({ image1, page }) => {
  return (
    <div className="bg-[#ffffff]  text-center text-[#96002e] w-full items-center m-1 p-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="">
        <img src={image1} alt="" className=" w-auto h-48  " />
      </div>
      <div className="block p-4">
        <Link
          to={page}
          className="block bg-[#96002e] text-white py-2 px-4 rounded-md text-center hover:bg-opacity-80 transition-all duration-300"
        >
          Explore More
        </Link>
      </div>
    </div>
  );
};
const PurchaseView = ({
  image,
  name,
  discription,
  page,
  price,
  addItems,
  ProductDetail,
}) => {
  const [orders, setorders] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "UserOrders"),
        where(
          "User_UID",
          "==",
          auth?.currentUser?.uid ? auth?.currentUser?.uid : ""
        )
      ),
      (snap) => {
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setorders(data);
      }
    );
  }, []);

  function clickHandler() {
    addtoCart();
  }
  function addtoCart() {
    addDoc(collection(db, "UserOrders"), {
      User_UID: `${auth?.currentUser?.uid ? auth?.currentUser?.uid : ""}`,
      UserName: `${
        auth?.currentUser?.displayName ? auth?.currentUser?.displayName : ""
      }`,
      Order: {
        Id: `${ProductDetail?.id}`,
        Image: `${ProductDetail?.ProductImage}`,
        Name: `${ProductDetail?.ProductName}`,
        Description: `${
          ProductDetail?.ProductDescription
            ? ProductDetail?.ProductDescription
            : ""
        }`,
        Price: `${
          ProductDetail?.ProductPrice ? ProductDetail?.ProductPrice : ""
        }`,
        DiscountedPrice: `${
          ProductDetail?.DiscountedPrice ? ProductDetail?.DiscountedPrice : ""
        }`,
        Category: `${ProductDetail?.Category ? ProductDetail?.Category : ""}`,
        SubCategory: `${
          ProductDetail?.SubCategory ? ProductDetail?.SubCategory : ""
        }`,
        BaseCategory: `${
          ProductDetail?.BaseCategory ? ProductDetail?.BaseCategory : ""
        }`,
        Quantity: 1,
      },
    });
    toast.success("Product is added to Cart !");
  }
  return (
    <div className=" w-11/12 h-fit bg-[#ffffff] m-4 p-4 border-2 border-[#96002e] mb-8 hover:shadow-xl hover:-translate-y-2 rounded-3xl">
      <div className="flex w-full h-fit items-center justify-center">
        <img src={image} alt="" className="rounded-xl  w-fit" />
      </div>
      <div className="border-t-2 mt-2 border-[#96002e]">
        <p className="font-bold text-[#217aa9]"> {name}</p>
        <p className="hover:object h-32">{discription}</p>
        <div className="flex items-center  justify-between ">
          <p className="font-bold text-4xl text-[#217aa9]">
            {"Rs."}
            {price}
          </p>
          <button
            className="p-1 rounded-full border-2 border-[#96200e] hover:text-[#ffffff] hover:bg-[#96200e]"
            onClick={() => {
              clickHandler();
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
const CompletedProductView = ({
  image,
  name,
  discription,
  price,
  completedOrderCollection,
}) => {
  return (
    <div className=" w-12/12  bg-[#ffffff] m-4 p-4 border-2 border-[#96002e] mb-8 hover:shadow-xl hover:-translate-y-2 rounded-3xl">
      <div className="flex h-48">
        <img src={image} alt="" className="rounded-xl h-auto" />
        <div className="border-l-2 m-2 border-[#96002e] w-full">
          <p className="font-bold text-[#217aa9] ml-4"> {name}</p>
          <p className="hover:object ml-4">{discription}</p>
          <div className="flex items-center justify-around h-full  ml-4 w-full ">
            <p className="font-bold text-4xl text-[#217aa9]">
              {"Rs."}
              {price}
            </p>
            <p className="flex items-center justify-between font-bold  text-green-800">
              {"Payment Status : " +
                completedOrderCollection.map((e) => e.Status)}
              <img src={paymentLogo} alt="paymentLogo" className="h-8" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export {
  BrandsToBag,
  TrendingInFashion,
  TrendingInGrocery,
  PurchaseView,
  CompletedProductView,
  MobileView,
  TrendingInAppliances,
};
