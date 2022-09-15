import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../firebaseConfig";

export const getBusDetails = async (user) => {
  const busCollection = collection(database, "bus");
  const q = query(
    busCollection,
    where("busNo", "==", user.busNo),
    where("institute", "==", user.institute)
  );
  const busSnapshot = await getDocs(q);
  const bus = busSnapshot.docs.map((bus) => ({ id: bus.id, ...bus.data() }));
  return bus;
};
