import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA3oO4BcZ5Q4QxoTjYPvq-X7I5yjK4HhXo",
  authDomain: "tae-clothing-db.firebaseapp.com",
  databaseURL: "https://tae-clothing-db.firebaseio.com",
  projectId: "tae-clothing-db",
  storageBucket: "tae-clothing-db.appspot.com",
  messagingSenderId: "29381376937",
  appId: "1:29381376937:web:7d92b06a4f68682d7ce2b8"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// authentication with Google
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
