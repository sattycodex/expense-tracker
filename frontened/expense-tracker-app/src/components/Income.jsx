import React, { useState, useMemo } from 'react'; 
import DailyExpenseLineChart from '../charts/DailyExpenseLineChart';
import LeftBar from './LeftBar';
import TransactionCards from './TransactionCards';
import { useEffect } from 'react';
import axiosInstance from '../utils/axios-api';
const Income=()=>{
  const [transaction,setTransactions]=useState([]);
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axiosInstance.get('/transaction/income-transaction');
                setTransactions(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTransactions();
        return () => {};
    }, [])

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
                    <div className="col-12"><DailyExpenseLineChart expenses={transaction}/></div>
                </div>
                <div className="row">
                    <div className="col-8 px-5">
                        <span style={spanStyle}> Total Expenses </span>
                        {
                            transaction.map((t)=>(
                                <TransactionCards key={t._id} transaction={t} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Income;