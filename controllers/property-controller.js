import prisma from '../prisma-client.js';
import catchAsync from '../utils/catch-async.js';

export const createProperty = catchAsync(async (req, res) => {
  const { title, description, pricePerNight, location } = req.body;
  const property = await prisma.property.create({
    data: {
      title,
      description,
      pricePerNight,
      location,
      hostId: req.user.id,
    },
  });
  res.json(property);
});

export const getProperties = catchAsync(async (_, res) => {
  const properties = await prisma.property.findMany();
  res.json(properties);
});

export const updateProperty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const property = await prisma.property.update({
    where: { id },
    data: req.body,
  });
  res.json(property);
});

export const deleteProperty = catchAsync(async (req, res) => {
  const { id } = req.params;
  await prisma.property.delete({ where: { id } });
  res.json({ message: 'Property deleted' });
});
