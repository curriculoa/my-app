import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCKaHQc56Z-hbM1ZMr-begSFQMpF_24aGA",
    authDomain: "loginapp-21127.firebaseapp.com",
    projectId: "loginapp-21127",
    storageBucket: "loginapp-21127.appspot.com",
    messagingSenderId: "1046379747569",
    appId: "1:1046379747569:web:b0e040ac9ed2816b487150",
    measurementId: "G-WBX40QR161"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);