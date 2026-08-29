import express from 'express';
import { getCrew, addCrew } from '../controllers/crewController.js';

const router = express.Router();

router.get('/', getCrew);
router.post('/', addCrew);

export default router;
