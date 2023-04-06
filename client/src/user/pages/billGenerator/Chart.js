import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const ChartBill = ({ chartData }) => {
  const labels = chartData.dailyBill.map((data, index) => index);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: chartData.dailyBill.map((data) => data.dailyTotal),
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default ChartBill;
