import 'bootstrap/dist/css/bootstrap.min.css';
import './TransactionCards.css'
import { useState } from 'react';
import Loader from './Loader';
import  Modal  from './Modal';


function TransactionCards({ transactions }) {

    
  const [show,setShow]=useState(false);
  const handleModal=()=>setShow(true);
  const handleClose=()=>setShow(false);

  const  ShowTransaction=()=>{
    return (
        <Modal isOpen={show} onClose={handleClose} title="Transaction Edit">
            <form action="#" method="post">
            <div class="form-group">
                <label for="description">Description:</label>
                <input type="text" id="description" name="description" required/>
            </div>

            <div class="form-group">
                <label for="amount">Amount:</label>
                <input type="number" id="amount" name="amount" step="0.01" required/>
            </div>

            <div class="form-group">
                <label for="date">Date:</label>
                <input type="date" id="date" name="date" required/>
            </div>

            <div class="form-group">
                <label for="status">Status:</label>
                <select id="status" name="status" required>
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <div class="form-group">
                <label for="type">Type:</label>
                <select id="type" name="type" required>
                    <option value="">Select Type</option>
                    <option value="salary">Salary</option>
                    <option value="expense">Expense</option>
                </select>
            </div>

            <button type="submit">Submit Entry</button>
        </form>
        </Modal>
    )
  }

  return (
    <> 
       {show && <ShowTransaction/>}
        <div className="transaction-row">
            <div className="transaction-details-primary">
                <i className="fas food {food}-icon"></i>
                <div className="text-group">
                    <div className="transaction-description">Money Transfer</div>
                    <div className="transaction-date">July 28, 2025</div>
                </div>
            </div>
            <div className="transaction-status status-completed">Completed</div>
            <div className="transaction-amount transaction-amount-negative">-$250.00</div>
            <div className="transaction-actions">
                <i className="fas fa-edit edit-icon" onClick={handleModal}></i>
                <i className="fas fa-trash-alt delete-icon"></i>
            </div>
        </div>
    </>

    );
}

export default TransactionCards;