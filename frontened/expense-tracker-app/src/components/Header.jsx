import { Link } from 'react-router-dom';
import './Header.css';
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
    <header className="minimal-header">
        <h1 className="logo"><Link to="/dashboard">Trackify</Link></h1>
    </header>
    )  
}
export default Header;