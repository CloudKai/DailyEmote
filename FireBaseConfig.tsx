// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  appId: "1:1067322831926:web:3084ff3a61db51971b5497",
  measurementId: "G-Z9Z1ZNGTF9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const FIREBASE_AUTH = getAuth(app);