import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwNPRVsyrER-9l3yUHykIfcujY-y0pFPw",
  authDomain: "cloud-cafe-6ae9d.firebaseapp.com",
  databaseURL: "https://cloud-cafe-6ae9d.firebaseio.com",
  projectId: "cloud-cafe-6ae9d",
  storageBucket: "cloud-cafe-6ae9d.appspot.com",
  messagingSenderId: "953859974759",
  appId: "1:953859974759:web:361c36dd549d17a5cc96c2",
};

window.firebase = firebase;

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const provide = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provide);
export const signOut = () => auth.signOut();

export default firebase;
