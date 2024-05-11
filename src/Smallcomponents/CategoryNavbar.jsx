import React from "react";
import { useParams } from "react-router-dom";
//material ui
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function CategoryNavbar({ setMycategory, mycategory, catagoryData }) {
  const { Category } = useParams();
  return (
    <div className="  w-1/6 h-fit-sc shadow-3xl bg-[#ebf1f1] text-sm ">
      <div className="text-center m-2 font-bold text-[#96200e] border-b-2 border-[#217aa9]">
        {"Filter For "}
        {Category}
      </div>
      {Category === "Men" ? (
        <div className="p-4 flex flex-col">
          <div>
            {catagoryData.map((e, index) => {
              return (
                <div key={index}>
                  <input
                    type="checkbox"
                    name="Men's Top Wear"
                    id=""
                    className="mr-4"
                    onChange={(event) =>
                      event.target.checked
                        ? setMycategory((prev) => [
                            ...prev,
                            catagoryData[index],
                          ])
                        : setMycategory((prev) => {
                            const newCategory = [...mycategory];
                            newCategory.splice(mycategory.indexOf(e), 1);
                            return newCategory;
                          })
                    }
                  />
                  <label htmlFor="">{e}</label>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-4 flex flex-col">
          <div>
            {catagoryData.map((e, index) => {
              return (
                <div key={index}>
                  <input
                    type="checkbox"
                    name="Men's Top Wear"
                    id=""
                    className="mr-4"
                    onChange={(event, index) =>
                      event.target.checked
                        ? setMycategory((prev) => [...prev, e])
                        : setMycategory((prev) => {
                            const newCategory = [...mycategory];
                            newCategory.splice(mycategory.indexOf(e), 1);
                            return newCategory;
                          })
                    }
                  />
                  <label htmlFor="">{e}</label>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryNavbar;
