import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAXW1ptdgbE_Pc-EgD12_w_3dI0PDBi3vg",
  authDomain: "social-media-4d1ba.firebaseapp.com",
  projectId: "social-media-4d1ba",
  storageBucket: "social-media-4d1ba.appspot.com",
  messagingSenderId: "3298345860",
  appId: "1:3298345860:web:bbb1277ef0bd96763b13d1",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const usersRef = collection(db, "users");
export const postsRef = collection(db, "posts");
export const auth = getAuth();
