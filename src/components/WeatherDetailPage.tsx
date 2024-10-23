import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTemperatureUnit } from '../contexts/TempratureUnitContext';
import { toast } from 'react-toastify';
import PastDaysWeatherTable from './PastDaysWeather';
import PastHoursTemperatureChart from './PastHoursTempratureChart';
import AddAlertForm from './AddAlertForm';
import ShimmerLine from './ShimmerLine';

import { BiDroplet } from "react-icons/bi";
import { FaWind } from "react-icons/fa";
import { LuGaugeCircle } from "react-icons/lu";
import { OPENWEATHER_ICON_URL, UPDATE_WEATHER_INTERVAL } from '../constants/constant';
import { IWeatherData, IAlert } from '../types/types';
import { fetchCurrentWeatherByCity } from '../services/weatherService';
import { getStoredAlerts, checkAlerts, removeAlert as removeAlertService } from '../services/alertService';
import { convertToCelsius, convertToFahrenheit, degreeToDirection } from '../services/utilityService';
import ActiveAlertList from './ActiveAlertList';

const WeatherDetailPage: React.FC = () => {
  const { unit } = useTemperatureUnit();
  const { city_id } = useParams<{ city_id: string }>();
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [alerts, setAlerts] = useState<IAlert[]>([]);

  useEffect(() => {
    if (city_id) {
      fetchWeatherByCity(city_id);
      const intervalId = setInterval(() => fetchWeatherByCity(city_id), UPDATE_WEATHER_INTERVAL * 1000);
      return () => clearInterval(intervalId);
    } else {
      setError('Invalid city name. Please enter a valid city name.');
    }
  }, [city_id]);

  useEffect(() => {
    if (weatherData && city_id) {
      fetchCityAlerts(city_id);
      checkAlerts([weatherData]);
    }
  }, [weatherData]);

  const fetchWeatherByCity = async (cityId: string) => {
    try {
      const data = await fetchCurrentWeatherByCity(cityId);
      setWeatherData(data);
    } catch (error) {
      setError('Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCityAlerts = (cityId: string) => {
    const allAlerts = getStoredAlerts();
    const cityAlerts = allAlerts.filter((alert: IAlert) => alert.cityId === cityId);
    setAlerts(cityAlerts);
  };

  const handleDeleteAlert = (id: number) => {
    removeAlertService(id);
    setAlerts(alerts.filter((alert) => alert.id !== id));
    toast.info('Alert deleted successfully.');
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="space-y-4">
          <ShimmerLine className="w-2/3 h-6 mb-4" />
          <div className="bg-white border shadow-md rounded-lg p-4 space-y-4">
            <ShimmerLine className="w-1/2 h-4" />
            <div className="flex justify-between">
              <div>
                <ShimmerLine className="w-1/3 h-6 mb-2" />
                <ShimmerLine className="w-1/4 h-4" />
              </div>
              <ShimmerLine className="w-24 h-24 rounded-full" />
            </div>
            <div className="flex space-x-8">
              <ShimmerLine className="w-1/5 h-4" />
              <ShimmerLine className="w-1/5 h-4" />
              <ShimmerLine className="w-1/5 h-4" />
            </div>
          </div>
          <div className="bg-white border shadow-md rounded-lg p-4 space-y-4">
            <ShimmerLine className="w-2/3 h-6" />
            <ShimmerLine className="w-full h-4" />
            <ShimmerLine className="w-full h-4" />
          </div>
          <div className="bg-white border shadow-md rounded-lg p-4 space-y-4">
            <ShimmerLine className="w-1/3 h-6" />
            <ShimmerLine className="w-full h-48" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {weatherData ? (
        <div className="space-y-4">
          <p className="text-3xl font-bold mt-4">{weatherData.city}, IN</p>

          <div className="bg-white border shadow-md rounded-lg p-4">
            <p className="text-sm text-gray-400">{new Date().toLocaleDateString()}</p>

            <div className="flex justify-between border-b-2 border-primary py-4">
              <div>
                <p className="text-gray-600 text-3xl font-bold">
                  {unit === 'F' ? convertToFahrenheit(weatherData.temperature) : convertToCelsius(weatherData.temperature)}°{unit}
                </p>
                <p className="text-sm text-gray-400">
                  Feels like: {unit === 'F' ? convertToFahrenheit(weatherData.feels_like) : convertToCelsius(weatherData.feels_like)}°{unit}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img src={`${OPENWEATHER_ICON_URL}${weatherData.icon}@2x.png`} alt={weatherData.condition} className="w-24 h-24" />
                <p className="text-gray-600 text-sm font-semibold mt-2">{weatherData.condition}</p>
              </div>
            </div>

            <div className="flex space-x-8 pt-4">
              <div className="flex items-center gap-1">
                <BiDroplet className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">{weatherData.humidity} %</p>
              </div>
              <div className="flex items-center gap-1">
                <FaWind className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">
                  {weatherData.wind.speed} m/s, {degreeToDirection(weatherData.wind.deg)}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <LuGaugeCircle className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">{weatherData.pressure} hPa</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
              <p className="text-2xl font-bold my-4">Alerts</p>
              <div className="bg-white border shadow-md rounded-lg p-4">
                {city_id && <AddAlertForm cityId={city_id} onAlertAdded={() => fetchCityAlerts(city_id)} />}
              </div>
              <p className="text-2xl font-bold my-4">Active Alerts</p>
              <ActiveAlertList alerts={alerts} onDelete={handleDeleteAlert} />
            </div>

            <div className="w-full md:w-2/3">
              <p className="text-2xl font-bold my-4">Past 8 Hours</p>
              <div className="bg-white border shadow-md rounded-lg p-4">
                {city_id && <PastHoursTemperatureChart city_id={city_id} />}
              </div>

              <p className="text-2xl font-bold my-4">Past 8 Days Weather</p>
              <div className="bg-white border shadow-md rounded-lg p-4">
                {city_id && <PastDaysWeatherTable city_id={city_id} />}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>{error || "Loading weather details..."}</p>
      )}
    </div>
  );
};

export default WeatherDetailPage;
