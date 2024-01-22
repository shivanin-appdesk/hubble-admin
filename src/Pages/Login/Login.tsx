import React, { useState } from 'react';
import axios from 'axios';
import './Login.scss';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setCredentials((prevCredentials) => ({
    ...prevCredentials,
    [name]: value,
  }));
};


 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await axios.post('YOUR_LOGIN_API_ENDPOINT', credentials);
    const token = response.data.token; 
    console.log('Login successful. Token:', token);
  } catch (error: any) {
    console.error('Login failed:', error.message);
  }
};


  return (
    <div>
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
