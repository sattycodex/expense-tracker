import { Link } from 'react-router-dom';
import './header.css';
import { isLoggedIn ,logout} from '../utils/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Header=()=>{
    const isLoggedInUser = isLoggedIn();
    const navigate = useNavigate();
    useEffect(() => {
    }, [isLoggedInUser]);
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    
    return (
    <>
        <div className="navbar-wrapper">
            <img src="/app-logo.png" alt="app-logo" />
            <div className='user-auth'>
                {
                    isLoggedInUser ? (
                        <>
                            <span onClick={handleLogout} style={{"cursor":'pointer',color:'black'}}>Logout</span>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className='nav-link'>Login</Link>
                            <Link to="/register" className='nav-link'>Register</Link>
                        </>
                    )
                }
               
            </div>
        </div>
    </>
    )  
}
export default Header;