import "./Dashboard.css";
import Layout from "../../../components/layout/Layout";
import { FaUsers } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import { AiOutlineTransaction } from "react-icons/ai";
import DashboardCards from "../../../components/account/dashboardCards/DashboardCards";
import Transactions from "../../../components/account/transactions/Transactions";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setRate, getCxnRate } from "../../redux/reducers/appReducers";

const Dashboard = () => {
  const [cxnRate, setCxnRate] = useState("");
  const [loading, setLoading] = useState(false);

  const getRate = useSelector((state) => state.app.conversionRate);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCxnRate())
      .then((res) => {
        if (res.meta.requestStatus === "rejected") {
          console.error(res.payload);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const setConversionRate = (e) => {
    e.preventDefault();
    if (cxnRate) {
      const rate = {
        cfa: cxnRate,
      };
      dispatch(setRate(rate), setLoading(true))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            dispatch(getCxnRate());
            setLoading(false);
            setCxnRate("");
            toast.success(res.payload.message);
          }
          if (res.meta.requestStatus === "rejected") {
            setLoading(false);
            toast.error(res.payload);
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
        });
    } else {
      toast.error("Invalid rate");
    }
  };

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
                Conversion rate: 1 Barhain = {getRate} FCFA
              </div>
              <div className="set-rate">
                <input
                  type="number"
                  placeholder="Enter FCFA equivalent"
                  className="form-control"
                  value={cxnRate}
                  onChange={(e) => setCxnRate(e.target.value)}
                />
                <button onClick={setConversionRate}>
                  {loading ? "Loading..." : " Submit"}
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
