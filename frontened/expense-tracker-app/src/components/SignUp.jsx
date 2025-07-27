import './signIn.css'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, saveToken } from '../utils/auth';
import { useEffect } from 'react';
import { showError, showSuccess } from '../utils/alert';

const SignUp = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/dashboard');
        }
    }, [navigate]);


    const handleSubmit = async (event) => {
        const obj=Object.fromEntries(event.entries());
        try {
            const reponse=await axios.post('http://localhost:8080/api/auth/register', obj)
            showSuccess(reponse.data.message +" "+ "Please login to continue");
        } catch (error) {
            showError(error.response?.data?.message || "Login failed. Please try again.");
            console.error("Error during login:", error);  
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };  

    return (
        <div className='box'>
            <div className="sign-in-wrapper">
            <h2>Register</h2>
            <form action={handleSubmit} method="post">  
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" name='username' required />
                    </Form.Group>      
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name='email' required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='password' required />
                    </Form.Group>

                    <button type="submit">Register</button>
                
                <p>Already have an account? <span onClick={handleLogin} style={{"cursor":'pointer',color:'blue'}}>Login</span></p>
            </form>
        </div>
        </div>
        
    );
}

export default SignUp;