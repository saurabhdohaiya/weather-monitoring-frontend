import React from 'react';
import Button from './Button';
import { IAlert } from '../types/types';

interface AlertListItemProps {
  alert: IAlert;
  onDelete: (id: number) => void;
}

const AlertListItem: React.FC<AlertListItemProps> = ({ alert, onDelete }) => {
  return (
    <div className="bg-white border shadow-md rounded-lg mb-4 p-4 flex flex-row justify-between">
      <div className="flex flex-col justify-between items-start">
        {alert.threshold && alert.tempComparison && (
          <p className="text-sm">
            Temperature: <span className='font-semibold'>{alert.tempComparison} {alert.threshold} &deg;C </span>
          </p>
        )}
          <p className="text-sm">
            Weather: <span className='font-semibold'>{alert.weatherCondition ? alert.weatherCondition : "NA"}</span>
          </p>
      </div>
      <Button
        onClick={() => onDelete(alert.id)}
        btnText="Delete"
        className="text-sm h-10 w-auto md:px-2 md:py-1"
      />
    </div>
  );
};

export default AlertListItem;
