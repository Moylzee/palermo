import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMR9B5GfbBCz_8inHij5oRkckRQ4g0NTQ",
  authDomain: "palermo-650ad.firebaseapp.com",
  projectId: "palermo-650ad",
  storageBucket: "palermo-650ad.firebasestorage.app",
  messagingSenderId: "348328260662",
  appId: "1:348328260662:web:85176f8d93d7ab01dfd497"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };