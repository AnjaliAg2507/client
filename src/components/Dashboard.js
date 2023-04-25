import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { Link } from 'react-router-dom';
import ScoreDistribution from './ScoreDistribution';
import PassFailRate from './PassFailRate';
import TopicwiseTopPerformers from './TopicwiseTopPerformers';
import './styles/Dashboard.css';

const generatePdf = () => {
  const input = document.querySelector('#pdf-content');

  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);
    pdf.save('dashboard.pdf');
  });
};

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Analysis Report</h1>
      <div id="pdf-content">
        <ScoreDistribution />
        <PassFailRate />
        <TopicwiseTopPerformers />
      </div>
      <div className="button-container">
        <Link to="/scoreboard"><button>Back</button></Link>
        <button onClick={generatePdf}>Download PDF</button>
        <Link to="/"><button>Logout</button></Link>
      </div>
    </div>
  );
};

export default Dashboard;











