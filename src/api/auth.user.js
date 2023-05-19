import {
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  addDoc,
  where,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "./firebase";

export async function getAllUsers(callback) {
  const data = collection(firestore, "users");
  onSnapshot(data, (res) => {
    const users = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    callback(users);
  });
}
