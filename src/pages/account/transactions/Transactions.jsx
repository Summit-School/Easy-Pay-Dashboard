import "./Transactions.css";
import Layout from "../../../components/layout/Layout";
import Transactions from "../../../components/account/transactions/Transactions";

const TransactionPage = () => {
  return (
    <Layout>
      <div className="transactions">
        <div className="scroll-div">
          <Transactions />
        </div>
      </div>
    </Layout>
  );
};

export default TransactionPage;
