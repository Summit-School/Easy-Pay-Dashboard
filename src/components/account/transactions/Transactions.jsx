/* eslint-disable react/jsx-no-target-blank */
import "./Transactions.css";
import React, { useState, useEffect } from "react";
import Moment from "react-moment";
// import { FaDownload } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  getTransactions,
  transactionStatus,
} from "../../../pages/redux/reducers/appReducers";
import { toast } from "react-toastify";

const Transactions = () => {
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [transactions] = useSelector((state) => state.app.transactions);

  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  const changeStatus = async (txnID) => {
    const res = await dispatch(transactionStatus(txnID));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Transaction status updated");
      toast.error(res.payload);
    }
    if (res.meta.requestStatus === "rejected") {
      toast.error(res.payload);
    }
  };

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
              <th>Number</th>
              <th>Amount</th>
              <th>Screenshot</th>
              <th>Status</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((txn, index) => (
              <tr key={index}>
                <td className="txn-name">{index + 1}</td>
                <td className="txn-name">{txn.username}</td>
                <td className="txn-name">{txn.phoneNumber}</td>
                <td className="txn-amount">{txn.amount}</td>
                <td className="txn-screenshot">
                  <a
                    href={`${process.env.REACT_APP_ENDPOINT}/${txn.screenshot}`}
                    target="_blank"
                  >
                    View Screenshot
                  </a>
                  {/* <span>
                    <FaDownload />
                  </span> */}
                </td>
                <td className="status">
                  {txn.status == true ? (
                    <span
                      style={{
                        backgroundColor: "green",
                        color: "white",
                      }}
                    >
                      completed
                    </span>
                  ) : (
                    <span style={{ backgroundColor: "yellow" }}>pending</span>
                  )}
                </td>
                <td className="timestamp">
                  <Moment format="HH:mm - DD:MM:YYYY ">{txn.createdAt}</Moment>
                </td>
                <td className="action">
                  <button onClick={() => changeStatus(txn._id)}>
                    {/* {loading ? "Loading..." : "Done"} */}
                    Done
                  </button>
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
