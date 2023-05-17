import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import * as uuid from "uuid";

import { firestore } from "./firebase";

export function getAllMessages(receiverId, onMessages) {
  const ref = collection(firestore, `support/${receiverId}/messages`);
  onSnapshot(ref, (snapshot) => {
    const result = snapshot.docs.map((doc) => doc.data());
    onMessages(result);
  });
}

export function sendMessage(receiverId, message) {
  const id = uuid.v4();
  const ref = doc(firestore, `support/${receiverId}/messages/${id}`);

  setDoc(ref, { ...message, id: id });
}
