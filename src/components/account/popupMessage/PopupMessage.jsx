import "./PopupMessage.css";
import { GoPencil } from "react-icons/go";
import UpdateMessage from "./UpdateMessage";
import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getPopupMessage,
//   createPopupMessage,
//   deletePopupMessage,
// } from "../../../pages/redux/reducers/appReducers";
import { toast } from "react-toastify";

import { getInstructions, addInstructions } from "../../../api/instructions";

const PopupMessage = () => {
  const [updateMessage, setUpdateMessage] = useState(false);
  const [customMsg, setCustomMsg] = useState("");
  const [updateCustomMsg, setUpdateCustomMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [instructions, setInstructions] = useState("");
  // const dispatch = useDispatch();

  // const popupMessage = useSelector((state) => state.app.popupMessage);

  useEffect(() => {
    getInstructions((instructions) => {
      const message = instructions?.message;
      setInstructions(message);
    });
  }, []);

  const sendCustomMessage = () => {
    if (customMsg) {
      setLoading(true);
      const data = {
        message: customMsg,
      };
      addInstructions(data)
        .then((res) => {
          if (res.message === "Instruction Added") {
            setLoading(false);
            toast.success(res.message);
          } else {
            setLoading(false);
            toast.error(res.message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      // dispatch(createPopupMessage(msg), setLoading(true))
      //   .then((res) => {
      //     if (res.meta.requestStatus === "fulfilled") {
      //       setLoading(false);
      //       toast.success("Custom message successfully sent");
      //     }
      //     if (res.meta.requestStatus === "rejected") {
      //       setLoading(false);
      //       toast.error(res.payload);
      //     }
      //   })
      //   .catch((err) => {
      //     setLoading(false);
      //     console.error(err);
      //   });
    } else {
      toast.error("Custom message required");
    }
  };

  const deleteCustomMessage = () => {
    // dispatch(deletePopupMessage(popupMessage._id), setDeleteLoading(true))
    //   .then((res) => {
    //     if (res.meta.requestStatus === "fulfilled") {
    //       setDeleteLoading(false);
    //       toast.success("Custom message deleted successfully");
    //     }
    //     if (res.meta.requestStatus === "rejected") {
    //       setDeleteLoading(false);
    //       toast.error(res.payload);
    //     }
    //   })
    //   .catch((err) => {
    //     setDeleteLoading(false);
    //     console.error(err);
    //   });
  };

  return (
    <div className="popup-message-wrapper">
      <div className="popup-scroll-div">
        <div className="featured-message container">
          <div className="custom-msg">
            {instructions != "" ? instructions : "No Instructions available"}
          </div>
          <div className="edit-btn" onClick={() => setUpdateMessage(true)}>
            <span onClick={() => setUpdateCustomMsg(instructions)}>
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
              placeholder="Enter instructions for users"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
            ></textarea>
          </div>
          {instructions != "" ? (
            ""
          ) : (
            <button
              className="popup-msg-submit-btn"
              onClick={sendCustomMessage}
            >
              {loading ? "Loading..." : "Send"}
            </button>
          )}
          {/* <button
            className="popup-msg-delete-btn"
            onClick={deleteCustomMessage}
          >
            {deleteLoading ? "Loading..." : "Delete"}
          </button> */}
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
