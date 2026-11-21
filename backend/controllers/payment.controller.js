import Payment from '../models/payment.model.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Controller to handle submitting payment data
export const submitPayment = async (req, res) => {
  try {
    const userId = req.user.id; // Grabbed from verified JWT

    const { amount } = req.body;
    //console.log(userId)
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Membership Payment' },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/payment-fail',
      metadata: {
        userId: userId,
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const confirmPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: 'Session ID is required' });
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const paymentData = {
        paymentId: Date.now(), // This should ideally be replaced with a UUID or Stripe ID
        amount: session.amount_total / 100, // Convert cents to dollars
        paymentDate: new Date(),
        userId: session.metadata.userId,
        method: 'stripe',
        stripeTransactionId: session.payment_intent,
        status: 'successful',
      };

      const paymentRecord = new Payment(paymentData);
      await paymentRecord.save();

      return res.status(200).json({
        message: '✅ Payment successful. Payment record created. Your account is pending admin verification (max 48 hours).',
      });
    } else {
      return res.status(400).json({ message: '❌ Payment not successful' });
    }
  } catch (error) {
    console.error('Error confirming payment:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getPaymentHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;  // depends on your JWT payload

    if (!userId) {
      return res.status(400).json({ message: 'User ID not found in token' });
    }

    const payments = await Payment.find({ userId }).sort({ paymentDate: -1 });

    return res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payment history:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};