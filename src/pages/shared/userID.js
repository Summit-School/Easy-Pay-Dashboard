import { isExpired, decodeToken } from "react-jwt";
import { toast } from "react-toastify";

const userID = () => {
  const userToken = localStorage.getItem("user");
  const isTokenExpired = isExpired(userToken);
  if (isTokenExpired === true) {
    return toast.error("Session Expired. Please login again.");
  }
  const decodedToken = decodeToken(userToken);
  const id = decodedToken.userId;

  return id;
};

export default userID;
