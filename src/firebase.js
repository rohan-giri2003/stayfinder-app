import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // Teri purani config yahan copy-paste rehne dena
  apiKey: "YOUR_API_KEY",
  authDomain: "stayfinder-app-928a7.firebaseapp.com",
  projectId: "stayfinder-app-928a7",
  storageBucket: "stayfinder-app-928a7.firebasestorage.app",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);     // Firestore initialize
export const storage = getStorage(app); // Storage initialize