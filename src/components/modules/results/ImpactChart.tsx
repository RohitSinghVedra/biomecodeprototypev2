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
import { YearlyImpact } from '../../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ImpactChartProps {
  yearlyImpacts: YearlyImpact[];
}

const ImpactChart: React.FC<ImpactChartProps> = ({ yearlyImpacts }) => {
  const years = yearlyImpacts.map(impact => `Year ${impact.year}`);
  
  const data = {
    labels: years,
    datasets: [
      {
        label: 'CO₂ Sequestration (tons)',
        data: yearlyImpacts.map(impact => impact.co2Sequestration),
        borderColor: 'rgb(45, 106, 79)',
        backgroundColor: 'rgba(45, 106, 79, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        yAxisID: 'y',
      },
      {
        label: 'Biodiversity Index',
        data: yearlyImpacts.map(impact => impact.biodiversityIndex),
        borderColor: 'rgb(52, 211, 153)',
        backgroundColor: 'rgba(52, 211, 153, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        yAxisID: 'y1',
      },
    ],
  };
  
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'CO₂ Sequestration (tons)',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Biodiversity Index',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };
  
  return <Line data={data} options={options} />;
};

export default ImpactChart;