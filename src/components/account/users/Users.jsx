import "./Users.css";
import React, { useState } from "react";

const Users = () => {
  const [users] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

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
              <th>Number of Trxns</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {users.map((txn, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="user-name">txn name</td>
                <td className="user-email">test@gmail.com</td>
                <td className="phone">2134821474</td>
                <td className="phone">30</td>
                <td className="timestamp">2134821474</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
