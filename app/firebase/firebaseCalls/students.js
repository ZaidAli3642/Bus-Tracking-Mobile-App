import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../firebaseConfig";

export const getSpecificStudent = async (user) => {
  const studentRef = collection(database, "students");
  const q = query(studentRef, where("rollNo", "==", user.rollno));
  const studentSnapshot = await getDocs(q);
  const student = studentSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(student);
  return student;
};
