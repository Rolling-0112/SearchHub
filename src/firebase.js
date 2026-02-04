import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxFEjZ5Nw9-cu66alH-jeH5Am2vFTBgrw",
  authDomain: "search-hub-727.firebaseapp.com",
  projectId: "search-hub-727",
  storageBucket: "search-hub-727.firebasestorage.app",
  messagingSenderId: "441583558292",
  appId: "1:441583558292:web:d6cd7b60fe71527029de81",
  measurementId: "G-JBB5P4YMGH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
