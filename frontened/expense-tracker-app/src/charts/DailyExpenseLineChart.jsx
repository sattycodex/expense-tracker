import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DailyExpenseLineChart = ({ expenses }) => {
  const dates = expenses.map(expense => expense.date);
  const amounts = expenses.map(expense => expense.amount);

  const data = {
    labels: dates, 
    datasets: [
      {
        label: 'Daily Expenses',
        data: amounts,
        fill: false, // Don't fill the area below the line
        borderColor: 'rgb(75, 192, 192)', 
        tension: 0.1, // Smooth the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', 
      },
      title: {
        display: true,
        text: 'Daily Spending Trends',
      },
    },
    scales: {
      x: {
        type: 'category', 
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount',
        },
        beginAtZero: true, 
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default DailyExpenseLineChart;
