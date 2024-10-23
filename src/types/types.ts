export interface IWind {
  speed: number;
  deg: number;
}

export interface IWeatherData {
  _id: string;
  city: string;
  city_id: string;
  temperature: number;
  feels_like: number;
  condition: string;
  icon: string;
  humidity: number;
  pressure: number;
  wind: IWind;
  dt: Date;
}

export interface IWeatherDailySummaryData {
  city: string;            // Name of the city
  cityId: number;         // Unique identifier for the city
  date: Date;             // Date of the summary
  avgTemp?: number;       // Average temperature for the day (optional)
  maxTemp?: number;       // Maximum temperature for the day (optional)
  minTemp?: number;       // Minimum temperature for the day (optional)
  mostFrequentCondition?: string; // Most frequent weather condition for the day (optional)
}

export interface IAlert {
  id: number;
  cityId: string;
  threshold: number;
  validUpto: Date; // Date when the alert expires
  weatherCondition: string; // The weather condition (e.g., Clear sky, Rain)
  tempComparison: string;   // The temperature comparison (e.g., Greater than, Smaller than, Equal to)
}

export interface IDailySummaryData {
  city_id: string;              // The ID of the city
  city: string;                 // The name of the city
  date: Date;                   // The date of the summary
  avgTemp: number;              // The average temperature for the day
  maxTemp: number;              // The maximum temperature for the day
  minTemp: number;              // The minimum temperature for the day
  mostFrequentCondition: string; // The most frequent weather condition of the day
}

export interface IPastHourWeatherData {
  _id: { hour: number };  // Grouped by hour
  city_id: string;        // City ID
  avgTemp: number;        // Average temperature
  count: number;          // Number of data points
  avgFeelsLike: number;   // Average "feels like" temperature
  avgHumidity: number;    // Average humidity
  avgPressure: number;    // Average pressure
}
