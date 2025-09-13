
import TransactionCards from "./TransactionCards";
import { useEffect, useState } from 'react';
import axiosInstance from "../utils/axios-api";

const Transactions=()=>{

    const [transaction,setTransactions]=useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axiosInstance.get('/transaction/list-transaction');
                setTransactions(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTransactions();
        return () => {};
    }, [transaction])

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
        <>
         <span style={spanStyle}>All Transactions </span>
         {
            transaction.map((t)=>(
                <TransactionCards key={t._id} transaction={t} />
            ))
        }
        </>
    );
}
export default Transactions;