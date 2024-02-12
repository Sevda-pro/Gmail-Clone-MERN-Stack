import { useState, useEffect } from 'react';
import '../signup/signup.css'
import {useNavigate,Navigate} from 'react-router-dom'
import {FloatingLabel,Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
export default function Login() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate();
    const func=()=>{
        navigate('/home');

    }
    async function signin(e) {
        e.preventDefault();
    
        try {
            let obj = {
                email: email,
                password: password
            };
    
            let res = await axios.post(`${process.env.REACT_APP_API_KEY}/login`, obj);
    
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('name', res.data.name);
                console.log('here')
                func();
            }
        } catch (error) {
            // Handle error appropriately
            console.error('Error during sign in:', error);
    
            // Example: Show an error message to the user
            // You might want to customize this based on your application's needs
            alert('Sign in failed. Please check your credentials and try again.');
        }
    }
    
    function signup(){
     navigate('/');
    }
   async function forget(){
      navigate('/forgetpassword')
    }
    return (
        
        <div className="signup">
            <div className='formdiv'>
            <FloatingLabel controlId="floatingInput"  label="Email address" className="mb-3">
                <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </FloatingLabel>
            <Button className='btn2' onClick={signup}>Sign Up</Button>
            <Button className='btn' onClick={signin}>Sign In</Button>
            <Button className='btn3' onClick={forget}>Forget Password</Button>

            </div>
            
        </div>

    )
}