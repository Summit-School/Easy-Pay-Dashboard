import React from "react";
import Layout from "../../../components/layout/Layout";
import Users from "../../../components/account/users/Users";

const UsersPage = () => {
  return (
    <Layout>
      <div className="users">
        <div className="scroll-div">
          <Users />
        </div>
      </div>
    </Layout>
  );
};

export default UsersPage;
