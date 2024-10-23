import React from 'react';
import AlertListItem from './AlertListItem';
import { IAlert } from '../types/types';

const ActiveAlertList: React.FC<{ alerts: IAlert[]; onDelete: (id: number) => void }> = ({ alerts, onDelete }) => {
  return (
    <div>
      {alerts.length === 0 ? (
        <div className="bg-white border shadow-md rounded-lg mb-4 p-4 flex flex-row justify-center">
          <p className='text-primary'>No Active Alerts Found!</p>
        </div>
      ) : (
        <div>
          {alerts.map((alert) => (
            <AlertListItem key={alert.id} alert={alert} onDelete={() => onDelete(alert.id)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveAlertList;
