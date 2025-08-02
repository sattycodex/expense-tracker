import DateRangePicker from "./DateRangePicker.jsx";
import TransactionCards from "./TransactionCards";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
const Transactions=()=>{
    const transactions = [
        { id: 1, category: 'Food', amount: 200, time: '10:30 AM', type: 'expense' },
        { id: 2, category: 'Salary', amount: 5000, time: '09:00 AM', type: 'income' },
        { id: 3, category: 'Transport', amount: 100, time: '12:15 PM', type: 'expense' },
        { id: 4, category: 'Freelance', amount: 800, time: '1:00 PM', type: 'income' },
        { id: 5, category: 'Food', amount: 200, time: '10:30 AM', type: 'expense' },
        { id: 6, category: 'Salary', amount: 5000, time: '09:00 AM', type: 'income' },
        { id: 7, category: 'Transport', amount: 100, time: '12:15 PM', type: 'expense' },
        { id: 8, category: 'Freelance', amount: 800, time: '1:00 PM', type: 'income' },
        { id: 9, category: 'Food', amount: 200, time: '10:30 AM', type: 'expense' },
        { id: 10, category: 'Salary', amount: 5000, time: '09:00 AM', type: 'income' },
        { id: 11, category: 'Transport', amount: 100, time: '12:15 PM', type: 'expense' },
        { id: 12, category: 'Freelance', amount: 800, time: '1:00 PM', type: 'income' },
    ];

    const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filtered transactions based on date range
  const filtered = transactions.filter((txn) => {
    if (!startDate || !endDate) return true;
    const txnDate = new Date(txn.date);
    return (
      txnDate >= new Date(startDate) && txnDate <= new Date(endDate)
    );
  });

  const spanStyle={ 
    display: 'inline-block',
    marginTop: '15px',
    padding: '10px 20px',
    fontFamily: 'Georgia',
    fontWeight: 'bolder',
    width: '100%',
    background:' #e8e2e2'
  }

    return (
        <div>
         <span style={spanStyle}>All Transactions </span>
        <TransactionCards transactions={transactions} />
        </div>
    );
}
export default Transactions;