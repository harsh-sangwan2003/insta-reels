import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDubU-TRfr6rpCAthHK3JWOoosG0DOqRKc",
    authDomain: "insta-reels-8330f.firebaseapp.com",
    projectId: "insta-reels-8330f",
    storageBucket: "insta-reels-8330f.appspot.com",
    messagingSenderId: "969881439746",
    appId: "1:969881439746:web:ba3b32bf8d7002fb16e11b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {

    users: firestore.collection('users'),
    posts: firestore.collection('posts'),
    comments:firestore.collection('comments'),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage();