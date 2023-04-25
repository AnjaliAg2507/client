import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';
import './styles/Quiz.css';
import Score from './Score';
import axios from 'axios';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [numEasyCorrect, setNumEasyCorrect] = useState(0);
const [numMediumCorrect, setNumMediumCorrect] = useState(0);
const [numHardCorrect, setNumHardCorrect] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPostedResults, setHasPostedResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const topic = searchParams.get('topic');

  useEffect(() => {
  setIsLoading(true);

  const easyQuestions = 4;
  const mediumQuestions = 3;
  const hardQuestions = 3;
  const allQuestions = [];

  axios
    .get(`http://localhost:8000/api/questions?topic=${encodeURIComponent(topic)}`)
    .then((response) => {
      const questions = response.data;

      
      const easy = questions.filter(q => q.difficulty === 'easy');
      const medium = questions.filter(q => q.difficulty === 'medium');
      const hard = questions.filter(q => q.difficulty === 'hard');

      
      for (let i = 0; i < easyQuestions; i++) {
        const randIndex = Math.floor(Math.random() * easy.length);
        allQuestions.push(easy[randIndex]);
        easy.splice(randIndex, 1);
      }

      for (let i = 0; i < mediumQuestions; i++) {
        const randIndex = Math.floor(Math.random() * medium.length);
        allQuestions.push(medium[randIndex]);
        medium.splice(randIndex, 1);
      }

      for (let i = 0; i < hardQuestions; i++) {
        const randIndex = Math.floor(Math.random() * hard.length);
        allQuestions.push(hard[randIndex]);
        hard.splice(randIndex, 1);
      }

      
      const shuffledQuestions = _.shuffle(allQuestions);

      console.log('Topic:', topic);
      console.log('Fetched Questions:', shuffledQuestions);
      setQuestions(shuffledQuestions);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
}, [topic]);


  const handleAnswerOptionClick = (isCorrect, difficulty) => {
  let questionScore = 0;
  if (isCorrect) {
    if (difficulty === 'easy') {
      questionScore = 1;
      setNumEasyCorrect(numEasyCorrect + 1);
    } else if (difficulty === 'medium') {
      questionScore = 3;
      setNumMediumCorrect(numMediumCorrect + 1);
    } else if (difficulty === 'hard') {
      questionScore = 4;
      setNumHardCorrect(numHardCorrect + 1);
    }
    setScore(score + questionScore);
  }

  const nextQuestion = currentQuestion + 1;
  if (nextQuestion < questions.length) {
    setCurrentQuestion(nextQuestion);
  }
  setAnsweredQuestions(answeredQuestions + 1);
  if (answeredQuestions >= 9) {
    setShowScore(true);
  }
};

  useEffect(() => {
    console.log('Current Score:', score);
  }, [score]);

  return (
    <div className="quiz">
      {isLoading ? (
        <div className="loading">Loading</div>
      ) : showScore ? (
        <Score
          score={score}
          totalQuestions={questions.length}
          hasPostedResults={hasPostedResults}
          setHasPostedResults={setHasPostedResults}
          numEasyCorrect={numEasyCorrect}
          numMediumCorrect={numMediumCorrect}
          numHardCorrect={numHardCorrect}
        />
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/10
            </div>
            <div className="question-text">{questions[currentQuestion].question}</div>
            <div className="difficulty-level">
              Difficulty level: {questions[currentQuestion].difficulty}
            </div>
          </div>
          <div className="answer-section">
            {_.chunk(_.shuffle(questions[currentQuestion].options), 2).map((optionChunk) => (
              <div className="answer-row">
                {optionChunk.map((option) => (
                  <button
                    onClick={() =>
                      handleAnswerOptionClick(
                        option === questions[currentQuestion].answer,
                        questions[currentQuestion].difficulty
                      )
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;

