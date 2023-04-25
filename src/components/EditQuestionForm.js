import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles/QuestionForm.css';


const EditQuestionForm = () => {
  const location = useLocation();
  const { questionId, question } = location.state;
const [questionData, setQuestion] = useState(question.question);
  const [optionA, setOptionA] = useState(location.state.question.options[0]);
  const [optionB, setOptionB] = useState(location.state.question.options[1]);
  const [optionC, setOptionC] = useState(location.state.question.options[2]);
  const [optionD, setOptionD] = useState(location.state.question.options[3]);
  const [answer, setAnswer] = useState(location.state.question.answer);
  const [difficulty, setDifficulty] = useState(location.state.question.difficulty);
  const [topic, setTopic] = useState(location.state.question.topic);
  
  
  const history = useHistory();

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleOptionAChange = (event) => {
    setOptionA(event.target.value);
  };

  const handleOptionBChange = (event) => {
    setOptionB(event.target.value);
  };

  const handleOptionCChange = (event) => {
    setOptionC(event.target.value);
  };

  const handleOptionDChange = (event) => {
    setOptionD(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleTopicChange = (event) => {
  setTopic(event.target.value);
};

  const handleSubmit = async (event) => {
  event.preventDefault();

  // check if answer is one of the options
  if (![optionA, optionB, optionC, optionD].includes(answer)) {
    alert('Answer must be one of the options');
    return;
  }

  

  try {
    const updatedQuestion = {
      question: questionData,
      options: [optionA, optionB, optionC, optionD],
      answer: answer,
      difficulty: difficulty,
      topic: topic,
    };

    await axios.put(`http://localhost:8000/api/questions/${questionId}`, updatedQuestion);

    
    history.push('/editquiz');
  } catch (error) {
    console.error(error);
  }
};


return (
  <form className="add-form" onSubmit={handleSubmit}>
    <h1>Edit Question</h1>
    
    <div className="form-control">
      <label>Question:</label>
      <input type="text" name="question" value={questionData} onChange={handleQuestionChange} />
      <label >Option A:</label>
      <input type="text" name="optionA" value={optionA} onChange={handleOptionAChange} />
      <label >Option B:</label>
      <input type="text" name="optionB" value={optionB} onChange={handleOptionBChange} />
      <label >Option C:</label>
      <input type="text" name="optionC" value={optionC} onChange={handleOptionCChange} />
      <label >Option D:</label>
      <input type="text" name="optionD" value={optionD} onChange={handleOptionDChange} />
      <label>Answer:</label>
      <input type="text"  placeholder="Enter Answer" value={answer} onChange={handleAnswerChange} />
      <label >Difficulty:</label>
      <div className="radio">
      <label >
        <input type="radio" id="difficultyEasy" name="difficulty" value="easy" checked={difficulty === "easy"} onChange={handleDifficultyChange} />
          Easy
      </label>
      <label >
          <input type="radio" id="difficultyMedium" name="difficulty" value="medium" checked={difficulty === "medium"} onChange={handleDifficultyChange} />
          Medium
      </label>
      <label >
          <input type="radio" id="difficultyHard" name="difficulty" value="hard" checked={difficulty === "hard"} onChange={handleDifficultyChange} />
          Hard
      </label>
      </div>
      <label>Topic:</label>
      <input type="text" name="topic" value={topic} onChange={handleTopicChange} />
      
    </div>
  <div className="nav-button">
        <button type="submit">Submit</button>
        <Link to="/editquiz"><button>Cancel</button></Link>
    </div>
  </form>
);
};
export default EditQuestionForm;
