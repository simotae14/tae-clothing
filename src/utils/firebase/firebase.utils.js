import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

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
// export signInWithGoogleRedirect
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

// instantiate DB
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  // retrieve ref to the user by user id
  const userDocRef = doc(db, 'users', userAuth.uid);

  // retrieve the data related to the userDocRef
  const userSnapshot = await getDoc(userDocRef);

  // check if user data not exists
  if (!userSnapshot.exists()) {
    // is user data does not exists create / set the document with the data from userAuth in my collection
    const {
      displayName,
      email,
    } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  // if exists return back userDocRef
  return userDocRef;
}

// method to Authenticate a user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);
