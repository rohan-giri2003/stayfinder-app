import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSy...", // Yahan apni actual API key daalo
  authDomain: "stayfinder-xxxx.firebaseapp.com", // Yahan apna authDomain daalo
  projectId: "stayfinder-xxxx", // Yahan apna projectId daalo
  storageBucket: "stayfinder-xxxx.appspot.com", // Yahan apna storageBucket daalo
  messagingSenderId: "123456789", // Yahan apna messagingSenderId daalo
  appId: "1:123456:web:abcdef" // Yahan apna appId daalo
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);