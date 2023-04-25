
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Score.css';
import axios from 'axios';

const Score = ({ score, totalQuestions ,numEasyCorrect,numMediumCorrect,numHardCorrect }) => {
  useEffect(() => {
  // Post the results to the API
  const params = new URLSearchParams(window.location.search);
  const rollNumber = params.get('rollNumber');
  const studentName = params.get('studentName');
  const topic = params.get('topic');
  const point = score;
  const easy = numEasyCorrect;
  const medium = numMediumCorrect;
  const hard = numHardCorrect;

  axios.post('http://localhost:8000/api/result', { rollNumber, studentName, topic, point , easy , medium , hard })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}, [score]);


  return (
    <div className="score-section">
      <img src={require('../images/a3.gif')} alt="Your GIF" id="my-gif"></img>
      <h2>Quiz Completed!</h2>
      <p>Your score is {score}.</p>
      <div className="button-container">
        <Link to="/student-home"><button>Home</button></Link>
        <Link to="/"><button>Logout</button></Link>
      </div>
    </div>
  );
};

export default Score;










