// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { initializeAuth, setPersistence,getReactNativePersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1IErogG_907S5-GUOXW2NYJRReoP795c",
  authDomain: "betahealth-f93c9.firebaseapp.com",
  projectId: "betahealth-f93c9",
  storageBucket: "betahealth-f93c9.firebasestorage.app",
  messagingSenderId: "604373985322",
  appId: "1:604373985322:web:87b8fa1d6e6bfb1357fb53",
  measurementId: "G-26QZ75N17M"
};

// Initialize Firebase
export const  FIREBASE_APP = initializeApp(firebaseConfig);

// Enable persistent authentication
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});


export { FIREBASE_AUTH };