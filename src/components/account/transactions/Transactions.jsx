/* eslint-disable react/jsx-no-target-blank */
import "./Transactions.css";
import React, { useState, useEffect } from "react";
import Moment from "react-moment";
// import { FaDownload } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";/
// import {
//   getTransactions,
//   transactionStatus,
// } from "../../../pages/redux/reducers/appReducers";
import { toast } from "react-toastify";
import { getDownloadURL } from "firebase/storage";
import {
  getTransactions,
  updateTransaction,
  getImagesFromFirestore,
} from "../../../api/transactions";

const Transactions = () => {
  const [transactions, setTransations] = useState([]);
  const [images, setImages] = useState([]);

  // const dispatch = useDispatch();
  // const [transactions] = useSelector((state) => state.app.transactions);

  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };

  useEffect(() => {
    getImagesFromFirestore().then((res) => {
      res.items.forEach((item) => {
        const name = item.name;
        getDownloadURL(item).then((url) => {
          setImages((prev) => [...prev, { name, url }]);
        });
      });
    });

    getTransactions((transactions) => {
      const sortedAssec = transactions.sort(
        (objA, objB) => Number(objB.createdAt) - Number(objA.createdAt)
      );
      setTransations(sortedAssec);
    });
  }, []);

  const changeStatus = async (txnID) => {
    updateTransaction(txnID)
      .then((res) => {
        if (res.message === "Status Updated") {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    // const res = await dispatch(transactionStatus(txnID));
    // if (res.meta.requestStatus === "fulfilled") {
    //   toast.success("Transaction status updated");
    //   toast.error(res.payload);
    // }
    // if (res.meta.requestStatus === "rejected") {
    //   toast.error(res.payload);
    // }
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
              <th>Receiver Name</th>
              <th>Receiver Number</th>
              <th>Screenshot</th>
              <th>Status</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((txn, index) => {
              const image = images?.filter(
                (img) => img.name === txn.screenshot
              );
              return (
                <tr key={index}>
                  <td className="txn-name">{index + 1}</td>
                  <td className="txn-name">{txn.username}</td>
                  <td className="txn-name">{txn.phoneNumber}</td>
                  <td className="txn-amount">{formatMoney(txn.amount)} FCFA</td>
                  <td className="txn-name">{txn.receiverName}</td>
                  <td className="txn-name">{txn.receiverNumber}</td>
                  <td className="txn-screenshot">
                    <a href={`${image[0]?.url}`} target="_blank">
                      View Screenshot
                    </a>
                    {/* <span>
                    <FaDownload />
                  </span> */}
                  </td>
                  <td className="status">
                    {txn.status === true ? (
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
                    <Moment format="HH:mm - DD:MM:YYYY ">
                      {txn.createdAt}
                    </Moment>
                  </td>
                  <td className="action">
                    <button onClick={() => changeStatus(txn.id)}>
                      {/* {loading ? "Loading..." : "Done"} */}
                      Done
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
