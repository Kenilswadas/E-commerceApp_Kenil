import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";

function Page() {
  const { addItem, totalUniqueItems, items, removeItem } = useCart();

  const products = [
    {
      id: 1,
      name: "Malm",
      price: 9900,
      quantity: 1,
    },
    {
      id: 2,
      name: "Nordli",
      price: 16500,
      quantity: 5,
    },
    {
      id: 3,
      name: "Kullen",
      price: 4500,
      quantity: 1,
    },
  ];

  return (
    <div className="flex flex-col ">
      {products.map((product) => (
        <div className="bg-red-200 m-16" key={product.id}>
          <li>{product.id} </li>
          <li>{product.name}</li>
          <li>{product.price}</li>
          <li>{product.quantity}</li>
          <button className="p-3 bg-green-800" onClick={() => addItem(product)}>
            Add to cart
          </button>
          <button onClick={() => removeItem(product.id)}>&times;</button>
        </div>
      ))}
      {items.map((item) => (
        <>
          <h1>{item.name}</h1>
        </>
      ))}
      <h1>Cart count: {totalUniqueItems}</h1>
      <Link to={"/Home/Fashion/Men/cart"}>Cart page</Link>
    </div>
  );
}

export default Page;
