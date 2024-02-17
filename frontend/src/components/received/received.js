import React, { useEffect } from 'react';
import './received.css';
import { RxCross2 } from "react-icons/rx";
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Alert from 'react-bootstrap/Alert';
const token = localStorage.getItem("token");
const Received = ({ isOpen, onClose }) => {
    let ab = isOpen ? 'openreceived' : '';
    const [data,setData]=React.useState([]);
    return (
        <div className={`receivedclass ${ab}`}>
           
        </div>
    );
};

export default Received;