import { collection, getDocs, addDoc } from "firebase/firestore";
import { firestore } from "./firebase";
import axios from "axios";

export async function saveToken(data) {
  const result = await getDocs(collection(firestore, "pushTokens"));
  const tokenArray = result.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  const filtered = tokenArray.filter(
    (userToken) => userToken.userId === data.userId
  );
  if (filtered.length > 0) {
    return { message: "Token already exists" };
  } else {
    const userRef = collection(firestore, "pushTokens");
    await addDoc(userRef, data);
    return { message: "Token Created" };
  }
}

export async function getAllPushTokens() {
  const result = await getDocs(collection(firestore, "pushTokens"));
  const tokenArray = result.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return tokenArray;
}

export async function getUserPushToken(userId) {
  const result = await getDocs(collection(firestore, "pushTokens"));
  const tokenArray = result.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  const filtered = tokenArray.filter(
    (userToken) => userToken.userId === userId
  );
  const token = filtered[0];
  return token;
}

export async function sendPushNotification(data) {
  axios.post(
    `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/expo_notification/sendPushNotification`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // await fetch("https://exp.host/--/api/v2/push/getReceipts", {
  //   method: "POST",
  //   mode: "cors",
  //   headers: {
  //     Accept: "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //     "Accept-encoding": "gzip, deflate",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(message),
  // });
}
