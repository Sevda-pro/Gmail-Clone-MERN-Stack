import { useState, useEffect } from 'react';
import './signup.css'
import { useNavigate } from 'react-router-dom'
import { FloatingLabel, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    async function signup(e) {
        e.preventDefault();
        let obj = {
            name: name,
            email: email,
            password: password
        }
        let obj1 = {
            email: email
        }
        let res = await axios.post(`${process.env.REACT_APP_API_KEY}`, obj)
        alert(res.data.message);
        setName('');
        setEmail('');
        setPassword('');
        signin();
    }
    function signin() {
        navigate('/login')
    }
    return (

        <div className="signup">
            <div className='formdiv'>
                <FloatingLabel controlId="floatingtext" label="Name" className="mb-3 s">
                    <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3 s">
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 s">
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FloatingLabel>
                <Button className='btn' onClick={signup}>Sign Up</Button>
                <Button className='btn2' onClick={signin}>Sign In</Button>
            </div>

        </div>

    )
}