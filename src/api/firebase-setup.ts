import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyASrBozlgR1eNcakmm60GHn0uh6JJMp2W4",
  authDomain: "lakehead-hackathon.firebaseapp.com",
  projectId: "lakehead-hackathon",
  storageBucket: "lakehead-hackathon.appspot.com",
  messagingSenderId: "1088997830134",
  appId: "1:1088997830134:web:bedd9615cfd545c5e7abd7",
  measurementId: "G-7PT9S8VRLD",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const functions = getFunctions(firebaseApp);

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  connectFunctionsEmulator(functions, "localhost", 5001);
}
