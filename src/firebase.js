// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEsgdSHjDRyH7XOwO6jSdf6M1WlojKf0w",
  authDomain: "todo-app-fff92.firebaseapp.com",
  databaseURL: "https://todo-app-fff92-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-app-fff92",
  storageBucket: "todo-app-fff92.appspot.com",
  messagingSenderId: "544979917375",
  appId: "1:544979917375:web:d360c7e211ee05efedb68a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();