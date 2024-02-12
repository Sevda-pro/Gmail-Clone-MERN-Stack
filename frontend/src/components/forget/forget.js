import './forget.css'
import React from 'react'
import axios from 'axios'
function Forget() {
    const [email,setEmail]=React.useState('')
    const handlebtn=async(e)=>{
        e.preventDefault()
        try {
        let obj={
            email:email
        }
        
            let res = await axios.post(`${process.env.REACT_APP_API_KEY}/password/fp`, obj);
            alert(res.data.message);
        } catch (error) {
            console.error('Axios Error:', error);
        }
    }
    return (
        <div className="containerforget">
            <h1>Forgot Your Password?</h1>
            <br/>
                <p>Enter your email below to reset your password.</p>

                <form id="forgotForm">
                    <label htmlFor="emailId">Email Address:</label>
                    <input type="email" name="email" id="emailId" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    <button type="submit" onClick={handlebtn}>Reset Password</button>
                </form>
        </div>
    )
}
export default Forget;