import { Driver, RideConfirmRequest } from '../models/Ride';

export class RideService {
  private drivers: Driver[] = [
    {
      id: 1,
      name: 'Homer Simpson',
      description: 'Motorista camarada com direito a rosquinhas',
      vehicle: 'Plymouth Valiant 1973',
      minKm: 1,
      pricePerKm: 2.50,
      review: {
        rating: 2,
        comment: 'Motorista simpático, mas errou o caminho 3 vezes'
      }
    },
    {
      id: 2,
      name: 'Dominic Toretto',
      description: 'Viagem rápida e segura',
      vehicle: 'Dodge Charger R/T 1970',
      minKm: 5,
      pricePerKm: 5.00,
      review: {
        rating: 4,
        comment: 'Que viagem incrível!'
      }
    },
    {
      id: 3,
      name: 'James Bond',
      description: 'Passeio suave e discreto',
      vehicle: 'Aston Martin DB5',
      minKm: 10,
      pricePerKm: 10.00,
      review: {
        rating: 5,
        comment: 'Serviço impecável!'
      }
    }
  ];

  estimateRide(routeData: any) {
    // Implementação da lógica de estimativa
    const availableDrivers = this.drivers.filter(driver => 
      routeData.distance >= driver.minKm
    ).map(driver => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: driver.review,
      value: routeData.distance * driver.pricePerKm
    })).sort((a, b) => a.value - b.value);

    return {
      origin: routeData.origin,
      destination: routeData.destination,
      distance: routeData.distance,
      duration: routeData.duration,
      options: availableDrivers,
      routeResponse: routeData
    };
  }

  async confirmRide(rideData: RideConfirmRequest) {
    // Simulação de salvamento no banco de dados
    const selectedDriver = this.drivers.find(d => d.id === rideData.driver.id);

    if (!selectedDriver) {
      return {
        success: false,
        errorCode: 'DRIVER_NOT_FOUND',
        errorDescription: 'Driver not found'
      };
    }

    if (rideData.distance < selectedDriver.minKm) {
      return {
        success: false,
        errorCode: 'INVALID_DISTANCE',
        errorDescription: 'Distance below driver minimum'
      };
    }

    return { success: true };
  }

  async getRideHistory(customerId: string, driverId?: string) {
    // Simulação de busca no banco de dados
    const mockRides = [
      {
        id: 1,
        date: new Date(),
        origin: 'Endereço A',
        destination: 'Endereço B',
        distance: 15,
        duration: '30 min',
        driver: {
          id: 1,
          name: 'Homer Simpson'
        },
        value: 37.50
      }
    ];

    return {
      customer_id: customerId,
      rides: driverId 
        ? mockRides.filter(ride => ride.driver.id === parseInt(driverId))
        : mockRides
    };
  }
}