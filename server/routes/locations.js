import express from 'express';
import LocationController from '../controllers/locations.js';

const router = express.Router();

router.get('/', LocationController.getLocations);
router.get('/:locationId', LocationController.getLocationByID);

export default router;