import React from 'react';
import { Link } from 'react-router-dom';
import { useTemperatureUnit } from '../contexts/TempratureUnitContext'; // Use the context
import Button from './Button';


const Header: React.FC = () => {
  const { unit, toggleUnit } = useTemperatureUnit();

  return (
    <header className="text-primary p-4 border-b border-primary">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to={"/"} className="text-2xl md:text-3xl font-bold">Weatherlogs</Link>
        <Button 
          onClick={toggleUnit}
          btnText={`Switch to °${unit === 'C' ? 'F' : 'C'}`}
          />
      </div>
    </header>
  );
};

export default Header;
