import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBzSeHJ4YWxiLpE09A7mzpYUxUfOWeq3SU",
    authDomain: "sum-that-notation-13637.firebaseapp.com",
    projectId: "sum-that-notation-13637",
    storageBucket: "sum-that-notation-13637.appspot.com",
    messagingSenderId: "912432195227",
    appId: "1:912432195227:web:bc908eb3957185b597483e",
    measurementId: "G-MCKECB516P"
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.firestore();