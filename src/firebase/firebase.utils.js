import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCEypM0daSeUW5IRQytwgtmfghH61M46fA",
    authDomain: "crwn-clothing-db-ea6e3.firebaseapp.com",
    databaseURL: "https://crwn-clothing-db-ea6e3.firebaseio.com",
    projectId: "crwn-clothing-db-ea6e3",
    storageBucket: "crwn-clothing-db-ea6e3.appspot.com",
    messagingSenderId: "659848262046",
    appId: "1:659848262046:web:93413bf0f602a4dd1c668f",
    measurementId: "G-HTRTPHH9M3"
};

//  Adding auth users to FireStore
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    //  Check if snapshot data does not exist in database
    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData   // Spread elements of additionalData object into userRef
            });
        } catch (e) {
            console.log('Error creating user', e.message);
        }
    }

    return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const convertCollectionSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();

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

//  Google authentication utility
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
