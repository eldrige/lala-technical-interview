import express from 'express';
import {
  authenticateUser,
  logout,
  getMe,
} from '../controllers/user-controller.js';
import { authenticateUser as authenticateUserMiddleware } from '../middleware/auth-middleware.js';

const router = express.Router();

router.post('/auth', authenticateUser);

router.use(authenticateUserMiddleware);
router.get('/me', getMe);
// router.get(
//   '/google/callback',
//   passport.authenticate('google', { session: false }),
//   googleAuthCallback
// );
router.post('/logout', logout);

export default router;
