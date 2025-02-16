import jwt from 'jsonwebtoken';
import prisma from '../prisma-client.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await prisma.user.upsert({
        where: { googleId: profile.id },
        update: {},
        create: {
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          role: 'RENTER',
        },
      });
      return done(null, user);
    }
  )
);

export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

export const googleAuthCallback = (req, res) => {
  const token = jwt.sign(
    { id: req.user.id, role: req.user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
  res.json({ token, user: req.user });
};

export const logout = (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully' });
};
