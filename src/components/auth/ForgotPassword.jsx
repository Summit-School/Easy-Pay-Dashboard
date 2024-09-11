import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import ResetPassword from "./ResetPassword";
import { forgotPassword } from "../../api/auth.admin";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const dispatch = useDispatch();

  const forgotPasswordHandler = () => {
    setLoading(true);
    if (email) {
      forgotPassword(email)
        .then((res) => {
          if (res.email === email) {
            toast.success("Success");
            setLoading(false);
            dispatch(props.onHide);
            setResetPassword(true);
          } else {
            toast.error("Invalid Email");
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
            Enter Email
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="change-password-body">
          <form className="mt-0">
            <div className="email-field">
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="change-password-footer">
          <Button
            className="modal-btn form-control-sm"
            onClick={forgotPasswordHandler}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
      <ResetPassword
        show={resetPassword}
        onHide={() => setResetPassword(false)}
      />
    </div>
  );
};

export default ForgotPassword;
