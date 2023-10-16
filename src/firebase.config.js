// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-3Q1k1ga86UQYET6C8l3QRsYgWFY7CUs",
  authDomain: "realtor-v1-16163.firebaseapp.com",
  projectId: "realtor-v1-16163",
  storageBucket: "realtor-v1-16163.appspot.com",
  messagingSenderId: "71110074846",
  appId: "1:71110074846:web:4780ec590f58d9a4433d4f",
  measurementId: "G-Z5N2G5L6GW"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
export const db = getFirestore()
// const analytics = getAnalytics(app);