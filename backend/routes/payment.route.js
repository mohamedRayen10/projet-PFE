import express from 'express';
import { submitPayment, confirmPayment, getPaymentHistory } from '../controllers/payment.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/submit-payment', verifyUser, submitPayment);
router.post('/confirm', verifyUser, confirmPayment);
router.get('/payment-history', verifyUser, getPaymentHistory);  // <-- Ajout de la route historique avec verifyUser

export default router;
