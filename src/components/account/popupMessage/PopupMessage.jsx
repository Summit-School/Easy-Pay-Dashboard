import "./PopupMessage.css";
import { GoPencil } from "react-icons/go";
import UpdateMessage from "./UpdateMessage";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPopupMessage,
  createPopupMessage,
} from "../../../pages/redux/reducers/appReducers";
import { toast } from "react-toastify";

const PopupMessage = () => {
  const [updateMessage, setUpdateMessage] = useState(false);
  const [customMsg, setCustomMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const popupMessage = useSelector((state) => state.app.popupMessage);

  useEffect(() => {
    dispatch(getPopupMessage());
  }, []);

  const sendCustomMessage = () => {
    const msg = {
      message: customMsg,
    };
    dispatch(createPopupMessage(msg), setLoading(true))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setLoading(false);
          toast.success("Custom message successfully sent");
        }
        if (res.meta.requestStatus === "rejected") {
          setLoading(false);
          toast.error(res.payload);
        }
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  return (
    <div className="popup-message-wrapper">
      <div className="popup-scroll-div">
        <div className="featured-message container">
          {popupMessage.message}
          <div className="edit-btn" onClick={() => setUpdateMessage(true)}>
            <span>
              <GoPencil />
            </span>
          </div>
        </div>
        <div className="add-message container mt-3">
          <div className="popup-message-input">
            <textarea
              className="form-control"
              cols="30"
              rows="5"
              placeholder="Enter custome message"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
            ></textarea>
          </div>
          <button
            className="form-control bg-secondary text-light mt-2"
            onClick={sendCustomMessage}
          >
            {loading ? "Loading..." : "Send"}
          </button>
        </div>
        {/* <div className="add-message container mt-3 mb-2">
          <div className="popup-message-input">
            <textarea
              className="form-control"
              cols="30"
              rows="5"
              placeholder="Enter broadcast email"
            ></textarea>
          </div>
          <button className="form-control bg-secondary text-light mt-2">
            Submit
          </button>
        </div> */}
      </div>
      <UpdateMessage
        show={updateMessage}
        popupmessage={popupMessage}
        onHide={() => setUpdateMessage(false)}
      />
    </div>
  );
};

export default PopupMessage;
