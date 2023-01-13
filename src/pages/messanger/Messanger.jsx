import "./Messanger.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Message from "../../components/account/message/Message";
import {
  getMessages,
  createNewMessage,
} from "../redux/reducers/messageReducers";
import { useSelector, useDispatch } from "react-redux";
import userID from "../shared/userID";
import { toast } from "react-toastify";

const Messanger = () => {
  const [adminID, setAdminID] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const messages = useSelector((state) => state.messenger.messages);

  const sendNewMessage = () => {
    const { userId } = location.state;
    if (newMessage) {
      const messageData = {
        sender: adminID,
        receiver: userId,
        text: newMessage,
      };
      dispatch(createNewMessage(messageData), setLoading(true))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            setLoading(false);
            toast.success("message sent");
            setNewMessage("");
          }
          if (res.meta.requestStatus === "rejected") {
            setLoading(false);
            toast.error("Failed");
          }
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    } else {
      toast.warning("message is required");
    }
  };

  useEffect(() => {
    const { userId } = location.state;
    const adminId = userID();
    setAdminID(adminId);
    dispatch(getMessages(userId));
  }, []);

  return (
    <Layout>
      <div className="messager-wrapper">
        <div className="chatBox">
          <div className="chatBoxTop">
            {messages.length > 0
              ? messages.map((message, index) => (
                  <Message
                    key={index}
                    message={message}
                    own={message.message[0] === adminID}
                  />
                ))
              : "No Messages Found Here"}
          </div>
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput form-control"
              placeholder="write something"
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
