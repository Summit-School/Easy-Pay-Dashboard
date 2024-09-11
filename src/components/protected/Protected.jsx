import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { isExpired, decodeToken } from "react-jwt";

// Get user from localStorage

const Protected = ({ children }) => {
  const user = localStorage.getItem("easykingspay-admin");

  if (!user) {
    toast.error("Invalid User");
    return <Navigate to="/" replace />;
  }

  // const isTokenExpired = isExpired(user);
  // if (isTokenExpired === true) {
  //   toast.error("Session Expired.");
  //   return <Navigate to="/" replace />;
  // }

  return <>{children}</>;
};

export default Protected;
