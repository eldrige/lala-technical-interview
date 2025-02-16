import jwt from 'jsonwebtoken';
import prisma from '../prisma-client.js';

export const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });
    if (!user) return res.status(401).json({ message: 'Access Denied' });
    req.user = user;
    next();
  } catch {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

export const authorizeRole = (roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Access Denied' });
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'You dont have permission' });
  }
  next();
};
