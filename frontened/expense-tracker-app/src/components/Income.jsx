import React, { useState, useMemo } from 'react'; 
import DailyExpenseLineChart from '../charts/DailyExpenseLineChart';
import LeftBar from './LeftBar';
import styles from './Expense.module.css'
import TransactionCards from './TransactionCards';
const Expense=()=>{
    const [transactions, setTransactions] = useState([
    { id: 1, date: '2025-07-01', amount: 35, category: 'Food' },
    { id: 2, date: '2025-07-02', amount: 50, category: 'Transportation' },
    { id: 3, date: '2025-07-03', amount: 20, category: 'Utilities' },
    { id: 4, date: '2025-07-04', amount: 60, category: 'Food' },
    { id: 5, date: '2025-07-05', amount: 40, category: 'Shopping' },
    { id: 6, date: '2025-07-06', amount: 15, category: 'Entertainment' },
    { id: 7, date: '2025-07-07', amount: 70, category: 'Utilities' },
    { id: 8, date: '2025-07-08', amount: 25, category: 'Groceries' }, 
    { id: 9, date: '2025-07-09', amount: 10, category: 'Coffee' }, 
    { id: 11, date: '2025-07-10', amount: 35, category: 'Food' },
    { id: 12, date: '2025-07-11', amount: 50, category: 'Transportation' },
    { id: 13, date: '2025-07-12', amount: 20, category: 'Utilities' },
    { id: 14, date: '2025-07-13', amount: 60, category: 'Food' },
    { id: 15, date: '2025-07-14', amount: 40, category: 'Shopping' },
    { id: 16, date: '2025-07-15', amount: 15, category: 'Entertainment' },
    { id: 17, date: '2025-07-16', amount: 70, category: 'Utilities' },
    { id: 18, date: '2025-07-17', amount: 25, category: 'Groceries' }, 
    { id: 19, date: '2025-07-18', amount: 10, category: 'Coffee' },
    { id: 21, date: '2025-07-20', amount: 35, category: 'Food' },
    { id: 22, date: '2025-07-21', amount: 50, category: 'Transportation' },
    { id: 23, date: '2025-07-22', amount: 20, category: 'Utilities' },
    { id: 24, date: '2025-07-23', amount: 60, category: 'Food' },
    { id: 25, date: '2025-07-24', amount: 40, category: 'Shopping' },
    { id: 26, date: '2025-07-25', amount: 15, category: 'Entertainment' },
    { id: 27, date: '2025-07-26', amount: 70, category: 'Utilities' },
    { id: 28, date: '2025-07-27', amount: 25, category: 'Groceries' }, 
    { id: 29, date: '2025-07-28', amount: 10, category: 'Coffee' },  
    
  ]);

  const dailyExpenses = useMemo(() => {
    const dailyTotals = {};

    transactions.forEach(transaction => {
      if (dailyTotals[transaction.date]) {
        dailyTotals[transaction.date] += transaction.amount;
      } else {
        dailyTotals[transaction.date] = transaction.amount;
      }
    });

    const sortedDates = Object.keys(dailyTotals).sort();
    return sortedDates.map(date => ({
      date,
      amount: dailyTotals[date],
    }));
  }, [transactions]);

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
    <div className="container-fluid">
        <div className="row">
            <div className="col-2" style={{height: '100vh',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'}}>
                <LeftBar/>
            </div>
            <div className="col-10 {styles.expenseWrapper}">
                <div className="row">
                    <div className="col-12"><DailyExpenseLineChart expenses={dailyExpenses}/></div>
                </div>
                <div className="row">
                    <div className="col-8 px-5">
                        <span style={spanStyle}> Total Income </span>
                        <TransactionCards transactions={dailyExpenses}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Expense;