// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBXick9NSVrFt3NnImpDmUGBKDpGTg-nRo",
  authDomain: "react-getting-started-78f85.firebaseapp.com",
  databaseURL:
    "https://react-getting-started-78f85-default-rtdb.firebaseio.com",
  projectId: "react-getting-started-78f85",
  storageBucket: "react-getting-started-78f85.appspot.com",
  messagingSenderId: "1042597832655",
  appId: "1:1042597832655:web:6894e192b1fe33666e54ba",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const Storage = getStorage(app); // Storage db
export const rtDatabase = getDatabase(app); // real time database

export default Storage;
