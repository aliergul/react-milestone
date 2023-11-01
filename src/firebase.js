import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBFkeN-HBsb-lXjejq3NIIHM0NHTMrFfXc",
  authDomain: "react-milestone-aeb45.firebaseapp.com",
  databaseURL: "https://react-milestone-aeb45-default-rtdb.firebaseio.com",
  projectId: "react-milestone-aeb45",
  storageBucket: "react-milestone-aeb45.appspot.com",
  messagingSenderId: "378809562528",
  appId: "1:378809562528:web:00190a0ca359fccc7960c5",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
