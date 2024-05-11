import "./App.css";
import SignInpage from "./SignUp/SignInpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUppage from "./SignUp/SignUppage";
import Home from "./Userside/Home";
import Admin from "./Adminside/Admin";
import Items from "./Adminside/Items";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig/Firebaseconfig";
import { useEffect, useState } from "react";
import Fashion from "./Userside/Fashion";
import Cartpage from "./Userside/Cartpage";
import { useCart } from "react-use-cart";
import CategoryPage from "./Userside/CategoryPage";
import Maintainorder from "./Adminside/Maintainorder";
import Product from "./Adminside/Product";
import Payment from "./Userside/Payment";
import Errorpage from "./Smallcomponents/Errorpage";
import UsersProfilePage from "./Userside/UsersProfilePage";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "./FirebaseConfig/Firebaseconfig";
import Mobilepage from "./Userside/Mobilepage";
import Grocerypage from "./Userside/Grocerypage";
import Appliancespage from "./Userside/Appliancespage";
function App() {
  const [logintimecart, setLogintimecart] = useState([]);
  const [userName, setUserName] = useState(null);
  const { totalItems } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [displayPasswordResetFrom, setDisplayPasswordResetForm] =
    useState(false);
  const [searchInput, setSearchInput] = useState(null);
  //fetch products
  const [mycollection, setMycollection] = useState([]);
  const [userDetails, setuserDetails] = useState([]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName(null);
      }
    });
  }, []);
  useEffect(() => {
    onSnapshot(collection(db, "MyProducts"), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(data);
      setMycollection(data);
    });
  }, []);
  useEffect(() => {
    onSnapshot(collection(db, "userDetails"), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(data);
      setuserDetails(data);
    });
  }, []);
  useEffect(() => {
    onSnapshot(collection(db, "UserOrders"), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLogintimecart(data);
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/SignUppage"
            element={
              <SignUppage
                userDetails={userDetails}
                userName={userName}
                displayPasswordResetFrom={displayPasswordResetFrom}
                setDisplayPasswordResetForm={setDisplayPasswordResetForm}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/SignInpage"
            element={
              <SignInpage
                logintimecart={logintimecart}
                userDetails={userDetails}
                userName={userName}
                displayPasswordResetFrom={displayPasswordResetFrom}
                setDisplayPasswordResetForm={setDisplayPasswordResetForm}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/"
            element={
              <Home
                mycollection={mycollection}
                userName={userName}
                totalItems={totalItems}
                setSearchInput={setSearchInput}
                searchInput={searchInput}
              />
            }
          />
          <Route
            path="/Fashion"
            element={
              <Fashion
                mycollection={mycollection}
                userName={userName}
                totalItems={totalItems}
                setSearchInput={setSearchInput}
                searchInput={searchInput}
              />
            }
          />
          <Route
            path="/Fashion/:Category"
            element={
              <CategoryPage
                mycollection={mycollection}
                userName={userName}
                totalItems={totalItems}
                setSearchInput={setSearchInput}
                searchInput={searchInput}
              />
            }
          />

          <Route
            path="/Mobile"
            element={
              <Mobilepage
                mycollection={mycollection}
                userName={userName}
                setSearchInput={setSearchInput}
                searchInput={searchInput}
              />
            }
          />
          <Route
            path="/Grocery"
            element={
              <Grocerypage
                mycollection={mycollection}
                userName={userName}
                setSearchInput={setSearchInput}
                searchInput={searchInput}
              />
            }
          />
          <Route
            path="/Appliances"
            element={
              <Appliancespage
                mycollection={mycollection}
                userName={userName}
                setSearchInput={setSearchInput}
                searchInput={searchInput}
              />
            }
          />
          <Route
            path="/Cartpage"
            element={
              <Cartpage
                userName={userName}
                totalItems={totalItems}
                showProduct={showProduct}
                setShowProduct={setShowProduct}
                setSearchInput={setSearchInput}
                searchInput={searchInput}
              />
            }
          />
          <Route
            path="/Cartpage/Checkout/Payment"
            element={
              <Payment
                userName={userName}
                totalItems={totalItems}
                showProduct={showProduct}
                setShowProduct={setShowProduct}
                setSearchInput={setSearchInput}
                searchInput={searchInput}
              />
            }
          />
          <Route
            path="/UsersProfilePage"
            element={
              <UsersProfilePage
                userName={userName}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                setSearchInput={setSearchInput}
                searchInput={searchInput}
              />
            }
          />
          <Route
            path="/UsersProfilePage/:pages"
            element={
              <UsersProfilePage
                userName={userName}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                setSearchInput={setSearchInput}
                searchInput={searchInput}
              />
            }
          />
          <Route path="/Admin" element={<Admin userName={userName} />} />
          <Route
            path="/Admin/Product"
            element={
              <Product
                userName={userName}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/Admin/Maintainorder"
            element={<Maintainorder userName={userName} />}
          />
          <Route path="/Admin/Products/Items" element={<Items />} />
          <Route path="/*" element={<Errorpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
