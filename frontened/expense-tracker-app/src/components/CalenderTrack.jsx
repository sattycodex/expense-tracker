import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
//import './calenderTrack.css';


const CalenderTrack=()=>{
    const [value, setValue] = useState(new Date());
    const onDateChange = (date) => {
        setValue(date);
        console.log(date);
    }

    
    return (
        <>
      <div className="container mt-5 text-center">
      <div className="d-flex justify-content-center">
        <Calendar
          onChange={onDateChange}
          value={value}
          view="month" // starts week on Monday
          showNavigation={true}  // shows << < Month > >>
          showNeighboringMonth={false} // hide previous/next month's dates
          tileContent={null} // disables events or content
        />
      </div>
    </div>
        </>
    )
}
export default CalenderTrack;