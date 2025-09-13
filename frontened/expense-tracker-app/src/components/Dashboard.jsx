import RightBar from "./RightBar";
import './Dashboard.css';
import Transactions from "./Transactions";
import LeftBar from "./LeftBar";
import { isLoggedIn } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Dashboard = () => {
    const logged=isLoggedIn();
    const navigate = useNavigate();
    useEffect(() => {
        if (!logged) {
            navigate('/login');
        }               
    }, [logged, navigate]);
    
    return(
    <>
       
        <div className="container-fluid">
            <div className="row dashboard-wrapper">
                <div className="col-md-2 left-side">
                    <LeftBar/>
                </div>
                <div className="col-md-6 main-content">
                   <Transactions />
                </div>
                <div className="col-md-4 right-side">
                    <RightBar/>
                </div>
            </div>
        </div>
    </>
    )
    
}
export default Dashboard;