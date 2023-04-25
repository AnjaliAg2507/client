import React, { useState, useEffect } from 'react';
import { VictoryChart, VictoryStack, VictoryBar, VictoryAxis, VictoryLegend, VictoryTooltip} from 'victory';
import axios from 'axios';
import './styles/TopicPerformance.css';

const TopicPerformance = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/result')
      .then(response => {
        const scoresByTopic = calculateScoresByTopic(response.data);
        setData(scoresByTopic);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const calculateScoresByTopic = (results) => {
    const topics = [...new Set(results.map(result => result.topic))];
    const scoresByTopic = topics.map(topic => {
      const topicResults = results.filter(result => result.topic === topic);
      const scores = topicResults.map(result => result.point);
      const averageScore = Math.round(scores.reduce((acc, curr) => acc + curr, 0) / scores.length * 10) / 10;
      const counts = calculateHistogramData(scores);
      return { topic, counts, averageScore };
    });
    return scoresByTopic;
  };

  const calculateHistogramData = (scores) => {
    const bins = [0, 5, 10, 15, 20, 25];
    const binCounts = new Array(bins.length - 1).fill(0);
    for (const score of scores) {
      for (let i = 1; i < bins.length; i++) {
        if (score >= bins[i-1] && score < bins[i]) {
          binCounts[i-1]++;
          break;
        }
      }
    }
    return binCounts;
  };

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading</p>
      </div>
    );
  }

  return (
    <div className="topic-performance">
      <h2>Topic Performance</h2>
      <VictoryChart
        domainPadding={20}
      >
        <VictoryAxis
          dependentAxis
          label="No. of Students"
          tickFormat={(t) => `${t}`}
          style={{
            axis: { stroke: '#000' },
            tickLabels: { fontSize: 12, padding: 5 },
          }}
        />
        <VictoryAxis
          label="Topic"
          tickValues={data.map(topicData => topicData.topic)}
          style={{
            axis: { stroke: '#000' },
            tickLabels: { fontSize: 12, padding: 5 },
          }}
        />
        <VictoryLegend
          x={300}
          y={10}
          orientation="horizontal"
          gutter={20}
          style={{ border: { stroke: "black" }, title: {fontSize: 14 } }}
          data={[
            { name: "0-5", symbol: { fill: "#c43a31" } },
            { name: "5-10", symbol: { fill: "#f3a31d" } },
            { name: "10-15", symbol: { fill: "#90c843" } },
            { name: "15-20", symbol: { fill: "#1c87c9" } },
            { name: "20-25", symbol: { fill: "#6d5eac" } }
          ]}
        />
        <VictoryStack
        data={data.map(topicData => topicData.bins)}
colorScale={["#c43a31", "#f3a31d", "#90c843", "#1c87c9", "#6d5eac"]}
animate={{ duration: 500 }}
>
<VictoryBar
data={data.map(topicData => topicData.bins[0])}
x="x"
y="y"
labels={({ datum }) => datum.y}


labelComponent={<VictoryTooltip />}
/>
<VictoryBar
data={data.map(topicData => topicData.bins[1])}
x="x"
y="y"
labels={({ datum }) => datum.y}
labelComponent={<VictoryTooltip />}
/>
<VictoryBar
data={data.map(topicData => topicData.bins[2])}
x="x"
y="y"
labels={({ datum }) => datum.y}

labelComponent={<VictoryTooltip />}
/>
<VictoryBar
data={data.map(topicData => topicData.bins[3])}
x="x"
y="y"
labels={({ datum }) => datum.y}

labelComponent={<VictoryTooltip />}
/>
<VictoryBar
data={data.map(topicData => topicData.bins[4])}
x="x"
y="y"
labels={({ datum }) => datum.y}

labelComponent={<VictoryTooltip />}
/>
</VictoryStack>
</VictoryChart>
</div>
);
};
export default TopicPerformance;


