import React, { useState } from 'react';
import { rideService } from '../services/api';
import RideOptionsPage from './RideOptionsPage';

const RideEstimatePage: React.FC = () => {
  const [customerId, setCustomerId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [estimateResult, setEstimateResult] = useState(null);
  const [error, setError] = useState('');

  const handleEstimate = async () => {
    try {
      const result = await rideService.estimateRide({
        customer_id: customerId,
        origin,
        destination
      });
      setEstimateResult(result);
      setError('');
    } catch (err) {
      setError('Erro ao estimar corrida');
    }
  };

  if (estimateResult) {
    return <RideOptionsPage estimateData={estimateResult} />;
  }

  return (
    <div>
      <h1>Solicitar Viagem</h1>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <input 
        placeholder="ID do Usuário"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />
      <input 
        placeholder="Endereço de Origem"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <input 
        placeholder="Endereço de Destino"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button onClick={handleEstimate}>Estimar Viagem</button>
    </div>
  );
};

export default RideEstimatePage;