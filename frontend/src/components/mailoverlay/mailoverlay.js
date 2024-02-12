import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
export default function Mailoverlay({ show, onClose }) {
    const [otp,setOtp]=React.useState('')
    async function handlebtn(e){
        let obj={
            otp:otp
        }
        let token=localStorage.getItem('token')
        let res=await axios.post(`${process.env.REACT_APP_API_KEY}/otpverification`,obj,{ headers: { Authorization: token } })
        
    }
    return (
        <div className='cartdiv'>

            <Modal show={show} onHide={onClose}>
                 <Modal.Header closeButton>
                    <Modal.Title>Please verify your email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label>Enter the otp here</label>
                        <input type='text' value={otp} onChange={(e)=>setOtp(e.currentTarget.value)}></input><button onClick={handlebtn}>Verify</button>
                    </form>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button className='cartprocessbtnclose' onClick={onClose}>
                        Close
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </div>

    );
}