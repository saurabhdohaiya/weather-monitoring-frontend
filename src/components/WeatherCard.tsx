import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTemperatureUnit } from '../contexts/TempratureUnitContext';

import { BiDroplet } from "react-icons/bi";
import { FaWind } from "react-icons/fa";
import { LuGaugeCircle } from "react-icons/lu";
import { IWeatherData } from '../types/types';

import { convertToCelsius, convertToFahrenheit, degreeToDirection} from '../services/utilityService';
import { OPENWEATHER_ICON_URL } from '../constants/constant';

const WeatherCard: React.FC<IWeatherData> = ({
  city,
  city_id,
  temperature,
  feels_like,
  condition,
  icon,
  humidity,
  pressure,
  wind,
}) => {
  const { unit } = useTemperatureUnit();
  const navigate = useNavigate();

  const navigateToDetailPage = (city_id: string) => {
    navigate(`/weather/${city_id}`);
  }

  const localTemp = unit === 'F' ? convertToFahrenheit(temperature) : convertToCelsius(temperature);
  const localFeelsLikeTemp = unit === 'F' ? convertToFahrenheit(feels_like) : convertToCelsius(feels_like);


  return (
    <div className="flex flex-col bg-white border shadow-md rounded-lg p-4 md:p-8 gap-4 md:gap-8">
      <div className='flex gap-2 w-full'>
        <div className='flex flex-col w-3/6'>
          <p className="text-xl md:text-xl font-bold">{city}</p>
          <p className="text-sm font-semibold text-gray-400">{new Date().toLocaleDateString()}</p>
          <p className="text-gray-600 md:text-2xl mt-3 font-bold">{localTemp}°{unit}</p>
          <p className="text-sm font-semibold text-gray-400 ">Feels like: {localFeelsLikeTemp}°{unit}</p>
          <div className='flex flex-row justify-start items-center mt-2 gap-1'>
            <BiDroplet className='h-4 w-4 text-primary'/>
            <p className="text-sm font-semibold">{humidity} %</p>
          </div>
          <div className='flex flex-row justify-start items-center mt-2 gap-1'>
            <FaWind className='h-4 w-4 text-primary'/>
            <p className="text-sm font-semibold">{wind.speed} m/s, {degreeToDirection(wind.deg)}</p>
          </div>
          <div className='flex flex-row justify-start items-center mt-2 gap-1'>
            <LuGaugeCircle className='h-4 w-4 font-bold text-primary'/>
            <p className="text-sm font-semibold">{pressure} hPa</p>
          </div>
        </div>
        <div className='flex flex-col items-end justify-end w-3/6'>
          <div className="flex flex-row w-full items-center justify-end mb-4">
            <button
              className={`text-xs px-3 flex flex-row py-1 md:px-4 md:py-2 rounded-full border font-semibold border-primary text-primary transition-all duration-200 ease-in-out
              hover:bg-primary hover:text-white hover:font-semibold
              focus:bg-primary-dark focus:outline-none`}
              onClick={() => navigateToDetailPage(city_id)}
            >
              View
            </button>
          </div>
          <div className="relative">
            <img src={`${OPENWEATHER_ICON_URL}${icon}@2x.png`} alt={condition} className='w-28 h-28 relative top-4' />
          </div>
          <p className="text-gray-600 md:text-sm mt-2 font-semibold">{condition}</p>
        </div>
      </div>
    </div>
);
};

export default WeatherCard;
