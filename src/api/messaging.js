import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import * as uuid from "uuid";
// import { getUserPushToken, sendPushNotification } from "./pushNotificaton";
import { getUserPushToken } from "./pushNotificaton";
import { sendPushNotification } from "./oneSignal";

import { firestore } from "./firebase";

export function getAllMessages(receiverId, onMessages) {
  const ref = collection(firestore, `support/${receiverId}/messages`);
  onSnapshot(ref, (snapshot) => {
    const result = snapshot.docs.map((doc) => doc.data());
    onMessages(result);
  });
}

export async function sendMessage(receiverId, message) {
  const id = uuid.v4();
  const ref = doc(firestore, `support/${receiverId}/messages/${id}`);

  setDoc(ref, { ...message, id: id });
  const token = await getUserPushToken(receiverId);
  // const data = {
  //   to: token.token,
  //   title: "New Message",
  //   body: "You have unread messages.",
  //   sound: "default",
  //   data: { someData: "goes here" },
  // };
  const data = {
    to: token.token,
    title: "You have a new message",
    body: `${message?.text}`,
  };
  const res = await sendPushNotification(data);
  return res;
}
