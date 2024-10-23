import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of your context data
interface TemperatureContextProps {
  unit: 'C' | 'F';
  toggleUnit: () => void;
}

// Create the context
const TemperatureContext = createContext<TemperatureContextProps | undefined>(undefined);

// Create a provider component
export const TemperatureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [unit, setUnit] = useState<'C' | 'F'>('C'); // Default is Celsius

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  return (
    <TemperatureContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
};

// Custom hook to use the TemperatureContext
export const useTemperatureUnit = () => {
  const context = useContext(TemperatureContext);
  if (!context) {
    throw new Error('useTemperature must be used within a TemperatureProvider');
  }
  return context;
};
