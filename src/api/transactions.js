import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore, storage } from "./firebase";
import { ref, listAll } from "firebase/storage";
import { getUserPushToken, getTransactionById } from "./auth.user";
import { sendPushNotification } from "./pushNotificaton";

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
    await getTransactionById(id, async (transaction) => {
      const userId = transaction.userId;
      const token = await getUserPushToken(userId);
      const data = {
        to: token.token,
        title: "Transaction Status",
        body: "Your Transaction has been compeleted. View the transaction to see the update.",
        sound: "default",
        data: { someData: "goes here" },
      };
      await sendPushNotification(data);
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
