import express from 'express';
import {
  createBooking,
  updateBookingStatus,
} from '../controllers/booking-controller.js';
import {
  authenticateUser,
  authorizeRole,
} from '../middleware/auth-middleware.js';

const router = express.Router();
router.use(authenticateUser);

router.post('/', authorizeRole(['RENTER']), createBooking);
router.put('/:id/status', authorizeRole(['HOST']), updateBookingStatus);

export default router;
