import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import './styles/Dashboard.css';

const ScoreDistribution = () => {
  const [students, setStudents] = useState([]);
  const [topics, setTopics] = useState([]);
  const [scoreDistribution, setScoreDistribution] = useState({});
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
    // Calculate the score distribution for each topic
    const scoreDistributionByTopic = {};
    topics.forEach(topic => {
      const scores = students.filter(student => student.topic === topic).map(student => student.point);
      const scoreCounts = Array.from({ length: 6 }, () => 0);
      scores.forEach(score => {
        scoreCounts[Math.floor(score / 5)]++;
      });
      const maxScore = Math.max(...scores);
      const minScore = Math.min(...scores);
      const totalScore = scores.reduce((a, b) => a + b, 0);
      const averageScore = totalScore / scores.length;
      scoreDistributionByTopic[topic] = {
        counts: scoreCounts,
        maxScore,
        minScore,
        averageScore,
      };
    });
    setScoreDistribution(scoreDistributionByTopic);
  }, [students, topics]);

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading</p>
      </div>
    );
  }

  return (
    <div className="score-distribution">
      <h2>Topicwise Score Distribution</h2>
      {Object.keys(scoreDistribution).map(topic => {
        const uniqueRollNumbers = new Set(students.filter(student => student.topic === topic).map(student => student.rollNumber));
        const yAxisDomainMax = Math.ceil(uniqueRollNumbers.size / 5) * 5;
        const { counts, maxScore, minScore, averageScore } = scoreDistribution[topic];
        return (
          <div key={topic} className="score-distribution-chart">
            <h3>{topic}</h3>
            <p>Maximum Score: {maxScore}</p>
            <p>Minimum Score: {minScore}</p>
            <p>Average Score: {averageScore.toFixed(2)}</p>
            <VictoryChart domainPadding={20} padding={{ left: 50, right: 50, top: 10, bottom: 50 }}>
              <VictoryAxis
                dependentAxis
                label="No. Of Students"
                tickFormat={(x) => (`${x}`)}
                domain={[0, yAxisDomainMax]}
                />
          <VictoryAxis
            label="Score"
            tickValues={[0, 5, 10, 15, 20, 25]}
            tickFormat={(x) => (`${x}-${x+5}`)}
            domain={[0, 25]}
            tickCount={6}
            labelPlacement="end"
          />
          <VictoryBar
            data={counts.map((count, score) => ({ score: score * 5, count }))}
            x="score"
            y="count"
            style={{
              data: {
                fill: 'rgba(54, 162, 235, 0.5)',
                stroke: 'rgba(54, 162, 235, 1)',
                strokeWidth: 0.5,
              },
            }}
            align="center"
          />
        </VictoryChart>
      </div>
    );
  })}
</div>
);
};

const calculateScoreDistribution = (students, topics) => {
const scoreDistributionByTopic = {};
topics.forEach(topic => {
const scores = students.filter(student => student.topic === topic).map(student => student.point);
const scoreCounts = Array.from({ length: 6 }, () => 0);
let maxScore = 0;
let minScore = Infinity;
let totalScore = 0;
scores.forEach(score => {
if (score > maxScore) {
maxScore = score;
}
if (score < minScore) {
minScore = score;
}
scoreCounts[Math.floor(score / 5)]++;
totalScore += score;
});
const averageScore = totalScore / scores.length;
scoreDistributionByTopic[topic] = {
counts: scoreCounts,
maxScore,
minScore,
averageScore,
};
});
return scoreDistributionByTopic;
};

export default ScoreDistribution;


















         



