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
const token = localStorage.getItem("token");
const Home = () => {
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [expalert, setAlert] = useState(false);
    const [mail, setMail] = useState(false);
    const [mailoverlay, setMailoverlay] = useState(false);
    const [name, setName] = useState(localStorage.getItem('name'));
    const navigate = useNavigate();
    
    const handleClosemail = async () => {
        setMailoverlay(false)
    }
    const mailclick = async () => {
        setMailoverlay(true)
    }
    const checkemail = async () => {
        let res = await axios.get(`${process.env.REACT_APP_API_KEY}/check`, { headers: { Authorization: token } })
        if (res.data.result == false) setMail(false);
        else setMail(true);
    }
    const handleClick = () => {
        navigate('/all')
    }
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }
    const addexpense = async (e) => {
        e.preventDefault();
        try {
            var obj = {
                price: price,
                desc: desc,
                category: category
            };


            let res = await axios.post(`${process.env.REACT_APP_API_KEY}/expense`, obj, { headers: { Authorization: token } });
            if (res.status === 201) {
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 2000);
            }


        } catch (error) {
            console.error("Error posting data:", error);
        }
    }
    useEffect(() => {
        checkemail();
    }, [])

    return (
        <div className='homediv'>
            <div className='navbody'>

                <NavLink className='profileicon'>
                <CgProfile  size={30} style={{ color:'skyblue' }} />
                </NavLink>    
                <NavLink to="/home" className='curr'>
                <SiGmail size={30} style={{ color:'brown' }} /><span className='currtext'>Home</span>
                </NavLink>             
            </div>
        </div>
    );
};

export default Home;
