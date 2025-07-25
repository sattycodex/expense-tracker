import './SignIn.css'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { isLoggedIn, saveToken } from '../utils/auth';
import { useEffect } from 'react';
import { showError, showSuccess } from '../utils/alert';


const SignIn = () => {
    const navigate = useNavigate();
    useEffect(() => {

        if (isLoggedIn()) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleRegister = () => {
        navigate('/register');
    };

    const handleSubmit = async (event) => {
        const obj=Object.fromEntries(event.entries());
        try {
            const reponse=await axios.post('http://localhost:8080/api/auth/login', obj)
            console.log(reponse)
            saveToken(reponse.data.data.token);
            showSuccess(reponse.data.message);
            navigate('/dashboard');
            
        } catch (error) {
            showError(error.response?.data?.message || "Login failed. Please try again.");
            console.error("Error during login:", error);
            
        }
    };
    return (
        <div className='box'>
            <div className="sign-in-wrapper">
            <h2>Login</h2>
            <form action={handleSubmit} method="post">        
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name='email' required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='password' required />
                    </Form.Group>

                    <button type="submit">Login</button>
                
                <p>Don't have an account? <span onClick={handleRegister} style={{"cursor":'pointer',color:'blue'}}>Register</span></p>
            </form>
        </div>
        </div>
        
    );
}

export default SignIn;