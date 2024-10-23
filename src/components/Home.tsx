import React, { useEffect, useState } from 'react';
import WeatherCard from "./WeatherCard";
import WeatherCardShimmer from './WeatherCardShimmer';

import { fetchCurrentWeatherForAllCities } from '../services/weatherService';
import { IWeatherData } from '../types/types';
import { UPDATE_WEATHER_INTERVAL } from '../constants/constant';
import { checkAlerts } from '../services/alertService';

const Home: React.FC = () => {
  const [weatherData, setWeatherData] = useState<IWeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      console.log("Current weather");
      const data= await fetchCurrentWeatherForAllCities();
      console.log(data);
      setWeatherData(data);
      checkAlerts(data);
    } catch (error) {
      setError('Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();

    const intervalId = setInterval(() => {
      fetchWeather();
    }, UPDATE_WEATHER_INTERVAL * 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4 px-6 md:px-8 h-full">
        <h2 className="text-3xl font-bold mt-4 mb-6 md:mb-10">Popular City in India</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 6 }, (_, index) => (
            <WeatherCardShimmer key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 px-6 md:px-8 h-full">
      <h2 className="text-3xl font-bold mt-4 mb-6 md:mb-10">Popular City in India</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {weatherData.map((city) => (
          <WeatherCard key={city._id} {...city} />
        ))}
      </div>
    </div>
  );
};

export default Home;
