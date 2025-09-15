import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { SoilData } from '../../../types';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface SoilCompositionChartProps {
  soilData: SoilData;
}

const SoilCompositionChart: React.FC<SoilCompositionChartProps> = ({ soilData }) => {
  // Calculate "Other" percentage to make up 100%
  const totalPercent = soilData.clay + soilData.sand;
  const otherPercent = Math.max(0, 100 - totalPercent);
  
  const data = {
    labels: ['Clay', 'Sand', 'Silt & Other'],
    datasets: [
      {
        data: [soilData.clay, soilData.sand, otherPercent],
        backgroundColor: [
          '#B08968', // Clay - brown
          '#DDB892', // Sand - tan
          '#D1D5DB', // Silt & Other - gray
        ],
        borderColor: ['#FFFFFF'],
        borderWidth: 2,
      }
    ],
  };
  
  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw;
            return `${label}: ${value}%`;
          }
        }
      }
    },
  };
  
  return <Pie data={data} options={options} />;
};

export default SoilCompositionChart;