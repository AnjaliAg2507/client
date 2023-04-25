
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import './styles/Practice.css';
import axios from 'axios';

import correctImage from '../images/correct.png';
import incorrectImage from '../images/incorrect.png';

const Practice = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFinishButton, setShowFinishButton] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');

 
  

  const fetchData = async (topic) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8000/api/practice?topic=${topic}`);
      console.log(data);
      setQuestions(_.shuffle(data));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopics = async () => {
  try {
    const { data } = await axios.get('http://localhost:8000/api/practice/topic');
    console.log(data); // <-- added console log
    setTopics(data);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchData(selectedTopic);
    fetchTopics();
  }, [selectedTopic]);

  useEffect(() => {
    setShowFinishButton(currentQuestion === questions.length - 1);
    if (answerStatus === null && questions.length > 0 && currentQuestion >= 0 && currentQuestion < questions.length) {
      setShuffledOptions(_.shuffle(questions[currentQuestion].options));
    }
  }, [currentQuestion, questions, answerStatus]);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('incorrect');
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setAnswerStatus(null);
      } else {
        setShowFinishButton(true);
      }
    }, 1200); 
  };

  const handleRestart = () => {
    setLoading(true);
    setQuestions([]);
    setCurrentQuestion(0);
    setShowFinishButton(false);
    setAnswerStatus(null);
    setShuffledOptions([]);
    setSelectedTopic('');
    fetchData(selectedTopic);
  };

  return (
    <>
       {selectedTopic === '' ? (
        <div className="topic-selector">
          <label>Select a topic:</label>
          <select id="topic-select" name="topic" value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>

            <option value="">-- Select --</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
          </div>
      ) : (
        loading ? (
          <div className="loading">Loading.</div>
        ) : (
          <div className="practice-container">
            <div className="practice-question-section">
              <div className="practice-question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="practice-question-text">{questions[currentQuestion].question}</div>
              {answerStatus && (
                <div className="practice-answer-status">
                  <img src={answerStatus === 'correct' ? correctImage : incorrectImage} alt={answerStatus} />
                </div>
              )}
            </div>
            <div className="practice-answer-section">
              {shuffledOptions && _.chunk(shuffledOptions, 2).map((optionChunk, i) => (
                <div className="practice-answer-row" key={i}>
                  {optionChunk.map((option) => (
                    <button className="practice-btn practice-btn-outline-primary" disabled={answerStatus} onClick={() => handleAnswerOptionClick(option === questions[currentQuestion].answer)}>
                      {option}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <div className="practice-navigation-section">
              {showFinishButton ? (
                <div>
                  <button onClick={handleRestart}>Restart</button>
                  <Link to="/"> <button>Finish</button></Link>
                </div>
              ) : (
                <div>
                  <button onClick={() => setCurrentQuestion(currentQuestion - 1)} disabled={currentQuestion === 0}>Previous</button>
                  <button onClick={() => setCurrentQuestion(currentQuestion + 1)} disabled={answerStatus}>Next</button>
                  {currentQuestion !== questions.length - 1 && <Link to="/student-home"><button>Home</button></Link>}
                </div>
              )}
            </div>
          </div>
        )
      )}
    </>
  );
};
export default Practice;
       


