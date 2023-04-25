import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ students }) => {
  const labels = students.map(student => student.date);
  const data = {
    labels,
    datasets: [
      {
        label: 'Average Score',
        data: students.map(student => student.point),
        fill: false,
        borderColor: '#36a2eb'
      }
    ]
  };

  return <Line data={data} />;
};

export default LineChart;
