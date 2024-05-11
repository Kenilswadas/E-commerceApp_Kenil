import React from "react";
import { useParams } from "react-router-dom";
import Menpage from "./Menpage";
import Womenspage from "./Womenspage";
import Kidspage from "./Kidspage";
import Beautypage from "./Beautypage";

function Categorypagemain({
  userName,
  totalItems,
  searchInput,
  setSearchInput,
  mycollection,
}) {
  const { page } = useParams();
  return (
    <div>
      {page === "Fashion" ? (
        
          <CategoryPage
            mycollection={mycollection}
            userName={userName}
            totalItems={totalItems}
            setSearchInput={setSearchInput}
            searchInput={searchInput}
          />
        
      />
      ) : Category === "Women" ? (
        <Womenspage
          mycollection={mycollection}
          userName={userName}
          totalItems={totalItems}
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />
      ) : Category === "Kids" ? (
        <Kidspage
          mycollection={mycollection}
          userName={userName}
          totalItems={totalItems}
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />
      ) : (
        <Beautypage
          mycollection={mycollection}
          userName={userName}
          totalItems={totalItems}
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />
      )}
    </div>
  );
}

export default Categorypagemain;
