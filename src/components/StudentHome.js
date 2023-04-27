import React from 'react';
import { Link } from 'react-router-dom';
import './styles/StudentHome.css';
import Quiz from './Quiz';

function StudentHome() {
  return (
    <div className="StudentHome">
    
      <img src={require('../image/logo.PNG')} alt="Logo" id="logo" height={200} width={200} ></img>
      
      <h1>Government of Karnataka</h1>
      <p>A fun way to learn maths!</p>
      <div className="button-container">
        <Link to="/practice"> <button>Practice</button></Link>
        <Link to="/Student-login"><button>Start Quiz</button> </Link>
      </div>
    </div>
  );
}

export default StudentHome;