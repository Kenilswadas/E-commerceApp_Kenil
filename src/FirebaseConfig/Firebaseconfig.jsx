// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
//for fireStore
import { getFirestore } from "firebase/firestore";

//for Storage
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAMNnsjKLW6VrnVUpDpL3p11IeIR-XcSVo",
//   authDomain: "e-commerce-app-e068f.firebaseapp.com",
//   projectId: "e-commerce-app-e068f",
//   storageBucket: "e-commerce-app-e068f.appspot.com",
//   messagingSenderId: "852044448301",
//   appId: "1:852044448301:web:56f041d8c7d36535026ea4",
//   measurementId: "G-WHF4EZ8VH1",
// };
const firebaseConfig = {
  apiKey: "AIzaSyC38QuUME3rD5BPYZNUKb2vBjcAJ8r7RJ8",
  authDomain: "myproject-6eb74.firebaseapp.com",
  projectId: "myproject-6eb74",
  storageBucket: "myproject-6eb74.appspot.com",
  messagingSenderId: "1057503329349",
  appId: "1:1057503329349:web:05910a309ec95e0fbab72c",
  measurementId: "G-5ZTWPB27CC"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app); //Storage

export { auth, db, storage };
