import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VictoryPie } from 'victory';
import './styles/Dashboard.css';

const PassFailRate = () => {
  const [students, setStudents] = useState([]);
  const [topics, setTopics] = useState([]);
  const [passFailRate, setPassFailRate] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Make an HTTP GET request to your backend API endpoint
    axios.get('http://localhost:8000/api/result')
      .then(response => {
        // Set the students state variable to the data retrieved from the API
        setStudents(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });

    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/result/topic');
      setTopics(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  // Calculate the pass/fail rate for each topic
  const passFailRateByTopic = {};
  topics.forEach(topic => {
    const topicStudents = students.filter(student => student.topic === topic);
    const passed = topicStudents.filter(student => student.verdict === 'Pass').length;
    const failed = topicStudents.filter(student => student.verdict === 'Fail').length;
    passFailRateByTopic[topic] = {
      passed,
      failed,
    };
  });
  setPassFailRate(passFailRateByTopic);
}, [students, topics]);

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading</p>
      </div>
    );
  }

  return (
    <div className="pass-fail-rate">
      <h2>Topicwise Pass/Fail Rate</h2>
      {Object.keys(passFailRate).map(topic => {
        const { passed, failed } = passFailRate[topic];
        const data = [
          { x: 'Passed', y: passed },
          { x: 'Failed', y: failed },
        ];
        return (
          <div key={topic} className="pass-fail-rate-chart">
            <h3>{topic}</h3>
            <p>Total Students: {passed + failed}</p>
            <VictoryPie
              data={data}
              colorScale={['#bde7bd', '#ff6962']}
              innerRadius={70}
              padAngle={3}
              labelRadius={100}
              labels={({ datum }) => `${datum.x}: ${datum.y}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PassFailRate;