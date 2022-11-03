import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const UpdateMessage = (props) => {
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
            rows="10"
            value="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis dolor
          corrupti suscipit ducimus porro perspiciatis voluptatum explicabo ad,
          aut, quasi nemo cumque facilis, sed consectetur vero eius repellat.
          Quas, dolore. Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Quis dolor corrupti suscipit ducimus porro perspiciatis
          voluptatum explicabo ad, aut, quasi nemo cumque facilis, sed
          consectetur vero eius repellat. Quas, dolore."
            className="form-control"
          ></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer className="change-password-footer">
        <Button className="modal-btn form-control-sm">
          {/* {loading ? <Spinner /> : "Submit"} */}
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateMessage;
