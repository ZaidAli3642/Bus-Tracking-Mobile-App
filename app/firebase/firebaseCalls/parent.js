import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../firebaseConfig";

export const getSpecificParent = async (user) => {
  const parentRef = collection(database, "parent");
  const q = query(parentRef, where("parent_id", "==", user.uid));
  const parentSnapshot = await getDocs(q);
  const parent = parentSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return parent;
};
