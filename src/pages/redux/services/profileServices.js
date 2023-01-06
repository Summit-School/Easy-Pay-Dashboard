import axios from "axios";

const API_URL = `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/admin/`;

// get admin data
const getAdminInfo = async (adminID) => {
  const response = await axios.get(`${API_URL}/admin_data/${adminID}`);
  return response.data;
};

const profileServices = {
  getAdminInfo,
};

export default profileServices;
