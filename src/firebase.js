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
    apiKey: "AIzaSyB-xHDeSe4hqhBhG5QEOy6NMdF61QA6orI",
    authDomain: "comp585-version1.firebaseapp.com",
    projectId: "comp585-version1",
    storageBucket: "comp585-version1.appspot.com",
    messagingSenderId: "86593862085",
    appId: "1:86593862085:web:c1f4f3f0a331797292b3ac",
    measurementId: "G-1PWT66W06C"
};


firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.firestore();