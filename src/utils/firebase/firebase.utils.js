import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA3oO4BcZ5Q4QxoTjYPvq-X7I5yjK4HhXo",
  authDomain: "tae-clothing-db.firebaseapp.com",
  databaseURL: "https://tae-clothing-db.firebaseio.com",
  projectId: "tae-clothing-db",
  storageBucket: "tae-clothing-db.appspot.com",
  messagingSenderId: "29381376937",
  appId: "1:29381376937:web:7d92b06a4f68682d7ce2b8"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
