import React, { useState } from "react";
import { useFormik } from "formik"; //formik
import * as Yup from "yup"; //formik
import SignupImage from "../images/signupcopy.jpeg"; //Image
import { FaGoogle } from "react-icons/fa"; //react icons
import { Link } from "react-router-dom"; //react router dom
import { Inputfield } from "../Smallcomponents/Fields"; //Inputfield component
import { Button } from "../Smallcomponents/Buttons"; //Button component
import Horizontalrule from "../Smallcomponents/Horizontalrule"; //Horizontalrule component
import { BgImage } from "../Smallcomponents/BackgroundImage"; //BackgroundImage component
import { ToastContainer, toast } from "react-toastify"; //react toastify
import "react-toastify/dist/ReactToastify.css";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { auth, db } from "../FirebaseConfig/Firebaseconfig";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
//for fireStore
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
function SignUppage({ userName, userDetails }) {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [UserId, setUserId] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      ConfirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("required"),
      email: Yup.string().email("invalid email").required("required"),
      password: Yup.string()
        .min(8, "must be 8 character long")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
          "must conatains upper case ,lower case , one special character and one digit"
        )
        .required("required"),
      ConfirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      toast.success(JSON.stringify(values, null, 2));
      createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: formik.values.name,
          })
            .then(() => {
              localStorage.setItem("userName", formik.values.name);
              const userId = userCredential.user.uid;
              setUserId(userId);
              toast.success("user is created successfully.");
              navigate("/");
            })
            .catch((error) => {
              toast.error("oppes error occurs !!");
            });
        })
        .catch((error) => {
          toast.error("oppes error !!");
          console.log(error);
        });
      //fireStore
      createUserProfile();
    },
  });
  function createUserProfile() {
    const mycollection = collection(db, "userDetails");
    addDoc(mycollection, {
      UserName: formik.values.name,
      Email: formik.values.email,
      Password: formik.values.password,
      user_UID: UserId,
      Address: "",
      DateofBirth: "",
      Gender: "",
      Image: "",
      Mobile: "",
    });
  }
  function SignInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const d = userDetails.filter(
          (data) => data?.Email === result?.user?.email
        );
        // console.log(d.length);
        if (d.length == 1) {
          // console.log("true");
          addDoc(collection(db, "userDetails"), {
            UserName: result?.user?.displayName,
            Email: result?.user?.email,
            Password: "",
            user_UID: result?.user?.uid,
            Address: "",
            DateofBirth: "",
            Gender: "",
            Image: "",
            Mobile: "",
          })
            .then((res) => {
              toast.success("logged In successfully");
              toast.success("New userDetail Added.");
            })
            .catch((err) => {
              toast.error("oppes ,error occurs !!");
            });
        } else {
          // console.log("false");
          const docId = userDetails
            .filter((data) => data.Email === result?.user?.email)
            .map((e) => e.id);
          console.log(docId[0]);
          // updateDoc(doc(db, "userDetails", docId[0]), {
          //   UserName: result?.user?.displayName,
          //   Email: result?.user?.email,
          //   Password: "",
          //   user_UID: result?.user?.uid,
          //   Address: "",
          //   DateofBirth: "",
          //   Gender: "",
          //   Image: "",
          //   Mobile: "6355086486",
          // })
          //   .then((res) => {
          //     console.log(res);
          //     toast.success("logged In successfully");
          //     toast.success("userDetails updated.");
          //   })
          //   .catch((err) => {
          //     console.log("update err", err);
          //     toast.error("oppes ,error occurs !!");
          //   });
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  useEffect(() => {
    // if (localStorage.getItem("usrEmail") === null) {
    //   navigate("/SignInpage");
    // }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        navigate("/");
      }
    });
  });
  return (
    <div className="flex items-center justify-center  bg-white h-screen">
      <ToastContainer />
      <BgImage backgroundImage={SignupImage} />
      <div className="bg-[#D9D9D9] h-5/6 w-3/5 flex relative">
        <div className="w-3/6 flex">
          <img src={SignupImage} alt="" />
        </div>
        <div className="w-3/5  flex items-center justify-center">
          <div className=" h-4/3 w-4/5 text-center flex flex-col items-center">
            <h1 className="text-3xl font-bold text-[#96002e]">Sign Up</h1>
            <form>
              <Inputfield
                fieldName={"name"}
                fieldtype={"text"}
                formik={formik}
              />
              <Inputfield
                fieldName={"email"}
                fieldtype={"email"}
                formik={formik}
              />
              <Inputfield
                fieldName={"password"}
                fieldtype={"password"}
                formik={formik}
              />
              <Inputfield
                fieldName={"ConfirmPassword"}
                fieldtype={"password"}
                formik={formik}
              />
              <Button
                btnName={"Submit button"}
                formik={formik}
                clickHandler={formik.handleSubmit}
              />
            </form>
            <Horizontalrule />
            <Button
              btnName={"Sign In With Google"}
              faicon={<FaGoogle className="mr-2" />}
              clickHandler={() => SignInWithGoogle()}
            />
            <div className="mt-2">
              <p>
                {"Already have an account ? "}
                <span>
                  <Link
                    to={"/SignInPage"}
                    className="underline underline-offset-1"
                  >
                    {"Sign In"}
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUppage;
