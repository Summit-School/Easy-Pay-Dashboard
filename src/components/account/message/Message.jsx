import "./Message.css";
import { format } from "timeago.js";

const Message = ({ message, own }) => {
  return (
    <div className={own ? "message-wrapper own" : "message-wrapper"}>
      <div className="messageTop">
        {/* <img className="messageImg" src="/images/Easy_pay.png" alt="" /> */}
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.date)}</div>
    </div>
  );
};

export default Message;
