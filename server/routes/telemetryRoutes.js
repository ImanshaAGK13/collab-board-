import express from 'express';
import { getTelemetryStats } from '../controllers/telemetryController.js';

const router = express.Router();

router.get('/stats', getTelemetryStats);

export default router;
