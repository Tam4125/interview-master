import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBOMMcnXoPfGqxVebBcXVkkGakGQHmIDfE",
    authDomain: "interview-master-d0cfe.firebaseapp.com",
    projectId: "interview-master-d0cfe",
    storageBucket: "interview-master-d0cfe.firebasestorage.app",
    messagingSenderId: "928891986925",
    appId: "1:928891986925:web:75d7837e56e6c671f8fde4",
    measurementId: "G-124WSXMYWH"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth();
export const db = getFirestore();
