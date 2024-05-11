import React, { useEffect, useMemo, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useRef } from "react";
import { db } from "../FirebaseConfig/Firebaseconfig";
import { collection, onSnapshot } from "@firebase/firestore";
import { useParams } from "react-router-dom";
const Search = React.memo(({ searchInput, setSearchInput }) => {
  const { Category } = useParams();
  const catagoryData = useMemo(() => {
    return Category === "Men"
      ? [
          "Men's Top Wear",
          "Men's Bottom Wear",
          "Men's Foot Wear",
          "Men's Festive Wear",
        ]
      : Category === "Women"
      ? [
          "Women's Top Wear",
          "Women's Bottom Wear",
          "Women's Foot Wear",
          "Women's Festive Wear",
        ]
      : Category === "Kids"
      ? ["Boy's Clothing", "Girl's Clothing"]
      : [
          "Men's Top Wear",
          "Men's Bottom Wear",
          "Men's Foot Wear",
          "Men's Festive Wear",
          "Women's Top Wear",
          "Women's Bottom Wear",
          "Women's Foot Wear",
          "Women's Festive Wear",
          "Boy's Clothing",
          "Girl's Clothing",
          "Dairy Product",
          "Vegetables",
          "Fruits",
          "Washing Machines",
          "Refrigerators",
          "Air Conditioners",
          "Apple",
          "Samsung",
          "Redmi",
          "OnePlus",
        ];
  }, [Category]);

  useEffect(() => {
    const alldata = onSnapshot(collection(db, "MyProducts"), (snapshort) => {
      const data = snapshort.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const menData = data.filter((e) => catagoryData.includes(e.SubCategory));
      setProducts(menData);
    });
    return () => alldata();
  }, [searchInput, Category]);

  const [Products, setProducts] = useState();
  const refSearch = useRef();

  //handleSearch
  function searchHandle() {
    const search = refSearch.current.value.toLowerCase();
    console.log(search);
    if (search.length > 2) {
      const finaldata = Products.filter((data) =>
        data.SubCategory.toLowerCase().includes(search)
      );
      // console.log(finaldata);
      setSearchInput(finaldata);
    } else if (refSearch.current.value === "") {
      setSearchInput(null);
    }
  }
  return (
    <li className="flex bg-white items-center   rounded-full">
      <input
        ref={refSearch}
        type="text"
        className="rounded-full p-1 pl-4 border-none focus:outline-none"
        placeholder="Search by SubCategory"
        onChange={searchHandle}
      />
      <IoIosSearch size={24} className="mr-4" />
    </li>
  );
});

export { Search };
