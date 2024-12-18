import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC3oPMqjguNiqPlrE4YwbjwjBq0hq7xkok",
    authDomain: "the-alter-office-749f7.firebaseapp.com",
    projectId: "the-alter-office-749f7",
    storageBucket: "the-alter-office-749f7.firebasestorage.app",
    messagingSenderId: "222668842510",
    appId: "1:222668842510:web:baad4d9d24c1690e5ebe5f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleauthProvider = new GoogleAuthProvider();

export default app;