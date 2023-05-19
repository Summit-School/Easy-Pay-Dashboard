import {
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  addDoc,
  where,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "./firebase";

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
    return { message: "Instructions Updated" };
  }

  return { message: "Update Failed" };
}
