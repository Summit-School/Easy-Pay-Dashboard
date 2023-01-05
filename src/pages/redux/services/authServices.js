import axios from "axios";

const API_URL = `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/admin/`;

// admin login
const login = async (adminData) => {
  console.log(API_URL);
  const response = await axios.post(`${API_URL}/admin_login`, adminData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.token));
  }

  return response.data;
};

const authServices = {
  login,
};

export default authServices;
