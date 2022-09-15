import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../firebaseConfig";

export const getAdmins = async (user) => {
  const adminCollection = collection(database, "admin");
  const q = query(adminCollection, where("institute", "==", user.institute));

  const adminSnapshot = await getDocs(q);
  const admins = adminSnapshot.docs
    .map((admins) => ({
      id: admins.id,
      ...admins.data(),
    }))
    .filter((admins) => admins.id !== user.id);
  return admins;
};
