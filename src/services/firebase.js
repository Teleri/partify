import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBfB7FibOJrWZe69Pj2fIRKC2WHq-OVqR8",
  authDomain: "partify-c7a0a.firebaseapp.com",
  databaseURL: "https://partify-c7a0a-default-rtdb.firebaseio.com/",
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
