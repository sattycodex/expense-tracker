import { useEffect, useState } from 'react';
import CalenderTrack from './CalenderTrack';
import DailyExpense from './DailyExpense';
import TransactionBarChart from '../charts/TransactionBarChart';
const RightBar=()=>{
    const [completeTransaction,setCompleteTransaction]=useState([]);
    const [pendingTransaction,setPendingTransaction]=useState([]);
    const [cancelledTransaction,setCancelledTransaction]=useState([]);
    const [transactions,setTransactions]=useState([]);
    const [selectedDate,setSelectedDate]=useState(new Date());
    
    return (
        <>
            <CalenderTrack setSelectedDate={setSelectedDate}  setTransactions={setTransactions} setCompleteTransaction={setCompleteTransaction} setPendingTransaction={setPendingTransaction} setCancelledTransaction={setCancelledTransaction} />
            {completeTransaction.length>0 
            ? <DailyExpense completeTransaction={completeTransaction} selectedDate={selectedDate}/> 
            :<span style={{display: 'inline-block',marginTop: '20px',textAlign: 'center',width: '100%',fontWeight: '200'}}>No Complete transaction for selected Date</span>} 

            {(completeTransaction.length>0 || pendingTransaction.length>0 || cancelledTransaction.length>0)
            &&<div style={{marginTop:'25px', paddingBottom:'20px'}}><TransactionBarChart  transactions={transactions}/></div>
}

        </>
    )

}

export default RightBar;