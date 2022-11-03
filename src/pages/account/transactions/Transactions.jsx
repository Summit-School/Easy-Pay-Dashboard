import React from "react";
import Layout from "../../../components/layout/Layout";
import Transactions from "../../../components/account/transactions/Transactions";

const TransactionPage = () => {
  return (
    <Layout>
      <div className="transactions">
        <Transactions />
      </div>
    </Layout>
  );
};

export default TransactionPage;
