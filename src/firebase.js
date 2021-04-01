import firebase from 'firebase/app';
import 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyBzSeHJ4YWxiLpE09A7mzpYUxUfOWeq3SU",
//     authDomain: "sum-that-notation-13637.firebaseapp.com",
//     projectId: "sum-that-notation-13637",
//     storageBucket: "sum-that-notation-13637.appspot.com",
//     messagingSenderId: "912432195227",
//     appId: "1:912432195227:web:bc908eb3957185b597483e",
//     measurementId: "G-MCKECB516P"
// };

const firebaseConfig = {
    apiKey: "AIzaSyBxdroTYNIaxZcwj75RaYMU601PjTzoRnM",
    authDomain: "comp585-e8338.firebaseapp.com",
    projectId: "comp585-e8338",
    storageBucket: "comp585-e8338.appspot.com",
    messagingSenderId: "1011171509531",
    appId: "1:1011171509531:web:fa24c5896cbcb16e6cbfbe",
    measurementId: "G-V22WJ91GTT"
};


firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.firestore();