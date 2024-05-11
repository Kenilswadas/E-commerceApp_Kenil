import React, { useEffect, useState } from "react";
import { CompletedProductView, PurchaseView } from "./CardView";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig/Firebaseconfig";
function MyOrders() {
  const [completedOrderCollection, setcompletedOrderCollection] = useState([]);
  const [MyProducts, setMyProducts] = useState([]);
  // const [filterData, setfilterData] = useState([]);
  const [completedOrder, setcompletedOrder] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "UserCompletedOrder"),
        where("User_UID", "==", auth?.currentUser ? auth?.currentUser?.uid : "")
      ),
      (snap) => {
        const data = snap.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));
        setcompletedOrderCollection(data);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.currentUser]);

  useEffect(() => {
    onSnapshot(collection(db, "MyProducts"), (snap) => {
      const data = snap.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      setMyProducts(data);
      const orderIds = completedOrderCollection
        .map((order) => order?.OrderId)
        .flat(); // Flatten the array of order IDs
      const myData = data.filter(
        (product) => orderIds.includes(product?.docId) // Check if the product's docId is included in the orderIds array
      );
      console.log(myData);

      setcompletedOrder(myData);
    });
  }, [completedOrderCollection]);

  return (
    <div className="w-full">
      {completedOrder.map((e, index) => {
        return (
          <div>
            <CompletedProductView
              key={index}
              image={e.ProductImage}
              name={e.ProductName}
              price={e.ProductPrice}
              Status={e.Status}
              discription={e.ProductDescription}
              ProductDetail={e}
              completedOrderCollection={completedOrderCollection}
            />
          </div>
        );
      })}
    </div>
  );
}

export default MyOrders;
