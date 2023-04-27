import React from 'react';
import { Link } from 'react-router-dom';
import './styles/StartScreen.css';

function StartScreen() {
  return (
    <div className="StartScreen">
    
      <img src={require('../image/logo.PNG')} alt="Logo" id="logo" height={200} width={200} ></img>
      
      <h1>Government of Karnataka</h1>
      <p>A fun way to learn maths!</p>
      <div className="button-container">
        <Link to="/teacher-login"><button>Teacher</button></Link>
        <Link to="/student-home"><button>Student</button></Link>
      </div>
    </div>
  );
}

export default StartScreen;






