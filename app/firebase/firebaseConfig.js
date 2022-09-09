import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCorqrR_mWth3eHYfal2oxYlqxGdR2aYQg",
  authDomain: "bus-tracking-app-66bb7.firebaseapp.com",
  projectId: "bus-tracking-app-66bb7",
  storageBucket: "bus-tracking-app-66bb7.appspot.com",
  messagingSenderId: "680349126006",
  appId: "1:680349126006:web:6d0cb263128d5e7bb5fe57",
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
