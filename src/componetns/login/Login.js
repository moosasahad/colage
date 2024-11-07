import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://newbackendproject.onrender.com/login', {
        username,
        password
      });
      console.log("djfhkjdhfs");

      if (response.status === 200) {
        console.log("login");
        
        // Handle successful login (e.g., redirect or update UI)
        console.log('Login successful:', response.data);
        localStorage.setItem('id',response.data.id);
        navigate('/Registration')


      }
    } catch (err) {
      // Handle errors
      setError(err.response?.data?.message || 'Login failed');
      console.error('Error during login:', err);
      console.log("error");
      
    }
  };

  return (
    <div id="login-page">
      <div className='maindiv'>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          {error && <div id="login-error" className="text-danger mt-3">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
