import "./Messanger.css";
import Layout from "../../components/layout/Layout";
import Message from "../../components/account/message/Message";

const Messanger = () => {
  return (
    <Layout>
      <div className="messager-wrapper">
        <div className="chatBox">
          <div className="chatBoxTop">
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
          </div>
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput form-control"
              placeholder="write something"
            ></textarea>
            <button className="chatSubmitBtn">Send</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messanger;
