import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore } from "./firebase";

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
