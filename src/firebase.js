// Import the functions you need from the SDKs you need
import { firebaseConfig } from './firebase-config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore(app)

// Collection refs
const todosCollectionRef = collection(db, 'todos');

// get collection data


export { todosCollectionRef };