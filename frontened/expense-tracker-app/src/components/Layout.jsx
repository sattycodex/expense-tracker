import Header from "./Header"
import { Outlet } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Layout = () => {
    const logged=isLoggedIn();
    const navigate = useNavigate();
    useEffect(() => {
        if (!logged) {
            navigate('/login');
        }else{
            navigate('/dashboard')
        }               
    }, [logged, navigate]);
    return(
        <>
        <Header />
        <Outlet/>
        </>
    )
}

export default Layout;
