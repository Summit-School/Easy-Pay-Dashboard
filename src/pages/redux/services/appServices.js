import axios from "axios";

const API_URL_RATE = `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/conversionRate`;

const setRate = async (cfa) => {
  const response = await axios.post(`${API_URL_RATE}/set_rate`, cfa, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const getCxnRate = async () => {
  const response = await axios.get(`${API_URL_RATE}/get_rate`);
  return response.data;
};

const appServices = {
  setRate,
  getCxnRate,
};

export default appServices;
