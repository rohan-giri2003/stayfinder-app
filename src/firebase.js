import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "PASTE_YOUR_REAL_API_KEY_HERE",
  authDomain: "PASTE_YOUR_REAL_AUTH_DOMAIN_HERE",
  projectId: "PASTE_YOUR_REAL_PROJECT_ID_HERE",
  storageBucket: "PASTE_YOUR_REAL_STORAGE_BUCKET_HERE",
  messagingSenderId: "PASTE_YOUR_REAL_MESSAGING_SENDER_ID_HERE",
  appId: "PASTE_YOUR_REAL_APP_ID_HERE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);