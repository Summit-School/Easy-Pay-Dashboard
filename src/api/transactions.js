import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore, storage } from "./firebase";
import { ref, listAll } from "firebase/storage";

export function getTransactions(callback) {
  const result = collection(firestore, "transactions");
  onSnapshot(result, (res) => {
    const transactionsArray = res.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    callback(transactionsArray);
  });
}

export async function updateTransaction(id) {
  const txnDoc = doc(firestore, "transactions", id);
  if (txnDoc) {
    await updateDoc(txnDoc, {
      status: true,
    });
    return { message: "Status Updated" };
  } else {
    return { message: "Update Failed" };
  }
}

export async function getImagesFromFirestore() {
  const imageList = ref(storage, "screenshots/");
  const images = await listAll(imageList).then((res) => {
    return res;
  });
  return images;
}
