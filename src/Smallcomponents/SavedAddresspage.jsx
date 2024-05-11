import React, { useEffect, useState } from "react";
import { auth, db } from "../FirebaseConfig/Firebaseconfig";
import { Formik, Field, ErrorMessage } from "formik";
import { Label } from "./Label";
import * as Yup from "yup";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function SavedAddresspage({ userProfiles }) {
  const [editAddress, seteditAddress] = useState(false);
  const [currentUserProfile, setcurrentUserProfile] = useState([]);
  const [currentUserId, setcurrentUserId] = useState(null);
  const [addNewaddress, setaddNewaddress] = useState(false);
  useEffect(() => {
    userProfiles
      .filter((data) => data.UserName === auth.currentUser.displayName)
      .map((e) => {
        setcurrentUserId(e.id);
        return setcurrentUserProfile(e);
      });
  }, [userProfiles]);
  console.log(currentUserProfile);
  //SaveEditedAddress
  async function SaveEditedAddress(values) {
    await updateDoc(doc(db, "userDetails", `${currentUserId}`), {
      Address: {
        address1: {
          address: addNewaddress
            ? currentUserProfile?.Address?.address1?.address
            : values.address,
          Locality: addNewaddress
            ? currentUserProfile?.Address?.address1?.Locality
            : values.Locality,
          City: addNewaddress
            ? currentUserProfile?.Address?.address1?.City
            : values.City,
          State: addNewaddress
            ? currentUserProfile?.Address?.address1?.State
            : values.State,
          Pincode: addNewaddress
            ? currentUserProfile?.Address?.address1?.Pincode
            : values.Pincode,
          DefaultAddress: addNewaddress
            ? currentUserProfile?.Address?.address1?.DefaultAddress
            : values.DefaultAddress,
        },
        address2: {
          address: addNewaddress
            ? values.address
            : currentUserProfile?.Address?.address2
            ? currentUserProfile?.Address?.address1?.address
            : "",
          Locality: addNewaddress
            ? values.Locality
            : currentUserProfile?.Address?.address2
            ? currentUserProfile?.Address?.address2?.Locality
            : "",
          City: addNewaddress
            ? values.City
            : currentUserProfile?.Address?.address2
            ? currentUserProfile?.Address?.address2?.City
            : "",
          State: addNewaddress
            ? values.State
            : currentUserProfile?.Address?.address2
            ? currentUserProfile?.Address?.address2?.State
            : "",
          Pincode: addNewaddress
            ? values.Pincode
            : currentUserProfile?.Address?.address2
            ? currentUserProfile?.Address?.address2?.Pincode
            : "",
          DefaultAddress: addNewaddress
            ? values.DefaultAddress
            : currentUserProfile?.Address?.address2
            ? currentUserProfile?.Address?.address2?.DefaultAddress
            : "",
        },
      },
    })
      .then((res) => {
        toast.success("Address updated successfully ...");
      })
      .catch((err) => {
        toast.error("Opps error occurs !!!");
      });
    seteditAddress(false);
  }
  //handleEdit
  function handleEdit() {
    seteditAddress(true);
    setaddNewaddress(false);
  }
  //AddNewAddress
  function AddNewAddress() {
    seteditAddress(true);
    setaddNewaddress(true);
  }
  //handleRemove Address
  function handleRemove() {
    updateDoc(doc(db, "userDetails", currentUserId), {
      Address: deleteField(),
    })
      .then((res) => {
        toast.success("Address deleted successfully...");
      })
      .catch((err) => {
        toast.error("Opps error occurs !!!");
      });
  }
  return (
    <div className="w-4/5 h-screen bg-[#ebf1f1] border-l-2 border-[#96200e] overflow-auto ">
      <div className="m-4 flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-[#217aa9] ml-px">
            {"Saved Addresses"}
          </h1>
          <button
            className="px-1 py-2 min-w-[120px] text-center text-[#96200e] border border-[#217aa9] rounded hover:bg-[#96200e] hover:text-white active:bg-[#96200e] focus:outline-none focus:ring"
            onClick={() => {
              AddNewAddress(true);
            }}
          >
            add new address
          </button>
        </div>
        <div className="ml-16 w-3/4  mt-10">
          <p>Default Address</p>
          <p></p>
        </div>
        <div className="ml-16 w-3/4 ">
          <div className="m-4 p-2 ">
            <div className="text-[#217aa9] text-xl">
              {currentUserProfile?.UserName}
            </div>
            <div>
              {currentUserProfile.Address ? (
                <div>
                  <p>{currentUserProfile?.Address?.address1?.address}</p>
                  <p>{currentUserProfile?.Address?.address1?.Locality}</p>
                  <p>
                    {currentUserProfile?.Address?.address1?.City} {"-"}
                    {currentUserProfile?.Address?.address1?.Pincode}
                  </p>
                  <p>{currentUserProfile?.Address?.address1?.State}</p>
                </div>
              ) : (
                <p className="text-center">--Please Add Address--</p>
              )}
              <div className="flex justify-around mt-10">
                <button
                  className=" py-2 min-w-[120px] text-center text-[#96200e] border border-[#217aa9] rounded hover:bg-[#96200e] hover:text-white active:bg-[#96200e] focus:outline-none focus:ring"
                  onClick={() => handleEdit()}
                >
                  Edit
                </button>
                <button
                  className=" py-2 min-w-[120px] text-center text-[#96200e] border border-[#217aa9] rounded hover:bg-[#96200e] hover:text-white active:bg-[#96200e] focus:outline-none focus:ring"
                  onClick={() => handleRemove(true)}
                >
                  Remove
                </button>
              </div>
              {currentUserProfile?.Address?.address2?.State ? (
                <div className="mt-4">
                  <p className="mb-4">{"Other Addresses"}</p>
                  <div>
                    <p>{currentUserProfile?.Address?.address2?.address}</p>
                    <p>{currentUserProfile?.Address?.address2?.Locality}</p>
                    <p>
                      {currentUserProfile?.Address?.address2?.City} {"-"}
                      {currentUserProfile?.Address?.address2?.Pincode}
                    </p>
                    <p>{currentUserProfile?.Address?.address2?.State}</p>
                  </div>
                </div>
              ) : null}
              {editAddress ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                  <Formik
                    initialValues={{
                      address: !addNewaddress
                        ? currentUserProfile?.Address?.address1?.address
                        : null,
                      State: !addNewaddress
                        ? currentUserProfile?.Address?.address1?.State
                        : null,
                      City: !addNewaddress
                        ? currentUserProfile?.Address?.address1?.City
                        : null,
                      Locality: !addNewaddress
                        ? currentUserProfile?.Address?.address1?.Locality
                        : null,
                      Pincode: !addNewaddress
                        ? currentUserProfile?.Address?.address1?.Pincode
                        : null,
                      DefaultAddress: !addNewaddress
                        ? currentUserProfile?.Address?.address1?.DefaultAddress
                        : null,
                    }}
                    validationSchema={Yup.object({
                      address: Yup.string().required("required"),
                      Locality: Yup.string().required("required"),
                      City: Yup.string().required("required"),
                      State: Yup.string().required("required"),
                      Pincode: Yup.number().required("required"),
                      DefaultAddress: Yup.string().required("required"),
                    })}
                    onSubmit={(values) => {
                      SaveEditedAddress(values);
                    }}
                  >
                    {(formik) => (
                      <div className=" flex flex-col p-4 w-96 bg-white rounded-2xl overflow-auto ">
                        <Label name={"address"} />
                        <Field
                          className="mb-2 border border-[#96200e]"
                          name="address"
                          component="textarea"
                          value={formik.values.address}
                        />
                        <ErrorMessage
                          component="div"
                          className="text-red-500 text-sm"
                          name="address"
                        />

                        <Label name={"Locality"} />
                        <Field
                          className="mb-2 border border-[#96200e]"
                          name="Locality"
                          type="text"
                        />
                        <ErrorMessage
                          name="Locality"
                          component={"div"}
                          className="text-red-500 text-sm"
                        />

                        <Label name={"City"} />
                        <Field
                          className="mb-2 border border-[#96200e]"
                          name="City"
                          type="text"
                        />
                        <ErrorMessage
                          component={"div"}
                          name="City"
                          className="text-red-500 text-sm"
                        />

                        <Label name={"State"} />
                        <Field
                          className="mb-2 border border-[#96200e]"
                          name="State"
                          type="text"
                        />
                        <ErrorMessage
                          component={"div"}
                          name="State"
                          className="text-red-500 text-sm"
                        />

                        <Label name={"Pincode"} />
                        <Field
                          className="mb-2 border border-[#96200e]"
                          name="Pincode"
                          type="number"
                        />
                        <ErrorMessage
                          component={"div"}
                          name="Pincode"
                          className="text-red-500 text-sm"
                        />

                        <Label name={"Address Type"} />
                        <Field
                          as="select"
                          className="mb-2 "
                          name="DefaultAddress"
                        >
                          <option value="">Select Address Type</option>
                          <option value="Home">Home</option>
                          <option value="Office">Office</option>
                        </Field>
                        <ErrorMessage
                          component={"div"}
                          name="DefaultAddress"
                          className="text-red-500 text-sm"
                        />

                        <div className="flex justify-around">
                          <button
                            type="submit"
                            className=" py-2 min-w-[120px] text-center text-[#96200e] border border-[#217aa9] rounded hover:bg-[#96200e] hover:text-white active:bg-[#96200e] focus:outline-none focus:ring"
                            onClick={() => formik.handleSubmit()}
                          >
                            Save
                          </button>
                          <button
                            className=" py-2 min-w-[120px] text-center text-[#96200e] border border-[#217aa9] rounded hover:bg-[#96200e] hover:text-white active:bg-[#96200e] focus:outline-none focus:ring"
                            onClick={() => seteditAddress(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </Formik>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedAddresspage;
