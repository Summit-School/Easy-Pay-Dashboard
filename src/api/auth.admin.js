import {
  collection,
  doc,
  getDoc,
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "./firebase";

export async function registerAdmin(userData) {
  const adminRef = collection(firestore, "admin");
  const admin = await addDoc(adminRef, userData);

  return admin;
}

export const loginAdmin = async (email, password) => {
  const result = await getDocs(collection(firestore, "admin"));
  const admin = result.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
  if (admin) {
    if (admin[0].email == email && admin[0].password == password) {
      return {
        docId: admin[0].docId,
        id: admin[0].id,
        email: admin[0].email,
        password: "",
      };
    }
  }
  return { message: "You do not have the right to login." };
};

export async function forgotPassword(email) {
  const adminRef = doc(firestore, "admin", email.toLowerCase());
  const admin = (await getDoc(adminRef)).data();
  if (admin) {
    if (admin.email == email) {
      return { email: admin.email, password: "" };
    }
  }

  return new Error("Incorrect Email Address");
}

export async function updatePassword(data) {
  const result = await getDocs(collection(firestore, "admin"));
  const admin = result.docs.map((doc) => doc.data());
  if (admin) {
    if (admin[0].password != data.currentPassword) {
      return { message: "Password is incorrect." };
    } else {
      const adminDoc = doc(firestore, "admin", data.id);
      await updateDoc(adminDoc, {
        password: data.newPassword,
      });
      return { message: "Password Updated" };
    }
  } else {
    return { message: "update password failed." };
  }
}
