import React, { useEffect, useState } from "react";
import { Label } from "../Smallcomponents/Label";
import { InputField } from "../Smallcomponents/InputField";
import { Button } from "../Smallcomponents/Buttons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { updateDoc, doc, onSnapshot, collection } from "firebase/firestore";
import { auth, db, storage } from "../FirebaseConfig/Firebaseconfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Loader from "./Loader";
import {
  updateEmail,
  updateProfile,
  // sendEmailVerification,
} from "firebase/auth";
function UserProfileEditForm({
  setShowEditProfiePage,
  currentUserId,
  setIsLoading,
  isLoading,
  userProfiles,
}) {
  const [image, setImage] = useState();
  const [currentU, setcurrentU] = useState([]);
  useEffect(() => {
    // userProfiles.map((e) => console.log(e));
    const currentUserProfile = userProfiles
      .filter((data) => data.Email === auth.currentUser.email)
      .map((e) => {
        return e;
      });
    console.log(currentUserProfile);
    setcurrentU(currentUserProfile);
  }, [userProfiles]);
  currentU.map((e) => {
    return console.log(e.UserName);
  });
  // const formik = useFormik({
  //   initialValues: {
  //     UserName: "",
  //     Email: "",
  //     Mobile: "",
  //     //   Gender: "",
  //     DateofBirth: "",
  //     Image: "",
  //     //   Address: "",
  //   },
  //   validationSchema: Yup.object({
  //     UserName: Yup.string()
  //       .max(15, "Must be 15 characters or less")
  //       .required("required"),
  //     Email: Yup.string().email("invalid email").required("required"),
  //     Mobile: Yup.string()
  //       .min(10, "Must Enter 10 Digit")
  //       .max(10, "Must Enter 10 Digit")

  //       .required("required"),
  //     //   Gender: Yup.string().required("required"),
  //     DateofBirth: Yup.string().required("required"),
  //     Image: Yup.string().required("required"),
  //     //   Address: Yup.string().required("required"),
  //   }),
  //   onSubmit: (values) => {
  //     alert("ok");
  //     console.log(values);
  //     handleAddData();
  //   },
  // });
  // useEffect(()=>{
  //   onSnapshot(collection(db,"userDetails"),(snap)=>{
  //     const data = snap.docs.map((doc)=>({
  //       id:doc.id,
  //       ...doc.data()
  //     }));
  //     setUserdata(data)
  //   })
  // },[])
  async function handleUpdateData(v) {
    setIsLoading(true);
    toast.info("getting url");
    const imageRef = ref(storage, `userDetails_Images/${image.name}`);
    await uploadBytes(imageRef, image).then((res) => {});
    const url = await getDownloadURL(imageRef).then((url) => {
      console.log(url);
      return url;
    });
    toast.info("updating data...");
    // console.log(url);
    updateDoc(doc(db, "userDetails", currentUserId), {
      Address: "",
      DateofBirth: v.DateofBirth,
      Email: v.Email,
      Gender: v.Gender,
      Image: url,
      Mobile: v.Mobile,
      UserName: v.UserName,
      Password: "",
      user_UID: "",
    }).then(async (res) => {
      await updateProfile(auth.currentUser, {
        displayName: v.UserName,
        // email: v.Email,
      })
        .then(() => {
          toast.success("displayName is Updated...");
        })
        .catch((err) => {
          toast.error("error occurs in displayName !!");
        });
      await updateEmail(auth?.currentUser, "manishasoni@gmail.com")
        .then(() => {
          toast.success("User Profile Updated...");
        })
        .catch((err) => {
          toast.error("Opps , error occurs  !!");
        });
    });
    setIsLoading(false);
    await setShowEditProfiePage(false);
  }
  // async function updateSendemail(newEmail) {
  //   if (!newEmail) {
  //     toast.error("Email address is required.");
  //     return;
  //   }
  //   sendEmailVerification(auth.currentUser,).then(
  //     () => {
  //       toast.success("email sent !!");
  //     }
  //   );
  // }
  // async function updateEmailofmy(newEmail) {
  //   await updateEmail(auth.currentUser, "kenilsoni2710@gmail.com")
  //     .then(() => {
  //       toast.success("Email address updated successfully.");
  //     })
  //     .catch((error) => {
  //       // Handle specific error cases
  //       switch (error.code) {
  //         case "auth/invalid-email":
  //           toast.error("Invalid email address.");
  //           break;
  //         case "auth/requires-recent-login":
  //           toast.error(
  //             "This operation requires a recent login. Please log in again."
  //           );
  //           break;
  //         case "auth/email-already-in-use":
  //           toast.error(
  //             "The new email address is already in use by another account."
  //           );
  //           break;
  //         default:
  //           toast.error("An error occurred while updating the email address.");
  //           console.error("Error updating email:", error);
  //       }
  //     });
  // }

  return (
    <div className="fixed inset-0 bg-cover bg-center bg-opacity-50 bg-black flex  flex-col items-center justify-center z-50 h-screen ">
      {/* <button
        className="text-red-700"
        onClick={() => {
          updateSendemail("kenilsoni2710@gmail.com");
        }}
      >
        send email
      </button>
      <button
        className="text-red-700"
        onClick={() => {
          updateEmailofmy("kenilsoni2710@gmail.com");
        }}
      >
        updateEmail
      </button> */}
      <p className="text-white m-2"> UserProfileEditForm</p>
      {isLoading ? <Loader /> : null}
      <Formik
        initialValues={{
          UserName: "",
          Email: "",
          Mobile: "",
          Gender: "",
          DateofBirth: "",
          Image: null,
          //   Address: "",
        }}
        validationSchema={Yup.object({
          UserName: Yup.string()
            .max(25, "Must be 15 characters or less")
            .required("required"),
          Email: Yup.string().email("invalid email").required("required"),
          Mobile: Yup.string()
            .min(10, "Must Enter 10 Digit")
            .max(10, "Must Enter 10 Digit")
            .required("required"),
          Gender: Yup.string().required("required"),
          DateofBirth: Yup.string().required("required"),
          // Image: Yup.file().required("required"),
          //   Address: Yup.string().required("required"),
        })}
        onSubmit={(values) => {
          handleUpdateData(values);
        }}
      >
        {(formik) => (
          <form
            action=""
            className=" flex flex-col  bg-gray-200 w-4/6 rounded-xl h-fit p-4"
          >
            <div className="flex">
              <div className="flex flex-col w-3/6">
                <Label name={"UserName"} />
                <Field name="UserName" type="text" />
                <ErrorMessage name="UserName" />
                <Label name={"Email"} />
                <Field name="Email" type="text" />
                <ErrorMessage name="Email" />
                <Label name={"Mobile"} />
                <Field name="Mobile" type="number" />
                <ErrorMessage name="Mobile" />
                <Label name={"Gender"} />
                <Field as="select" name="Gender">
                  <option value="">Please select your Gender</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </Field>
                <ErrorMessage name="Gender" />
                <Label name={"DateofBirth"} />
                <Field name="DateofBirth" type="date" />
                <ErrorMessage name="DateofBirth" />
              </div>
              <div className="flex flex-col ml-4">
                <Label name={"Image of User"} />
                {/* <Field name="Image" id="Image" type="file" /> */}
                <input
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
                {/* {console.log(image)} */}
                {/* <ErrorMessage name="Image" /> */}
              </div>
            </div>
            <div className="flex justify-around">
              <Button btnName={"Submit"} clickHandler={formik.handleSubmit} />
              <Button
                btnName={"Cancel"}
                clickHandler={() => setShowEditProfiePage(false)}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default UserProfileEditForm;
