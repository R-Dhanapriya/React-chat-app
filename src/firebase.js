import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDpIN8afcNSa-f3xoYBEB03Nl2SZJIV_AQ",
  authDomain: "react-chat-5d578.firebaseapp.com",
  projectId: "react-chat-5d578",
  storageBucket: "react-chat-5d578.appspot.com",
  messagingSenderId: "361682208075",
  appId: "1:361682208075:web:42097c01878f95396954ce",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();
export { app, auth, storage, db };
