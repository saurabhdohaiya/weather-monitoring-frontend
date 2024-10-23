import { 
  PAST_DAYS_COUNT,
  PAST_HOURS_COUNT
} from "../constants/constant";
import { IPastHourWeatherData } from "../types/types";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const fetchCurrentWeatherForAllCities = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}/weather/current`);
    
    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Assuming the response is in JSON format
    return data; // Assuming your API returns an array of city weather data
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error; // Rethrow error for handling in component
  }
};


export const fetchCurrentWeatherByCity = async (city_id: string) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/weather/current?city_id=${city_id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Assuming the response is in JSON format
    return data; // Assuming your API returns an array of city weather data
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error; // Rethrow error for handling in component
  }
};


export const fetchDailyWeatherSummaryByCity = async (city_id: number) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/weather/daily-summary/${city_id}`);
    if (!response.ok) {
      throw new Error(`Error fetching daily weather summary: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching daily weather summary:', error);
    throw error;
  }
};


export const fetchTemperatureForPastHoursByCity = async (city_id: string) : Promise<IPastHourWeatherData[]>=> {
  try {
    const response = await fetch(`${API_ENDPOINT}/weather/history?city_id=${city_id}&past_hours_count=${PAST_HOURS_COUNT}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching temperature data: ${response.statusText}`);
    }
    const data = (await response.json()) as IPastHourWeatherData[];
    return data;
  } catch (error) {
    console.error('Error in WeatherService:', error);
    throw error;
  }
}

export const fetchPastWeatherSummaryByCity = async (city_id: string) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/weather/history?city_id=${city_id}&past_days_count=${PAST_DAYS_COUNT}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching temperature data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in WeatherService:', error);
    throw error;
  }
}