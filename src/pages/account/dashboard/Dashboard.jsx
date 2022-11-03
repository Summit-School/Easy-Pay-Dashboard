import "./Dashboard.css";
import Layout from "../../../components/layout/Layout";
import { FaUsers } from "react-icons/fa";
import DashboardCards from "../../../components/account/dashboardCards/DashboardCards";

const Dashboard = () => {
  return (
    <Layout>
      <div className="dashboard-wrapper">
        <div className="dashboard-cards">
          <DashboardCards
            icon={<FaUsers size={35} />}
            title="NUMBER OF USER"
            value={10265}
            bgColor="lightblue"
          />
          <DashboardCards
            icon={<FaUsers size={35} />}
            title="NUMBER OF TRANSACTIONS"
            value={10265}
            bgColor="lightgreen"
          />
          <DashboardCards
            icon={<FaUsers size={35} />}
            title="PENDING TRANSACTIONS"
            value={10265}
            bgColor="orange"
          />
          <DashboardCards
            icon={<FaUsers size={35} />}
            title="TOTAL INCOME"
            value={10265}
            bgColor="blue"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
