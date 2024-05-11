export const authenticate = (formik) => {
  signInWithEmailAndPassword(auth, formik.values.email)
    .then((usercredentials) => {
      toast.success("Successfully Logged in");
    })
    .catch((errors) => {
      toast.error("oppes error occurs !");
    });
};
