import axios from 'axios';

export class GoogleMapsService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_API_KEY || '';
  }

  async calculateRoute(origin: string, destination: string) {
    const URL = `https://routes.googleapis.com/directions/v2:computeRoutes`;
    
    try {
      const response = await axios.post(URL, {
        origin: { address: origin },
        destination: { address: destination }
      }, {
        headers: {
          'X-Goog-Api-Key': this.apiKey,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      throw new Error('Route calculation failed');
    }
  }
}