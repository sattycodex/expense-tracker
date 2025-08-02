import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "./Loader";
import { useEffect } from "react";
import { isLoggedIn, saveToken } from '../utils/auth';


const OauthGoogle=()=>{
    const navigate=useNavigate();
    const [param]=useSearchParams();
    useEffect(()=>{   
        const token=param.get('token');
        if(token){
            saveToken(token);
            navigate('/dashboard');
        }else{
            navigate('/login')
        }
        
    },[])
    
    return(
        <Loader/>
    )

}

export default OauthGoogle;