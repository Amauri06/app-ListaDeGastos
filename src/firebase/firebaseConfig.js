
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_REACT_APIKEY, 
  authDomain:import.meta.env.VITE_REACT_AUTHDOMAIN,
  projectId: import.meta.env.VITE_REACT_PROJECTID,
  storageBucket:import.meta.env.VITE_REACT_STORAGEBUCKET,  
  messagingSenderId:import.meta.env.VITE_REACT_MESSAGINGSENDERID, 
  appId:import.meta.env.VITE_REACT_APPID  
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export {db, auth};
