import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider } from "firebase/auth"
import { doc, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCxBp-WSBuHNuv-Vui3YA3a9VD_JmDzj8U",
  authDomain: "disneyplus-clone-e8b4a.firebaseapp.com",
  projectId: "disneyplus-clone-e8b4a",
  storageBucket: "disneyplus-clone-e8b4a.appspot.com",
  messagingSenderId: "1033472486848",
  appId: "1:1033472486848:web:13edca785355b45d03ec25",
  measurementId: "G-0HVMZ9H234"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export { auth , provider} ;
export default db;