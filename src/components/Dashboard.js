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

    let contentHeight = pdfHeight + 10; // declare contentHeight using let keyword
    const pageHeight = pdf.internal.pageSize.getHeight();

    while (contentHeight > pageHeight) {
      pdf.addPage();
      const position = 10 - pageHeight;
      pdf.addImage(imgData, 'PNG', 10, position, pdfWidth, pdfHeight);
      contentHeight -= pageHeight; // update contentHeight variable's value
    }

    pdf.save('dashboard.pdf');
  });
};




const Dashboard = () => {
  return (
    <div className="dashboard">
      

      <div id="pdf-content">
      <h1>Analysis Report</h1>
      <TopicwiseTopPerformers />
        <ScoreDistribution />
        <PassFailRate />
       
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









