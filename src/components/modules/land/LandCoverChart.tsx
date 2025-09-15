import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { LandCoverData } from '../../../types';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface LandCoverChartProps {
  landCoverData: LandCoverData;
}

const LandCoverChart: React.FC<LandCoverChartProps> = ({ landCoverData }) => {
  const data = {
    labels: ['Forest', 'Shrubland', 'Cropland', 'Urban', 'Bare Land', 'Water', 'Wetlands'],
    datasets: [
      {
        data: [
          landCoverData.forest,
          landCoverData.shrubland,
          landCoverData.cropland,
          landCoverData.urban,
          landCoverData.bareland,
          landCoverData.water,
          landCoverData.wetlands,
        ],
        backgroundColor: [
          '#2D6A4F', // Forest - dark green
          '#40916C', // Shrubland - medium green
          '#95D5B2', // Cropland - light green
          '#B08968', // Urban - brown
          '#DDB892', // Bare land - tan
          '#48CAE4', // Water - blue
          '#90E0EF', // Wetlands - light blue
        ],
        borderColor: ['#FFFFFF'],
        borderWidth: 2,
      }
    ],
  };
  
  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 20,
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
    cutout: '60%',
  };
  
  return <Doughnut data={data} options={options} />;
};

export default LandCoverChart;