import DateRangePicker from "./DateRangePicker.jsx";
import TransactionCards from "./TransactionCards";
import React, { useState } from 'react';
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

    return (
        <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
             <DateRangePicker/>
             <div style={{marginTop:'25px'}}>
                <Button  style={{marginRight:'15px', backgroundColor:'#f9dbdb',border:'none',outline:'none',color:'black'}}>Today</Button>
                <Button style={{marginRight:'15px', backgroundColor:'#f9dbdb',border:'none',outline:'none',color:'black'}}>Week</Button>
                <Button style={{marginRight:'15px', backgroundColor:'#f9dbdb',border:'none',outline:'none',color:'black'}}>Month</Button>
                <Button style={{marginRight:'15px', backgroundColor:'#f9dbdb',border:'none',outline:'none',color:'black'}}>Quarter</Button>
            </div>
        </div>
        <TransactionCards transactions={transactions} />
        </div>
    );
}
export default Transactions;