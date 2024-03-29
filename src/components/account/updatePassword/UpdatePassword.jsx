import "./UpdatePassword.css";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
// import { updatePassword } from "../../../pages/redux/reducers/authReducers";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../../api/auth.admin";
import userID from "../../../pages/shared/userID";

const UpdatePassword = (props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const passwordChangeHandle = (e) => {
    e.preventDefault();

    if (currentPassword && newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      setLoading(true);
      const adminID = userID();
      const data = {
        id: adminID,
        currentPassword,
        newPassword,
      };
      updatePassword(data).then((res) => {
        if (res.message === "Password Updated") {
          setLoading(false);
          dispatch(props.onHide);
          toast.success(res.message);
        } else {
          setLoading(false);
          toast.error(res.message);
        }
      });
      // dispatch(updatePassword(data), setLoading(true)).then((res) => {
      //   if (res.meta.requestStatus === "fulfilled") {
      //     setLoading(false);
      //     dispatch(props.onHide);
      //     toast.success(res.payload.message);
      //   }
      //   if (res.meta.requestStatus === "rejected") {
      //     setLoading(false);
      //     toast.error(res.payload);
      //   }
      // });
    } else {
      toast.error("All fields are required");
      return;
    }
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
          Change Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="change-password-body">
        <form className="mt-0">
          <div className="pass-field">
            <input
              type="password"
              className="form-control form-control-sm"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control form-control-sm"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control form-control-sm"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => SetConfirmPassword(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="change-password-footer">
        <button
          className="change-pswd-submit-btn"
          onClick={passwordChangeHandle}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdatePassword;
