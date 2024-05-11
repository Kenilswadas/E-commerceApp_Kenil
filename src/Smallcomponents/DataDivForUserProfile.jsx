import React from "react";
import { auth } from "../FirebaseConfig/Firebaseconfig";
function DataDivForUserProfile({ data, datafield }) {
  return (
    <div>
      <p className="flex justify-around mt-2">
        <span className="flex p-1 w-full text-center">{datafield} </span>
        <span className="flex p-1 w-full text-center">
          {data
            .filter((data) => data.UserName === auth.currentUser.displayName)
            .map((e) => (e.datafield === "" ? "--add--" : e.datafield))}
        </span>
      </p>
    </div>
  );
}

export default DataDivForUserProfile;
