import React from "react";
import Layout from "../../../components/layout/Layout";
import PopupMessage from "../../../components/account/popupMessage/PopupMessage";

const PopupMessagePage = () => {
  return (
    <Layout>
      <div className="popup-message">
        <div className="scroll-div">
          <PopupMessage />
        </div>
      </div>
    </Layout>
  );
};

export default PopupMessagePage;
