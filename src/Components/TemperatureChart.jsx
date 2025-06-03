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
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function TemperatureChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.dt_txt.split(" ")[1].slice(0, 5)), 
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map((item) => item.main.temp),
        fill: true,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Today\'s Hourly Temperature',
        font: {
          size: 18,
        },
      },
    },
  };

  return (
  <div className="w-full h-full">
    <Line options={options} data={chartData} />
  </div>
);
}
