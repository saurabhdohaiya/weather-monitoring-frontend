import { IAlert, IWeatherData } from '../types/types'; // Ensure you import the alert type
import { toast } from 'react-toastify';
import { convertToCelsius } from './utilityService'; // Import your temperature conversion logic if needed

export const getStoredAlerts = (): IAlert[] => {
  const alerts = localStorage.getItem('weatherAlerts');
  return alerts ? JSON.parse(alerts) : [];
};

export const storeAlert = (alert: IAlert) => {
  const alerts = getStoredAlerts();
  const updatedAlerts = [...alerts, alert];
  localStorage.setItem('weatherAlerts', JSON.stringify(updatedAlerts));
};

export const removeAlert = (id: number) => {
  const alerts = getStoredAlerts();
  const updatedAlerts = alerts.filter((alert) => alert.id !== id);
  localStorage.setItem('weatherAlerts', JSON.stringify(updatedAlerts));
};

export const checkAlerts = (weatherData: IWeatherData[]) => {
  const storedAlerts = getStoredAlerts();
  const now = new Date();

  storedAlerts.forEach((alert) => {
    const validUpto = new Date(alert.validUpto);

    // If alert is expired, remove it
    if (now > validUpto) {
      removeAlert(alert.id);
    } else {
      // Find the corresponding city's weather data
      const cityWeather = weatherData.find((city) => city.city_id === alert.cityId);
      if (cityWeather) {
        let temperature = convertToCelsius(cityWeather.temperature);

        // Check if the weather condition matches
        const weatherConditionMatches = alert.weatherCondition
          ? cityWeather.condition === alert.weatherCondition
          : false;

        // Check if the temperature comparison matches
        let tempMatches = false;
        if (alert.threshold) {
          switch (alert.tempComparison) {
            case 'Greater than':
              tempMatches = temperature > alert.threshold;
              break;
            case 'Equal to':
              tempMatches = temperature === alert.threshold;
              break;
            case 'Smaller than':
              tempMatches = temperature < alert.threshold;
              break;
            default:
              tempMatches = false;
          }
        }

        // Trigger alert if conditions match
        if ((alert.weatherCondition && alert.threshold && tempMatches && weatherConditionMatches) ||
            (alert.weatherCondition && !alert.threshold && weatherConditionMatches) ||
            (!alert.weatherCondition && alert.threshold && tempMatches)) {
          toast.warning(
            `Alert! In ${cityWeather.city}, the weather is '${cityWeather.condition}' and/or the temperature is ${alert.tempComparison} ${alert.threshold}°C`
          );
          removeAlert(alert.id); // Remove alert after triggering
        }
      }
    }
  });
};

export const setStoredAlerts = (alerts: IAlert[]) => {
  localStorage.setItem('weatherAlerts', JSON.stringify(alerts));
};
