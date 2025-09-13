import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import moment from 'moment';

ChartJS.register(ArcElement, Tooltip, Legend);
const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);


const DailyExpense = ({completeTransaction,selectedDate}) => {
  const data = completeTransaction
  const labels = data.map((item) => item.description);
  const values = data.map((item) => item.amount);
  const income = data.filter((item)=>item.type=='salary' && item.status=='completed').map((item) => item.amount).reduce((prev,curr)=>prev+curr,0);
  const expense = data.filter((item)=>item.type=='expense' && item.status=='completed').map((item) => item.amount).reduce((prev,curr)=>prev+curr,0);
  const total = income-expense;

  const generateRandomColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const hue = Math.floor(Math.random() * 360);
        colors.push(`hsl(${hue}, 70%, 70%)`);
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
  useEffect(()=>console.log(selectedDate),[])
  return (
    <div className="mt-4 d-flex flex-column align-items-center">
      <div >
        <h5 className="text-center mb-3" style={{    fontSize: '16px',
    fontFamily: 'Georgia',
    fontWeight: 'bolder'}}>Completed transaction of <span style={{marginLeft:'5px',fontWeight:'300'}}>{moment(selectedDate).format('MMMM Do YYYY')}</span></h5>
        <Pie data={chartData} options={options} />
        <p className="text-center mt-3 fw-bold">
           <span>Income: {formatCurrency(income)}</span>
           <span style={{display:'inline-block',marginLeft:'10px'}}>Expense: {formatCurrency(expense)}</span> 
           <br/>
            <span style={{color:total>=0 ?'green':'red'}}>Total: {formatCurrency(total)}</span>
        </p>
      </div>
    </div>
  );
}

export default DailyExpense;
