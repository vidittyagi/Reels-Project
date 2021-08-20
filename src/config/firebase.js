import firebase from "firebase";

let firebaseConfig = {
  apiKey: "AIzaSyBZ33apEA9GHcEy5wn3BbV49L7bpVkEfu0",
  authDomain: "instagram-reels-fc32d.firebaseapp.com",
  projectId: "instagram-reels-fc32d",
  storageBucket: "instagram-reels-fc32d.appspot.com",
  messagingSenderId: "462950036612",
  appId: "1:462950036612:web:ce8d362fb2779aed573ed1"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
export let firebaseAuth = firebaseApp.auth();
export let firebaseStorage = firebaseApp.storage();
export let firebaseDB = firebaseApp.firestore();
export let timeStamp = firebase.firestore.FieldValue.serverTimestamp;

