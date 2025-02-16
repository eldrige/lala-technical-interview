import express from 'express';
import { authenticateUser, logout } from '../controllers/user-controller.js';
// import passport from 'passport';

const router = express.Router();

router.post('/auth', authenticateUser);
// router.get(
//   '/google/callback',
//   passport.authenticate('google', { session: false }),
//   googleAuthCallback
// );
router.post('/logout', logout);

export default router;
