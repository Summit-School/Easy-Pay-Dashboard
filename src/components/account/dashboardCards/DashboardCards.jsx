import "./DashboardCards.css";

const DashboardCards = ({ icon, title, value, bgColor }) => {
  return (
    <div className="card" style={{ backgroundColor: bgColor }}>
      <div className="card-icon">{icon}</div>
      <div className="card-title-header">{title}</div>
      <div className="card-value">{value}</div>
    </div>
  );
};

export default DashboardCards;
