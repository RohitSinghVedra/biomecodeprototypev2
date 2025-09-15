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
import { TemperatureData } from '../../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TemperatureChartProps {
  temperatureData: TemperatureData;
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ temperatureData }) => {
  const months = temperatureData.monthly.map((data) => data.month);
  const temperatures = temperatureData.monthly.map((data) => data.avg);
  
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Average Temperature (°C)',
        data: temperatures,
        borderColor: 'rgb(12, 74, 110)',
        backgroundColor: 'rgba(12, 74, 110, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgb(12, 74, 110)',
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
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
        ticks: {
          callback: function(value) {
            return value + '°C';
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
            return context.raw + '°C';
          }
        }
      }
    },
  };
  
  return <Line data={data} options={options} />;
};

export default TemperatureChart;