import { Request, Response } from 'express';
import { GoogleMapsService } from '../services/GoogleMapsService';
import { RideService } from '../services/RideService';

const googleMapsService = new GoogleMapsService();
const rideService = new RideService();

export const estimateRideController = async (req: Request, res: Response) => {
  try {
    const { customer_id, origin, destination } = req.body;

    if (!customer_id || !origin || !destination) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Missing required fields'
      });
    }

    if (origin === destination) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Origin and destination cannot be the same'
      });
    }

    const routeData = await googleMapsService.calculateRoute(origin, destination);
    const estimatedRide = rideService.estimateRide(routeData);

    res.status(200).json(estimatedRide);
  } catch (error) {
    res.status(500).json({ error: 'Estimation failed' });
  }
};

export const confirmRideController = async (req: Request, res: Response) => {
  try {
    const { customer_id, origin, destination, distance, duration, driver, value } = req.body;

    if (!customer_id || !origin || !destination || !driver) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Missing required fields'
      });
    }

    const confirmResult = await rideService.confirmRide(req.body);

    if (confirmResult.success) {
      res.status(200).json({ success: true });
    } else {
      res.status(406).json({
        error_code: confirmResult.errorCode,
        error_description: confirmResult.errorDescription
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Confirmation failed' });
  }
};

export const getRideHistoryController = async (req: Request, res: Response) => {
  try {
    const { customer_id } = req.params;
    const { driver_id } = req.query;

    if (!customer_id) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Customer ID is required'
      });
    }

    const rideHistory = await rideService.getRideHistory(customer_id, driver_id as string);

    res.status(200).json(rideHistory);
  } catch (error) {
    res.status(404).json({
      error_code: 'NO_RIDES_FOUND',
      error_description: 'No rides found for this customer'
    });
  }
};