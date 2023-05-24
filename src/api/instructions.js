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

export async function addInstructions(data) {
  const instructionsRef = collection(firestore, "instructions");
  const res = await addDoc(instructionsRef, data);
  if (res) {
    return { message: "Instruction Added" };
  } else {
    return { message: "Failed" };
  }
}

export function getInstructions(callback) {
  const result = collection(firestore, "instructions");
  onSnapshot(result, (res) => {
    const instructionsArray = res.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const instructions = instructionsArray[0];
    callback(instructions);
  });
}

export async function updateInstructions(data) {
  const result = await getDocs(collection(firestore, "instructions"));
  const ratinstructionsArray = result.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  if (ratinstructionsArray.length > 0) {
    const ratinstructionsDoc = doc(
      firestore,
      "instructions",
      ratinstructionsArray[0].id
    );
    await updateDoc(ratinstructionsDoc, { message: data.message });
    getAllPushTokens().then((tokens) => {
      tokens.forEach(async (token) => {
        const data = {
          to: token.token,
          title: "Instructions updated",
          body: "Easy Kings Pay has updated its instructions, click to view the updates.",
          sound: "default",
          data: { someData: "goes here" },
        };
        await sendPushNotification(data);
      });
    });
    return { message: "Instructions Updated" };
  }

  return { message: "Update Failed" };
}
