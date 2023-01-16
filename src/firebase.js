import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyBABW__dIB1bnfRgllM7aVvV3RGOwQgk6U",
    authDomain: "tempsense-10a39.firebaseapp.com",
    databaseURL: "https://tempsense-10a39-default-rtdb.firebaseio.com",
    projectId: "tempsense-10a39",
    storageBucket: "tempsense-10a39.appspot.com",
    messagingSenderId: "185248609223",
    appId: "1:185248609223:web:2d1a2a184729fb3f795fe2"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();