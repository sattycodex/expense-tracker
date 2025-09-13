import 'bootstrap/dist/css/bootstrap.min.css';
import './LeftBar.css';
import { Link } from 'react-router-dom';
import { isLoggedIn ,logout} from '../utils/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  Modal  from './Modal';
import axiosInstance from '../utils/axios-api';
import {showSuccess, showError } from '../utils/alert';

const AddModal=({ show, handleClose})=>{
        const handleTransaction=async (event)=>{
            const obj=Object.fromEntries(event.entries());
            try {
                const response =await axiosInstance.post('/transaction/create-transaction',obj)
                handleClose(); 
                showSuccess(response.data.message); 
            } catch (error) {
                showError(error.response?.data?.message || "Something went wrong."); 
            }
        }

        return (
            <Modal isOpen={show} onClose={handleClose} title="Add Transaction">
                <form action={handleTransaction}>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" name="description" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input type="number" id="amount" name="amount" step="0.01" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select id="status" name="status" required>
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <select id="type" name="type" required>
                        <option value="">Select Type</option>
                        <option value="salary">Salary</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                <button type="submit">Add Transaction</button>
            </form>
            </Modal>
        )
    }

const LeftBar = () => {
    const isLoggedInUser = isLoggedIn();
    const navigate = useNavigate();

    useEffect(()=>{},[isLoggedInUser])
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const [show,setShow]=useState(false);
    const openAddTransaction=()=>setShow(true);
    const handleClose=()=>setShow(false);

  return (
    <>
        {show && <AddModal 
                    show={show}
                    handleClose={handleClose}/>
        }
        <div className="sidebar d-flex flex-column justify-content-between p-3">
        <div>
        
            <ul className="nav flex-column">
            <li className="nav-item">
                <Link to="/dashboard" className="nav-link text-dark">🏠 Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link to="/expense" className="nav-link text-dark">💰 Expense</Link>
            </li>
            <li className="nav-item">
                <Link to="/income" className="nav-link text-dark">📲 Income</Link>
            </li>
            <li className="nav-item">
                <Link to="/reports" className="nav-link text-dark">📊 Reports</Link>
            </li>
            </ul>
        </div>

        <div className='settings-icon'>
            <span onClick={openAddTransaction} style={{cursor:'pointer'}}> ✚ Add Transaction</span>
            <Link to="#" className="nav-link text-dark">
            →<span onClick={handleLogout} style={{"cursor":'pointer',color:'black'}}>Logout</span>
            </Link>
        </div>
        </div>
    </>
  );
};

export default LeftBar;
