import "./Message.css";

const Message = ({ own }) => {
  return (
    <div className={own ? "message-wrapper own" : "message-wrapper"}>
      <div className="messageTop">
        <img className="messageImg" src="/images/Easy_pay.png" alt="" />
        <p className="messageText">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quia
          facilis accusantium sint
        </p>
      </div>
      <div className="messageBottom">1 hour Ago</div>
    </div>
  );
};

export default Message;
