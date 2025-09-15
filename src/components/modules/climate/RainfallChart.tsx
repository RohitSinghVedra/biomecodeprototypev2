import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { RainfallData } from '../../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface RainfallChartProps {
  rainfallData: RainfallData;
}

const RainfallChart: React.FC<RainfallChartProps> = ({ rainfallData }) => {
  const months = rainfallData.monthly.map((data) => data.month);
  const rainfallAmounts = rainfallData.monthly.map((data) => data.amount);
  
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Rainfall (mm)',
        data: rainfallAmounts,
        backgroundColor: 'rgba(72, 202, 228, 0.7)',
        borderColor: 'rgb(72, 202, 228)',
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(3, 105, 161, 0.7)',
      },
    ],
  };
  
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Rainfall (mm)',
        },
        ticks: {
          callback: function(value) {
            return value + ' mm';
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
            return context.raw + ' mm';
          }
        }
      }
    },
  };
  
  return <Bar data={data} options={options} />;
};

export default RainfallChart;