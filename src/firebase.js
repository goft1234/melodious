import firebase from 'firebase/app';
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjAHi6N39VsktmfIVOndJCKrCBgcHcJ8g",
    authDomain: "melodious-test.firebaseapp.com",
    projectId: "melodious-test",
    storageBucket: "melodious-test.appspot.com",
    messagingSenderId: "408731917314",
    appId: "1:408731917314:web:338e4bfbd62c9be9499b1b",
    measurementId: "G-RPE5DTVW77"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const functions = firebase.app().functions('asia-southeast1');

firebase.analytics();

export {
    fb,
    db,
    functions
}