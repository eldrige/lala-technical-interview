import prisma from '../prisma-client.js';
import catchAsync from '../utils/catch-async.js';

export const createBooking = catchAsync(async (req, res) => {
  const { propertyId, checkIn, checkOut } = req.body;

  const existingBooking = await prisma.booking.findFirst({
    where: {
      propertyId,
      checkIn: { lte: checkOut },
      checkOut: { gte: checkIn },
    },
  });

  if (existingBooking)
    return res
      .status(400)
      .json({ error: 'Property already booked for these dates' });

  const booking = await prisma.booking.create({
    data: { renterId: req.user.id, propertyId, checkIn, checkOut },
  });

  res.json(booking);
});

export const updateBookingStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const booking = await prisma.booking.update({
    where: { id },
    data: { status },
  });
  res.json(booking);
});

export const getMyBookingsAsHost = catchAsync(async (req, res) => {
  const hostId = req.user.id;
  const bookings = await prisma.booking.findMany({
    where: {
      property: {
        hostId: hostId,
      },
    },
    include: {
      renter: true,
      property: true,
    },
  });
  res.json(bookings);
});

export const getMyBookingsAsRenter = catchAsync(async (req, res) => {
  const renterId = req.user.id;
  const bookings = await prisma.booking.findMany({
    where: {
      renterId: renterId,
    },
    include: {
      renter: true,
      property: true,
    },
  });
  res.json(bookings);
});
