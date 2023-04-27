import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Teacher.css';

function Teacher() {
  return (
    <div className="teacher">
           <img src={require('../image/logo.PNG')} alt="Logo" id="logo" height={200} width={200} ></img>

      
      <h1>Government of Karnataka</h1>
      <p>A fun way to learn maths!</p>
      <div className="button-container">
        <Link to="/editpractice"> <button>Edit Practice</button></Link>
        <Link to="/editquiz"><button>Edit Quiz</button> </Link>
        <Link to="/scoreboard"><button>View Scoreboard</button></Link>
      </div>
    </div>
  );
}

export default Teacher;

