import React from "react";
import { useFormik } from "formik"; //formik
import * as Yup from "yup"; //formik
import { Inputfield } from "../Smallcomponents/Fields"; //Inputfield component
import { Button } from "../Smallcomponents/Buttons"; //Button component
import Horizontalrule from "../Smallcomponents/Horizontalrule"; //Horizontalrule component
import { BgImage } from "../Smallcomponents/BackgroundImage"; //BackgroundImage component
import { ForgotPassword } from "../Smallcomponents/ForgotPassword"; //ForgotPassword component
import { ToastContainer } from "react-toastify"; //react toastify
import { FaGoogle } from "react-icons/fa"; //react icon
import signIncopy from "../images/signIncopy.jpeg"; //image
import { toast } from "react-toastify"; // react toastify
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"; //firebase authentication
import { auth } from "../FirebaseConfig/Firebaseconfig"; //auth from FirebaseConfig
import { useNavigate, Link } from "react-router-dom"; //react-router-dom methods
import { useState, useEffect } from "react"; //useState useEffect
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; //SignInWithGoogle methods
import PasswordResetForm from "../Smallcomponents/PasswordResetForm";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../FirebaseConfig/Firebaseconfig";
function SignInpage({
  userName,
  userDetails,
  setIsLoading,
  isLoading,
  displayPasswordResetFrom,
  setDisplayPasswordResetForm,
  logintimecart,
}) {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider(); //SignInWithGoogle

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        navigate("/");
      }
    });
  });

  //formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("invalid email").required("required"),
      password: Yup.string()
        .min(8, "must be 8 character long")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
          "must conatains upper case ,lower case , one special character and one digit"
        )
        .required("required"),
    }),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  function handleSubmit() {
    signInWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then((userCredential) => {
        // localStorage.setItem("userName", formik.values.name); //Bug
        console.log(userCredential);
        const emptydata = logintimecart.filter((data) => data.User_UID === "");
        if (emptydata.length !== 0) {
          updateDoc(doc(db, "UserOrders", emptydata[0].id), {
            Order: emptydata[0].Order,
            UserName: auth?.currentUser?.displayName,
            User_UID: auth?.currentUser?.uid,
          })
            .then((res) => {
              console.log("assigned");
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (userCredential.user.email === "admin@gmail.com") {
          navigate("/Admin");
        } else {
          navigate("/");
        }
        toast("successfully signged in");
      })
      .catch((errors) => {
        toast.error(errors.message);
        console.log(errors);
        setError(errors);
      });
  }

  //SignInWithGoogle function
  function SignInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const d = userDetails.filter(
          (data) => data?.Email === result?.user?.email
        );
        // console.log(d.length);
        if (d.length !== 1) {
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
          updateDoc(doc(db, "userDetails", docId[0]), {
            UserName: result?.user?.displayName,
            Email: result?.user?.email,
            Password: "",
            user_UID: result?.user?.uid,
            Address: "",
            DateofBirth: "",
            Gender: "",
            Image: "",
            Mobile: "6355086486",
          })
            .then((res) => {
              console.log(res);
              toast.success("logged In successfully");
              toast.success("userDetails updated.");
            })
            .catch((err) => {
              console.log("update err", err);
              toast.error("oppes ,error occurs !!");
            });
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  //return
  return (
    <div className="flex items-center justify-center  bg-white h-screen">
      <ToastContainer />
      <BgImage backgroundImage={signIncopy} />
      {/* {console.log(displayPasswordResetFrom)} */}

      {displayPasswordResetFrom ? (
        <PasswordResetForm
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          setDisplayPasswordResetForm={setDisplayPasswordResetForm}
        />
      ) : null}
      <div className="bg-[#ebf1f1] h-5/6 w-3/5 flex relative">
        <div className="w-3/5  flex items-center justify-center">
          <div className=" h-3/5 w-4/5 text-center flex flex-col items-center">
            <h1 className="text-3xl font-bold text-[#96002e]">Sign In</h1>
            <form>
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
              <Button
                btnName={"Sign in"}
                formik={formik}
                clickHandler={formik.handleSubmit}
              />
              {error ? <div className="m-1">{error.message}</div> : null}
            </form>
            <Horizontalrule />
            <Button
              faicon={<FaGoogle className="mr-2" />}
              btnName={"Sign In With Google"}
              clickHandler={() => SignInWithGoogle()}
            />
            <ForgotPassword
              setDisplayPasswordResetForm={setDisplayPasswordResetForm}
            />
            <p>
              {"New to this Site : "}
              <Link className="underline text-blue-900" to={"/SignUppage"}>
                {"Sign Up"}
              </Link>
            </p>
          </div>
        </div>
        {/* backgroundImage */}
        <div className="bg-red-200 w-3/6 flex">
          <img src={signIncopy} alt="" className="w-full" />
        </div>
      </div>
    </div>
  );
}

export default SignInpage;
