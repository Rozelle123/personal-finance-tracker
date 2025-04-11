import React from "react";
import { BarChart, Bar, LabelList, XAxis, YAxis } from "recharts";
import TransactionPieChart from "./TransactionPieChart";
import "./styles.css";

const TransactionChart = () => {
  const data = [
    {
      name: "Groc",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Rent",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Uti",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Trans",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Ent",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Others",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    }
  ];

  return (
    <>
      <div className="chart-container">
        <h2>Transaction Bar Chart</h2>
        <BarChart width={400} height={200} data={data} barSize={40}>
          <Bar dataKey="uv" fill="#8884d8" />
          <XAxis dataKey="name" stroke="#8884d8"/> 
          <YAxis/>
        </BarChart>
      </div>
      <div className="chart-container">      
        <TransactionPieChart />
      </div>
    </>
  );
};
export default TransactionChart;
