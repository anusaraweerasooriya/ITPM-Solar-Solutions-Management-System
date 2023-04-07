import React, { useState } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const ChartBill = ({ chartData }) => {
  const labels = chartData.dailyBill.map((data, index) => "day " + data.day);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Daily Bill Value Increment",
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Daily Bill Total",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: chartData.dailyBill.map((data) => data.dailyTotal),
      },
    ],
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartBill;
