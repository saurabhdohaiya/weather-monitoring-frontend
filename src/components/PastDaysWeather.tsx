import React, { useEffect, useState } from 'react';
import { fetchPastWeatherSummaryByCity } from '../services/weatherService'; 
import { IDailySummaryData } from '../types/types'; // Ensure this type is imported correctly
import { useTemperatureUnit } from '../contexts/TempratureUnitContext'; // Temperature context for conversion
import { convertToFahrenheit } from '../services/utilityService'; // Conversion functions

const PastDaysWeatherChart = ({ city_id }: { city_id: string }) => {
  const [pastWeatherData, setPastWeatherData] = useState<IDailySummaryData[]>([]);
  const [loading, setLoading] = useState(true);
  const { unit } = useTemperatureUnit(); // Get the unit from the context (Celsius or Fahrenheit)

  const fetchPastWeatherData = async () => {
    try {
      const data = await fetchPastWeatherSummaryByCity(city_id); // Assuming this fetches the summary for 8 days
      setPastWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching temperature data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPastWeatherData();
  }, [city_id]);

  if (loading) {
    return <p>Loading temperature data...</p>;
  }

  if (pastWeatherData.length === 0) {
    return <p>No past data is present for this city.</p>;
  }

  // Convert temperatures based on selected unit
  const convertTemperature = (temp: number) => {
    return unit === 'F' ? convertToFahrenheit(temp) : temp;
  };

  return (
    <>
      <p className="text-lg font-bold mb-4">Past 8 Days Weather Data</p>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className='text-xs text-gray-400'>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Most Frequent Condition</th>
            <th className="border border-gray-300 px-4 py-2">Avg Temperature (°{unit})</th>
            <th className="border border-gray-300 px-4 py-2">Max Temperature (°{unit})</th>
            <th className="border border-gray-300 px-4 py-2">Min Temperature (°{unit})</th>
          </tr>
        </thead>
        <tbody>
          {pastWeatherData.map((dayData) => (
            <tr key={dayData.date.toString()} className='text-xs'>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(dayData.date).toLocaleDateString()} {/* Convert date to readable format */}
              </td>
              <td className="border border-gray-300 px-4 py-2">{dayData.mostFrequentCondition}</td>
              <td className="border border-gray-300 px-4 py-2">{convertTemperature(dayData.avgTemp).toFixed(1)}°{unit}</td>
              <td className="border border-gray-300 px-4 py-2">{convertTemperature(dayData.maxTemp).toFixed(1)}°{unit}</td>
              <td className="border border-gray-300 px-4 py-2">{convertTemperature(dayData.minTemp).toFixed(1)}°{unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PastDaysWeatherChart;
