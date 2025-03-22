import Payment from '../models/payment.model.js';

// Controller to handle submitting payment data
export const submitPayment = async (req, res) => {
  const { name, email, paymentMethod } = req.body;

  try {
    // Create a new payment entry
    const newPayment = new Payment({
      name,
      email,
      paymentMethod,
    });

    // Save the payment details to the database
    await newPayment.save();
    res.status(201).json({ message: 'Payment details saved successfully!' });
  } catch (error) {
    console.error('Error saving payment details:', error);
    res.status(500).json({ error: 'Failed to save payment details.' });
  }
};
