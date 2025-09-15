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
import { SunlightData } from '../../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SunlightChartProps {
  sunlightData: SunlightData;
}

const SunlightChart: React.FC<SunlightChartProps> = ({ sunlightData }) => {
  const months = sunlightData.monthly.map((data) => data.month);
  const hours = sunlightData.monthly.map((data) => data.hours);
  const intensity = sunlightData.monthly.map((data) => data.intensity);

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Daylight Hours',
        data: hours,
        borderColor: '#FCD34D',
        backgroundColor: 'rgba(252, 211, 77, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        pointBackgroundColor: '#FCD34D',
        pointRadius: 4,
        pointHoverRadius: 6,
        yAxisID: 'hours',
      },
      {
        label: 'Solar Intensity',
        data: intensity,
        borderColor: '#FB923C',
        backgroundColor: 'rgba(251, 146, 60, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        pointBackgroundColor: '#FB923C',
        pointRadius: 4,
        pointHoverRadius: 6,
        yAxisID: 'intensity',
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      hours: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Daylight Hours',
        },
        ticks: {
          callback: (value) => `${value}h`,
        },
      },
      intensity: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Solar Intensity (kWh/m²/day)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          padding: 15,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label;
            const value = context.parsed.y;
            return `${label}: ${value}${context.datasetIndex === 0 ? 'h' : ' kWh/m²/day'}`;
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default SunlightChart;