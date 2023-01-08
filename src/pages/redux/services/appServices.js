import axios from "axios";

const API_URL_RATE = `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/conversionRate`;
const API_URL_AUTH = `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/auth`;
const API_URL_TRANSACTIONS = `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/transactions`;
const API_URL_POPUPMESSAGE = `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/popupMessage`;

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

const getUsers = async () => {
  const response = await axios.get(`${API_URL_AUTH}/get_all_users`);
  return response.data;
};

const getTransactions = async () => {
  const response = await axios.get(
    `${API_URL_TRANSACTIONS}/get_all_transactions`
  );
  return response.data;
};

const transactionStatus = async (txnID) => {
  const response = await axios.put(
    `${API_URL_TRANSACTIONS}/update_txn_state/${txnID}`
  );

  if (response.data) {
    const updated = await axios.get(
      `${API_URL_TRANSACTIONS}/get_all_transactions`
    );

    return updated.data;
  }
  return response.data;
};

const getPopupMessage = async () => {
  const response = await axios.get(`${API_URL_POPUPMESSAGE}/getPopupMessage`);

  return response.data;
};

const updatePopupMessage = async (updateData) => {
  const response = await axios.put(
    `${API_URL_POPUPMESSAGE}/updatePopupMessage/${updateData.msgID}`,
    updateData
  );

  if (response.data) {
    const updated = await axios.get(`${API_URL_POPUPMESSAGE}/getPopupMessage`);
    return updated.data;
  }
  return response.data;
};

const createPopupMessage = async (data) => {
  const response = await axios.post(
    `${API_URL_POPUPMESSAGE}/createPopupMessage`,
    data
  );

  if (response.data) {
    const data = await axios.get(`${API_URL_POPUPMESSAGE}/getPopupMessage`);
    return data.data;
  }

  return response.data;
};

const deletePopupMessage = async (msgID) => {
  const response = await axios.delete(
    `${API_URL_POPUPMESSAGE}/deletePopupMessage/${msgID}`
  );

  if (response.data) {
    const data = await axios.get(`${API_URL_POPUPMESSAGE}/getPopupMessage`);
    return data.data;
  }

  return response.data;
};

const appServices = {
  setRate,
  getCxnRate,
  getUsers,
  getTransactions,
  transactionStatus,
  getPopupMessage,
  updatePopupMessage,
  createPopupMessage,
  deletePopupMessage,
};

export default appServices;
