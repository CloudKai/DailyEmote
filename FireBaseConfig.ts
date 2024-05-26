// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZpRx2Yfq4qx68w7qkFD9h5072AR5p-E4",
  authDomain: "newproject-87d28.firebaseapp.com",
  projectId: "newproject-87d28",
  storageBucket: "newproject-87d28.appspot.com",
  messagingSenderId: "1067322831926",
  appId: "1:1067322831926:web:df158d2620c399721b5497",
  measurementId: "G-H6K6834BF1"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);