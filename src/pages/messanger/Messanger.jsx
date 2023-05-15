import "./Messanger.css";
import { useState, useEffect, useRef } from "react";
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
// socket-io connection import
import { io } from "socket.io-client";

const Messanger = () => {
  const [adminID, setAdminID] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const socket = useRef();
  const [userMessages, setUserMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const messages = useSelector((state) => state.messenger.messages);

  const { userId } = location.state;

  const sendNewMessage = () => {
    const { userId } = location.state;
    if (newMessage) {
      const messageData = {
        sender: adminID,
        receiver: userId,
        text: newMessage,
      };
      // send message to socket server
      socket.current.emit("sendMessage", {
        senderId: adminID,
        receiverId: userId,
        text: newMessage,
      });
      // end socket server function
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
    // connect user to socket server
    socket.current = io("ws://localhost:4000");
    // get messages from server
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        text: data.text,
        message: data.message,
        createdAt: Date.now(),
      });
    });
  }, [userId]);

  useEffect(() => {
    arrivalMessage && setUserMessages([...messages, arrivalMessage]);
  }, [arrivalMessage, messages]);

  useEffect(() => {
    socket.current.emit("addUser", userId);
  }, [userId]);

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
            {messages?.length > 0
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
