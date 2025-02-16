import express from 'express';
import {
  googleAuth,
  googleAuthCallback,
  logout,
} from '../controllers/user-controller.js';
import passport from 'passport';

const router = express.Router();

router.get('/google', googleAuth);
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  googleAuthCallback
);
router.post('/logout', logout);

export default router;
