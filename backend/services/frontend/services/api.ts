import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const rideService = {
  async estimateRide(data: any) {
    const response = await axios.post(`${API_BASE_URL}/ride/estimate`, data);
    return response.data;
  },
  
  async confirmRide(data: any) {
    const response = await axios.patch(`${API_BASE_URL}/ride/confirm`, data);
    return response.data;
  },

  async getRideHistory(customerId: string, driverId?: string) {
    const url = driverId 
      ? `${API_BASE_URL}/ride/${customerId}?driver_id=${driverId}`
      : `${API_BASE_URL}/ride/${customerId}`;
    
    const response = await axios.get(url);
    return response.data;
  }
};