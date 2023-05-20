import {
  collection,
  doc,
  getDocs,
  updateDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "./firebase";
import { getAllPushTokens, sendPushNotification } from "./pushNotificaton";

export async function changeRate(amount) {
  const result = await getDocs(collection(firestore, "rate"));
  const rateArray = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  if (rateArray.length > 0) {
    const rateDoc = doc(firestore, "rate", rateArray[0].id);
    await updateDoc(rateDoc, { rate: amount.rate });
    getAllPushTokens().then((tokens) => {
      tokens.forEach(async (token) => {
        const data = {
          expoPuchToken: token.token,
          title: "Rate Updated",
          body: "Easy Kings Pay Updated It rates",
        };
        await sendPushNotification(data).then((res) => {
          console.log("res", res);
        });
      });
    });
    return { message: "Rate Updated" };
  }
  const rateRef = collection(firestore, "rate");
  const rate = await addDoc(rateRef, amount);
  return rate;
}

export function getRate(callback) {
  const result = collection(firestore, "rate");
  onSnapshot(result, (res) => {
    const rateArray = res.docs.map((doc) => doc.data());
    const rate = rateArray[0];
    callback(rate);
  });
}
