import React, { useState,useEffect } from 'react';
import './sent.css';
import { RxCross2 } from "react-icons/rx";
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Alert from 'react-bootstrap/Alert';
const Sent = ({ isOpen, onClose }) => {
    let ab = isOpen ? 'opensent' : '';
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (!token) {
            setError('Authentication token not available.');
            return;
          }
  
          const response = await axios.get(`${process.env.REACT_APP_API_KEY}/sent`, {
            headers: { Authorization: token },
          });
  
          setData(response.data.result);
        } catch (error) {
          setError('Error fetching sent emails. Please try again.');
          console.error('Error fetching sent emails:', error);
        }
      };
  
      fetchData();
    }, []);
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (!token) {
            setError('Authentication token not available.');
            return;
          }
  
          const response = await axios.get(`${process.env.REACT_APP_API_KEY}/sent`, {
            headers: { Authorization: token },
          });
  
          setData(response.data.result);
        } catch (error) {
          setError('Error fetching sent emails. Please try again.');
          console.error('Error fetching sent emails:', error);
        }
      };
  
      fetchData();
    }, [data]);
    return (
        <div className={`sentclass ${ab}`}>
            <NavLink onClick={onClose} >
                <RxCross2 size={20} style={{ color: 'black', position: 'absolute', right: '0',top:'0' }} />
            </NavLink>
           <div className='listclass'>
                <ul className="datalist">
                    {data.map((val) => (
                        <li key={val._id} className="Item" id={val._id}>
                            <span>
                              <span>To: {val.mail} <br/></span><span> subject :{val.sub}<br/> </span><span>message:{val.message}</span>
                            </span>
                            
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sent;