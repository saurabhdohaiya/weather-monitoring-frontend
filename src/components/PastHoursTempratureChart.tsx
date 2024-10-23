import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { IPastHourWeatherData } from '../types/types'; // Import the interface
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTemperatureUnit } from '../contexts/TempratureUnitContext';
import { convertToCelsius, convertToFahrenheit } from '../services/utilityService';
import { fetchTemperatureForPastHoursByCity } from '../services/weatherService';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, LineController, Tooltip, Legend);

const PastHoursTemperatureChart = ({ city_id }: { city_id: string }) => {
  const [temperatureData, setTemperatureData] = useState<IPastHourWeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const { unit } = useTemperatureUnit();

  const fetchPastTemperatureData = async () => {
    try {
      const data = await fetchTemperatureForPastHoursByCity(city_id); 
      setTemperatureData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching temperature data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPastTemperatureData();
  }, [city_id]);

  const currentHour = new Date().getHours();
  const last8Hours = Array.from({ length: 8 }, (_, i) => (currentHour - i - 1 + 24) % 24).reverse();

  const avgTemperatures = temperatureData.map((temp) =>
    unit === 'F' ? convertToFahrenheit(temp.avgTemp) : convertToCelsius(temp.avgTemp)
  );
  const avgFeelsLike = temperatureData.map((temp) =>
    unit === 'F' ? convertToFahrenheit(temp.avgFeelsLike) : convertToCelsius(temp.avgFeelsLike)
  );

  const minTemperature = Math.min(...avgTemperatures, ...avgFeelsLike);
  const maxTemperature = Math.max(...avgTemperatures, ...avgFeelsLike);

  // Chart Data
  const chartData = {
    labels: last8Hours.map((hour) => `${hour}:00`), // X-axis labels: last 8 sequential hours
    datasets: [
      {
        label: `Temperature (°${unit})`,
        data: avgTemperatures, // Y-axis data for actual temperatures
        fill: false,
        borderColor: '#FF5733', // Orange for actual temperatures
        pointBackgroundColor: '#FF5733',
        tension: 0.1,
      },
      {
        label: `Feels Like (°${unit})`,
        data: avgFeelsLike, // Y-axis data for "Feels Like" temperatures
        fill: false,
        borderColor: '#28A745', // Green for "Feels Like"
        pointBackgroundColor: '#28A745',
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    scales: {
      x: {
        title: { display: true, text: 'Hours' },
        type: 'category' as const, // Display category-based labels (hours)
      },
      y: {
        title: { display: true, text: `Temperature (°${unit})` },
        min: minTemperature - 10, // Dynamic min value for Y-axis
        max: maxTemperature + 10, // Dynamic max value for Y-axis
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return ` ${context.dataset.label}: ${context.raw.toFixed(2)}°${unit}`; // Show X and Y values
          },
        },
      },
      legend: {
        display: true,
        labels: {
          color: '#000', // Text color for the legend labels
          usePointStyle: true, // Use point styles in the legend
          pointStyle: 'circle' as const, // Set point style as circles
        },
      },
    },
    hover: {
      mode: 'nearest' as const,
      intersect: true,
    },
  };

  return (
    <div className="flex items-center justify-center">
      {loading ? (
        <p>Loading temperature data...</p>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default PastHoursTemperatureChart;
