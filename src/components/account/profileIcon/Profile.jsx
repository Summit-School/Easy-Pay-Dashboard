import "./Profile.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { RiLockPasswordLine } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import UpdatePassword from "../updatePassword/UpdatePassword";
import { Link } from "react-router-dom";
import { useState } from "react";

const Profile = () => {
  const [changePassword, setChangePassword] = useState(false);
  const handleLogout = (e) => {
    e.preventDefault();

    console.lgo("logout");
  };

  return (
    <div className="user-profile-icon">
      <NavDropdown
        title={
          <div className="pull-left">
            <span>test@gmail.com</span>
            <img
              className="thumbnail-image"
              src="/images/Easy_pay.png"
              alt="user pic"
            />
          </div>
        }
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item className="menu-item">
          <Link to="#" onClick={() => setChangePassword(true)}>
            <RiLockPasswordLine className="m-1" />
            Change Password
          </Link>
        </NavDropdown.Item>
        <NavDropdown.Item className="menu-item text-danger">
          <Link to="#" className="signout-link" onClick={handleLogout}>
            <GoSignOut className="m-1" />
            Sign Out
          </Link>
        </NavDropdown.Item>
      </NavDropdown>
      <UpdatePassword
        show={changePassword}
        onHide={() => setChangePassword(false)}
      />
    </div>
  );
};

export default Profile;
