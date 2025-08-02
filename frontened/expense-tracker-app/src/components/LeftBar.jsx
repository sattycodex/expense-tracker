import 'bootstrap/dist/css/bootstrap.min.css';
import './LeftBar.css';
import { Link } from 'react-router-dom';
import { isLoggedIn ,logout} from '../utils/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LeftBar = () => {
    const isLoggedInUser = isLoggedIn();
    const navigate = useNavigate();
    useEffect(() => {
    }, [isLoggedInUser]);
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
  return (
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
        <Link to="#" className="nav-link text-dark">
           →<span onClick={handleLogout} style={{"cursor":'pointer',color:'black'}}>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default LeftBar;
