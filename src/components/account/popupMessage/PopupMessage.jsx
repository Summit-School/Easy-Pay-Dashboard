import "./PopupMessage.css";
import { GoPencil } from "react-icons/go";
import UpdateMessage from "./UpdateMessage";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPopupMessage,
  createPopupMessage,
  deletePopupMessage,
} from "../../../pages/redux/reducers/appReducers";
import { toast } from "react-toastify";

const PopupMessage = () => {
  const [updateMessage, setUpdateMessage] = useState(false);
  const [customMsg, setCustomMsg] = useState("");
  const [updateCustomMsg, setUpdateCustomMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const dispatch = useDispatch();

  const popupMessage = useSelector((state) => state.app.popupMessage);

  useEffect(() => {
    dispatch(getPopupMessage());
  }, []);

  const sendCustomMessage = () => {
    if (customMsg) {
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
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    } else {
      toast.error("Custom message required");
    }
  };

  const deleteCustomMessage = () => {
    dispatch(deletePopupMessage(popupMessage._id), setDeleteLoading(true))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setDeleteLoading(false);
          toast.success("Custom message deleted successfully");
        }
        if (res.meta.requestStatus === "rejected") {
          setDeleteLoading(false);
          toast.error(res.payload);
        }
      })
      .catch((err) => {
        setDeleteLoading(false);
        console.error(err);
      });
  };

  return (
    <div className="popup-message-wrapper">
      <div className="popup-scroll-div">
        <div className="featured-message container">
          <div className="custom-msg">
            {" "}
            {popupMessage
              ? popupMessage.message
              : "No custom message available"}
          </div>
          <div className="edit-btn" onClick={() => setUpdateMessage(true)}>
            <span onClick={() => setUpdateCustomMsg(popupMessage)}>
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
          <button className="popup-msg-submit-btn" onClick={sendCustomMessage}>
            {loading ? "Loading..." : "Send"}
          </button>
          <button
            className="popup-msg-delete-btn"
            onClick={deleteCustomMessage}
          >
            {deleteLoading ? "Loading..." : "Delete"}
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
        popupmessage={updateCustomMsg}
        onHide={() => setUpdateMessage(false)}
      />
    </div>
  );
};

export default PopupMessage;
