import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDmHOXGwNXFtijx_rzviPB-yPXYh1b31VI",
  authDomain: "amwajtech-cms-ecfee.firebaseapp.com",
  projectId: "amwajtech-cms-ecfee",
  storageBucket: "amwajtech-cms-ecfee.firebasestorage.app",
  messagingSenderId: "1069419723209",
  appId: "1:1069419723209:web:fdc2f096021f71af26d018",
  measurementId: "G-PQ728JTFX3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
