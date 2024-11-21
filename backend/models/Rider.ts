export interface Driver {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    minKm: number;
    pricePerKm: number;
    review: {
      rating: number;
      comment: string;
    };
  }
  
  export interface RideEstimateRequest {
    customer_id: string;
    origin: string;
    destination: string;
  }
  
  export interface RideConfirmRequest {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: {
      id: number;
      name: string;
    };
    value: number;
  }