import React from 'react';
import './compose.css';
import { RxCross2 } from "react-icons/rx";
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Alert from 'react-bootstrap/Alert';
const Compose = ({ isOpen, onClose }) => {
    const token = localStorage.getItem("token");
    const [mail, setMail] = React.useState('');
    const [sub, setSub] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [toptag,setTop]=React.useState(false)
    let ab = isOpen ? 'openclass' : '';
    const handleSubmit = async(e) => {
        e.preventDefault();
        let obj={
            mail:mail,
            sub:sub,
            message:message,
        }
        let res=await axios.post(`${process.env.REACT_APP_API_KEY}/compose`,obj, { headers: { Authorization: token } })
        if(res.status==200)
        {
            setTop(true);
            setMail('');
            setSub('');
            setMessage('')
            setTimeout(()=>{
                setTop(false)
                onClose();
            },2000)
            
        }
    };
    return (
        <div className={`composeclass ${ab}`}>
            <NavLink onClick={onClose} >
                <RxCross2 size={20} style={{ color: 'black', position: 'absolute', right: '0',top:'0' }} />
            </NavLink>
            <div>{toptag && (<Alert key='dark' variant='dark'>
          Email sent!
        </Alert>)}</div>
            <form onSubmit={handleSubmit} className='composeform'>
                <label>To:</label>
                <input type="email"  value={mail} onChange={(e)=>setMail(e.target.value)} required />

                <label>Subject:</label><br/>
                <input type="text"   value={sub} id='subjectinput' onChange={(e)=>setSub(e.target.value)} required />
                <br/>
                <label>Message:</label><br/>
                <textarea   rows="4" id='messageinput' value={message} onChange={(e)=>setMessage(e.target.value)} required></textarea>
                <button type="submit" id='btninput'>Send Email</button>
            </form>
            
        </div>
    );
};

export default Compose;