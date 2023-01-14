import "./Users.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../../pages/redux/reducers/appReducers";

const Users = () => {
  const dispatch = useDispatch();

  const [users] = useSelector((state) => state.app.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  function myFunction(textInput) {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = textInput;
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  return (
    <div className="transactions-wrapper container">
      <div className="filter container">
        <input
          type="text"
          placeholder="Search user name"
          className="form-control"
          id="textInput"
          onKeyUp={(e) => myFunction(e.target)}
        />
      </div>
      <div className="txn-list">
        <table id="myTable">
          <thead>
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Transactions</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="user-name">{user.username}</td>
                <td className="user-email">{user.email}</td>
                <td className="phone">{user.phoneNumber}</td>
                <td className="phone">{user.numberOfTxn}</td>
                <td className="msg-btn">
                  <Link to="./messanger" state={{ userId: user._id }}>
                    <button>message</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
