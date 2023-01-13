import axios from "axios";

const MESSAGE_URL = `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/message`;

const getMessages = async (userId) => {
  try {
    const response = await axios.get(`${MESSAGE_URL}/messages/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const newMessage = async (messageData) => {
  try {
    const response = await axios.post(`${MESSAGE_URL}/messages`, messageData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const appServices = {
  getMessages,
  newMessage,
};

export default appServices;
