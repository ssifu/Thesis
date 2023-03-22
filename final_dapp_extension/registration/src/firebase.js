// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyANgPsrAcOV9hKsOcL9qwcnGHodX0KFnWM",
  authDomain: "user-regsitration.firebaseapp.com",
  databaseURL: "https://user-regsitration-default-rtdb.firebaseio.com",
  projectId: "user-regsitration",
  storageBucket: "user-regsitration.appspot.com",
  messagingSenderId: "614934252251",
  appId: "1:614934252251:web:5e48d0334aa3c0673d5afe",
};

firebase.initializeApp(firebaseConfig);
export const dataref = firebase.database();
export default firebase;
