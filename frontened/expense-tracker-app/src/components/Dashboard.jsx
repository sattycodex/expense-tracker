import RightBar from "./RightBar";
import './dashboard.css';
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
                <div className="col-2 left-side">
                    <LeftBar/>
                </div>
                <div className="col-6 main-content">
                   <Transactions />
                </div>
                <div className="col-4 right-side">
                    <RightBar/>
                </div>
            </div>
        </div>
    </>
    )
    
}
export default Dashboard;