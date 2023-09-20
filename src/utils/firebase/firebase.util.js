// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,

} from 'firebase/auth';


// we store the data in the firestore which is again a service in the firebase

import { doc, getDoc, getFirestore, setDoc, collection, writeBatch,
     getDocs, query, QuerySnapshot } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAnveiZToug_cAFqCmvk2twwMbsL7JcaIQ",
    authDomain: "crown-clothing-db-6afe6.firebaseapp.com",
    projectId: "crown-clothing-db-6afe6",
    storageBucket: "crown-clothing-db-6afe6.appspot.com",
    messagingSenderId: "772889821589",
    appId: "1:772889821589:web:91ba2d889e0514fa31f69c"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt:"select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopUp = () => signInWithPopup(auth, provider); 


  // sign-in-with email and password
  export const signInWithEmail = 
  async(email, password) => 
  await signInWithEmailAndPassword(auth, email, password);

//   export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

  
  // ----- setting up the connection with the fire-store to do the work of the authentication
  // ----- getDoc() and setDoc() doesn't exactly give you certain object in the database it points
  // ----- to the object in the database

  export const db = getFirestore(); // get the instance of the firestore
  
  export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
    console.log("Data pushed to firestore successfully");
  }

  // fetching data from firestore in certain format
  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
    //     const { title, items } = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // },{});
    return querySnapshot.docs.map(q=>q.data());
  }



  export const createUserDocumentFromAuth = async(userAuth, additionalInformation={}) => {
    // userAuth is an object with which we have done the googleAuth so we need to take the unique id
    // from the object and make the entries to be stored in the database
    
    // 1. we will create a document 
    const userDocRef = doc(db, "users", userAuth.uid);
    // console.log(userDocRef);

    // 2. we will get the data from the db
    const userSnapshot = await getDoc(userDocRef);
    // console.log("Data object points to the current data object in the memory", userSnapshot, userSnapshot.exists());

    // we are going to check if the user snapshot exists in the database
    // if the user object exists in the database we don't do anything
    // if it doesn't then we create the user 

    // checking if doesn't user exists
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date() ;

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch(err) {
            console.log("Error occured while creating the user", err);
        }
    }
    
    return userSnapshot;

}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;  
    return await createUserWithEmailAndPassword(auth, email, password);

}


export const SignOutUser = async() => {
    return await signOut(auth);
}
  
export const onAuthStateChangedListener = async (callback) => await onAuthStateChanged(auth, callback);


export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  }); 
}


