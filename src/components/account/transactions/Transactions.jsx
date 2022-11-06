import "./Transactions.css";
import React, { useState } from "react";

const Transactions = () => {
  const [transactions] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

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
          placeholder="Search Transactions"
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
              <th>Amount</th>
              <th>Status</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={index}>
                <td className="txn-name">{index + 1}</td>
                <td className="txn-name">txn name</td>
                <td className="txn-amount">20,000</td>
                <td className="status">
                  <span style={{ backgroundColor: "lightgreen" }}>
                    Completed
                  </span>
                </td>
                <td className="timestamp">Timestamp</td>
                <td className="action">
                  <button>Done</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
