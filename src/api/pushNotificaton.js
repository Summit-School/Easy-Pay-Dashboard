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
    (userToken) => userToken.userId == data.userId
  );
  if (filtered.length > 0) {
    return { message: "Token already exists" };
  } else {
    const userRef = collection(firestore, "pushTokens");
    const res = await addDoc(userRef, data);
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
  const filtered = tokenArray.filter((userToken) => userToken.userId == userId);
  const token = filtered[0];
  return token;
}

export async function sendPushNotification(data) {
  const message = {
    to: data.expoPushToken,
    sound: "default",
    title: data.title,
    body: data.body,
    data: { someData: "goes here" },
  };

  // axios.post("https://exp.host/--/api/v2/push/send", JSON.stringify(message), {
  //   headers: {
  //     Accept: "application/json",
  //     "Accept-encoding": "gzip, deflate",
  //     "Content-Type": "application/json",
  //   },
  // });

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify(message),
  });
}
