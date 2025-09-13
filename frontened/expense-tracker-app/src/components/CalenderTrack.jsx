import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import './CalenderTrack.css';
import axiosInstance from '../utils/axios-api';


const CalenderTrack=({ setTransactions,setCompleteTransaction,setPendingTransaction,setCancelledTransaction,setSelectedDate})=>{
    const [value, setValue] = useState(new Date());
    
    useEffect(()=>{
        const today=async()=>{
            try {
                const year=value.getFullYear()
                const month=value.getMonth()+1
                const day=value.getDate()
                const response=await axiosInstance.get(`/transaction/list-transaction/day?year=${year}&month=${month}&day=${day}`)
                setTransactions(response.data.data)
                setPendingTransaction(response.data.data.filter(item=>item.status=='pending'))
                setCompleteTransaction(response.data.data.filter(item=>item.status=='completed'))
                setCancelledTransaction(response.data.data.filter(item=>item.status=='cancelled'))
                setSelectedDate(value);
            } catch (error) {
                console.log(error)
                
            }
        }
        today();
        return ()=>{}
    },[value])

    return (
        <>
      <div className="mt-2 text-center">
      <div className="d-flex justify-content-center">
        <Calendar
          onChange={(date) =>setValue(date)}
          value={value}
          view="month" 
          showNavigation={true}
          showNeighboringMonth={false}
          tileContent={null}
        />
      </div>
    </div>
        </>
    )
}
export default CalenderTrack;