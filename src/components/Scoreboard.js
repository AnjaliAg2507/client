import React, { useState, useEffect } from 'react';
import './styles/Scoreboard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Scoreboard = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState('Fractions');
  const [topics, setTopics] = useState([]);
   const history = useHistory();

  useEffect(() => {
    // Make an HTTP GET request to your backend API endpoint
    axios.get('http://localhost:8000/api/result')
      .then(response => {
        // Sort the students array in descending order based on point
        const sortedStudents = response.data.sort((a, b) => b.point - a.point);
        // Set the students state variable to the sorted data retrieved from the API
        setStudents(sortedStudents);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
    fetchTopics();
  }, []);

  const handleDelete = () => {
    axios.delete('http://localhost:8000/api/result')
      .then(response => {
        // Reload the page to update the scoreboard with the new data
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  }

  const fetchTopics = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/result/topic');
    console.log(response.data); // Check the response data
    setTopics(response.data);
  } catch (error) {
    console.log(error);
  }
};

  const handleTopicSelect = (event) => {
    setSelectedTopic(event.target.value);
  }

  let filteredStudents = students;
  if (selectedTopic !== '') {
    filteredStudents = students.filter(student => student.topic === selectedTopic);
  }

  const handleAnalyze = () => {
  history.push({
    pathname: "/dashboard",
    
  });
};

const handleHome= () => {
  history.push({
    pathname: "/Teacher",
    
  });
};

const handleLogout = () => {
  history.push({
    pathname: "/",
    
  });
};

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading</p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="scoreboard-empty">
        <h1>SCORE BOARD</h1>
        <p>Scoreboard is empty!!</p>
        <div className="scoreboard-buttons">
          <Link to="/Teacher"><button>Home</button></Link>
         <Link to="/"><button>Logout</button></Link>
        </div>
      </div>
    );
  }
  return (
    <div className="scoreboard">
      <h1>SCORE BOARD</h1>
      <div className="topic-selector">
        <label htmlFor="topic">Select a topic:</label>
        <select id="topic" value={selectedTopic} onChange={handleTopicSelect}>
          <option value="">All Topics</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Student Name</th>
            <th>Roll Number</th>
            <th>Topic</th>
            <th>Score</th>
            <th>Easy Questions Answered </th>
            <th>Medium Questions Answered </th>
            <th>Hard Questions Answered </th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.studentName}</td>
              <td>{student.rollNumber}</td>
               <td>{student.topic}</td>
              <td>{student.point}</td>
              <td>{student.easy}</td>
              <td>{student.medium}</td>
              <td>{student.hard}</td>
              <td className={student.verdict === 'Pass' ? 'pass' : 'fail'}>
        {student.verdict}
      </td>
             
              
            </tr>
          ))}
        </tbody>
      </table>
       <div className="scoreboard-buttons">
     
      </div>

      <div className="scoreboard-buttons">
      
      <button onClick={handleHome}>Home</button>
      <button onClick={handleDelete}>Delete Results</button>
       <button onClick={handleAnalyze}>Analyze </button>
        <button onClick={handleLogout}>Logout</button>
      
      </div>
    </div>
);
};

export default Scoreboard;        









