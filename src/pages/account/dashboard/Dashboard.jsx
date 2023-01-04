import "./Dashboard.css";
import Layout from "../../../components/layout/Layout";
import { FaUsers } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import { AiOutlineTransaction } from "react-icons/ai";
import DashboardCards from "../../../components/account/dashboardCards/DashboardCards";
import Transactions from "../../../components/account/transactions/Transactions";

const Dashboard = () => {
  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };

  return (
    <Layout>
      <div className="dashboard-wrapper ">
        <div className="dashboard-scroller">
          <div className="dashboard-cards container">
            <DashboardCards
              icon={<FaUsers size={35} />}
              title="NUMBER OF USER"
              value={formatMoney(10265)}
              bgColor="purple"
            />
            <DashboardCards
              icon={<AiOutlineTransaction size={35} />}
              title="NUMBER OF TRANSACTIONS"
              value={formatMoney(10265)}
              bgColor="green"
            />
            <DashboardCards
              icon={<AiOutlineTransaction size={35} />}
              title="PENDING TRANSACTIONS"
              value={formatMoney(10265)}
              bgColor="orange"
            />
            <DashboardCards
              icon={<BiMoney size={35} />}
              title="TOTAL INCOME"
              value={formatMoney(10265)}
              bgColor="gray"
            />
          </div>
          <div className="conversion-rate container">
            <div className="rate-wrapper">
              <div className="display-rate">
                Conversion rate: 1 Barhain = xxxxx FCFA
              </div>
              <div className="set-rate">
                <input
                  type="number"
                  placeholder="Enter FCFA equivalent"
                  className="form-control"
                />
                <button className="form-control bg-secondary text-light">
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="latest-transactions">
            <div className="latest-txn-heading container">
              Latest Transactions
            </div>
            <Transactions />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
