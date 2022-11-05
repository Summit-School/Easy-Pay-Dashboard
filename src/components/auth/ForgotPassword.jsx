import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useState } from "react";

const ForgotPassword = (props) => {
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
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="change-password-footer">
          <Button className="modal-btn form-control-sm">
            {/* {loading ? <Spinner /> : "Submit"} */}
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
