import "./PopupMessage.css";
import { GoPencil } from "react-icons/go";
import UpdateMessage from "./UpdateMessage";
import { useState } from "react";

const PopupMessage = () => {
  const [updateMessage, setUpdateMessage] = useState(false);

  return (
    <div className="popup-message-wrapper">
      <div className="popup-scroll-div">
        <div className="featured-message container">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui porro
          praesentium dolores beatae libero ut labore quaerat illo iure
          necessitatibus, vero quis laudantium dolorum voluptatum, at nostrum
          dolorem quos tempore. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Qui porro praesentium dolores beatae libero ut
          labore quaerat illo iure necessitatibus, vero quis laudantium dolorum
          voluptatum, at nostrum dolorem quos tempore. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Qui porro praesentium dolores
          beatae libero ut labore quaerat illo iure necessitatibus, vero quis
          laudantium dolorum voluptatum, at nostrum dolorem quos tempore.
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
            ></textarea>
          </div>
          <button className="form-control bg-secondary text-light mt-2">
            Submit
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
        onHide={() => setUpdateMessage(false)}
      />
    </div>
  );
};

export default PopupMessage;
