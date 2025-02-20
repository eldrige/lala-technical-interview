import express from 'express';
import {
  createProperty,
  getProperties,
  updateProperty,
  deleteProperty,
  getMyProperties,
} from '../controllers/property-controller.js';
import {
  authenticateUser,
  authorizeRole,
} from '../middleware/auth-middleware.js';

const router = express.Router();

router.get('/', getProperties);
router.use(authenticateUser);
router.use(authorizeRole(['HOST']));
router.get('/my-properties', getMyProperties);
router.post('/', createProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

export default router;
