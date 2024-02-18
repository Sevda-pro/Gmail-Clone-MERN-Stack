import React, { useEffect } from 'react';
import './received.css';
import { RxCross2 } from "react-icons/rx";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import axios from 'axios';

const Received = ({ isOpen, onClose }) => {
    const token = localStorage.getItem("token");
    const [data, setData] = React.useState([]);
    const [datalength, setDatalength] = React.useState(0);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_KEY}/received`, {
                headers: { Authorization: token },
            });
            setData(response.data.result);
            // Count only unread messages
            const unreadCount = response.data.result.filter(message => !message.isRead).length;
            setDatalength(unreadCount);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const markAsRead = async (messageId) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_KEY}/received/${messageId}/read`, {}, {
                headers: { Authorization: token },
            });
            fetchData(); // Re-fetch data to update the list with the read status
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={`receivedclass ${isOpen ? 'openreceived' : ''}`}>
            <RxCross2 size={20} onClick={onClose} style={{ cursor: 'pointer', color: 'black', position: 'absolute', right: '0', top: '0' }} />
            <MdOutlineMarkUnreadChatAlt size={30} style={{ color: 'black', position: 'absolute', left: '0', top: '0' }} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{datalength}</span>
            <div className='listtclass'>
                <ul className="datalistt">
                    {data.map((val) => (
                        <li key={val._id} className={`receivedItem ${val.isRead ? 'read' : 'unread'}`} id={val._id} onClick={() => markAsRead(val._id)}>
                            <span>
                                <span>From: {val.from} <br/></span>
                                <span>Subject: {val.sub}<br/></span>
                                <span>Message: {val.message}</span>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Received;
