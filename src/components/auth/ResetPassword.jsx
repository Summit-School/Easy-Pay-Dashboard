import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../api/auth.admin";

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const resetPasswordHandler = () => {
    setLoading(true);
    if (password) {
      resetPassword(password)
        .then((res) => {
          if (res.message === "success") {
            toast.success("Success");
            setLoading(false);
            dispatch(props.onHide);
          } else {
            toast.error("Failed");
            setLoading(false);
          }
        })
        .catch((err) => {
          toast.error("Failed");
          console.error(err);
          setLoading(false);
        });
    }
  };

  return (
    <div>
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
            Enter New Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="change-password-body">
          <form className="mt-0">
            <div className="email-field">
              <input
                type="password"
                className="form-control form-control-sm"
                placeholder="Enter new password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="change-password-footer">
          <Button
            className="modal-btn form-control-sm"
            onClick={resetPasswordHandler}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ResetPassword;
