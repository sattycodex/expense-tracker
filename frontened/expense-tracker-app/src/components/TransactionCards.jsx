import 'bootstrap/dist/css/bootstrap.min.css';
import './TransactionCards.css'
import { useEffect, useState } from 'react';
import  Modal  from './Modal';
import moment from 'moment';
import axiosInstance from '../utils/axios-api';
import {showSuccess, showError } from '../utils/alert';
import React from 'react';



const ShowTransaction = ({ show, handleClose, transaction }) => {
  const {_id,description,amount,date,status,type}=transaction;
  const handleEdit=async (event)=>{
        const transaction=Object.fromEntries(event.entries());
        console.log(transaction)
        try {
            const response=await axiosInstance.put(`/transaction/update-transaction/${_id}`,transaction)
            showSuccess(response.data.message);
            handleClose();  
        } catch (error) {
            showError(error.response?.data?.message || "Something went wrong."); 
        }
    }

  return (
    <Modal isOpen={show} onClose={handleClose} title="Transaction Edit">
      <form action={handleEdit}>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" defaultValue={description} name="description" required />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" name="amount" defaultValue={amount} step="0.01" required />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" required />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select id="status" name="status" defaultValue={status} required>
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select id="type" name="type" defaultValue={type} required>
            <option value="">Select Type</option>
            <option value="salary">Salary</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <button type="submit">Edit Transaction</button>
      </form>
    </Modal>
  );
};



function TransactionCards({transaction} ) { 
  const {_id,description,amount,date,status,type}=transaction;
  const [show,setShow]=useState(false);
  const openModal=()=>setShow(true);
  const handleClose=()=>setShow(false);


  const handleDelete=async ()=>{
        try {
            const reponse=await axiosInstance.delete(`/transaction/delete-transaction/${_id}`,transaction)
            showSuccess(reponse.data.message); 
        } catch (error) {
            showError(error.response?.data?.message || "Something went wrong."); 
        }
    }

  return (
    <> 
       {show && (
        <ShowTransaction
          show={show}
          handleClose={handleClose}
          transaction={transaction}
        />
      )}
        <div className="transaction-row">
            <div className="transaction-details-primary">
                <i className="fas food {food}-icon"></i>
                <div className="text-group">
                    <div className="transaction-description">{description}</div>
                    <div className="transaction-date">{moment(date).format('MMMM Do YYYY')}</div>
                </div>
            </div>
            <div className={status=='completed'?"transaction-status status-completed":status=='pending'?"transaction-status status-pending":"transaction-status status-failed"   }>{status}</div>
            <div className= {type=='expense'? "transaction-amount transaction-amount-negative": "transaction-amount transaction-amount" }>₹{amount}</div>
            <div className="transaction-actions">
                <i className="fas fa-edit edit-icon" onClick={openModal}></i>
                <i className="fas fa-trash-alt delete-icon" onClick={handleDelete}></i>
            </div>
        </div>
    </>

    );
}

export default TransactionCards;