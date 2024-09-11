import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";

export async function getAllUsers(callback) {
  const data = collection(firestore, "users");
  onSnapshot(data, (res) => {
    const users = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    callback(users);
  });
}

// get user by ID without callback
export async function getSingleUser(id) {
  const result = await getDocs(collection(firestore, "users"));
  const usersArray = result.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  const filtered = usersArray.filter((user) => user.id === id);
  const user = filtered[0];
  return user;
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

export async function getTransactionById(id, callback) {
  const result = collection(firestore, "transactions");
  onSnapshot(result, (res) => {
    const transactionsArray = res.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const filtered = transactionsArray.filter(
      (transaction) => transaction.id === id
    );
    const transaction = filtered[0];
    callback(transaction);
  });
}
