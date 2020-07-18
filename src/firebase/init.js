import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyB2Jp8inGyVvJPXzkztf3TkVQvm_g_UIH0",
  authDomain: "dev-meetup-30afe.firebaseapp.com",
  databaseURL: "https://dev-meetup-30afe.firebaseio.com",
  projectId: "dev-meetup-30afe",
  storageBucket: "gs://dev-meetup-30afe.appspot.com",
  messagingSenderId: "1021243302555",
  appId: "1:1021243302555:web:c0ced24793e93f60361c3e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export const auth = firebase.auth();
export const firebaseStorage = firebase.storage();

export default db;
