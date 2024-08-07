import {
  collection,
  doc,
  getDocs,
  updateDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "./firebase";
// import { getAllPushTokens, sendPushNotification } from "./pushNotificaton";
import { sendPushNotification } from "./oneSignal";

export async function changeRate(amount) {
  const result = await getDocs(collection(firestore, "rate"));
  const rateArray = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  if (rateArray.length > 0) {
    const rateDoc = doc(firestore, "rate", rateArray[0].id);
    await updateDoc(rateDoc, { rate: amount.rate });
    // getAllPushTokens().then((tokens) => {
    //   tokens.forEach(async (token) => {
    //     const data = {
    //       to: token.token,
    //       title: "Exchange Rate Updated",
    //       body: "Easy Kings Pay has updated its exchange rate. Click to view the new rate",
    //       sound: "default",
    //       data: { someData: "goes here" },
    //     };
    //     await sendPushNotification(data);
    //   });
    // });
    const data = {
      title: "Exchange Rate Updated",
      body: `
      Hello there, We are pleased to inform you that Easy Kings Pay has revised its exchange rate. 
      The new rate is ${amount.rate}. This new rate will be applied to all subsequent transactions carried
      out on our platform. Thank you for your continued trust in our services.
      `,
    };
    sendPushNotification(data);
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
