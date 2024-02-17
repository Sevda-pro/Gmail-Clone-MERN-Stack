import React, { useState,useEffect } from 'react';
import './sent.css';
import { RxCross2 } from "react-icons/rx";
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Alert from 'react-bootstrap/Alert';
const token = localStorage.getItem("token");
const Sent = ({ isOpen, onClose }) => {
    let ab = isOpen ? 'opensent' : '';
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
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
    return (
        <div className={`sentclass ${ab}`}>
           <div className='listclass'>
                <ul className="datalist">
                    {data.map((val) => (
                        <li key={val._id} className="Item" id={val._id}>
                            <span>
                               To: {val.mail} subject :{val.sub} message:{val.message}
                            </span>
                            
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sent;