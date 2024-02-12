import './App.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/login';
import Home from './components/home/home';
import ContactUs from './components/contact/contact';
import Signup from './components/signup/signup';
import Forget from './components/forget/forget';
import ResetP from './components/forget/resetp';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const PrivateRoute = (props) => {
    return token ? props.val : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute val={<Home />} />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<Forget />} />
        <Route path="/resetpassword/:id" element={<ResetP />} />
      </Routes>
    </Router>
  );
}

export default App;
