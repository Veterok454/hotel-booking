import express from 'express';
import { requestOffer } from '../controllers/offerController.js';

const router = express.Router();

router.post('/request', requestOffer);

export default router;
