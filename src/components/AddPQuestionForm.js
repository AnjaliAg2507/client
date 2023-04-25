import React, { useState } from 'react';
import axios from 'axios';
import './styles/QuestionForm.css';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const AddPQuestionForm = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');
  const [topic, setTopic] = useState('');
  
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!options.includes(answer)) {
      alert('Answer must be one of the options!');
      return;
    }

    try {
      console.debug("Submitting question form:", question, options, answer, topic);
      const response = await axios.post('http://localhost:8000/api/practice', {
        question,
        options,
        answer,
        topic,
      });
      console.debug("Question created:", response.data);
      const newQuestion = response.data;
      
      setQuestion('');
      setOptions(['', '', '', '']);
      setAnswer('');
      setTopic('');
      
      history.push('/editpractice');
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
        
        <label>Topic:</label>
        <input type="text" placeholder="Enter Topic" value={topic} onChange={(event) => setTopic(event.target.value)}/>

      </div>
      <div className="nav-button">
        <button type="submit">Submit</button>
        <Link to="/editpractice"><button>Cancel</button></Link>
      </div>

    </form>
  );
};

export default AddPQuestionForm;





