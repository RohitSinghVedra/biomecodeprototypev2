import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { CloudCoverageData } from '../../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CloudCoverageChartProps {
  cloudCoverageData: CloudCoverageData;
}

const CloudCoverageChart: React.FC<CloudCoverageChartProps> = ({ cloudCoverageData }) => {
  const months = cloudCoverageData.monthly.map((data) => data.month);
  const coverage = cloudCoverageData.monthly.map((data) => data.coverage);
  
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Cloud Coverage (%)',
        data: coverage,
        borderColor: 'rgb(148, 163, 184)',
        backgroundColor: 'rgba(148, 163, 184, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgb(148, 163, 184)',
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };
  
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Coverage (%)',
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.raw + '%';
          }
        }
      }
    },
  };
  
  return <Line data={data} options={options} />;
};

export default CloudCoverageChart;