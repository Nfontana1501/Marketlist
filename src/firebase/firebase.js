// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3DWKsVaflad0l2_CPZlHmD0aJFIFf6Ac",
  authDomain: "marketlist-7c3ad.firebaseapp.com",
  projectId: "marketlist-7c3ad",
  storageBucket: "marketlist-7c3ad.appspot.com",
  messagingSenderId: "413149833465",
  appId: "1:413149833465:web:08c54fb3be7b3689e01a28",
  measurementId: "G-L5J0Z4D9BR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//db.settings({timestampsInSnapshots: true});
//const analytics = getAnalytics(app);

//export default db;