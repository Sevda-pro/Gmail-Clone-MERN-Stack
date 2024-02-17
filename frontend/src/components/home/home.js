import './home.css';
import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Spinner, Card, Button, Alert } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import { Cart3, BoxArrowRight } from 'react-bootstrap-icons';
import axios from 'axios';
import { IoLogOutOutline } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { CgMail } from "react-icons/cg";
import Mailoverlay from '../mailoverlay/mailoverlay';
import { CgProfile } from "react-icons/cg";
import { SiGmail } from "react-icons/si";
import { FcBusinessman } from "react-icons/fc";
import { MdPresentToAll } from "react-icons/md";
import { BsArrowDownSquareFill } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import Sidebar from '../Sidebar/sidebar';
import Compose from '../compose/compose';
import Sent from '../sent/sent';
import Received from '../received/received';
const token = localStorage.getItem("token");
const Home = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isComposeOpen, setComposeOpen] = useState(false);
    const [isSentOpen, setSentOpen] = useState(false);
    const [isReceivedOpen, setReceivedOpen] = useState(false);
    const handleProfileIconClick = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleCloseSidebar = () => {
        setSidebarOpen(false);
    };
    const handleComposeClick = () => {
        setComposeOpen(!isComposeOpen);
    };
    const handleCloseCompose = () => {
        setComposeOpen(false);
    };
    const handleSentClick = () => {
        setSentOpen(!isSentOpen);
    };
    const handleCloseSent = () => {
        setSentOpen(false);
    };
    const handleReceivedClick = () => {
        setReceivedOpen(!isReceivedOpen);
    };
    const handleCloseReceived = () => {
        setReceivedOpen(false);
    };
    return (
        <div className='homediv'>
            <div className='navbody'>
                <NavLink onClick={handleProfileIconClick} className='profileicon'>
                    <FcBusinessman size={30} style={{ color: 'skyblue' }} />
                </NavLink>
                <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
                <NavLink to="/home" className='curr'>
                    <SiGmail size={30} style={{ color: 'brown' }} /><span className='currtext'>Home</span>
                </NavLink>
                <NavLink onClick={handleComposeClick} className='compose'>
                    <FaPen size={30} style={{ color: 'brown' }} /><span className='currtext'>Compose</span>
                </NavLink>
                <Compose isOpen={isComposeOpen} onClose={handleCloseCompose} />
                <Sent isOpen={isSentOpen} onClose={handleCloseSent} />
                <NavLink onClick={handleSentClick} className='sent'>
                    <MdPresentToAll size={35} style={{ color: 'brown' }} /><span className='currtext'>Sent</span>
                </NavLink><br />
                <Sent isOpen={isSentOpen} onClose={handleCloseSent} />
                <NavLink onClick={handleReceivedClick} className='received'>
                    <BsArrowDownSquareFill size={30} style={{ color: 'brown' }} /><span className='currtext'>Received</span>
                </NavLink>
                <Received isOpen={isReceivedOpen} onClose={handleCloseReceived} />
            </div>
        </div>
    );
};

export default Home;
