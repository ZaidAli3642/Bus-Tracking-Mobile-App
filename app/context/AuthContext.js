import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../firebase/firebaseConfig";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import useAppFonts from "../hooks/useAppFonts";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);

  const signIn = async (values) => {
    await signInWithEmailAndPassword(auth, values.email, values.password);
  };

  const authChange = () => {
    preventAutoHideAsync();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAppIsReady(true);
      await hideAsync();
    });
    return () => unsubscribe();
  };

  useEffect(() => {
    authChange();
  }, [user, setUser]);

  return {
    user,
    AuthContext,
    appIsReady,
    setUser,
    signIn,
  };
};
