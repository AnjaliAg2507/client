import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Crud.css';
import { Link } from 'react-router-dom';
import EditQuestionForm from './EditQuestionForm';
import AddQuestionForm from './AddQuestionForm';
import { useHistory } from "react-router-dom";

const EditQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [topics, setTopics] = useState([]);
  const history = useHistory();

    const fetchQuestions = async (topic) => {
      setLoading(true);
    try {
      let url = 'http://localhost:8000/api/questions';
      if (topic) {
        url += `?topic=${topic}`;
      }
      const { data } = await axios.get(url);
      setQuestions(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopics = async () => {
  try {
    const { data } = await axios.get('http://localhost:8000/api/questions/topic');
    console.log(data); // <-- added console log
    setTopics(data);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchQuestions(selectedTopic);
    fetchTopics();
  }, [selectedTopic]);

  

  const handleEditClick = (question) => {
  history.push({
    pathname: "/EditQuestionForm",
    state: { questionId: question._id, question: question }
  });
};

  /*const handleTopicChange = (event) => {
  const topic = event.target.value;
  if (!topics.includes(topic)) {
    setSelectedTopic('');
  } else {
    setSelectedTopic(topic);
    fetchQuestions(topic);
  }
};*/
const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
  };
  
  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(`http://localhost:8000/api/questions/${questionId}`);
      setQuestions((prevQuestions) => prevQuestions.filter((question) => question._id !== questionId));
    } catch (error) {
      console.log(error);
    }
  };

const filteredQuestions = questions.filter((question) => selectedTopic === '' || question.topic === selectedTopic);
  if (loading) {
    return (
      <div className="loading">
        
        <p>Loading</p>
      </div>
    );
  }
  return (
  <div className="edit-container">
  <h1>Quiz Question Details</h1>
  
  
    <div className="topic-selector">
        
        {topics.map((topic) => (
          <button key={topic} onClick={() => handleTopicChange(topic)}>{topic}</button>
        ))}
        
      </div>
    
    <table>
      <thead>
        <tr>
          <th>Question</th>
          <th>Option A</th>
          <th>Option B</th>
          <th>Option C</th>
          <th>Option D</th>
          <th>Answer</th>
          
          <th>Difficulty</th>
          <th>Topic</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredQuestions.map((question) => (
          <tr key={question._id}>
            <td>{question.question}</td>
            {question.options.map((option) => (
              <td key={option}>{option}</td>
            ))}
            <td>{question.answer}</td>
            <td>{question.difficulty}</td>
            <td>{question.topic}</td>
            <td>
              <div className="crud-container">
                <button onClick={() => handleDeleteQuestion(question._id)}>Delete</button>
                <button onClick={() => handleEditClick(question)}>Edit</button>

              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    
   <div className="nav-button">
    <Link to="/Teacher"><button>Home</button></Link>
    <Link to="/AddQuestionForm"><button>Add Question</button></Link>
    
    <Link to="/"><button>Logout</button></Link>
  
</div>

  </div>
);


};

export default EditQuiz;




