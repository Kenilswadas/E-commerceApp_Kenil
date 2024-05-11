import React, { useEffect, useState } from "react";
import { NavButton } from "../Smallcomponents/NavButton";
import logo from "../images/logo2.png";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "react-use-cart";
import { Search } from "../Smallcomponents/Searchbar";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import NavBar from "../Smallcomponents/NavBar";
// import { Link } from "react-router-dom";
import PaymentForm from "../Smallcomponents/PaymentForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { auth } from "../FirebaseConfig/Firebaseconfig";
import {
  onSnapshot,
  collection,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../FirebaseConfig/Firebaseconfig";
function Payment({ userName, setSearchInput, searchInput }) {
  const navigate = useNavigate();
  // const { totalItems, cartTotal, emptyCart } = useCart();
  // const [FinalPrice, setFinalPrice] = useState(0);
  const [DisplayPaymentForm, setDisplayPaymentForm] = useState(false);
  useEffect(() => {
    if (auth?.currentUser?.email === "admin@gmail.com") {
      navigate("/Admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, auth?.currentUser]);
  const [orders, setOrders] = useState([]);
  const [TotalQuantity, setTotalQuantity] = useState(0);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [TotalDiscount, setTotalDiscount] = useState(0);
  const [FinalPrice, setFinalPrice] = useState(0);
  const [completedOrderCollection, setcompletedOrderCollection] = useState([]);
  const [completedOrderIds, setcompletedOrderIds] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "UserOrders"),
        where(
          "User_UID",
          "==",
          `${auth?.currentUser?.uid ? auth?.currentUser?.uid : ""}`
        )
      ),
      (snap) => {
        const data = snap.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));
        setOrders(data);
        const totalquantity = data.reduce(
          (accumulator, currentValue) =>
            accumulator + parseInt(currentValue.Order.Quantity),
          0
        );
        setTotalQuantity(totalquantity);
        const totalprice = data.reduce(
          (accumulator, currentValue) =>
            accumulator +
            parseInt(currentValue.Order.Quantity * currentValue.Order.Price),
          0
        );
        setTotalPrice(totalprice);
        const totaldiscount = data.reduce(
          (accumulator, currentValue) =>
            accumulator + parseInt(currentValue.Order.DiscountedPrice),
          0
        );
        setTotalDiscount(totaldiscount);
        setFinalPrice(
          Math.round(totalprice - totaldiscount - totalprice * 0.018)
        );
      }
    );
  }, []);
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "UserCompletedOrder"),
        where(
          "User_UID",
          "==",
          auth?.currentUser?.uid ? auth?.currentUser?.uid : ""
        )
      ),
      (snap) => {
        const data = snap.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));
        setcompletedOrderCollection(data);
        const completed_ids = data.filter((data) => data?.OrderId);
        setcompletedOrderIds(completed_ids);
      }
    );
  }, []);
  // console.log(orders);
  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/SignInPage");
    }
  }, [navigate]);
  function handleCashPayment() {
    setDisplayPaymentForm(false);
    Swal.fire({
      title: "Please , Enter the Amount",
      text: `Amout That You have To Pay is ${Math.round(
        TotalPrice - TotalDiscount - TotalPrice * 0.018
      )}`,
      input: "number",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Pay`,
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(FinalPrice);
        if (result.isConfirmed && result.value === `${FinalPrice}`) {
          Swal.fire({
            titleText: `Thank You For Payment of ${FinalPrice}`,
            text: "Have A Good Day.",
            icon: "success",
          }).then(() => {
            // emptyCart();
            // console.log(`${orders.map((e) => e?.Order?.Id)}`);
            if (completedOrderCollection.length > 0) {
              const orderIds = orders.map((e) => {
                return e?.Order?.Id;
              });
              console.log(orderIds);
              orderIds.map(async (E) => {
                console.log(E);
                return updateDoc(
                  doc(
                    db,
                    "UserCompletedOrder",
                    `${completedOrderCollection.map((e) => e?.docId)}`
                  ),
                  {
                    OrderId: arrayUnion(`${E}`),
                  }
                )
                  .then((res) => {
                    console.log("updateDoc", res);
                    // orders.map((e) => {
                    //   return deleteDoc(doc(db, "UserOrders", `${e?.docId}`));
                    // });
                  })
                  .catch((err) => {
                    console.log("err in updateDoc", err);
                  });
              });
            } else {
              console.log("addDoc");
              addDoc(collection(db, "UserCompletedOrder"), {
                User_UID: auth?.currentUser?.uid,
                UserName: auth?.currentUser?.displayName,
                OrderId: orders.map((e) => e?.Order?.Id),
                Status: "Completed",
              })
                .then((res) => {
                  console.log("res" + res);
                  orders.map((e) => {
                    return deleteDoc(doc(db, "UserOrders", `${e?.docId}`));
                  });
                })
                .catch((err) => {
                  console.log("err" + err);
                });
          }

            // navigate("/");
          });
        } else {
          Swal.fire({
            text: "Entered Amount is not match with Final Price ",
          });
        }
      } else if (result.isDenied) {
        Swal.close();
      }
    });
  }
  function handleCardPayment() {
    setDisplayPaymentForm(true);
  }
  return (
    <div>
      {/* <nav className="bg-[#ebf1f1] p-px sticky top-0 shadow-2xl z-50">
        <ul className="flex flex-wrap items-center justify-around">
          <li className="flex">
            <img src={logo} alt="" className=" w-auto h-20 p-2" />
          </li>
          <li className="flex items-center w-full sm:w-2/4 ml-8">
            <NavButton buttonName={"Home"} page={"/Home"} />
            <NavButton buttonName={"Men"} />
            <NavButton buttonName={"Women"} />
            <NavButton buttonName={"Kids"} />
            <NavButton buttonName={"Beauty"} />
          </li>
          <Search />
          <NavButton
            page={"/Admin"}
            buttonName={userName ? userName : localStorage.getItem("userName")}
            FaIons={<FaUserCircle className="mr-1" />}
          />
          <NavButton
            page={"/Home/Fashion/Men/Cartpage"}
            buttonName={"Cart"}
            FaIons={<FaCartShopping className="" />}
            totalItems={totalItems}
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
      <div className="flex">
        <div className=" h-screen w-3/4 bg-[#ffffff] ">
          <div className="flex  justify-center mt-10 mb-2 h-fit gap-6">
            <button
              className="relative "
              onClick={() => {
                handleCashPayment();
              }}
            >
              <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-cyan-200"></span>
              <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-10 py-2 text-base font-bold text-[#96200e] transition duration-100  hover:bg-[#ebf1f1] dark:bg-transparent">
                {"Cash On Delivery"}
              </span>
            </button>
            <button
              className="relative"
              onClick={() => {
                handleCardPayment();
              }}
            >
              <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-cyan-200	"></span>
              <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-10 py-2 text-base font-bold text-[#96200e] transition duration-100  hover:bg-[#ebf1f1] dark:bg-transparent">
                {" Credit Card"}
              </span>
            </button>
          </div>
          <div>
            {DisplayPaymentForm ? (
              <PaymentForm
                setDisplayPaymentForm={setDisplayPaymentForm}
                FinalPrice={Math.round(
                  TotalPrice - TotalDiscount - TotalPrice * 0.018
                )}
              />
            ) : null}
          </div>
        </div>
        <div className="bg-[#ebf1f1] ml-3 shadow-2xl  p-4 flex flex-col flex-end w-96">
          <h1 className="text-center text-xl font-bold text-[#ebf1f1] bg-[#217aa9] p-2 ">
            {"Order summary"}
          </h1>
          <div className="p-2 mt-5 ]">
            <p className="flex justify-between">
              <span>{`Items (${TotalQuantity} items)`}</span>
              <span>
                {"Rs. "}
                {TotalPrice}
              </span>
            </p>
            <p className="flex justify-between mt-2">
              <span>{`Discount`}</span>
              <span className="text-green-500">
                {"Rs. "}
                {0 - TotalDiscount}
              </span>
            </p>
            <p className="flex justify-between mt-2">
              <span>{`Tax estimate`}</span>
              <span className="text-green-500">
                {"Rs. "}
                {Math.round(0 - TotalPrice * 0.018)}
              </span>
            </p>
            <p className="flex justify-between mt-2">
              <span>{`Delivery Charges`}</span>
              <span>
                <strike>
                  <span>{"Rs. "}</span>
                </strike>
                <span className="text-green-500">{"Free"}</span>
              </span>
            </p>
          </div>
          <hr />
          <p className="flex justify-between mt-2">
            <span className="text-xl font-bold">{`Final Price -- `}</span>
            <span className="text-xl">
              {"Rs. "}
              {Math.round(TotalPrice - TotalDiscount - TotalPrice * 0.018)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Payment;
