// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
}
from 'firebase/auth';

import {getFirestore, doc, getDoc, setDoc,collection,
  writeBatch,query,getDocs} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyB2aoPUXjHkrINdE8YZ2c9B7NRb-D863HI",
  authDomain: "crown-clothing-db-ce80f.firebaseapp.com",
  projectId: "crown-clothing-db-ce80f",
  storageBucket: "crown-clothing-db-ce80f.appspot.com",
  messagingSenderId: "173555305631",
  appId: "1:173555305631:web:0fc89e4ae3d2420ab9a6aa"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);



// Adding Google Auth
const googleprovider = new GoogleAuthProvider();
googleprovider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () =>signInWithPopup(auth,googleprovider); 


//Setting up firebase databases for Saving user in db

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth,additionalInfo)=>{
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  //creating user in db if not present
  if(!userSnapshot.exists()){
    const {displayName,email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additionalInfo
      });
    }catch(err){
      console.log('error creating the user',err.message);
    }
  }
  //if exits
  return userSnapshot;
}

// signUPWithEmailAndPassword
export const createAuthUserWithEmailAndPassword = async(email,password)=>{
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth,email,password);
}

// signInWithEmailAndPassword
export const SignInAuthUserWithEmailAndPassword = async(email,password)=>{
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth,email,password);
}


//Signout user

export const SignOutUser = async()=>{
  await signOut(auth);
}


//Listener

export const onAuthStateChangedListener = (callback)=>{
  onAuthStateChanged(auth,callback);
}
// use Promise
export const getCurrentUser = () => {
  return new Promise((resolve, reject)=>{
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth)=>{
        unsubscribe();
        resolve(userAuth);
      },
      reject
    )
  })
}


//Adding shop data to firebase

export const addCollectionAndDocument = async(collectionKey,objectsToAdd)=>{
  const collectionRef = collection(db,collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef,object.title.toLowerCase());
    batch.set(docRef,object);
  });
  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocument = async(data='categories')=>{
  const collectionRef = collection(db,data);
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.map(docSnapShot=> docSnapShot.data());
  // .reduce((acc,docSnapShot)=>{
  //   const {title, items} = docSnapShot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // },{});

  // return categoryMap;  
}