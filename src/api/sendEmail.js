import axios from "axios";

export async function sendEmail(data) {
  axios.post(
    `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/email/send-email`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
