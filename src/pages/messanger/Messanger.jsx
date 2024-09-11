import "./Messanger.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Message from "../../components/account/message/Message";
import { getAllMessages, sendMessage } from "../../api/messaging";
import userID from "../shared/userID";
import { toast } from "react-toastify";

const Messanger = () => {
  const [adminID, setAdminID] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const { userId } = location.state;
    const adminId = userID();
    setAdminID(adminId);
    getAllMessages(userId, (messages) => {
      const sortedAssec = messages.sort(
        (objA, objB) => Number(objA.date) - Number(objB.date)
      );
      setMessage(sortedAssec);
    });
  }, []);

  const sendNewMessage = () => {
    const { userId } = location.state;
    if (newMessage) {
      const messageData = {
        sender: adminID,
        receiver: userId,
        text: newMessage,
        date: Date.now(),
      };
      setLoading(true);
      const result = sendMessage(userId, messageData);
      setLoading(false);
      toast.success("message sent");
      setNewMessage("");
    } else {
      toast.warning("message is required");
    }
  };

  return (
    <Layout>
      <div className="messager-wrapper">
        <div className="chatBox">
          <div className="chatBoxTop">
            {message.length > 0
              ? message.map((message, index) => (
                  <Message
                    key={index}
                    message={message}
                    own={message.sender === adminID}
                  />
                ))
              : "No Messages Found Here"}
          </div>
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput form-control"
              placeholder="write something"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>
            <button className="chatSubmitBtn" onClick={sendNewMessage}>
              {loading ? "Loading" : " Send"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messanger;
