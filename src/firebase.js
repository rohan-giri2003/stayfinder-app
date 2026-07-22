import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKtWajzDGCmAaV3tZ-a9WvMKUx_JPJ-1U",
  authDomain: "stayfinder-app-928a7.firebaseapp.com",
  projectId: "stayfinder-app-928a7",
  storageBucket: "stayfinder-app-928a7.appspot.com",
  messagingSenderId: "750943602429",
  appId: "1:750943602429:web:581da8163d7c60e63d2094"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);