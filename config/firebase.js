// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import "firebase/compat/database";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgwMvS2OM3pfcpPkmdE08gXiUIbqCDe28",
  authDomain: "thesisdb-96833.firebaseapp.com",
  projectId: "thesisdb-96833",
  databaseURL: "https://thesisdb-96833-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "thesisdb-96833.appspot.com",
  messagingSenderId: "53808496578",
  appId: "1:53808496578:web:7550ebce84ad252a14605b",
  measurementId: "G-HJZYFC3WFC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestoreDB = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const database = getDatabase(app);

export { auth, firestoreDB, database };


