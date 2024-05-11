import React, { useState } from "react";
import { Label } from "./Label";
import { InputField } from "./InputField";
import { Button } from "./Buttons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { onSnapshot, query } from "firebase/firestore";
import { db } from "../FirebaseConfig/Firebaseconfig";
import { getAuth, updatePassword, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "./Loader";
function PasswordResetForm({
  setDisplayPasswordResetForm,
  setIsLoading,
  isLoading,
}) {
  // const [password, setPassword] = useState();
  // const [Confirmpassword, setConfirmPassword] = useState();
  const auth = getAuth();
  // const user = ;
  const formik = useFormik({
    initialValues: {
      email: "",
      Password: "",
      ConfirmPassword: "",
    },
    validationSchema: () => {
      if (auth.currentUser) {
        return Yup.object({
          email: Yup.string().email("Invalid email").required("Required"),
          Password: Yup.string()
            .min(8, "Must be 8 characters long")
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
              "Must contain upper case, lower case, one special character, and one digit"
            )
            .required("Required"),
          ConfirmPassword: Yup.string()
            .min(8, "Must be 8 characters long")
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
              "Must contain upper case, lower case, one special character, and one digit"
            )
            .oneOf([Yup.ref("Password"), null], "Passwords must match")
            .required("Required"),
        });
      } else {
        return Yup.object({
          email: Yup.string().email("Invalid email").required("Required"),
        });
      }
    },
    onSubmit: (values) => {
      // alert("You have entered: " + JSON.stringify(values, null, 2));
      if (auth.currentUser !== null) {
        handleSubmit();
      } else {
        handleSendEmail();
      }
    },
  });

  function handleSubmit() {
    // alert("ki");
    // onSnapshot(query(db,"MyPro"))
    // const newPassword = formik.values.ConfirmPassword;
    // updatePassword(user, newPassword)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     // An error ocurred
    //     // ...
    //     console.log(error);
    //   });
  }
  function handleSendEmail() {
    setIsLoading(true);
    const auth = getAuth();
    sendPasswordResetEmail(auth, formik.values.email)
      .then((res) => {
        toast.success("Email sent !!");
        console.log(res);
        setIsLoading(false);
        setDisplayPasswordResetForm(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("Opps error ocurred !!");
        console.log(error);
        // ..
      });
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      {isLoading ? <Loader /> : null}
      {auth.currentUser ? (
        <form action="" className="bg-[#ebf1f1] grid w-96 p-4 rounded-2xl">
          <h1 className="text-center font-bold text-2xl text-[#96002e] mb-4">
            Change PassWord
          </h1>
          <Label name={"Enter Registered Email Id"} />
          <InputField
            id={"email"}
            type={"email"}
            placeholder={"Enter Registered Email Id"}
            name={"email"}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            setFunction={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-sm text-red-400">{formik.errors.Password}</div>
          )}
          <Label name={"Password"} />
          <InputField
            id={"Password"}
            type={"text"}
            placeholder={"Enter Password"}
            name={"Password"}
            value={formik.values.Password}
            onBlur={formik.handleBlur}
            setFunction={formik.handleChange}
          />
          {formik.errors.Password && formik.touched.Password && (
            <div className="text-sm text-red-400">{formik.errors.Password}</div>
          )}
          <Label name={"Confirm Password"} />
          <InputField
            id={"ConfirmPassword"}
            type={"text"}
            placeholder={"Enter Confirm Password"}
            name={"ConfirmPassword"}
            value={formik.values.ConfirmPassword}
            onBlur={formik.handleBlur}
            setFunction={formik.handleChange}
          />
          {formik.errors.ConfirmPassword && formik.touched.ConfirmPassword ? (
            <div className="text-sm text-red-400">
              {formik.errors.ConfirmPassword}
            </div>
          ) : null}
          <div className="flex justify-around">
            <Button
              btnName={"Reset Password"}
              clickHandler={() => {
                formik.handleSubmit();
              }}
            />
            <Button
              btnName={"Cancel"}
              clickHandler={() => {
                setDisplayPasswordResetForm(false);
              }}
            />
          </div>
        </form>
      ) : (
        <form action="" className="bg-[#ebf1f1] grid w-96 p-4 rounded-2xl">
          <h1 className="text-center font-bold text-2xl text-[#96002e] mb-4">
            Change PassWord
          </h1>
          <Label name={"Enter Registered Email Id"} />
          <InputField
            id={"email"}
            type={"email"}
            placeholder={"Enter Registered Email Id"}
            name={"email"}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            setFunction={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-sm text-red-400">{formik.errors.Password}</div>
          )}
          <div className="flex justify-around">
            <Button
              btnName={"Send Email"}
              clickHandler={() => {
                formik.handleSubmit();
              }}
            />
            <Button
              btnName={"Cancel"}
              clickHandler={() => {
                setDisplayPasswordResetForm(false);
              }}
            />
          </div>
        </form>
      )}
    </div>
  );
}

export default PasswordResetForm;
