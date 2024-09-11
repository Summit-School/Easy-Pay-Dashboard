import "./Profile.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { RiLockPasswordLine } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import UpdatePassword from "../updatePassword/UpdatePassword";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getAdminInfo } from "../../../pages/redux/reducers/profileReducers";
// import { logout } from "../../../pages/redux/reducers/authReducers";
// import userID from "../../../pages/shared/userID";

const Profile = () => {
  const [changePassword, setChangePassword] = useState(false);
  const [data, setData] = useState({});

  // const data = useSelector((state) => state.profile.profile);

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("easykingspay-admin"));
    setData(userToken);
    // const adminID = userID();
    // dispatch(getAdminInfo(adminID))
    //   .then((res) => {
    //     if (res.meta.requestStatus === "rejected") {
    //       toast.error(res.payload);
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error(err.message);
    //   });
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("easykingspay-admin");
    return navigate("/");
  };

  return (
    <div className="user-profile-icon">
      <NavDropdown
        title={
          <div className="pull-left">
            <span>{data.email}</span>
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
