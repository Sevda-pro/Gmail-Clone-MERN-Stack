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
const token = localStorage.getItem("token");
const Home = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleProfileIconClick = () => {
      setSidebarOpen(!isSidebarOpen);
    };
  
    const handleCloseSidebar = () => {
      setSidebarOpen(false);
    };
    const handleComposeClick = () => {
        setSidebarOpen(!isSidebarOpen);
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
                <NavLink to="/home" className='compose'>
                <FaPen  size={30} style={{ color: 'brown' }} /><span className='currtext'>Compose</span>
                </NavLink>
                <NavLink to="/sent" className='sent'>
                <MdPresentToAll  size={35} style={{ color: 'brown' }} /><span className='currtext'>Sent</span>
                </NavLink><br/>
                <NavLink to="/sent" className='received'>
                <BsArrowDownSquareFill size={30} style={{ color: 'brown' }} /><span className='currtext'>Received</span>
                </NavLink>
            </div>
        </div>
    );
};

export default Home;
