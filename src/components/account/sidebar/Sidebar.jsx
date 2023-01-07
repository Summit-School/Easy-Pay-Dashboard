import React from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import { MdDashboard, MdSettingsSuggest } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div>
      <button
        className="sidebar-btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        <HiMenuAlt1 />
      </button>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            <div>
              <img src="/images/Easy_pay.png" className="logo" alt="logo" />
              <h5>EASY PAY</h5>
            </div>
          </h5>
          <button
            type="button"
            className="btn-close text-reset btn-outline-light"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="sidebar-body">
            <li>
              <span className="icon">
                <MdDashboard size={25} />
              </span>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <span className="icon">
                <FaUsers size={25} />
              </span>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <span className="icon">
                <BiMoney size={25} />
              </span>
              <Link to="/transactions">Transactions</Link>
            </li>
            <li>
              <span className="icon">
                <MdSettingsSuggest size={25} />
              </span>
              <Link to="/popup_message">Custom Message</Link>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
