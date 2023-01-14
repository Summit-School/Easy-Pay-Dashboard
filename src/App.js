import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Dashboard from "./pages/account/dashboard/Dashboard";
import Transactions from "./pages/account/transactions/Transactions";
import Users from "./pages/account/users/Users";
import PopupMessage from "./pages/account/popupMessage/PopupMessage";
import PageError from "./pages/404/PageError";
import Messanger from "./pages/messanger/Messanger";
import Protected from "./components/protected/Protected";

// bringing in the toastify for it to work everywhere
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* UNPROTECTED ROUTES */}
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/transactions"
            element={
              <Protected>
                <Transactions />
              </Protected>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route
            path="/popup_message"
            element={
              <Protected>
                <PopupMessage />
              </Protected>
            }
          />
          <Route
            path="/users/messanger"
            element={
              <Protected>
                <Messanger />
              </Protected>
            }
          />

          {/* 404 ROUTE */}
          <Route path="*" element={<PageError />} />
        </Routes>
      </Router>
      {/* USING THE TOASTIFY CONTAINER */}
      <ToastContainer />
    </div>
  );
}

export default App;
