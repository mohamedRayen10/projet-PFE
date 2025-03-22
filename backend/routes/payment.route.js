import express from 'express';
import { submitPayment } from '../controllers/payment.controller.js';

const router = express.Router();

// POST route to handle payment submission
router.post('/submit-payment', submitPayment);

export default router;
