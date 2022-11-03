import "./Transactions.css";
import React, { useState } from "react";

const Transactions = () => {
  const [transactions] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  return (
    <div className="transactions-wrapper container">
      <div className="txn-list">
        {transactions.map((txn, index) => (
          <div className="txn" key={index}>
            <div className="txn-name">transaction name</div>
            <div className="txn-name">20,000</div>
            <div className="status">
              <span style={{ backgroundColor: "lightgreen" }}>Completed</span>
            </div>
            <div className="timestamp">Timestamp</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
