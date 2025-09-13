import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const TransactionBarChart = ({ transactions }) => {
  const statusTotals = transactions.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + curr.amount;
    return acc;
  }, {});

  const labels = Object.keys(statusTotals);
  const dataValues = Object.values(statusTotals);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Amount",
        data: dataValues,
        backgroundColor: ["#4caf50", "#f44336", "#2196f3", "#ff9800"],
        borderRadius: 5
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default TransactionBarChart;
