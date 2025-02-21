import prisma from '../prisma-client.js';
import catchAsync from '../utils/catch-async.js';
const PROPERTY_URLS = [
  'https://res.cloudinary.com/dav5lnlxj/image/upload/v1740180511/house-four_olhjhf.jpg',
  'https://res.cloudinary.com/dav5lnlxj/image/upload/v1740180496/house-ten_oyi8hl.jpg',
  'https://res.cloudinary.com/dav5lnlxj/image/upload/v1740180497/house-nine_elmwxn.jpg',
  'https://res.cloudinary.com/dav5lnlxj/image/upload/v1740180498/house-seven_sdgm91.jpg',
  'https://res.cloudinary.com/dav5lnlxj/image/upload/v1740180503/house-five_h8y0sz.jpg',
  'https://res.cloudinary.com/dav5lnlxj/image/upload/v1740180503/house-two_ri9ske.jpg',
  'https://res.cloudinary.com/dav5lnlxj/image/upload/v1740180507/house-one_ysnzer.jpg',
  'https://res.cloudinary.com/dav5lnlxj/image/upload/v1740180508/house-six_oganmy.jpg',
  'https://res.cloudinary.com/dav5lnlxj/image/upload/v1740180508/house-three_hz0tvi.jpg',
  'https://res.cloudinary.com/dav5lnlxj/image/upload/v1740180509/house-eight_orht91.jpg',
  'https://res.cloudinary.com/dav5lnlxj/image/upload/v1740180511/house-four_olhjhf.jpg',
];

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

export const getMyProperties = catchAsync(async (req, res) => {
  // console.log(req.user, 'Here motherfucker');
  // console.log('Here motherfucker');
  // res.send('ok');

  const properties = await prisma.property.findMany({
    where: { hostId: req.user.id },
  });
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

export const getProperty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const property = await prisma.property.findUnique({
    where: { id },
    include: { host: true },
  });
  res.json(property);
});

export const deleteProperty = catchAsync(async (req, res) => {
  const { id } = req.params;
  await prisma.property.delete({ where: { id } });
  res.json({ message: 'Property deleted' });
});

export const assignRandomImages = async (req, res) => {
  const propertiesWithoutImages = await prisma.property.findMany();

  const updatedProperties = await Promise.all(
    propertiesWithoutImages.map(async (property) => {
      const randomImageUrl =
        PROPERTY_URLS[Math.floor(Math.random() * PROPERTY_URLS.length)];

      return prisma.property.update({
        where: { id: property.id },
        data: { image: randomImageUrl },
      });
    })
  );

  res.send(
    `Updated ${updatedProperties.length} properties with random images.`
  );
};
