import axios from "axios";

const API_URL = `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/admin`;

// admin login
const login = async (adminData) => {
  console.log(`test ${API_URL}/admin_login`);
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

const updatePassword = async (data) => {
  console.log(data);
  const response = await axios.put(
    `${API_URL}/update_admin_password/${data.adminID}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

const logout = async () => {
  return await localStorage.removeItem("user");
};

const authServices = {
  login,
  updatePassword,
  logout,
};

export default authServices;
