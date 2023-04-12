// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCVkP1_uzFeBJ4Jay9lip_g6A6XDbrm7bY",
  authDomain: "weatherwise-543ec.firebaseapp.com",
  projectId: "weatherwise-543ec",
  storageBucket: "weatherwise-543ec.appspot.com",
  messagingSenderId: "506452980863",
  appId: "1:506452980863:web:8e2398927027c850acbb4a",
  measurementId: "G-CT429ZNSYV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export const dbConnection = db;
export const authenticator = auth;
export const dbStorage = storage;








