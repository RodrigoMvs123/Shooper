import { Router } from 'express';
import { 
  estimateRideController, 
  confirmRideController, 
  getRideHistoryController 
} from '../controllers/rideController';

const router = Router();

router.post('/estimate', estimateRideController);
router.patch('/confirm', confirmRideController);
router.get('/:customer_id', getRideHistoryController);

export default router;