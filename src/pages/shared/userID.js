// import { isExpired, decodeToken } from "react-jwt";
// import { toast } from "react-toastify";

const userID = () => {
  const userToken = JSON.parse(localStorage.getItem("easykingspay-admin"));
  const userId = userToken.docId;
  // const isTokenExpired = isExpired(userToken);
  // if (isTokenExpired === true) {
  //   return toast.error("Session Expired. Please login again.");
  // }
  // const decodedToken = decodeToken(userToken);
  // const id = decodedToken.userId;

  return userId;
};

export default userID;
