import React from 'react';
import './sidebar.css';
import { RxCross2 } from "react-icons/rx";
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import { CgMail } from "react-icons/cg";
import Mailoverlay from '../mailoverlay/mailoverlay';
import axios from 'axios'
const token = localStorage.getItem("token");
const name = localStorage.getItem('name')
const Sidebar = ({ isOpen, onClose }) => {
    const [mail, setMail] = React.useState(false);
    const [mailoverlay, setMailoverlay] = React.useState(false);
    let a = isOpen ? 'open' : '';
    const handleClosemail=async()=>{
        setMailoverlay(false)
    }
    const mailclick = async() => {
        setMailoverlay(true)
    }
    const checkemail = async () => {
        let res = await axios.get(`${process.env.REACT_APP_API_KEY}/check`, { headers: { Authorization: token } })
        if (res.data.result == false) setMail(false);
        else setMail(true);
    }
    React.useEffect(() => {
        checkemail();
    }, [])
    return (
        <div className={`sidebar ${a}`}>
            <span id='spannameid'>Signed in as : {name}</span><br/>
            <NavLink onClick={onClose} >
                <RxCross2 size={20} style={{ color: 'black', position: 'absolute', right: '0',top:'0' }} />
            </NavLink>
            {mail == false && (<Mailoverlay show={mailoverlay} onClose={handleClosemail} />)}
            <NavLink className='verifymailbtn' onClick={mailclick}>
                <CgMail size={30} style={{ color: 'black'}} />
            </NavLink>
            <span>{mail == true ? 'verified user' : 'Please verify your email id'}</span>
        </div>
    );
};

export default Sidebar;