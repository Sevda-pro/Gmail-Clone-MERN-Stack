import './forget.css';
import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams
import {useNavigate} from 'react-router-dom'

function ResetP() {
    const { id } = useParams(); // Use useParams to get route parameters
    const [pass, setPass] = React.useState('');
    const [screenview, setScreenview] = React.useState(false);
    const navigate=useNavigate();

    const aftercall=()=>{
        setScreenview(true)
    }
    const handleloginbtn=()=>{
      navigate('/login');
    }
    const handlebtn = async (e) => {
        e.preventDefault();
        try {
            let obj = {
                password: pass,
            };

            let res = await axios.post(`${process.env.REACT_APP_API_KEY}/password/updatepassword/${id}`, obj);
            alert(res.data.message);
            aftercall();
        } catch (error) {
            console.error('Axios Error:', error);
        }
    };

    return (
        <div className="containerforget">
            <h1>Forgot Your Password?</h1>
            <br />
            <p>Enter your email below to reset your password.</p>

            <form id="forgotForm">
                <label htmlFor="passwordid">Enter your new password:</label>
                <input
                    type="password"
                    name="password"
                    id="passwordid"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required
                />
                <button type="submit" className='resetbtn' onClick={handlebtn}>
                    Change Password
                </button>
                {screenview && (
                <button type="submit" className='resetloginbtn' onClick={handleloginbtn}>
                    Login
                </button>)

                }
            </form>
        </div>
    );
}

export default ResetP;
