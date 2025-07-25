
import React, { useState } from 'react';
import { Calendar } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateRangePicker = ({ onConfirm }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleConfirm = () => {
    setShowPicker(false);
    onConfirm({ startDate, endDate });
  };

  return (
    <div style={{ position: 'relative',width:'50%',marginTop:'20px' }}>
    
      <div
        className="form-control d-flex justify-content-between align-items-center"
        onClick={() => setShowPicker(!showPicker)}
        style={{ minWidth: '320px', cursor: 'pointer' }}
      >
        {format(startDate, 'MMM dd, yyyy')} — {format(endDate, 'MMM dd, yyyy')}
        <i className="bi bi-calendar ms-2"></i>
      </div>

      {showPicker && (
  <div
    style={{
      position: 'absolute',
      zIndex: 10,
      background: '#fff',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      marginTop: '10px',
    }}
  >
    <div className="d-flex gap-4 justify-content-between flex-wrap">
      <div>
        <strong>Start Date</strong>
        <Calendar
          date={startDate}
          onChange={(date) => setStartDate(date)}
          maxDate={endDate}
        />
      </div>

      <div>
        <strong>End Date</strong>
        <Calendar
          date={endDate}
          onChange={(date) => setEndDate(date)}
          minDate={startDate}
        />
      </div>
    </div>
    <div className="d-flex justify-content-end gap-2 mt-3">
      <button className="btn btn-light" onClick={() => setShowPicker(false)}>
        Cancel
      </button>
      <button className="btn btn-primary" onClick={handleConfirm}>
        Confirm
      </button>
    </div>
  </div>
)}


      
    </div>
  );
};

export default DateRangePicker;

