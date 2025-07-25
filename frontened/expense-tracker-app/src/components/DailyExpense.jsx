import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);


const DailyExpense = () => {
    const data = [
  { category: 'Food', amount: 200 },
  { category: 'Transport', amount: 100 },
  { category: 'Bills', amount: 250 },
  { category: 'Entertainment', amount: 150 },
  { category: 'Food', amount: 200 },
  { category: 'Transport', amount: 100 },
  { category: 'Bills', amount: 250 },
  { category: 'Entertainment', amount: 150 },
];


  const labels = data.map((item) => item.category);
  const values = data.map((item) => item.amount);
  const total = values.reduce((acc, val) => acc + val, 0);

  const generateRandomColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const hue = Math.floor(Math.random() * 360);
        colors.push(`hsl(${hue}, 70%, 70%)`); // HSL for bright pastel colors
    }
    return colors;
    };

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Amount',
        data: values,
        backgroundColor: generateRandomColors(values.length),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw;
            return `${label}: ${formatCurrency(value)}`;
          },
        },
      },
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 20,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <div >
        <h5 className="text-center mb-3">Transactions of Selected Date</h5>
        <Pie data={chartData} options={options} />
        <p className="text-center mt-3 fw-bold">
          Total: {formatCurrency(total)}
        </p>
      </div>
    </div>
  );
}

export default DailyExpense;
