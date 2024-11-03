// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDA-1XWzx-2A-QXWUPI1K7V5WXaGKbqbHY",
    authDomain: "medis-43ea3.firebaseapp.com",
    projectId: "medis-43ea3",
    storageBucket: "medis-43ea3.firebasestorage.app",
    messagingSenderId: "1079531318234",
    appId: "1:1079531318234:web:73c7b1c7c5ecc3e644aee3",
    measurementId: "G-KQQCLKZ3S2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
