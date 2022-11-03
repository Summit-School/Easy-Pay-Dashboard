import "./Layout.css";
import Sidebar from "../account/sidebar/Sidebar";
import Profile from "../account/profileIcon/Profile";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="nav-bar">
        <div className="side-bar">
          <Sidebar />
        </div>
        <div className="profile-image">
          <Profile />
        </div>
      </div>
      <div className="layout-content">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
