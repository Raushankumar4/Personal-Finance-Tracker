import React from "react";
import { useGetTransactions } from "../../hooks/useTransaction";

const Dashboard = () => {
  const { data } = useGetTransactions();
  console.log(data?.transactions);

  return <div className="mt-20">Dashboard</div>;
};

export default Dashboard;
