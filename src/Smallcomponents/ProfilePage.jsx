import React, { useEffect, useState } from "react";
import { auth } from "../FirebaseConfig/Firebaseconfig";
function ProfilePage({ setShowEditProfiePage, userProfiles }) {
  //handleClick
  function handleClick() {
    setShowEditProfiePage(true);
  }
  return (
    <div className="w-4/5 h-screen bg-[#ebf1f1] border-l-2 border-[#96200e]">
      <div className="m-4 flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-[#217aa9] ml-px">
            {"Profile Details"}
          </h1>
        </div>
        <div className="flex mt-4 ml-16 mb-2 w-3/4 ">
          <img
            className="w-24 h-24 rounded-full"
            src={userProfiles
              .filter((data) => data.UserName === auth.currentUser.displayName)
              .map((e) => e.Image)}
            alt={"userimage"}
          />
        </div>
        <div className="ml-16 w-3/4 ">
          <p className="flex justify-around">
            <span className="flex p-1 w-full text-center">{"Full Name"} </span>
            <span className="flex p-1 w-full text-center">
              {userProfiles
                .filter(
                  (data) => data.UserName === auth.currentUser.displayName
                )
                .map((e) => e.UserName)}
            </span>
          </p>
          <p className="flex justify-around mt-2">
            <span className="flex p-1 w-full text-center">
              {"Mobile Number"}{" "}
            </span>
            <span className="flex p-1 w-full text-center">
              {userProfiles
                .filter(
                  (data) => data.UserName === auth.currentUser.displayName
                )
                .map((e) => (e.Mobile === "" ? "--add--" : e.Mobile))}
            </span>
          </p>
          <p className="flex justify-around mt-2">
            <span className="flex p-1 w-full text-center">{"Email ID"} </span>
            <span className="flex p-1 w-full text-center">
              {userProfiles
                .filter(
                  (data) => data.UserName === auth.currentUser.displayName
                )
                .map((e) => (e.Email === "" ? "--add--" : e.Email))}
            </span>
          </p>
          <p className="flex justify-around mt-2">
            <span className="flex p-1 w-full text-center">{"Gender"} </span>
            <span className="flex p-1 w-full text-center">
              {userProfiles
                .filter(
                  (data) => data.UserName === auth.currentUser.displayName
                )
                .map((e) => (e.Gender === "" ? "--add--" : e.Gender))}
            </span>
          </p>
          <p className="flex justify-around mt-2">
            <span className="flex p-1 w-full text-center">
              {"Date Of Birth"}{" "}
            </span>
            <span className="flex p-1 w-full text-center">
              {userProfiles
                .filter(
                  (data) => data.UserName === auth.currentUser.displayName
                )
                .map((e) => (e.DateofBirth === "" ? "--add--" : e.DateofBirth))}
            </span>
          </p>
          {/* <p className="flex justify-around mt-2">
                  <span className="flex p-1 w-full text-center">
                    {"Image Of User"}{" "}
                  </span>
                  <span className="flex p-1 w-full text-center">
                    {userProfiles
                      .filter(
                        (data) => data.UserName === auth.currentUser.displayName
                      )
                      .map((e) => (e.Image === "" ? "--add--" : e.Image))}
                  </span>
                </p> */}
          <div className="flex items-center justify-start mt-10">
            <button
              className="w-3/4 p-2 bg-[#217aa9] text-white"
              onClick={() => {
                handleClick();
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
