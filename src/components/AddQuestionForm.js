
import React, { useState } from 'react';
import axios from 'axios';
import './styles/QuestionForm.css';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const AddQuestionForm = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [topic, setTopic] = useState('');
  const history = useHistory();

const handleSubmit = async (event) => {
  event.preventDefault();

  if (!options.includes(answer)) {
    alert('Answer must be one of the options!');
    return;
  }

  try {
    console.debug("Submitting question form:", question, options, answer, difficulty);
    const response = await axios.post('http://localhost:8000/api/questions', {
      question,
      options,
      answer,
      difficulty,
      topic,
    });
    console.debug("Question created:", response.data);
    const newQuestion = response.data;
    
    setQuestion('');
    setOptions(['', '', '', '']);
    setAnswer('');
    setDifficulty('');
    setTopic('');
    
    history.push('/editquiz');
  } catch (error) {
    console.error(error);
  }
};

  const handleOptionChange = (index, value) => 
  {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h1>Add Question </h1>
      <div className="form-control">
        <label>Question</label>
        <input
          type="text"
          placeholder="Enter question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
      
        <label>Option A</label>
        <input
          type="text"
          placeholder="Enter option A"
          value={options[0]}
          onChange={(event) => handleOptionChange(0, event.target.value)}
        />
     
        <label>Option B</label>
        <input
          type="text"
          placeholder="Enter option B"
          value={options[1]}
          onChange={(event) => handleOptionChange(1, event.target.value)}
        />
     
        <label>Option C</label>
        <input
          type="text"
          placeholder="Enter option C"
          value={options[2]}
          onChange={(event) => handleOptionChange(2, event.target.value)}
        />
      
        <label>Option D</label>
        <input
          type="text"
          placeholder="Enter option D"
          value={options[3]}
          onChange={(event) => handleOptionChange(3, event.target.value)}
        />

        <label>Answer:</label>
  <input type="text"  placeholder="Enter Answer" value={answer} onChange={(event) => setAnswer(event.target.value)}/>

		<label>Difficulty</label>
		  <div className="radio">
		    <label>
		      <input
		        type="radio"
		        name="difficulty"
		        value="easy"
		        checked={difficulty === "easy"}
		        onChange={(event) => setDifficulty(event.target.value)}
		      />
		      Easy
		    </label>
		    <label>
		      <input
		        type="radio"
		        name="difficulty"
		        value="medium"
		        checked={difficulty === "medium"}
		        onChange={(event) => setDifficulty(event.target.value)}
		      />
		      Medium
		    </label>
		    <label>
		      <input
		        type="radio"
		        name="difficulty"
		        value="hard"
		        checked={difficulty === "hard"}
		        onChange={(event) => setDifficulty(event.target.value)}
		      />
		      Hard
		    </label>
	    </div>
      <label>Topic:</label>
        <input type="text" placeholder="Enter Topic" value={topic} onChange={(event) => setTopic(event.target.value)}/>

	  
	</div>
		<div className="nav-button">
		    <button type="submit">Submit</button>
		    <Link to="/editquiz"><button>Cancel</button></Link>
		</div>



	</form>
);
};

export default AddQuestionForm;
       
