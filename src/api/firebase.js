// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzQXdeFQCaGRksMi1G-Pyj-zCdIhTU4jA",
  authDomain: "easy-kings-pay.firebaseapp.com",
  projectId: "easy-kings-pay",
  storageBucket: "easy-kings-pay.appspot.com",
  messagingSenderId: "747295056677",
  appId: "1:747295056677:web:7dbea632df791cee48b0cc",
  measurementId: "G-2XCL1X5QBF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);

export { app, analytics, firestore };
