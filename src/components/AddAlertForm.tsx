import React, { useState} from 'react';
import { toast } from 'react-toastify';
import { IAlert } from '../types/types';
import { ALERT_VALID_UPTO_DAYS, TEMPERATURE_CONDITION_LIST, WEATHER_CONDITION_LIST } from '../constants/constant';
import Button from './Button';
import { storeAlert } from '../services/alertService'; // Import necessary services

const AddAlertForm: React.FC<{ cityId: string; onAlertAdded: () => void }> = ({ cityId, onAlertAdded }) => {
  const [newAlert, setNewAlert] = useState({
    condition: '',
    threshold: '',
    weatherCondition: '', 
    tempComparison: 'Greater than',
    validUptoDays: ALERT_VALID_UPTO_DAYS,
  });

  const validateInputs = () => {
    if (!newAlert.weatherCondition && isNaN(parseFloat(newAlert.threshold))) {
      toast.error('Please provide a temperature or select a weather condition.');
      return false;
    }

    if (newAlert.threshold && isNaN(parseFloat(newAlert.threshold))) {
      toast.error('Temperature must be a valid number.');
      return false;
    }

    return true;
  };

  const handleAddAlert = () => {
    if (!validateInputs()) return;

    const now = new Date();
    const validUpto = new Date(now.setDate(now.getDate() + parseInt(newAlert.validUptoDays)));

    const alert: IAlert = {
      id: Date.now(),
      cityId,
      threshold: newAlert.threshold ? parseFloat(newAlert.threshold) : 0,
      weatherCondition: newAlert.weatherCondition || '',
      tempComparison: newAlert.tempComparison || '',
      validUpto,
    };

    storeAlert(alert);
    toast.success('Alert added successfully!');
    setNewAlert({ condition: '', threshold: '', weatherCondition: '', tempComparison: 'Greater than', validUptoDays: ALERT_VALID_UPTO_DAYS });

    // Trigger the callback to update the parent component
    onAlertAdded();
  };

  return (
    <>
      <h2 className="text-lg font-semibold">Add New Alert(s)</h2>
      <div className="flex flex-col gap-4 mt-4 items-center justify-between"> 
        <div className='flex flex-row w-full gap-2'>
          <select
            value={newAlert.tempComparison}
            onChange={(e) => setNewAlert({ ...newAlert, tempComparison: e.target.value })}
            className="border px-4 py-1 rounded-full w-2/3 text-sm"
          >
            <option value={""} disabled>Select comparison</option>
            {TEMPERATURE_CONDITION_LIST.map((comparison, index) => (
              <option key={index} value={comparison}>{comparison}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Temperature"
            value={newAlert.threshold}
            onChange={(e) => setNewAlert({ ...newAlert, threshold: e.target.value })}
            className="border px-4 py-1 rounded-full w-1/3 text-sm"
          />
        </div>
        <div className='flex flex-row w-full gap-2'>
          <select
            value={newAlert.weatherCondition}
            onChange={(e) => setNewAlert({ ...newAlert, weatherCondition: e.target.value })}
            className="border px-4 py-1 rounded-full w-2/3 text-sm"
          >
            <option value={""} disabled>Select weather condition</option>
            {WEATHER_CONDITION_LIST.map((condition, index) => (
              <option key={index} value={condition}>{condition}</option>
            ))}
          </select>
          <Button onClick={handleAddAlert} btnText={"Add Alert"} className="text-sm w-1/3 md:px-2 md:py-1 max-h-16" />
        </div>
      </div>
    </>
  );
};

export default AddAlertForm;
