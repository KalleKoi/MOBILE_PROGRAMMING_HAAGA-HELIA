import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB53abMJ_fxuBy_uxkQxR93YpYip3-QZ7k",
    authDomain: "expensetracker-79dde.firebaseapp.com",
    databaseURL: "https://expensetracker-79dde-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "expensetracker-79dde",
    storageBucket: "expensetracker-79dde.firebasestorage.app",
    messagingSenderId: "534001033781",
    appId: "1:534001033781:web:cffed2f75364b967ee877c"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);