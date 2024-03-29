import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
// import { updatePopupMessage } from "../../../pages/redux/reducers/appReducers";
// import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { updateInstructions } from "../../../api/instructions";

const UpdateMessage = (props) => {
  const [loading, setLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState(props.popupmessage);

  useEffect(() => {
    setUpdateMessage(props.popupmessage);
  }, []);

  // const dispatch = useDispatch();

  const handleUpdate = async (msgID) => {
    setLoading(true);
    const updateData = {
      msgID: msgID,
      message: updateMessage,
    };
    updateInstructions(updateData)
      .then((res) => {
        if (res.message === "Instructions Updated") {
          setLoading(false);
          toast.success(res.message);
          props.onHide();
        } else {
          setLoading(false);
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    // const res = await dispatch(updatePopupMessage(updateData));
    // if (res.meta.requestStatus === "fulfilled") {
    //   setLoading(false);
    //   toast.success("Transaction status updated");
    //   props.onHide();
    //   toast.error(res.payload);
    // }
    // if (res.meta.requestStatus === "rejected") {
    //   setLoading(false);
    //   toast.error(res.payload);
    // }
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-center "
      // key={remount}
    >
      <Modal.Header className="change-password-header" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Mesage
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="change-password-body">
        <div>
          <textarea
            cols="25"
            rows="5"
            value={updateMessage}
            onChange={(e) => setUpdateMessage(e.target.value)}
            className="form-control"
          ></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer className="change-password-footer">
        <Button
          className="update-popup-msg-submit-btn"
          onClick={() => handleUpdate(props.popupmessage.id)}
        >
          {loading ? "Loading..." : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateMessage;
