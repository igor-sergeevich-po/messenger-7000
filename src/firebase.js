// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBfJ9LBW5EYWwGJFjpiPJJBXMXzLbbIF2c",
  authDomain: "messenger7000-4632a.firebaseapp.com",
  projectId: "messenger7000-4632a",
  storageBucket: "messenger7000-4632a.appspot.com",
  messagingSenderId: "49966836476",
  appId: "1:49966836476:web:436b07018a47770ce40579"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);
