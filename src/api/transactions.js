import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore, storage } from "./firebase";
import { ref, listAll } from "firebase/storage";
import {
  getUserPushToken,
  getTransactionById,
  getSingleUser,
} from "./auth.user";
import { sendPushNotification } from "./pushNotificaton";
import { sendEmail } from "./sendEmail";
import * as moment from "moment";

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
      status: "completed",
    });
    await getTransactionById(id, async (transaction) => {
      const userId = transaction.userId;
      const user = await getSingleUser(userId);
      const txnDate = moment(transaction?.createdAt).format("DD-MM-YYYY");
      const resDate = moment(Date.now()).format("DD-MM-YYYY");
      const token = await getUserPushToken(userId);
      // notification message
      const data = {
        to: token.token,
        title: "Transaction Status",
        body: "Your Transaction has been compeleted. View the transaction to see the update.",
        sound: "default",
        data: { someData: "goes here" },
      };
      await sendPushNotification(data);
      // email message
      const emailMsg = {
        to: user?.email,
        subject: "Transaction Completed",
        message: `
          <h4>Hello ${user?.username}</h4><br>
          <div>
          Your Transaction to send BHD ${transaction.amountInBD} to ${transaction?.receiverName} with phone number ${transaction?.receiverNumber}
          on the ${txnDate} has been completed. Please log in to the Easy Kings Pay Application to confirm this email.
          </div><br>
          <div>
          This transaction was completed successfully on ${resDate}.
          </div><br>
          <div>
          We thank you for trusting our services and hope to see you again in the future.
          </div><br><br>
          <div>Kind Regards</div>
        `,
      };
      await sendEmail(emailMsg);
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

export async function cancelTransaction(id) {
  const txnDoc = doc(firestore, "transactions", id);
  if (txnDoc) {
    await updateDoc(txnDoc, {
      status: "cancelled",
    });
    await getTransactionById(id, async (transaction) => {
      const userId = transaction.userId;
      const user = await getSingleUser(userId);
      const txnDate = moment(transaction?.createdAt).format("DD-MM-YYYY");
      const resDate = moment(Date.now()).format("DD-MM-YYYY");
      const token = await getUserPushToken(userId);
      // notification message
      const data = {
        to: token.token,
        title: "Transaction Status",
        body: "Your Transaction has been cancelled. View the transaction to see the update.",
        sound: "default",
        data: { someData: "goes here" },
      };
      await sendPushNotification(data);
      // email message
      const emailMsg = {
        to: user?.email,
        subject: "Transaction Cancelled",
        message: `
          <h4>Hello ${user?.username}</h4><br>
          <div>
          Your Transaction to send BHD ${transaction.amountInBD} to ${transaction?.receiverName} with phone number ${transaction?.receiverNumber}
          on the ${txnDate} has been cancelled. Please log in to the Easy Kings Pay Application to confirm this email.
          </div><br>
          <div>
          This transaction was cancelled on ${resDate}.
          </div><br>
          <div>
          If you have any issue with this email, please get to us through our support lines..
          </div><br><br>
          <div>Kind Regards</div>
        `,
      };
      await sendEmail(emailMsg);
    });
    return { message: "Status Updated" };
  } else {
    return { message: "Update Failed" };
  }
}
