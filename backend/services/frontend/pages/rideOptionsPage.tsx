import React, { useState } from 'react';
import { rideService } from '../services/api';
import RideHistoryPage from './RideHistoryPage';

interface Driver {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: { rating: number; comment: string };
  value: number;
}

const RideOptionsPage: React.FC<{ estimateData: any }> = ({ estimateData }) => {
  const [selectedRide, setSelectedRide] = useState<boolean>(false);

  const handleRideConfirmation = async (driver: Driver) => {
    try {
      await rideService.confirmRide({
        customer_id: estimateData.customer_id,
        origin: estimateData.origin,
        destination: estimateData.destination,
        distance: estimateData.distance,
        duration: estimateData.duration,
        driver: { id: driver.id, name: driver.name },
        value: driver.value
      });
      setSelectedRide(true);
    } catch (error) {
      console.error('Erro ao confirmar corrida', error);
    }
  };

  if (selectedRide) {
    return <RideHistoryPage />;
  }

  return (
    <div>
      <h1>Opções de Viagem</h1>
      {estimateData.options.map((driver: Driver) => (
        <div key={driver.id}>
          <h2>{driver.name}</h2>
          <p>{driver.description}</p>
          <p>Veículo: {driver.vehicle}</p>
          <p>Avaliação: {driver.review.rating}/5</p>
          <p>Valor: R$ {driver.value.toFixed(2)}</p>
          <button onClick={() => handleRideConfirmation(driver)}>
            Escolher
          </button>
        </div>
      ))}
    </div>
  );
};

export default RideOptionsPage;