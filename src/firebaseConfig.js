import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions'; 

const firebaseConfig = {
  apiKey: "AIzaSyCl4u9Z-okoAj34XzkMNVNVJ5gzhFn567o",
  authDomain: "hotel-booking-app-25eb5.firebaseapp.com",
  projectId: "hotel-booking-app-25eb5",
  storageBucket: "hotel-booking-app-25eb5.appspot.com",
  messagingSenderId: "449659420472",
  appId: "1:449659420472:web:f3a653bb5ac550dcd58bcd",
  measurementId: "G-8NYW3Y8F7D"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const functions = getFunctions(app); 

export { db, auth, storage, functions }; 