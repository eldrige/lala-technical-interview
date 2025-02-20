import express from 'express';
import {
  createBooking,
  updateBookingStatus,
  getMyBookingsAsRenter,
  getMyBookingsAsHost,
} from '../controllers/booking-controller.js';
import {
  authenticateUser,
  authorizeRole,
} from '../middleware/auth-middleware.js';

const router = express.Router();
router.use(authenticateUser);

router.get('/my-bookings', getMyBookingsAsRenter);
router.get('/host-bookings', authorizeRole(['HOST']), getMyBookingsAsHost);

router.post('/', authorizeRole(['RENTER']), createBooking);
router.put('/:id/status', authorizeRole(['HOST']), updateBookingStatus);

export default router;
