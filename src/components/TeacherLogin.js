import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles/TeacherLogin.css';

function TeacherLogin() {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputErrors, setInputErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameChange = (event) => {
  setUsername(event.target.value);
  setInputErrors({});
  setErrorMessage('');
};

const handlePasswordChange = (event) => {
  setPassword(event.target.value);
  setInputErrors({});
  setErrorMessage('');
};

  const handleLogin = () => {
  
  if (!username || !password) {
    setInputErrors({
      username: !username && 'Username is required !!',
      password: !password && 'Password is required !!',
    });
    setErrorMessage('');
    return;
  }

  
  if (username === 'admin' && password === 'admin123') {
    
    history.push('/teacher');
  } else {
    
    setErrorMessage('Invalid username or password !!');
  }
};
  return (
    <div className="wrapper">
      <form className="form">
        <h1 className="title">Login</h1>
        <div className="input-group">
          <label className="label">Username:</label>
          <input className="input" type="text" value={username} onChange={handleUsernameChange} />
          {inputErrors.username && <p className="error">{inputErrors.username}</p>}
        </div>
        <div className="input-group">
          <label className="label">Password:</label>
          <input className="input" type="password" value={password} onChange={handlePasswordChange} />
          {inputErrors.password && <p className="error">{inputErrors.password}</p>}
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button className="button" type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      
    </div>
  );
}

export default TeacherLogin;
