import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Dashboard.css';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';


const TopicwiseTopPerformers = () => {
  const [students, setStudents] = useState([]);
  const [topics, setTopics] = useState([]);
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

  const calculateTopPerformers = (topic) => {
    const topicStudents = students.filter(student => student.topic === topic);
    const topPerformers = topicStudents.filter(student => student.point >= 20);
    const averagePerformers = topicStudents.filter(student => student.point >= 10 && student.point < 20);
    const poorPerformers = topicStudents.filter(student => student.point < 10);
    
    return {
      topPerformers,
      averagePerformers,
      poorPerformers,
    };
  };

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading</p>
      </div>
    );
  }

  return (
    <div className="topicwise-top-performers">
      <h2>Topicwise Top Performers</h2>
      {topics.map(topic => {
        const data = calculateTopPerformers(topic);
        return (
          <div key={topic} className="topicwise-top-performers-chart">
            <h3>{topic}</h3>
            <p>Top Performers:</p>
            <ul className="performers-list">
              {data.topPerformers.map(student => <li key={student.id}>{student.studentName}</li>)}
            </ul>
            <p>Average Performers:</p>
            <ul className="performers-list">
              {data.averagePerformers.map(student => <li key={student.id}>{student.studentName}</li>)}
            </ul>
            <p>Poor Performers:</p>
            <ul className="performers-list">
              {data.poorPerformers.map(student => <li key={student.id}>{student.studentName}</li>)}
            </ul>
            <VictoryChart
              theme={VictoryTheme.material}
              height={300}
              domainPadding={20}
            >
              <VictoryAxis 
                tickValues={['Top Performers','Average Performers', 'Poor Performers']} 
                style={{
                  tickLabels: {
                    fontSize: 12,
                    fontWeight: 'bold',
                    padding: 5
                  },
                }} 
              />
              <VictoryAxis dependentAxis 
                style={{
                  tickLabels: {
                    fontSize: 12,
                    fontWeight: 'bold',
                    padding: 5
                  },
                }} 
              />
              <VictoryBar 
                data={[
                  { x: 'Top Performers', y: data.topPerformers.length },
                  { x: 'Average Performers', y: data.averagePerformers.length },
                  { x: 'Poor Performers', y: data.poorPerformers.length },
                ]}
                style={{
                  data: {
                    fill: ({ datum }) => {
                      switch (datum.x) {
                        case 'Top Performers':
                          return '#cdb4db';
                        case 'Average Performers':
                          return '#bde0fe';
                        case 'Poor Performers':
                          return '#ffc8dd';
                        default:
                          return '#000000';
                      }
                    }
                  },
                  labels: {
                    fontSize: 12,
                    fontWeight: 'bold'
                  }
                }} 
              />
            </VictoryChart>
          </div>
        );
      })}
    </div>
  );
}

export default TopicwiseTopPerformers;







