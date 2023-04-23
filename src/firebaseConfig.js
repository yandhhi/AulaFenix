import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {getStorage, ref, getDownloadURL} from "firebase/storage"

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA7UmWdabJE5pHsqDh4-YUKFYXgbiwBIvc",
    authDomain: "aulafenix-27298.firebaseapp.com",
    projectId: "aulafenix-27298",
    storageBucket: "aulafenix-27298.appspot.com",
    messagingSenderId: "937257637269",
    appId: "1:937257637269:web:e82143baf085ee29cb529c",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

const auth = getAuth(app);
const signIn = signInWithEmailAndPassword;
const storage = getStorage(app)


export { auth, signIn };
export {storage, ref, getDownloadURL}
