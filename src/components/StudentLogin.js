

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './styles/StudentLogin.css';

function StudentLogin() {
  const [rollNumber, setRollNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [warning, setWarning] = useState('');
  const [rollNumberWarning, setRollNumberWarning] = useState('');
  const [studentNameWarning, setStudentNameWarning] = useState('');

  const [quizResults, setQuizResults] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/result');
        setQuizResults(data);
        console.log('Quiz Results:', data);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/questions/topic');
        console.log('Topics:', data);
        setTopics(data);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    fetchTopics();
  }, []);

  const handleRollNumberChange = (event) => {
    const value = event.target.value;
    if (!value.match(/^\d*$/)) {
      setWarning('Please enter only numbers for Roll Number');
      setRollNumber('');
    } else {
      setWarning('');
      setRollNumber(value);
      setRollNumberWarning('');
    }
  };

  const handleStudentNameChange = (event) => {
    const value = event.target.value;
    if (!value.match(/^[a-zA-Z ]*$/)) {
      setWarning('Please enter only letters for Student Name');
      setStudentName('');
    } else {
      setWarning('');
      setStudentName(value);
      setStudentNameWarning('');
    }
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };


  const handleLogin = () => {
  if (rollNumber.trim() === '' || studentName.trim() === '' || selectedTopic.trim() === '') {
    console.log('Please fill the required fields!');
    setWarning('Please fill the required fields!');
  } else {
    console.log('Quiz Results:', quizResults);
    const matchingRecords = quizResults.filter((record) => {
  return record.rollNumber === rollNumber && record.studentName === studentName && record.topic === selectedTopic;
});

const matchingRollNumbers = quizResults.filter((record) => {
  return record.rollNumber === rollNumber && record.studentName !== studentName;
});

console.log('Matching Records:', matchingRecords);
    console.log('Matching Roll Numbers:', matchingRollNumbers);
if (matchingRecords.length > 0) {
  console.log('Record already exists');
  setWarning('Record already exists');
} else if (matchingRollNumbers.length > 0) {
  console.log('Roll number already exists with a different student name');
  setWarning('Roll number already exists with a different student name');
} else {
  history.push(`/quiz?studentName=${encodeURIComponent(studentName)}&rollNumber=${encodeURIComponent(rollNumber)}&topic=${encodeURIComponent(selectedTopic)}`);
}
  }
};

  const handleInputFocus = () => {
    setWarning('');
    setRollNumberWarning('');
    setStudentNameWarning('');
  };

return (
  <div className="wrapper">
    <form className="form">
      <h1 className="title">Login</h1>
      <div className="input-group">
        <label className="label">Roll Number:</label>
        <input className="input" type="text" value={rollNumber} onChange={handleRollNumberChange} onFocus={handleInputFocus} />
        {rollNumberWarning && <p className="warning">{rollNumberWarning}</p>}
      </div>
      <div className="input-group">
        <label className="label">Student Name:</label>
        <input className="input" type="text" value={studentName} onChange={handleStudentNameChange} onFocus={handleInputFocus} />
        {studentNameWarning && <p className="warning">{studentNameWarning}</p>}
      </div>
      <div className="input-group">
        <label className="label">Select a topic:</label>
        <select className="input" id="topic" value={selectedTopic} onChange={handleTopicChange}>
          <option value="">All Topics</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
              </div>
      {warning && <p className="warning">{warning}</p>}
      <button className="button" type="button" onClick={handleLogin}>
        Attempt Quiz!
      </button>
    </form>
  </div>
);
        }

        export default StudentLogin;










