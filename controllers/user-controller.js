import prisma from '../prisma-client.js';
import catchAsync from '../utils/catch-async.js';
const CALLBACK_URL = 'http://localhost:8080/auth/google/callback';
import { google } from 'googleapis';
import { createSendToken } from '../utils/index.js';

const initGoogle = () =>
  // Authentication using OAuth 2.0
  new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: CALLBACK_URL,
  });

export const logout = (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully' });
};

export const authenticateUser = catchAsync(async (req, res, next) => {
  const { access_token } = req.body;
  const auth = initGoogle();

  if (!access_token) {
    return next(new AppError('Please provide a valid access token', 400));
  }

  auth.setCredentials({
    access_token: access_token,
  });

  const people = google.people({ version: 'v1', auth });

  const { data } = await people.people.get({
    resourceName: 'people/me',
    personFields: 'emailAddresses,names,photos',
  });

  const profileId = data.resourceName.split('/')[1];

  const user = await prisma.user.findUnique({
    where: {
      googleId: profileId,
    },
  });

  if (user) {
    createSendToken(user, 200, res);
  } else {
    const newUser = await prisma.user.create({
      data: {
        googleId: profileId,
        name: data.names[0].displayName,
        email: data.emailAddresses[0].value,
        avatar: data.photos[0].value,
        role: 'HOST',
      },
    });

    createSendToken(newUser, 200, res);
  }

  // res.json({
  //   status: 'success',
  //   data: {
  //     user: {
  //       name: data.names[0].displayName,
  //       email: data.emailAddresses[0].value,
  //       avatar: data.photos[0].value,
  //       socialId: profileId,
  //     },
  //   },
  // });
  // const existingUser = await User.findOne({
  //   $or: [{ socialId: profileId }, { email: data?.emailAddresses[0]?.value }],
  // });

  // // Just log the user in at once
  // if (existingUser) {
  //   existingUser.socialId = profileId;
  //   existingUser.provider = 'google';
  //   await existingUser.save();
  //   createSendToken(existingUser, 200, res);
  // }

  // const newUser = new User({
  //   socialId: profileId,
  //   provider: 'google',
  //   name: data.names[0].displayName,
  //   email: data.emailAddresses[0].value,
  //   avatar: data.photos[0].value,
  // });

  // await newUser.save();

  // createSendToken(newUser, 200, res);
});
