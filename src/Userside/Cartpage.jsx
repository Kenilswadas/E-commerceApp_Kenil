import React, { useEffect, useState } from "react";
import NavBar from "../Smallcomponents/NavBar";
// import logo from "../images/logo2.png";
// import { NavButton } from "../Smallcomponents/NavButton";
// import { Search } from "../Smallcomponents/Searchbar";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useCart } from "react-use-cart";
// import { FaUserCircle } from "react-icons/fa";
// import { FaCartShopping } from "react-icons/fa6";
// import { HiOutlineLogout } from "react-icons/hi";
// import { signOut } from "firebase/auth";
import { auth, db } from "../FirebaseConfig/Firebaseconfig";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CiCircleRemove } from "react-icons/ci";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import DisplayProduct from "../Smallcomponents/DisplayProduct";
// import { Link } from "react-router-dom";
import { PurchaseView } from "../Smallcomponents/CardView";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#217aa9",
    color: theme.palette.common.white,
    textAlign: "center",
    alignItems: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    backgroundColor: "#ebf1f1",
    textAlign: "center",
    alignItems: "center",
    padding: 2,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    alignItems: "center",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
    alignItems: "center",
  },
}));

function Cartpage({
  // totalItems,
  userName,
  showProduct,
  setShowProduct,
  setSearchInput,
  searchInput,
}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.currentUser?.email === "admin@gmail.com") {
      navigate("/Admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, auth?.currentUser]);
  const { items, cartTotal, isEmpty } = useCart();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [productId, setProductId] = useState(false);
  const [orders, setOrders] = useState([]);
  const [TotalQuantity, setTotalQuantity] = useState(0);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [TotalDiscount, setTotalDiscount] = useState(0);
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
        console.log(data);
        setOrders(data);
        const totalquantity = data.reduce((accumulator, currentValue) => {
          const quantity = parseInt(currentValue.Order.Quantity);
          console.log(
            `Current value: ${currentValue.Order.Quantity}, parsed quantity: ${quantity}`
          );
          return accumulator + quantity;
        }, 0);
        console.log(totalquantity);
        setTotalQuantity(totalquantity);
        const totalprice = data.reduce(
          (accumulator, currentValue) =>
            accumulator +
            parseInt(
              currentValue.Order.Quantity * parseInt(currentValue.Order.Price)
            ),
          0
        );
        setTotalPrice(totalprice);
        const totaldiscount = data.reduce(
          (accumulator, currentValue) =>
            accumulator + parseInt(currentValue.Order.DiscountedPrice),
          0
        );
        setTotalDiscount(totaldiscount);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.currentUser]);
  //handleCheckout function
  function handleCheckout() {
    if (orders.length === 0) {
      toast.info("Please add the Products.");
    } else if (!auth.currentUser) {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please log in first",
        confirmButtonText: "Login",
        confirmButtonColor: "green",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "red",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/SignInPage");
        } else {
          Swal.close();
        }
      });
    } else {
      navigate("/Cartpage/Checkout/Payment");
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const handleLogout = () => {
  //   signOut(auth)
  //     .then(() => {
  //       localStorage.clear();
  //       navigate("/");
  //       toast("Sign-out successful.");
  //     })
  //     .catch((error) => {
  //       toast.error("Oops! An error occurred.");
  //     });
  // };
  //handleDelete
  function handleDelete(docId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(doc(db, "UserOrders", docId));
        Swal.fire({
          title: "Removed!",
          text: "Your Product has been removed.",
          icon: "success",
        });
      }
    });
  }
  //handleIncrement
  function handleIncrement(document) {
    updateDoc(doc(db, "UserOrders", document.docId), {
      "Order.Quantity": `${parseInt(document?.Order?.Quantity) + 1}`,
    })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //handleDecrement
  function handleDecrement(document) {
    parseInt(document?.Order?.Quantity) !== 1
      ? updateDoc(doc(db, "UserOrders", document.docId), {
          "Order.Quantity": `${parseInt(document?.Order?.Quantity) - 1}`,
        })
          .then((res) => {
            // console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
      : Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove it!",
        }).then((result) => {
          if (result.isConfirmed) {
            deleteDoc(doc(db, "UserOrders", document?.docId));
            Swal.fire({
              title: "Removed!",
              text: "Your file has been removed.",
              icon: "success",
            });
          }
        });
  }
  const ViewProducts = (Order) => {
    setShowProduct(true);
    setProductId(Order.Id);
  };

  return (
    <div className="">
      <ToastContainer />
      {showProduct && (
        <DisplayProduct
          items={orders}
          productId={productId}
          setShowProduct={setShowProduct}
        />
      )}
      {/* <nav className="bg-[#ebf1f1] p-px sticky top-0 shadow-2xl z-50">
        <ul className="flex flex-wrap items-center justify-around">
          <li className="flex">
            <img src={logo} alt="" className=" w-auto h-20 p-2" />
          </li>
          <li className="flex items-center w-full sm:w-2/4 ml-8">
            <NavButton buttonName={"Home"} page={"/"} />
            <NavButton buttonName={"Men"} />
            <NavButton buttonName={"Women"} />
            <NavButton buttonName={"Kids"} />
            <NavButton buttonName={"Beauty"} />
          </li>
          <Search />
          {auth.currentUser ? (
            <NavButton
              page={"/Admin"}
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
                ProductDetail={e}
              />
            );
          })}
        </div>
      ) : (
        <>
          <p className="text-3xl p-2 text-[#217aa9] text-center ">My Orders</p>
          <div className="flex items-top justify-center h-full  p-4">
            <div className="p-0 text-black shadow-2xl">
              <TableContainer sx={{ minWidth: 1000 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>ProductImage</StyledTableCell>
                      <StyledTableCell>ProductName</StyledTableCell>
                      <StyledTableCell>ProductPrice</StyledTableCell>
                      <StyledTableCell>ProductQuantity</StyledTableCell>
                      <StyledTableCell>Remove</StyledTableCell>
                      <StyledTableCell>View</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {orders
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, rowIndex) => (
                        <StyledTableRow key={rowIndex} hover role="checkbox">
                          <StyledTableCell key={`image-${row.Order.Id}`}>
                            <img
                              src={row.Order.Image}
                              alt=""
                              className="w-20 m-auto"
                            />
                          </StyledTableCell>
                          <StyledTableCell key={`name-${row.Order.Id}`}>
                            {row.Order.Name}
                          </StyledTableCell>
                          <StyledTableCell key={`price-${row.Order.Id}`}>
                            {row.Order.Price * row.Order.Quantity}
                          </StyledTableCell>
                          <StyledTableCell
                            key={`quantity-${row.Order.Id}`}
                            className="flex items-center"
                          >
                            <button
                              onClick={() => {
                                handleDecrement(row);
                              }}
                            >
                              <span className=" flex bg-gray-200 p-2 pb-2">
                                <FaMinus />
                              </span>
                            </button>
                            <button>
                              <span className=" flex m-2 p-2 bg-gray-200 font-bold">
                                {row.Order.Quantity}
                              </span>
                            </button>
                            <button onClick={() => handleIncrement(row)}>
                              <span className=" flex bg-gray-200 p-2">
                                <FaPlus />
                              </span>
                            </button>
                          </StyledTableCell>
                          <StyledTableCell key={`remove-${row.id}`}>
                            <button
                              onClick={() => {
                                handleDelete(row.docId);
                              }}
                            >
                              <CiCircleRemove size={20} />
                            </button>
                          </StyledTableCell>
                          <StyledTableCell key={`place-order-${row.id}`}>
                            <button
                              className="bg-[#ffffff] border-2 border-[#96200e] text-[#96200e] rounded-full p-1 "
                              onClick={() => {
                                ViewProducts(row.Order);
                              }}
                            >
                              Quick View
                            </button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 100]}
                component="div"
                count={items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
            <div className="bg-[#ebf1f1] ml-3 shadow-2xl p-4 flex flex-col  w-full">
              <h1 className="text-center text-xl font-bold text-[#ebf1f1] bg-[#217aa9] p-2 m-0">
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
                <span>{`Total Amount`}</span>
                <span className="text-xl">
                  {"Rs. "}
                  {Math.round(TotalPrice - TotalDiscount - TotalPrice * 0.018)}
                </span>
              </p>
              <div className="mt-4 grid ">
                {/* <Link
              to={"/Home/Fashion/Men/Cartpage/Checkout/Payment"}
              className="grid"
            > */}
                <button
                  className="bg-green-500 rounded-xl text-center text-[#ffffff] p-2"
                  onClick={() => {
                    handleCheckout();
                  }}
                >
                  Check Out
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cartpage;
