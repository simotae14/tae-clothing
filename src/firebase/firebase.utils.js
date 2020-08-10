import firebase from 'firebase/app';
// db
import 'firebase/firestore';
// auth
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// function to create a new user profile authenticated in the collection
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // if signout exit
  if (!userAuth) return;

  // get user reference, check if the user already exists in DB
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // retrieve the snapshot in that reference
  const snapShot = await userRef.get();

  // if snapshot is not already saved on DB
  if (!snapShot.exists) {
    // pties that we want to store
    const { displayName, email } = userAuth;
    // date creation on DB
    const createdAt = new Date();

    try {
      // save the reference in the DB
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

// utils to create a collection with is content in firebase
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // create collection
  const collectionRef = firestore.collection(collectionKey);
  
  // create a batch writes
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    // create a document Ref
    const newDocRef = collectionRef.doc();
    // write
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
}

// utils to convert a collection in a map
export const convertCollectionSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const {
      title,
      items
    } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// authentication with Google
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
